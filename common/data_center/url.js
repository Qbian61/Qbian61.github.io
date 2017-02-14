define(function(require, exports, module) {
/**
 * Created by dell on 2016/12/27.
 */
'use strict';

function url(){

}

module.exports = url;

url.parse = function(url){
    var obj = {};
    obj.hostname = "";
    obj.host = "";
    obj.path = url;
    obj.pathname = url;

    return obj;
}
});
