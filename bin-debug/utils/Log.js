var Log = (function () {
    function Log() {
    }
    var d = __define,c=Log,p=c.prototype;
    Log.initDebug = function (traceDebug) {
        if (traceDebug)
            this._isTraceDebug = traceDebug;
    };
    Log.trace = function () {
        var optionalParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            optionalParams[_i - 0] = arguments[_i];
        }
        if (this._isTraceDebug) {
            var text = optionalParams.join(", ");
            console.log("[Log]" + text);
        }
    };
    Log._isTraceDebug = false;
    return Log;
}());
egret.registerClass(Log,'Log');
//# sourceMappingURL=Log.js.map