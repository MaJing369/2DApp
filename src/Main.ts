
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private _loadingView: LoadingUI;
    protected createChildren(): void 
    {
        super.createChildren();
        AppManager.LayerManager.init(this.stage);
        Log.initDebug(true)//location.href.indexOf("debug=1") >= 0);
        
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
        
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());

        this._loadingView = new LoadingUI();
        this.stage.addChild(this._loadingView);
        
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    
    private onConfigComplete(event:RES.ResourceEvent):void 
    {
        Log.trace("default.res.json 加载成功");
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }
    
    private onThemeLoadComplete(e:eui.UIEvent): void 
    {
        var theme: eui.Theme = e.target as eui.Theme;
        if(theme) theme.removeEventListener(eui.UIEvent.COMPLETE,this.onThemeLoadComplete,this);
        Log.trace("default.thm.json 加载成功");
        RES.loadGroup("preload");
        Log.trace("开始加载资源包 preload");
    }
    
    private onResourceLoadComplete(event:RES.ResourceEvent):void 
    {
        Log.trace("资源包加载完成 " + event.groupName);
        if (event.groupName == "preload") 
        {
            this._loadingView.destroy();
            this.stage.removeChild(this._loadingView);
            this.startScene();
        }
    }

    private onItemLoadError(event:RES.ResourceEvent):void 
    {
        Log.trace("资源包加载失败 " + event.resItem.url );
    }
    
    private onResourceLoadError(event:RES.ResourceEvent):void 
    {
        this.onResourceLoadComplete(event);
    }
    
    private onResourceProgress(event:RES.ResourceEvent):void 
    {
        if (event.groupName == "preload")
        {
            this._loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
    
    /**
     * 创建场景界面
     */
    protected startScene(): void 
    {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
        
        AppManager.init();
        AppManager.LayerManager.bg.loadFromTexture("sc1bg_png" , 2)
        AppManager.ScenesManager.switchScene(View.TestScene,"test");
        AppManager.SoundManager.playBgSound("music")
    }
}
