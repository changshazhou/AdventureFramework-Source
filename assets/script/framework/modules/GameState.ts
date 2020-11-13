// import GameLogic from './GameLogic'
// import Logger from './utils/Logger';

// import EventType from './utils/EventType';
// import UIForms from './config/UIForms';
// import { GunInfo } from '../sheets/vo/GunInfo';
// import ArrayUtil from './utils/ArrayUtil';
// import Coin from './entity/Coin';

import BaseModule from './BaseModule';
import UIForms from '../../config/UIForms';
import EventType from '../../utils/EventType';
import { LevelCfg } from '../../../sheets/vo/LevelCfg';
import RoleControl from '../../entity/RoleControl';
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameState extends BaseModule {
    // public gameLogic: GameLogic = null;
    public gamePause: boolean = true;
    public gameStarted: boolean = false;
    public role: RoleControl = null;
    // public rootNode: Laya.Node = null;

    public isBoss: boolean = false;
    private mBeginTime: number = 0;


    // public coinList: Coin[] = [];


    // public respawnNum: number = 0;
    // public killNum: number = 0;
    // public playerComboNum: number = 0;
    // public playerComboMax: number = 0;
    // public killCoin: number = 0;
    // public comboCoin: number = 0;
    // public coinPirce: number = 0;

    // public isNew: boolean = false;
    // constructor() {
    //     super();
    //     this.gameLogic = new GameLogic();
    //     moosnow.event.addListener(EventType.GAME_BOSS, this, this.gameBoss);
    // }
    start() {
        Lite.myGame = this as GameState;

        moosnow.event.addListener(EventType.GAME_STATE_START, this, this.startGame);
        moosnow.event.addListener(EventType.GAME_STATE_OVER, this, this.gameOver);
        // moosnow.event.addListener(EventType.GAME_STATE_CANCEL, this, this.onGameCancel);
        // moosnow.event.addListener(EventType.GAME_STATE_END, this, this.endGame);
        moosnow.event.addListener(EventType.GAME_STATE_RESPAWN, this, this.respawn);
        moosnow.event.addListener(EventType.GAME_STATE_RESUME, this, this.resumeGame);
        moosnow.event.addListener(EventType.GAME_STATE_PAUSE, this, this.pauseGame);
        moosnow.event.addListener(EventType.GAME_STATE_NEXT, this, this.nextGame);
        // moosnow.event.addListener(EventType.GAME_STATE_REPLAY, this, this.replay);


        moosnow.event.addListener(moosnow.PLATFORM_EVENT.ON_PLATFORM_HIDE, this, (res) => {
            console.log('game state  ON_PLATFORM_HIDE ', res)
            Lite.audio.stopMusic();

        })
        moosnow.event.addListener(moosnow.PLATFORM_EVENT.ON_PLATFORM_SHOW, this, (res) => {
            console.log('game state  ON_PLATFORM_SHOW ', res)
            if (!moosnow.platform.videoPlaying)
                this.playBgMusic();
        })
    }

    // init(sence: Laya.Scene) {
    //     this.gameLogic.init(sence);
    //     this.rootNode = sence.getChildByName('root');
    // }
    // gameBoss() {
    //     this.isBoss = true;
    // }
    playBgMusic() {
        if (this.isBoss)
            Lite.audio.playBossMusic();
        else
            Lite.audio.playGameMusic();
    }
    startGame(level) {
        this.mBeginTime = Date.now();
        this.isBoss = false;
        Lite.audio.stopMusic();
        Lite.ui.hideUIForm(UIForms.HomeForm, null, () => {
            // Delay.delay(0.5).then(() => {
            this.playBgMusic();
            this.resumeGame();
            moosnow.platform.startRecord();
            this.gameStarted = true;

            console.log('游戏关卡 ', level)
            let gameForm = Lite.ui.getUIFrom(UIForms.GameForm);
            if (!gameForm)
                Lite.ui.pushUIForm(UIForms.GameForm, {
                    level,
                    beginTime: this.mBeginTime
                })
            // })
        })
        moosnow.http.startGame(level);
    }

    private onGameCancel() {
        Lite.ui.hideUIForm(UIForms.GameForm, null)
        Lite.ui.pushUIForm(UIForms.HomeForm)
    }
    onLevelReload() {
        this.resumeGame();
    }
    pauseGame() {
        this.gamePause = true;
        Lite.entity.pause();
        // this.touchNode.getComponent('touch').enabled = false;
    }
    resumeGame() {
        this.gamePause = false;
        Lite.entity.resume();
        // this.touchNode.getComponent('touch').enabled = true;
    }

    // //复活
    respawn() {
        Lite.audio.playRespawnEffect(() => {
            this.playBgMusic();
        });
        this.resumeGame();
    }

    replay(e) {
        // Lite.ui.hideUIForm(UIForms.GameForm, null, () => {

        // });
    }

    gameOver(e) {

        if (!this.gameStarted)
            return;
        this.pauseGame();
        this.gameStarted = false;
        Lite.audio.stopMusic();
        let level = Lite.data.getCurrentLevel();
        let t = Date.now() - this.mBeginTime;
        moosnow.http.endGame(e.level, e.isWin);
        if (e.isWin) {
            Lite.data.setUserLevel(e.level, t)
            if (e.level == level && e.level < LevelCfg.getAll().length)
                Lite.data.addCurrentLevel();
        }

        Lite.ui.pushUIForm(UIForms.EndForm, {
            isWin: e.isWin,
            level: e.level
        })
    }

    //结束
    endGame(isOpen: boolean) {
        if (!this.gameStarted) return;
        this.gameStarted = false;
        Lite.audio.stopMusic();
        Lite.ui.hideUIForm(UIForms.GameForm, null, () => {
            // this.gameLogic.endGame();
            Lite.ui.pushUIForm(UIForms.HomeForm, { isOpen });
        });
        // moosnow.http.playGame();
    }

    // vibrate(isLong: boolean = false) {
    //     if (!Lite.data.getVibrateSetting()) return;
    //     // let rootNode = this.rootNode as Laya.Sprite;
    //     // let v = isLong ? 10 : 5;
    //     // let t = 50;
    //     // let h = Laya.stage.height + v;
    //     // let w = Laya.stage.width + v;
    //     // rootNode.pos(0, 0);
    //     // timeline.reset();
    //     // timeline.to(rootNode, { x: -v, y: -v }, t)
    //     //     .to(rootNode, { x: -v, y: v }, t)
    //     //     .to(rootNode, { x: v, y: -v }, t)
    //     //     .to(rootNode, { x: v, y: v }, t)
    //     //     .to(rootNode, { x: 0, y: 0 }, t);
    //     // timeline.play();
    //     if (isLong)
    //         Lite.platform.vibrateLong();
    //     else
    //         Lite.platform.vibrateShort();
    // }
    // getGameCoin() {
    //     return Math.floor((this.killCoin + this.comboCoin) * this.coinPirce * parseFloat(Lite.config.coinPricePr));
    // }
    // triggerGameCoinChange() {
    //     let coin = this.getGameCoin();
    //     moosnow.event.sendEventImmediately(EventType.GAME_COIN_CHANGED, coin);
    // }
    // getCoin(num) {
    //     this.killCoin += num;
    //     this.triggerGameCoinChange();
    // }
    // removeCoin(coin: Coin) {
    //     ArrayUtil.remove(this.coinList, coin);
    //     Lite.entity.hideEntity(coin, null);
    // }

    nextGame(isOpen: boolean) {
        if (this.gameStarted) return;
        this.gameStarted = true;
        this.resumeGame();
        this.playBgMusic();
        let lv = Lite.data.getCurrentLevel();
        this.mBeginTime = Date.now();
        let gameForm = Lite.ui.getUIFrom(UIForms.GameForm);
        if (!gameForm)
            Lite.ui.pushUIForm(UIForms.GameForm, {
                lvIndex: lv,
                beginTime: this.mBeginTime
            })
    }
}