define(function(require, exports, module) {
/**
 * Created by dell on 2016/12/22.
 */
'use strict';

var util = require('./util');
var EventEmitter = require('./events').EventEmitter;

function http() {

}

module.exports = http;

http.request  = function request(options, cb) {

    return  createXHR(options, cb);
};

//编码 TODO




//xhr包装对象 继承event
function xhrFunction(){
    EventEmitter.call(this);
}
util.inherits(xhrFunction, EventEmitter);


//response包装对象 继承event
function responseFunction(){
    EventEmitter.call(this);
}
util.inherits(responseFunction, EventEmitter);

// 创建XHR
function createXHR(options, cb) {
    // console.info("http createXHR : ");
    // console.info(options);
    var host = options.hostname,
        port = options.port,
        url = options.path || "",//请求的链接
        method = (options.method || "get").toLowerCase(), //请求的方法,默认为get
        data = null, //请求的数据
        headers = options.headers || null, //头信息
        async = options.async === undefined ? true : options.async; //是否异步，默认为true.


    var timeout_bool = false,//是否请求超时
        timeout_flag = 0;//setTime index

    function getXHR() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else {
            //遍历IE中不同版本的ActiveX对象
            var versions = ["Microsoft", "msxm3", "msxml2", "msxml1"];
            for (var i = 0; i < versions.length; i++) {
                try {
                    var version = versions[i] + ".XMLHTTP";
                    return new ActiveXObject(version);
                } catch (e) {
                }
            }
        }
    }

    //创建对象。
    var xhr = getXHR();

    var xhrObj = new xhrFunction();
//--------------对外模拟node接口-------------------
    xhrObj.xhr = xhr;
    xhrObj.setTimeout = function(msec,cb){
        timeout_flag = setTimeout(function () {
            timeout_bool = true;
            if(cb){
                cb.call(this);
            }
        }, msec);
    };
    xhrObj.abort = function(){
        this.xhr.abort();
    };
    xhrObj.write = function(_data){
        data = _data;
    };

    xhrObj.end = function(){
        //发送请求
        this.xhr.send(method === "get" ? null : data);
    };

    //添加监听
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            clearTimeout(timeout_flag);
            //超时处理
            if (timeout_bool) {
                return;
            }
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                var responseObj = new responseFunction();
                var data = xhr.responseText;
                //--------------对外模拟node接口-------------------
                responseObj.statusCode = xhr.status;
                if(cb){
                    cb.call(this,responseObj);
                }

                responseObj.emit('data',data);
                responseObj.emit('end');

            } else {
                var obj = {};
                obj.message = xhr.statusText;
                xhrObj.emit('error',obj);
            }
        }
    };

    xhr.open(method, url, async);

    //设置头信息
    if (headers) {
        var keys = Object.keys(headers);
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            xhr.setRequestHeader(key, headers[key]);
        }
    }

    return xhrObj;
}


/*//设置请求超时
function setTime(callback, script) {
    if (timeOut !== undefined) {
        timeout_flag = setTimeout(function () {

            timeout_bool = true;
            xhr && xhr.abort();

            console.log("timeout");

        }, timeOut);
    }
}*/
});
