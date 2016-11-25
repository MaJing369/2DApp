var Core;
(function (Core) {
    /**
     *
     * @author
     *
     */
    var ScenesManager = (function (_super) {
        __extends(ScenesManager, _super);
        function ScenesManager() {
            _super.call(this);
        }
        var d = __define,c=ScenesManager,p=c.prototype;
        p.init = function (sceneLayer) {
            this._layer = sceneLayer;
        };
        p.switchScene = function (sceneClass, resGroupName) {
            if (resGroupName === void 0) { resGroupName = null; }
            this._curSceneClass = sceneClass;
            this._resGroupName = resGroupName;
            if (resGroupName == null || resGroupName == "" || RES.isGroupLoaded(resGroupName)) {
                this.toScene();
            }
            else {
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.loadGroup(resGroupName, 3);
                Log.trace("开始加载资源包 " + resGroupName);
            }
        };
        p.onResourceLoadComplete = function (e) {
            if (this._curSceneClass && this._resGroupName == e.groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                Log.trace("加载资源包成功 " + this._resGroupName);
                this.toScene();
                this._curSceneClass = null;
                this._resGroupName = null;
            }
        };
        p.onResourceLoadError = function (e) {
            if (this._curSceneClass && this._resGroupName == e.groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                Log.trace("加载资源包失败 " + this._resGroupName);
                this._curSceneClass = null;
                this._resGroupName = null;
            }
        };
        p.toScene = function () {
            this._curScene = new this._curSceneClass();
            App.LayoutManager.register(this._curScene);
            this.clearScene();
            this._layer.addChild(this._curScene);
        };
        p.clearScene = function () {
            while (this._layer.numChildren) {
                var sc = this._layer.getChildAt(0);
                ToolMod.removeFromParent(sc);
                ToolMod.clearDisplayContainer(sc, true, true, true);
            }
        };
        return ScenesManager;
    }(Core.BaseSingleton));
    Core.ScenesManager = ScenesManager;
    egret.registerClass(ScenesManager,'Core.ScenesManager');
})(Core || (Core = {}));
//# sourceMappingURL=ScenesManager.js.map