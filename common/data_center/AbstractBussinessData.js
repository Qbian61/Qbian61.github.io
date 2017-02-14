define(function(require, exports, module) {
/**
 * Created by Cyril on 2016/5/30.
 */
'use strict';

const EventEmitter = require('./events').EventEmitter;
const util = require('./util');
const http = require('./http');
const urlparse = require('./url');
const ConstConfig = require("./Config/ConstConfig.js");
const Log = require("../log/Log.js");
const Querystring =  require('./querystring');
// const ajax = require('./ajax.js');
// console.info(ajax);

var AbstractBusinessData = function(name) {
    EventEmitter.call(this);
    this.request = null;
    this.tag = name;
};

AbstractBusinessData.prototype.exec = function(url, content, callback) {
    console.log("request url:",url +'------------------'+ content);
    var thiz = this;
    var subname = thiz.tag;
    console.log("the subname is " + subname);
    // Log.info("["+ subname +"] info:request url:",url + "?" + content);
    if(this.request != null){
        Log.error("["+ subname +"] error:" + "-12 " + ConstConfig.PARAM_12);
        return console.error("error",-12,ConstConfig.PARAM_12);
    }
    var urlpath = urlparse.parse(url);
    var options = {
        host:urlpath.hostname,
        port:urlpath.port,
        path:urlpath.pathname,
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // 'Content-Length': content.length
        }
    };

    thiz.request = http.request(options, function(response) {
        if(response.statusCode != 200){
            Log.error("["+ subname +"] error:response.statusCode=" + response.statusCode);
            thiz.emit("error", response.statusCode, ConstConfig["PARAM_" + response.statusCode]);
        }
        var body = '';
        response.on('data', function(data){
            // Log.info("["+ subname +"] info:response data is" + data);
            body += data;
            callback(body);
        } );
        response.on('end', function(){
            var parser = thiz.getParser();
            parser.parse(body);
            var ob = null;
            if (parser.isOk()) {
                try{
                    ob = thiz.parseContentBody(parser.getHeaderValue(), parser.getBody());//throws exception
                }catch( e ){
                    thiz.emit("error",-3,ConstConfig.PARAM_3);
                }
                Log.info("["+ subname +"] info:receiving data success");
                thiz.emit("success", ob);
            }else{
                Log.error("["+ subname +"] error:" + parser.getHeaderValue() + " " + parser.getHeaderText());
                // thiz.emit("error", parser.getHeaderValue(), parser.getHeaderText());
            }
        });
    });
    thiz.request.setTimeout(ConstConfig.TIME_OUT,function(){
        Log.error("["+ subname +"] error:" + "-19 " + ConstConfig.PARAM_19);
        thiz.emit("error",-19,ConstConfig.PARAM_19);
        thiz.request.abort();
    });
    // thiz.request.on("error", function(error) {
    //     Log.error("["+ subname +"] error:" + "-11 " + ConstConfig.PARAM_11 + error.message);
    //     thiz.emit("error",-11,ConstConfig.PARAM_11 + error.message);
    // });
    thiz.request.write(content);
    thiz.request.end();
    return 0;
};

AbstractBusinessData.prototype.execPostRequestWithJson = function(url, content) {
    var thiz = this;
    var subname = thiz.tag;
    Log.info("["+ subname +"] info:request url:",url + "content:" + content);
    if(this.request != null){
        Log.error("["+ subname +"] error:" + "-12 " + ConstConfig.PARAM_12);
        return console.error("error",-12,ConstConfig.PARAM_12);
    }
    var urlpath = urlparse.parse(url);
    var options = {
        host:urlpath.hostname,
        port:urlpath.port,
        path:urlpath.pathname,
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': content.length
        }
    };

    thiz.request = http.request(options, function(response) {
        if(response.statusCode != 200){
            Log.error("["+ subname +"] error:response.statusCode=" + response.statusCode);
            thiz.emit("error", response.statusCode, ConstConfig["PARAM_" + response.statusCode]);
        }
        var body = '';
        response.on('data', function(data){
            Log.info("["+ subname +"] info:response data is" + data);
            body += data;
        } );
        response.on('end', function(){
            var parser = thiz.getParser();
            parser.parse(body);
            var ob = null;
            if (parser.isOk()) {
                try{
                    ob = thiz.parseContentBody(parser.getHeaderValue(), parser.getBody());//throws exception
                }catch( e ){
                    thiz.emit("error",-3,ConstConfig.PARAM_3);
                }
                Log.info("["+ subname +"] info:receiving data success");
                thiz.emit("success", ob);
            }else{
                Log.error("["+ subname +"] error:" + parser.getHeaderValue() + " " + parser.getHeaderText());
                thiz.emit("error", parser.getHeaderValue(), parser.getHeaderText());
            }
        });
    });
    thiz.request.setTimeout(ConstConfig.TIME_OUT,function(){
        Log.error("["+ subname +"] error:" + "-19 " + ConstConfig.PARAM_19);
        thiz.emit("error",-19,ConstConfig.PARAM_19);
        thiz.request.abort();
    });
    thiz.request.on("error", function(error) {
        Log.error("["+ subname +"] error:" + "-11 " + ConstConfig.PARAM_11 + error.message);
        thiz.emit("error",-11,ConstConfig.PARAM_11 + error.message);
    });
    thiz.request.write(content);
    thiz.request.end();
    return 0;
};

