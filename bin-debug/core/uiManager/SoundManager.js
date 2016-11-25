var Core;
(function (Core) {
    /**
     *
     * @author
     *
     */
    var SoundManager = (function (_super) {
        __extends(SoundManager, _super);
        function SoundManager() {
            _super.call(this);
            this._bgSound = new Core.BaseSound();
            this._effectSound = new Core.BaseSound();
        }
        var d = __define,c=SoundManager,p=c.prototype;
        p.playBgSound = function (soundId) {
            this._bgSound.play(soundId, 0);
        };
        p.stopBgSound = function () {
            this._bgSound.stop();
        };
        p.setBgSoundVolume = function (volume) {
            this._bgSound.setVolume(volume);
        };
        p.playeffectSound = function (soundId) {
            this._effectSound.play(soundId, 1);
        };
        p.stopeffectSound = function () {
            this._effectSound.stop();
        };
        p.seteffectSoundVolume = function (volume) {
            this._effectSound.setVolume(volume);
        };
        return SoundManager;
    }(Core.BaseSingleton));
    Core.SoundManager = SoundManager;
    egret.registerClass(SoundManager,'Core.SoundManager');
})(Core || (Core = {}));
//# sourceMappingURL=SoundManager.js.map