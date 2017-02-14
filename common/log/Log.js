define(function(require, exports, module) {
'use strict';

// const NativeLog = require("meetingconnect").NativeLog;
//
var Log = function() {
};

Log.info = function(message) {
  console.info(message);
    // NativeLog.info(message);
}

Log.warning = function(message) {
  console.warn(message);
    // NativeLog.warning(message);
}

Log.debug = function(message) {
  console.debug(message);
    // NativeLog.debug(message);
}

Log.error = function(message) {
  console.error(message);
    // NativeLog.error(message);
}

module.exports = Log;

});
