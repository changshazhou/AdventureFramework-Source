import UIForms from "./config/UIForms";
import EventType from "./utils/EventType";
import Common from "./utils/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainView extends cc.Component {

    @property(cc.Sprite)
    background: cc.Sprite = null;

    @property(cc.SpriteFrame)
    bg1: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    bg2: cc.SpriteFrame = null;

    start() {


        moosnow.http.finishLoading();


        moosnow.form.loadAd({
            hideForm: true,
            floatPositon: [{
                x: -587,
                y: -79.179
            }, {
                x: -432.657,
                y: 216.489
            }, {
                x: 301.871,
                y: 230.94
            }, {
                x: 598.547,
                y: 262.282
            }],
            floatTempletes: ["floatAdItem1", "floatAdItem2", "floatAdItem1", "floatAdItem3"],
            callback: () => {


            }
        });
        Lite.ui.pushUIForm(UIForms.HomeForm, null, () => {

        });
        moosnow.platform.reportMonitor();
        // moosnow.ui.pushUIForm(UIForms.SkinForm)
    }

    private showPrize() {
        if (moosnow.APP_PLATFORM.BYTEDANCE == moosnow.getAppPlatform()) {
            if (Lite.data.getCurrentLevel() > 1) {
                Lite.ui.pushUIForm(UIForms.PrizeForm, null)
            }
        }
    }

    private changeBg() {
        let bgArr = [this.bg1, this.bg2];
        this.background.spriteFrame = bgArr[Math.random() > 0.5 ? 0 : 1];
        // this.showPrize();
    }
}

