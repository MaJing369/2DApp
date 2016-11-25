var Core;
(function (Core) {
    /**
     *
     * @author
     *
     */
    var UIViewManager = (function (_super) {
        __extends(UIViewManager, _super);
        function UIViewManager() {
            _super.call(this);
        }
        var d = __define,c=UIViewManager,p=c.prototype;
        p.init = function (uiLayer) {
            this._uiLayer = uiLayer;
        };
        return UIViewManager;
    }(Core.BaseSingleton));
    Core.UIViewManager = UIViewManager;
    egret.registerClass(UIViewManager,'Core.UIViewManager');
})(Core || (Core = {}));
//# sourceMappingURL=UIViewManager.js.map