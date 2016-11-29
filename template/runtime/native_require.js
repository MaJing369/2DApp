
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/app/event/EventName.js",
	"bin-debug/core/base/BaseEuiScene.js",
	"bin-debug/app/scenes/Page1.js",
	"bin-debug/app/scenes/Page2.js",
	"bin-debug/app/scenes/Page3.js",
	"bin-debug/app/scenes/TestScene.js",
	"bin-debug/core/base/BaseEuiView.js",
	"bin-debug/app/view/BtnView.js",
	"bin-debug/app/view/ContactMeView.js",
	"bin-debug/core/AppManager.js",
	"bin-debug/core/base/BaseSingleton.js",
	"bin-debug/core/base/BaseSound.js",
	"bin-debug/core/events/EventDispatcher.js",
	"bin-debug/core/uiManager/EuiViewData.js",
	"bin-debug/core/uiManager/LayerManager.js",
	"bin-debug/core/uiManager/LayoutManager.js",
	"bin-debug/core/uiManager/ScenesManager.js",
	"bin-debug/core/uiManager/SoundManager.js",
	"bin-debug/core/uiManager/UIViewManager.js",
	"bin-debug/core/uiView/Background.js",
	"bin-debug/Main.js",
	"bin-debug/utils/AssetAdapter.js",
	"bin-debug/utils/HashMap.js",
	"bin-debug/utils/LoadingUI.js",
	"bin-debug/utils/Log.js",
	"bin-debug/utils/ShowViewEffect.js",
	"bin-debug/utils/ThemeAdapter.js",
	"bin-debug/utils/ToolMod.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "noBorder",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};