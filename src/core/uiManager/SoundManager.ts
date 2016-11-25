module Core {
	/**
	 *
	 * @author 
	 *
	 */
	export class SoundManager extends BaseSingleton
	{
    	private _bgSound:Core.BaseSound;
    	private _effectSound:Core.BaseSound;
		public constructor() 
		{
    		super();
    		this._bgSound = new Core.BaseSound();
    		this._effectSound = new Core.BaseSound();
		}
		
		public playBgSound(soundId:string):void
		{
    		this._bgSound.play(soundId,0);
		}
		
		public stopBgSound():void
		{
    		this._bgSound.stop();
		}
		
        public setBgSoundVolume(volume:number):void
		{
    		this._bgSound.setVolume(volume)
		}
		
        public playeffectSound(soundId: string): void
        {
            this._effectSound.play(soundId,1);
        }

        public stopeffectSound(): void
        {
            this._effectSound.stop();
        }

        public seteffectSoundVolume(volume: number): void
        {
            this._effectSound.setVolume(volume)
        }
	}
}
