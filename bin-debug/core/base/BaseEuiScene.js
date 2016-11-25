/**
 * 基础场景类
 * author chuhua
 */
var Core;
(function (Core) {
    var BaseEuiScene = (function (_super) {
        __extends(BaseEuiScene, _super);
        function BaseEuiScene(skinResName) {
            _super.call(this);
            this._active = false;
            this._active = true;
            this._skinResName = skinResName;
            this.skinName = RES.getRes(this._skinResName);
            if (this.skinName == null)
                throw new Error("皮肤加载失败,skinName:" + skinResName);
        }
        var d = __define,c=BaseEuiScene,p=c.prototype;
        p.destroy = function () {
            if (this._active) {
                this.skinName = null;
                this._skinResName = null;
                this._active = false;
                ToolMod.clearDisplayContainer(this, true, true, true);
            }
        };
        d(p, "skinResName"
            ,function () {
                return this._skinResName;
            }
        );
        return BaseEuiScene;
    }(eui.Component));
    Core.BaseEuiScene = BaseEuiScene;
    egret.registerClass(BaseEuiScene,'Core.BaseEuiScene');
})(Core || (Core = {}));
//# sourceMappingURL=BaseEuiScene.js.map