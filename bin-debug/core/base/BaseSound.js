var Core;
(function (Core) {
    /**
     *
     * @author
     *
     */
    var BaseSound = (function () {
        function BaseSound() {
            this._volume = 0.7;
        }
        var d = __define,c=BaseSound,p=c.prototype;
        p.play = function (soundName, loops) {
            this._isLoops = loops;
            this._sound = RES.getRes(soundName);
            if (this._sound) {
                this.playSound();
            }
            else {
                this._sound = new egret.Sound();
                this._sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                this._sound.load("resource/2D_music/" + soundName + ".mp3");
            }
        };
        p.onLoadComplete = function (e) {
            this._sound = e.target;
            this.playSound();
        };
        p.playSound = function () {
            this._channel = this._sound.play(0, this._isLoops);
            this._channel.volume = this._volume;
        };
        /**
         * 设置音量
         * @param volume
         */
        p.setVolume = function (volume) {
            this._volume = volume;
            if (this._channel)
                this._channel.volume = volume;
        };
        p.stop = function () {
            this._channel.stop();
        };
        return BaseSound;
    }());
    Core.BaseSound = BaseSound;
    egret.registerClass(BaseSound,'Core.BaseSound');
})(Core || (Core = {}));
//# sourceMappingURL=BaseSound.js.map