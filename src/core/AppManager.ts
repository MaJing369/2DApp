class App {
    
    public static get LayerManager():Core.LayerManager
    {
        return Core.LayerManager.getInstance();
    }
    
    public static get ScenesManager(): Core.ScenesManager
    {
        return Core.ScenesManager.getInstance();
    }
    
    public static get UIViewManager():Core.UIViewManager
    {
        return Core.UIViewManager.getInstance();
    }
    
    public static get LayoutManager():Core.LayoutManager
    {
        return Core.LayoutManager.getInstance();
    }
    
    public static get SoundManager():Core.SoundManager
    {
        return Core.SoundManager.getInstance();
    }
    
    public static get EventDispatcher():Core.EventDispatcher
    {
        return Core.EventDispatcher.getInstance();
    }
    
    public static get ShowViewEffect(): ShowViewEffect
    {
        return ShowViewEffect.getInstance();
    }
    
    public static init(): void
    {
        App.LayoutManager.init();
        App.ScenesManager.init(App.LayerManager.sceneLayer);
        App.UIViewManager.init(App.LayerManager.uiLayer);
        App.EventDispatcher.addEventListener(EventName.SWITCHSCENE,() => { App.ScenesManager.switchScene(View.Page_1,"page1")},this);
    }
}
