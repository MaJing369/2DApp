var App = (function () {
    function App() {
    }
    var d = __define,c=App,p=c.prototype;
    d(App, "LayerManager"
        ,function () {
            return Core.LayerManager.getInstance();
        }
    );
    d(App, "ScenesManager"
        ,function () {
            return Core.ScenesManager.getInstance();
        }
    );
    d(App, "UIViewManager"
        ,function () {
            return Core.UIViewManager.getInstance();
        }
    );
    d(App, "LayoutManager"
        ,function () {
            return Core.LayoutManager.getInstance();
        }
    );
    d(App, "SoundManager"
        ,function () {
            return Core.SoundManager.getInstance();
        }
    );
    d(App, "EventDispatcher"
        ,function () {
            return Core.EventDispatcher.getInstance();
        }
    );
    d(App, "ShowViewEffect"
        ,function () {
            return ShowViewEffect.getInstance();
        }
    );
    App.init = function () {
        App.LayoutManager.init();
        App.ScenesManager.init(App.LayerManager.sceneLayer);
        App.UIViewManager.init(App.LayerManager.uiLayer);
    };
    return App;
}());
egret.registerClass(App,'App');
//# sourceMappingURL=AppManager.js.map