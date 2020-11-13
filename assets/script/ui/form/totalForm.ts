import UIForm from "../../framework/ui/UIForm";
import { LevelCfg } from "../../../sheets/vo/LevelCfg";
import Common from "../../utils/Common";
import UIForms from "../../config/UIForms";
import Entitys from "../../config/Entitys";


const { ccclass, property } = cc._decorator;

@ccclass
export default class totalForm extends UIForm {

    @property(cc.Sprite)
    checked: cc.Sprite = null;

    @property(cc.Sprite)
    unchecked: cc.Sprite = null;


    @property(cc.Sprite)
    btnReceive: cc.Sprite = null;


    @property(cc.Label)
    levelCoin: cc.Label = null;
    public isMask: boolean = true;

    private mCheckedVideo: boolean = true;

    public addEvent() {
        this.unchecked.node.on(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)
    }
    public removeEvent() {
        this.unchecked.node.off(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.off(cc.Node.EventType.TOUCH_END, this.onReceive, this)
    }

    private onReceive() {
        if (this.mCheckedVideo) {
            moosnow.platform.showVideo(res => {
                if (res == moosnow.VIDEO_STATUS.END) {
                    this.openEnd(this.mLevelCoinNum * 5)
                }
                else if (res == moosnow.VIDEO_STATUS.ERR) {
                    Lite.ui.showToast(moosnow.VIDEO_MSG.ERR)
                }
                else {
                    Lite.ui.showToast(moosnow.VIDEO_MSG.NOTEND)
                }
            })
        }
        else {
            this.openEnd(this.mLevelCoinNum)
        }
    }


    private openEnd(coin: number) {
        Lite.ui.hideUIForm(UIForms.TotalForm, null)
        Lite.ui.pushUIForm(UIForms.EndForm, { coin, level: this.FormData.level, levelShareCoinNum: this.mLevelShareCoinNum, ...this.FormData })
    }

    private onShareChange() {
        this.mCheckedVideo = !this.mCheckedVideo;
        this.showBtn();

    }

    private showBtn() {
        if (this.mCheckedVideo) {
            this.checked.node.active = true;
        }
        else {
            this.checked.node.active = false;
        }
    }

    public mLevelCoinNum: number = 0;
    public mLevelShareCoinNum: number = 0;
    onShow(data) {
        let lvCfg = LevelCfg.get((this.FormData.level) + 1) as LevelCfg;
        this.mLevelCoinNum = lvCfg.coin;
        this.mLevelShareCoinNum = lvCfg.shareCoin
        this.levelCoin.string = `${Common.formatMoney(this.mLevelCoinNum)}`
        this.addEvent();
        this.showBtn();
        this.mCheckedVideo = true;
        this.showBtn();
        moosnow.platform.stopRecord();
        moosnow.platform.showBanner(false);
       
    }

    willHide() {
        this.removeEvent();
        moosnow.platform.hideBanner();
    }



    // update (dt) {}
}