AbstractBusinessData.prototype.execGetRequestWithJson = function(url, content) {
    var thiz = this;
    var subname = thiz.tag;
    Log.info("["+ subname +"] info:request url:",url + "content:" + content);
    if(this.request != null){
        Log.error("["+ subname +"] error:" + "-12 " + ConstConfig.PARAM_12);
        return console.error("error",-12,ConstConfig.PARAM_12);
    }
    var urlpath = urlparse.parse(url);
    var options = {
        host:urlpath.hostname,
        port:urlpath.port,
        path:urlpath.path + Querystring.stringify(content),
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    thiz.request = http.request(options, function(response) {
        if(response.statusCode != 200){
            Log.error("["+ subname +"] error:response.statusCode=" + response.statusCode);
            thiz.emit("error", response.statusCode, ConstConfig["PARAM_" + response.statusCode]);
        }
        var body = '';
        response.on('data', function(data){
            // Log.info("["+ subname +"] info:response data is" + data);
            body += data;
        } );
        response.on('end', function(){
            var parser = thiz.getParser();
            parser.parse(body);
            var ob = null;
            if (parser.isOk()) {
                try{
                    ob = thiz.parseContentBody(parser.getHeaderValue(), parser.getBody());//throws exception
                }catch( e ){
                    thiz.emit("error",-3,ConstConfig.PARAM_3);
                }
                Log.info("["+ subname +"] info:receiving data success");
                thiz.emit("success", ob);
            }else{
                Log.error("["+ subname +"] error:" + parser.getHeaderValue() + " " + parser.getHeaderText());
                thiz.emit("error", parser.getHeaderValue(), parser.getHeaderText());
            }
        });
    });
    thiz.request.setTimeout(ConstConfig.TIME_OUT,function(){
        Log.error("["+ subname +"] error:" + "-19 " + ConstConfig.PARAM_19);
        thiz.emit("error",-19,ConstConfig.PARAM_19);
        thiz.request.abort();
    });
    thiz.request.on("error", function(error) {
        Log.error("["+ subname +"] error:" + "-11 " + ConstConfig.PARAM_11 + error.message);
        thiz.emit("error",-11,ConstConfig.PARAM_11 + error.message);
    });
    thiz.request.end();
    return 0;
};


AbstractBusinessData.prototype.cancel = function() {
    //console.log("cancel...");
    Log.info("["+ this.tag +"] info:request canceled");
    if (this.request != null) {
        this.request.abort();
        this.request = null;
    }
};

AbstractBusinessData.prototype.getParser = function() {
    return null;//throws exception
};

AbstractBusinessData.prototype.parseContentBody = function(headerValue, jo) {
    return null;//throws exception
};

util.inherits(AbstractBusinessData, EventEmitter);

module.exports = AbstractBusinessData;

});
