var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Main,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        App.LayerManager.init(this.stage);
        Log.initDebug(true); //location.href.indexOf("debug=1") >= 0);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this._loadingView = new LoadingUI();
        this.stage.addChild(this._loadingView);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    p.onConfigComplete = function (event) {
        Log.trace("default.res.json 加载成功");
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    p.onThemeLoadComplete = function (e) {
        var theme = e.target;
        if (theme)
            theme.removeEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        Log.trace("default.thm.json 加载成功");
        RES.loadGroup("preload");
        Log.trace("开始加载资源包 preload");
    };
    p.onResourceLoadComplete = function (event) {
        Log.trace("资源包加载完成 " + event.groupName);
        if (event.groupName == "preload") {
            this._loadingView.destroy();
            this.stage.removeChild(this._loadingView);
            this.startScene();
        }
    };
    p.onItemLoadError = function (event) {
        Log.trace("资源包加载失败 " + event.resItem.url);
    };
    p.onResourceLoadError = function (event) {
        this.onResourceLoadComplete(event);
    };
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this._loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建场景界面
     */
    p.startScene = function () {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        App.init();
        App.LayerManager.bg.loadFromTexture("sc1bg_png", 2);
        App.ScenesManager.switchScene(View.TestScene, "test");
        App.SoundManager.playBgSound("music");
    };
    return Main;
}(eui.UILayer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map