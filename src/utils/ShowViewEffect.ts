/**
 *
 * @author 
 *
 */
class ShowViewEffect extends Core.BaseSingleton{
    private _dc:egret.DisplayObjectContainer
    public showEffect(dc:egret.DisplayObjectContainer , type:number):void
    {
        this._dc = dc;
        this["showSceneEffect_" + type]();
    }
    private showSceneEffect_1(): void 
    {
        this._dc.alpha = 0;
        this._dc.scaleX = 0.5;
        this._dc.scaleY = 0.5;
        this._dc.x = App.LayerManager.stage.stageWidth / 4;
        this._dc.y = App.LayerManager.stage.stageHeight / 4;
        egret.Tween.get(this._dc)
            .to({ alpha: 1,scaleX: 1,scaleY: 1,x: 0,y: 0 },800,egret.Ease.backOut)
            .call(this.onAddSceneBreak,this);
    }

    private showSceneEffect_2(): void 
    {
        this._dc.alpha = 0;
        this._dc.scaleX = 0.2;
        this._dc.scaleY = 0.2;
        this._dc.x = App.LayerManager.stage.stageWidth / 4;
        this._dc.y = App.LayerManager.stage.stageHeight / 4;
        egret.Tween.get(this._dc)
            .to({ alpha: 1,scaleX: 1,scaleY: 1,x: 0,y: 0 },800,egret.Ease.elasticOut)
            .call(this.onAddSceneBreak,this);
    }

    private showSceneEffect_3(): void
    {
        this._dc.x = -App.LayerManager.stage.stageWidth;
        egret.Tween.get(this._dc).to({ x: 0 },600,egret.Ease.cubicOut).call(this.onAddSceneBreak,this);
    }

    private showSceneEffect_4(): void 
    {
        this._dc.x = App.LayerManager.stage.stageWidth;
        egret.Tween.get(this._dc).to({ x: 0 },600,egret.Ease.cubicOut).call(this.onAddSceneBreak,this);
    }

    private showSceneEffect_5(): void
    {
        this._dc.y = -App.LayerManager.stage.stageHeight;
        egret.Tween.get(this._dc).to({ y: 0 },600,egret.Ease.bounceOut).call(this.onAddSceneBreak,this);
    }

    private showSceneEffect_6(): void 
    {
        this._dc.y = App.LayerManager.stage.stageHeight;

        egret.Tween.get(this._dc).to({ y: 0 },600,egret.Ease.cubicOut).call(this.onAddSceneBreak,this);
    }

    private onAddSceneBreak(): void 
    {
        egret.Tween.removeTweens(this._dc);
        App.EventDispatcher.dispatchEvent(new egret.Event(EventName.SWITCHSCENE));
    }
}
