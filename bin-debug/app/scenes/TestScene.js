var View;
(function (View) {
    /**
     *
     * @author
     *
     */
    var TestScene = (function (_super) {
        __extends(TestScene, _super);
        function TestScene() {
            _super.call(this, "TestSkin_exml");
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
            this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
            this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
            this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
        }
        var d = __define,c=TestScene,p=c.prototype;
        p.destroy = function () {
            if (this._active) {
                this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
                this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
                this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
                this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
                this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
                this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTap, this);
            }
            _super.prototype.destroy.call(this);
        };
        p.onBtnTap = function (e) {
            switch (e.currentTarget) {
                case this.btn1:
                    {
                        App.LayerManager.bg.loadFromTexture("sc1bg_png", 1);
                        break;
                    }
                case this.btn2:
                    {
                        App.LayerManager.bg.loadFromTexture("sc1bg_png", 2);
                        break;
                    }
                case this.btn3:
                    {
                        App.LayerManager.bg.loadFromTexture("sc1bg_png", 3);
                        break;
                    }
                case this.btn4:
                    {
                        App.LayerManager.bg.loadFromTexture("sc1bg_png", 4);
                        break;
                    }
                case this.btn5:
                    {
                        App.LayerManager.bg.loadFromTexture("sc1bg_png", 5);
                        break;
                    }
                case this.btn6:
                    {
                        App.LayerManager.bg.loadFromTexture("sc1bg_png", 6);
                        break;
                    }
            }
        };
        return TestScene;
    }(Core.BaseEuiScene));
    View.TestScene = TestScene;
    egret.registerClass(TestScene,'View.TestScene');
})(View || (View = {}));
//# sourceMappingURL=TestScene.js.map