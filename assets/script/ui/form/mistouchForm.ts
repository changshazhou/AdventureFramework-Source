import UIForms from "../../../script/config/UIForms";
import UIForm from "../../../script/framework/ui/UIForm";
import Common from "../../../script/utils/Common";
import EventType from "../../utils/EventType";



const { ccclass, property } = cc._decorator;

@ccclass
export default class MistouchForm extends UIForm {

    @property(cc.ProgressBar)
    clickProgress: cc.ProgressBar = null;

    @property(cc.Node)
    btnJump: cc.Node = null;

    @property(cc.Node)
    logo: cc.Node = null;

    @property(cc.Node)
    btnVideoJump: cc.Node = null;

    isMask: boolean = true

    private mMaxNum: number = 10;
    private mCurrentNum: number = 0;
    private mNavigateIndex: number = 0;
    private mBannerShow: boolean = false;
    private mShowTime: number = 0;

    private mBeginPos: cc.Vec2;
    private mEndPos: cc.Vec2;

    private mBannerClickType = 2

    private LogicData;
    willShow(data) {

        this.btnJump.active = true;

        this.LogicData = data;

        this.mBeginPos = this.logo.position.clone();
        this.mEndPos = this.mBeginPos.add(new cc.Vec2(0, 50));

        this.mCurrentNum = 0;
        this.mNavigateIndex = Common.randomNumBoth(3, this.mMaxNum - 2);
        this.addEvent();
        this.schedule(this.subProgress, 0.1)

        this.mBannerShow = false;

        // moosnow.http.getAllConfig(res => {
        //     // this.mBannerClickType = res.bannerClickType
        //     this.mBannerClickType = 2
        // })

    }
    willHide() {
        this.unschedule(this.subProgress)
        this.unschedule(this.resetProgress)
        this.removeEvent();

    }

    private subProgress() {
        if (this.mCurrentNum > 0)
            this.mCurrentNum -= 0.1
    }
    private addEvent() {
        this.btnJump.on(cc.Node.EventType.TOUCH_START, this.onLogoUp, this)
        this.btnJump.on(cc.Node.EventType.TOUCH_END, this.onJump, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.stopPropagation, this)
        // moosnow.event.addListener(moosnow.PLATFORM_EVENT.ON_PLATFORM_HIDE, this, () => {
        //     Lite.ui.destroyUIForm(UIForms.MistouchForm, null)
        //     moosnow.platform.hideBanner();
        //     moosnow.event.sendEventImmediately(EventType.GAME_STATE_START, this.LogicData.level);
        // });
    }


    private bannerClickCallback(isOpend) {
        if (isOpend) {
            this.unschedule(this.onHideBanner)
            this.unschedule(this.resetProgress)
            moosnow.platform.hideBanner();
            this.mBannerShow = false;
            Lite.ui.destroyUIForm(UIForms.MistouchForm, null)
            moosnow.event.sendEventImmediately(EventType.GAME_STATE_START, this.LogicData.level);

        }
    }


    private removeEvent() {
        this.btnJump.off(cc.Node.EventType.TOUCH_END, this.onJump, this)
        this.node.off(cc.Node.EventType.TOUCH_END, this.stopPropagation, this)
        moosnow.event.removeListener(moosnow.PLATFORM_EVENT.ON_PLATFORM_HIDE, this);
    }

    private stopPropagation(e: cc.Event.EventTouch) {
        e.stopPropagation();
    }
    private onLogoUp() {
        this.logo.position = this.mEndPos;
    }
    private onLogoDown() {
        this.logo.position = this.mBeginPos;
    }


    private onJump() {
        this.onLogoDown();

        this.mCurrentNum += 1;

        if (this.mCurrentNum >= this.mNavigateIndex) {
            if (!this.mBannerShow) {
                this.mShowTime = Date.now();
                this.mBannerShow = true;
                // moosnow.platform.showVideo(res => {
                //     Lite.ui.destroyUIForm(UIForms.MistouchForm, null);
                //     moosnow.platform.hideBanner();
                //     moosnow.event.sendEventImmediately(EventType.GAME_STATE_START, this.LogicData.level);
                // })

                moosnow.platform.showBanner(true, (e) => {
                    console.log('banner click callback ', e)
                    this.bannerClickCallback(e);
                });
                if (this.mBannerClickType == 1) {
                    this.unschedule(this.onHideBanner)
                    this.scheduleOnce(this.onHideBanner, 2)
                }
                else if (this.mBannerClickType == 2) {
                    this.unschedule(this.resetProgress)
                    this.scheduleOnce(this.resetProgress, 2)
                }

            }
        }
        if (this.mCurrentNum >= this.mMaxNum) {
            moosnow.platform.hideBanner();
            this.mBannerShow = false;
            Lite.ui.destroyUIForm(UIForms.MistouchForm, null)
            if ((this.LogicData.level) <= Lite.data.getCurrentLevel()) {
                Lite.ui.destroyUIForm(UIForms.MistouchForm, null)

                moosnow.event.sendEventImmediately(EventType.GAME_STATE_START, this.LogicData.level);
                console.log('onOpendLevel', this.LogicData.level)
            }
        }
    }

    private resetProgress() {
        this.mCurrentNum = 0;
        moosnow.platform.hideBanner();
        this.mBannerShow = false;
    }

    private onHideBanner() {
        moosnow.platform.hideBanner();
    }

    update() {
        this.clickProgress.progress = this.mCurrentNum / this.mMaxNum
    }

}
