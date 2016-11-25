/**
 *
 * @author
 *
 */
var ShowViewEffect = (function (_super) {
    __extends(ShowViewEffect, _super);
    function ShowViewEffect() {
        _super.apply(this, arguments);
    }
    var d = __define,c=ShowViewEffect,p=c.prototype;
    p.showEffect = function (dc, type) {
        this._dc = dc;
        this["showSceneEffect_" + type]();
    };
    p.showSceneEffect_1 = function () {
        this._dc.alpha = 0;
        this._dc.scaleX = 0.5;
        this._dc.scaleY = 0.5;
        this._dc.x = App.LayerManager.stage.stageWidth / 4;
        this._dc.y = App.LayerManager.stage.stageHeight / 4;
        egret.Tween.get(this._dc)
            .to({ alpha: 1, scaleX: 1, scaleY: 1, x: 0, y: 0 }, 800, egret.Ease.backOut)
            .call(this.onAddSceneBreak, this);
    };
    p.showSceneEffect_2 = function () {
        this._dc.alpha = 0;
        this._dc.scaleX = 0.2;
        this._dc.scaleY = 0.2;
        this._dc.x = App.LayerManager.stage.stageWidth / 4;
        this._dc.y = App.LayerManager.stage.stageHeight / 4;
        egret.Tween.get(this._dc)
            .to({ alpha: 1, scaleX: 1, scaleY: 1, x: 0, y: 0 }, 800, egret.Ease.elasticOut)
            .call(this.onAddSceneBreak, this);
    };
    p.showSceneEffect_3 = function () {
        this._dc.x = -App.LayerManager.stage.stageWidth;
        egret.Tween.get(this._dc).to({ x: 0 }, 600, egret.Ease.cubicOut).call(this.onAddSceneBreak, this);
    };
    p.showSceneEffect_4 = function () {
        this._dc.x = App.LayerManager.stage.stageWidth;
        egret.Tween.get(this._dc).to({ x: 0 }, 600, egret.Ease.cubicOut).call(this.onAddSceneBreak, this);
    };
    p.showSceneEffect_5 = function () {
        this._dc.y = -App.LayerManager.stage.stageHeight;
        egret.Tween.get(this._dc).to({ y: 0 }, 600, egret.Ease.bounceOut).call(this.onAddSceneBreak, this);
    };
    p.showSceneEffect_6 = function () {
        this._dc.y = App.LayerManager.stage.stageHeight;
        egret.Tween.get(this._dc).to({ y: 0 }, 600, egret.Ease.cubicOut).call(this.onAddSceneBreak, this);
    };
    p.onAddSceneBreak = function () {
        egret.Tween.removeTweens(this._dc);
        App.EventDispatcher.dispatchEvent(new egret.Event(EventName.SWITCHSCENE));
    };
    return ShowViewEffect;
}(Core.BaseSingleton));
egret.registerClass(ShowViewEffect,'ShowViewEffect');
//# sourceMappingURL=ShowViewEffect.js.map