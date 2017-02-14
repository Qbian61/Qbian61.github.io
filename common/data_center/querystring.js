define(function(require, exports, module) {
/**
 * Created by dell on 2016/12/26.
 */
'use strict';

function QueryString() {

}
module.exports = QueryString;


var hexTable = new Array(256);
for (var i = 0; i < 256; ++i) {

    hexTable[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();
}

QueryString.escape = function (str) {
    // replaces encodeURIComponent
    // http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3.4
    if (typeof str !== 'string') {
        if (typeof str === 'object')
            str = String(str);
        else
            str += '';
    }
    var out = '';
    var lastPos = 0;

    for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);

        // These characters do not need escaping (in order):
        // ! - . _ ~
        // ' ( ) *
        // digits
        // alpha (uppercase)
        // alpha (lowercase)
        if (c === 0x21 || c === 0x2D || c === 0x2E || c === 0x5F || c === 0x7E ||
            (c >= 0x27 && c <= 0x2A) ||
            (c >= 0x30 && c <= 0x39) ||
            (c >= 0x41 && c <= 0x5A) ||
            (c >= 0x61 && c <= 0x7A)) {
            continue;
        }

        if (i - lastPos > 0)
            out += str.slice(lastPos, i);

        // Other ASCII characters
        if (c < 0x80) {
            lastPos = i + 1;
            out += hexTable[c];
            continue;
        }

        // Multi-byte characters ...
        if (c < 0x800) {
            lastPos = i + 1;
            out += hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)];
            continue;
        }
        if (c < 0xD800 || c >= 0xE000) {
            lastPos = i + 1;
            out += hexTable[0xE0 | (c >> 12)] +
                hexTable[0x80 | ((c >> 6) & 0x3F)] +
                hexTable[0x80 | (c & 0x3F)];
            continue;
        }
        // Surrogate pair
        ++i;
        var c2;
        if (i < str.length)
            c2 = str.charCodeAt(i) & 0x3FF;
        else
            throw new URIError('URI malformed');
        lastPos = i + 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | c2);
        out += hexTable[0xF0 | (c >> 18)] +
            hexTable[0x80 | ((c >> 12) & 0x3F)] +
            hexTable[0x80 | ((c >> 6) & 0x3F)] +
            hexTable[0x80 | (c & 0x3F)];
    }
    if (lastPos === 0)
        return str;
    if (lastPos < str.length)
        return out + str.slice(lastPos);
    return out;
};

var stringifyPrimitive = function (v) {
    if (typeof v === 'string')
        return v;
    if (typeof v === 'number' && isFinite(v))
        return '' + v;
    if (typeof v === 'boolean')
        return v ? 'true' : 'false';
    return '';
};


QueryString.stringify = QueryString.encode = function (obj, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';

    var encode = QueryString.escape;
    if (options && typeof options.encodeURIComponent === 'function') {
        encode = options.encodeURIComponent;
    }

    if (obj !== null && typeof obj === 'object') {
        var keys = Object.keys(obj);
        var len = keys.length;
        var flast = len - 1;
        var fields = '';
        for (var i = 0; i < len; ++i) {
            var k = keys[i];
            var v = obj[k];
            var ks = encode(stringifyPrimitive(k)) + eq;

            if (Array.isArray(v)) {
                var vlen = v.length;
                var vlast = vlen - 1;
                for (var j = 0; j < vlen; ++j) {
                    fields += ks + encode(stringifyPrimitive(v[j]));
                    if (j < vlast)
                        fields += sep;
                }
                if (vlen && i < flast)
                    fields += sep;
            } else {
                fields += ks + encode(stringifyPrimitive(v));
                if (i < flast)
                    fields += sep;
            }
        }
        return fields;
    }
    return '';
};
});
