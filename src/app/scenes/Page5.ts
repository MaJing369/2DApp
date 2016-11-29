module View {
	/**
	 *
	 * @author 
	 *
	 */
	export class Page5 extends Core.BaseEuiScene{
        private txt1: eui.Label;
        private txt2: eui.Label;

        public constructor() {
            super("page2Skin_exml");
        }

        public destroy(): void {
            if(this._active) {
                this.txt1.cacheAsBitmap = false;
                this.txt2.cacheAsBitmap = false;
                this.clearEffect();
                super.destroy();
            }
        }

        public init(): void {
            this.txt1.cacheAsBitmap = true;
            this.txt2.cacheAsBitmap = true;
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1 },1500).call(this.clearEffect,this);
        }

        private clearEffect(): void {
            egret.Tween.removeTweens(this);
        }
    }
}
