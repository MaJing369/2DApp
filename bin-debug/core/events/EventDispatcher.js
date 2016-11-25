var Core;
(function (Core) {
    /**
     *
     * @author
     *
     */
    var EventDispatcher = (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher() {
            _super.call(this);
            this._eventDispatcher = new egret.EventDispatcher();
        }
        var d = __define,c=EventDispatcher,p=c.prototype;
        p.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            this._eventDispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
        };
        p.removeEventListener = function (type, listener, thisObject) {
            this._eventDispatcher.removeEventListener(type, listener, thisObject);
        };
        p.dispatchEvent = function (event) {
            return this._eventDispatcher.dispatchEvent(event);
        };
        p.hasEventListener = function (type) {
            return this._eventDispatcher.hasEventListener(type);
        };
        return EventDispatcher;
    }(Core.BaseSingleton));
    Core.EventDispatcher = EventDispatcher;
    egret.registerClass(EventDispatcher,'Core.EventDispatcher');
})(Core || (Core = {}));
//# sourceMappingURL=EventDispatcher.js.map