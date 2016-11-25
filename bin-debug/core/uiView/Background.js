/**
 * author chuhua
 */
var Core;
(function (Core) {
    var Views;
    (function (Views) {
        var Background = (function () {
            function Background(width, height) {
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResLoadError, this);
                RES.loadGroup("bg");
                this._content = new egret.DisplayObjectContainer();
                this._width = width;
                this._height = height;
                this._content.touchEnabled = false;
                this._content.touchChildren = false;
            }
            var d = __define,c=Background,p=c.prototype;
            p.destroy = function () {
                this.removeResLoadEvents();
                this.clear();
                this._content = null;
            };
            p.loadFromTexture = function (textureName, effectType, displayType) {
                if (displayType === void 0) { displayType = Background.NONE; }
                this._textureName = textureName;
                this._displayType = displayType;
                this._effectType = effectType;
                this.loadTexture();
            };
            p.loadTexture = function () {
                this.clear();
                var bmp;
                if (this._displayType == Background.STRETCH) {
                    bmp = new egret.Bitmap(RES.getRes(this._textureName));
                    bmp.width = App.LayerManager.stage.stageWidth;
                    bmp.height = App.LayerManager.stage.stageHeight;
                    bmp.fillMode = egret.BitmapFillMode.SCALE;
                    this._content.addChild(bmp);
                }
                else if (this._displayType == Background.TILED) {
                    bmp = new egret.Bitmap(RES.getRes(this._textureName));
                    bmp.width = App.LayerManager.stage.stageWidth;
                    bmp.height = App.LayerManager.stage.stageHeight;
                    bmp.fillMode = egret.BitmapFillMode.REPEAT;
                    this._content.addChild(bmp);
                    this._content.cacheAsBitmap = true;
                }
                else {
                    bmp = new egret.Bitmap(RES.getRes(this._textureName));
                    bmp.width = App.LayerManager.stage.stageWidth;
                    bmp.height = App.LayerManager.stage.stageHeight;
                    this._content.addChild(bmp);
                }
                App.ShowViewEffect.showEffect(this._content, this._effectType);
            };
            p.onResLoadComplete = function (e) {
                if (e.groupName == this._resGroupName) {
                    this.removeResLoadEvents();
                    this.loadTexture();
                }
            };
            p.onResLoadError = function (e) {
                if (e.groupName == this._resGroupName) {
                    this.removeResLoadEvents();
                }
            };
            p.removeResLoadEvents = function () {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResLoadError, this);
            };
            p.clear = function () {
                this._content.cacheAsBitmap = false;
                var bmp;
                for (var i = this._content.numChildren - 1; i >= 0; i--) {
                    bmp = this._content.removeChildAt(i);
                    if (bmp) {
                        bmp.texture = null;
                    }
                }
            };
            d(p, "content"
                ,function () {
                    return this._content;
                }
            );
            d(p, "width"
                ,function () {
                    return this._width;
                }
            );
            d(p, "height"
                ,function () {
                    return this._height;
                }
            );
            Background.NONE = "none";
            Background.TILED = "tiled";
            Background.STRETCH = "stretch";
            return Background;
        }());
        Views.Background = Background;
        egret.registerClass(Background,'Core.Views.Background');
    })(Views = Core.Views || (Core.Views = {}));
})(Core || (Core = {}));
//# sourceMappingURL=Background.js.map