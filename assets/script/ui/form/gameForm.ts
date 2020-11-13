import UIForm from "../../framework/ui/UIForm";
import EventType from "../../utils/EventType";
import Entitys from "../../config/Entitys";
import { LevelCfg } from "../../../sheets/vo/LevelCfg";
import UIForms from "../../config/UIForms";
import MapControl from "../../entity/MapControl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class gameForm extends UIForm {


    @property(cc.Node)
    btnReplay: cc.Node = null

    @property(cc.Node)
    btnPause: cc.Node = null

    @property(cc.Node)
    txtLevel: cc.Node = null

    @property(cc.Node)
    mapNode: cc.Node = null

    @property(cc.Node)
    bgNode: cc.Node = null

    @property(cc.ProgressBar)
    hpBar: cc.ProgressBar = null

    @property(cc.Label)
    hpTxt: cc.Label = null


    private mMapControl: MapControl;

    start() {

        this.bgNode.width = cc.winSize.width;
        this.bgNode.height = cc.winSize.height;
        this.bgNode.children.forEach(item => {
            item.width = cc.winSize.width;
        })

    }

    private addListener() {

        moosnow.event.addListener(EventType.GAME_STATE_OVER, this, this.onGameOver)
        moosnow.event.addListener(EventType.ROLE_HP_CHANGED, this, this.onChangeHP)
        moosnow.form.applyClickAnim(this.btnPause, () => {
            this.onPause();
        })
        moosnow.form.applyClickAnim(this.btnReplay, () => {
            this.onReplay();
        });
    }

    private removeListener() {
        moosnow.event.removeListener(EventType.GAME_STATE_OVER, this)
        moosnow.event.removeListener(EventType.ROLE_HP_CHANGED, this)
        moosnow.form.removeClickAnim(this.btnPause)
        moosnow.form.removeClickAnim(this.btnReplay);
    }



    private onChangeHP(e) {
        this.hpBar.progress = e.hp / e.max;
        this.hpTxt.string = `${e.hp}/${e.max}`
    }

    private displayLevel(lvIndex) {
        return;
        // this.levelTxt.getComponent(cc.Label).string = `第${lvIndex + 1}关`;
    }
    private onPause() {
        // moosnow.form.showAd(moosnow.AD_POSITION.EXPORT | moosnow.AD_POSITION.MASK, () => { }, null, null, cc.macro.MAX_ZINDEX - 1)
        moosnow.event.sendEventImmediately(EventType.GAME_STATE_PAUSE, null);
        moosnow.form.showPause({
            zIndex: cc.macro.MAX_ZINDEX,
            hideForm: true,
            callback: () => {
                if (Lite.myGame.gameStarted) {
                    moosnow.form.hideAd(() => { })
                    moosnow.event.sendEventImmediately(EventType.GAME_STATE_RESUME, null);
                    moosnow.platform.resumeRecord();
                }
            },
            replayCallback: () => {
                if (Lite.myGame.gameStarted) {
                    moosnow.form.hideAd(() => { })
                    moosnow.event.sendEventImmediately(EventType.GAME_STATE_RESUME, null);
                    moosnow.platform.stopRecord(() => {

                    });
                    this.onGameOver();
                    this.loadLevel(this.mCurrentLevel);
                    moosnow.event.sendEventImmediately(EventType.REPLAY_LEVEL, this.FormData);
                }
            },
            homeCallback: () => {
                if (Lite.myGame.gameStarted) {
                    moosnow.form.hideAd(() => { });
                    moosnow.event.sendEventImmediately(EventType.GAME_STATE_OVER, { isWin: false, level: this.FormData.level })
                }

            }
        });

    }
    private onReplay() {
        moosnow.platform.showVideo(res => {
            if (res == moosnow.VIDEO_STATUS.END) {
                moosnow.event.sendEventImmediately(EventType.GAME_STATE_OVER, { isWin: true, level: this.mCurrentLevel })
            }
            else if (res == moosnow.VIDEO_STATUS.ERR) {
                moosnow.form.showToast(moosnow.VIDEO_MSG.ERR)
            }
            else
                moosnow.form.showToast(moosnow.VIDEO_MSG.NOTEND)
        })
    }

    update(dt) {
        // this.mTotalTime += (dt * 1000);
        // let minutes = Math.floor((this.mTotalTime - this.mBeginTime) / 1000 / 60);
        // let seconds = parseInt("" + ((this.mTotalTime - this.mBeginTime) / 1000) % 60);
        // this.timeTxt.string = `${Common.formatNumber(minutes)}:${Common.formatNumber(seconds)}`
        // this.showStar(this.mTotalTime - this.mBeginTime);

        // this.recalcResults();
    }

    private onGameOver() {
        Lite.audio.stopRainEffect();
    }
    /**
     * 显示的游戏关卡 从0 开始
     */
    private mCurrentLevel: number = 0;
    /**
     * 真实的游戏关卡
     */
    private mGameLevel: number = 0;
    willShow(data) {
        super.willShow(data);
        this.addListener();
        let levelNum = LevelCfg.getAll().length;
        if (data.level > levelNum)
            this.mCurrentLevel = levelNum;
        else
            this.mCurrentLevel = data.level;
        this.btnPause.active = true;
        let lvCfg = LevelCfg.get(this.mCurrentLevel) as LevelCfg;
        moosnow.nodeHelper.changeText(this.txtLevel, "" + this.mCurrentLevel)
        this.mMapControl = this.mapNode.getComponent(MapControl)
    }


    onShow() {
        this.loadLevel(this.mCurrentLevel);
        this.displayLevel(this.mCurrentLevel)
        // moosnow.form.showAd(moosnow.AD_POSITION.LEFTRIGHT, () => { })
    }



    private loadLevel(level: number) {
        this.mMapControl.loadMap(level, false, () => {

        })
    }

    public willHide() {
        this.removeListener();
    }
}
