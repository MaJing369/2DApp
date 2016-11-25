module Core {
	/**
	 *
	 * @author 
	 *
	 */
    export class BaseSound 
	{
    	private _sound:egret.Sound;
        private _volume: number = 0.7;
        private _channel: egret.SoundChannel;
        private _isLoops:number;
        
        public play(soundName: string, loops:number): void
        {
            this._isLoops = loops;
            this._sound = RES.getRes(soundName);
            if(this._sound)
            {
                this.playSound();
            }else
            {
                this._sound = new egret.Sound();
                this._sound.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
                this._sound.load("resource/2D_music/" + soundName + ".mp3");
            }
        }
        
        private onLoadComplete(e:egret.Event):void
        {
            this._sound = <egret.Sound>e.target;
            this.playSound();
        }
        
        private playSound(): void
        {
            this._channel = this._sound.play(0,this._isLoops);
            this._channel.volume = this._volume;
        }
        
        /**
         * 设置音量
         * @param volume
         */
        public setVolume(volume: number): void
        {
            this._volume = volume;
            if(this._channel) this._channel.volume = volume;
        }
        
        public stop():void
        {
            this._channel.stop();
        }
	}
}
