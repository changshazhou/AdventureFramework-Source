import BaseModule from './BaseModule'
import EventType from '../../utils/EventType';
const { ccclass, property } = cc._decorator;




@ccclass
export default class AudioModule extends BaseModule {
    constructor() {
        super();
        this.getSave();
    }

    @property({
        type: cc.AudioClip
    })
    gameMusic: cc.AudioClip = null;

    @property({
        type: cc.AudioClip
    })
    btnSound: cc.AudioClip = null;


    @property({
        type: cc.AudioClip
    })
    menuMusic: cc.AudioClip = null;

    @property({
        type: cc.AudioClip
    })
    rainSound: cc.AudioClip = null;

    @property({
        type: cc.AudioClip
    })
    cutSound: cc.AudioClip = null;


    @property({
        type: cc.AudioClip
    })
    shutter: cc.AudioClip = null;


    @property({
        type: cc.AudioClip
    })
    win: cc.AudioClip = null;


    @property({
        type: cc.AudioClip
    })
    fail: cc.AudioClip = null;

    public playRespawnEffect(complete?) {
        if (complete)
            complete()
        // this.playSound("res/audio/respawn.mp3", false, complete);
    }

    /**
     * 存储在本地声音有关的设置key（字段字符串）
     * IS_MUTE 是否所有都静音{boolean}
     * IS_MUTE_MUSIC 是否背景音乐静音{boolean}
     * IS_MUTE_SOUND 是否音效静音{boolean}
     * VOLUME_MUSIC 背景音乐音量大小{number}
     * VOLUME_SOUND 音效音量大小{number}
    */
    private IS_MUTE: string = "isMute"
    private IS_MUTE_MUSIC: string = "isMuteMusic"
    private IS_MUTE_SOUND: string = "isMuteSound"
    private VOLUME_MUSIC: string = "volumeMusic"
    private VOLUME_SOUND: string = "volumeSound"
    private _volumeMusic: number = 1
    private _volumeSound: number = 1
    private _isMuteMusic: boolean = false
    private _isMuteSound: boolean = false
    private _isMute: boolean = false

    private gameCoinTime: number = 0;
    public onEnable() {

    }
    start() {
        Lite.audio = this;
        moosnow.audio.btnSound = this.btnSound;
    }
    private mMusicId: number = null;
    public get MusicId() {
        return this.mMusicId
    }
    public playGameMusic() {
        this.mMusicId = this.playMusic(this.gameMusic);

    }
    public playMainMusic() {
        this.mMusicId = this.playMusic(this.gameMusic);
    }
    public playBossMusic() {
        this.mMusicId = this.playMusic(this.gameMusic);
    }

    public playClickEffect() {
        this.playSound(this.btnSound);
    }

    private rainId: number
    public playRainEffect() {
        this.rainId = this.playSound(this.rainSound, true);
    }

    public stopRainEffect() {
        if (this.rainId)
            this.stopSound(this.rainId);
    }

    public playCutEffect() {
        this.playSound(this.cutSound, false);
    }


    public playShutter() {
        this.playSound(this.shutter);
    }

    public playWin() {
        this.playSound(this.win);
    }

    public playFail() {
        this.playSound(this.fail);
    }

    /**
     * 关闭所有音乐
     */
    public stopAll() {
        //Laya.SoundManager.stopAll();
    }

    /**
     * 关闭所有音效
     */
    public stopSound(musicId) {
        cc.audioEngine.stop(musicId)
    }

    /**
     * 关闭所有背景音效
     */
    public stopMusic() {
        if (!isNaN(this.mMusicId))
            cc.audioEngine.stop(this.mMusicId)
        // cc.audioEngine.stopMusic()
    }

    /**
     * 关闭单个音效
     * @param 音乐地址
    
    ic stopSound(url: string) {
    //Laya.SoundManager.stopSound(url);
    }

    /**
     * 播放音效
     */
    public playSound(audioClip: cc.AudioClip, loops: boolean = false, complete = null, soundClass = null, startTime = 0) {
        if (this.isMute)
            return
        let soundId = cc.audioEngine.playEffect(audioClip, loops);
        cc.audioEngine.setFinishCallback(soundId, (res) => {
            if (complete) {
                complete(res);
            }
            if (!loops) {
                //cc.audioEngine.getState(soundId)==cc.audioEngine.AudioState.PLAYING
                cc.audioEngine.stop(soundId);
            }
        })

        return soundId
    }




    public playMusic(audioClip: cc.AudioClip, loops: boolean = true, complete = null, startTime = 0) {
        if (this.isMute)
            return
        let soundId = cc.audioEngine.playMusic(audioClip, loops);
        return soundId
    }


    /**
     * 设置获取背景声音大小
     */
    get volumeMusic() {
        return this._volumeMusic;
    }
    set volumeMusic(value: number) {
        this._volumeMusic = value;
        //Laya.SoundManager.setMusicVolume(value);
        this.save();
    }

    /**
     * 设置获取音效声音大小
     */

    get volumeSound() {
        return this._volumeSound;
    }
    set volumeSound(value) {
        this._volumeSound = value;
        //Laya.SoundManager.setSoundVolume(value);
        this.save();
    }

    /**
     * 设置获取是否静音背景音乐
    */
    get isMuteMusic() {
        return this._isMuteMusic;
    }
    set isMuteMusic(value) {
        this._isMuteMusic = value;
        //Laya.SoundManager.musicMuted = value;
        this.save();
    }

    /**
     * 设置获取是否静音音效音乐
    */
    get isMuteSound() {
        return this._isMuteSound;
    }
    set isMuteSound(value) {
        this._isMuteSound = value;
        //Laya.SoundManager.soundMuted = value;
        this.save();
    }

    /**
     * 设置获取是否所有静音
    */
    get isMute() {
        return this._isMute;
    }
    set isMute(value) {
        this._isMute = value;
        this.save();
    }

    /**
     * 保存数据到本地
    */
    save() {

        cc.sys.localStorage.setItem(this.IS_MUTE, "" + this.isMute);
        cc.sys.localStorage.setItem(this.IS_MUTE_MUSIC, "" + this.isMuteMusic);
        cc.sys.localStorage.setItem(this.IS_MUTE_SOUND, "" + this.isMuteSound);
        // cc.sys.localStorage.setItem(this.VOLUME_MUSIC, "" + this.volumeMusic);
        // cc.sys.localStorage.setItem(this.VOLUME_SOUND, "" + this.volumeSound);
    }
    getSave() {
        this.isMute = cc.sys.localStorage.getItem(this.IS_MUTE) == "true" ? true : false;
        this.isMuteMusic = cc.sys.localStorage.getItem(this.IS_MUTE_MUSIC) == "true" ? true : false;
        this.isMuteSound = cc.sys.localStorage.getItem(this.IS_MUTE_SOUND) == "true" ? true : false;
        // this.isMute = cc.sys.localStorage.getItem(this.IS_MUTE) == "true" ? true : false;
        // this.isMute = cc.sys.localStorage.getItem(this.IS_MUTE) == "true" ? true : false;
    }

    onDisable() {

    }
}