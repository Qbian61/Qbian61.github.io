define(function(require, exports, module) {

'use strict';

var Parser = function() {
};

Parser.prototype.getHeaderValue = function() {
    //throw exception
    return 0;
}

Parser.prototype.getHeaderText = function() {
    //throw exception
    return "";
}

Parser.prototype.getBody = function() {
    //throw exception
    return null;//JSONObject
}

Parser.prototype.parse = function(content) {
    //throw exception
}


Parser.prototype.isOk = function() {
    //throw exception
    return false;
}

module.exports = Parser;
});
