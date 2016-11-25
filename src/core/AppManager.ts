class AppManager {
    
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
    
    public static init(): void
    {
        AppManager.LayoutManager.init();
        AppManager.ScenesManager.init(AppManager.LayerManager.sceneLayer);
        AppManager.UIViewManager.init(AppManager.LayerManager.uiLayer);
    }
}
