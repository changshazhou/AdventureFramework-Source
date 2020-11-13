import { LevelCfg } from "../../../sheets/vo/LevelCfg";
import UIForms from "../../config/UIForms";
import CheckboxEx from "../../extends/CheckboxEx";
import UIForm from "../../framework/ui/UIForm";
import EventType from "../../utils/EventType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class videoForm extends UIForm {

    @property(cc.Node)
    winContainer: cc.Node = null;

    @property(cc.Node)
    failContainer: cc.Node = null;

    @property(cc.Node)
    checkboxContainer: cc.Node = null;

    @property(cc.Node)
    btnWinNext: cc.Node = null;

    @property(cc.Node)
    btnWinHome: cc.Node = null;


    @property(cc.Node)
    btnFailNext: cc.Node = null;

    @property(cc.Node)
    btnFailHome: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    isMask: boolean = true;

    willShow(e) {
        super.willShow(e);
        this.winContainer.active = e && e.isWin;
        this.failContainer.active = !this.winContainer.active;
        this.addListener();
        let cex = this.checkboxContainer.getComponent(CheckboxEx)
        cex.reset(true);
        // Lite.ui.pushUIForm(UIForms.ShareForm);
        moosnow.platform.stopRecord(() => {

        });
    }

    private addListener() {
        moosnow.form.applyClickAnim(this.btnWinNext, () => {
            let boxEx = this.checkboxContainer.getComponent(CheckboxEx);
            if (boxEx.getChecked()) {
                moosnow.platform.showVideo((res) => {
                    if (res == moosnow.VIDEO_STATUS.END) {
                        Lite.data.addVideoSp();
                        this.onGameNext();
                    }
                    else if (res == moosnow.VIDEO_STATUS.ERR) {
                        moosnow.form.showToast(moosnow.VIDEO_MSG.ERR)
                    }
                    else
                        moosnow.form.showToast(moosnow.VIDEO_MSG.NOTEND)
                })
            }
            else {
                this.on2Home();
            }

        })
        moosnow.form.applyClickAnim(this.btnWinHome, () => {
            this.on2Home();
        })


        moosnow.form.applyClickAnim(this.btnFailNext, () => {

            moosnow.platform.showVideo((res) => {
                if (res == moosnow.VIDEO_STATUS.END) {
                    this.on2NextLevel();
                    this.onGameNext();
                }
                else if (res == moosnow.VIDEO_STATUS.ERR) {
                    moosnow.form.showToast(moosnow.VIDEO_MSG.ERR)
                }
                else {
                    Lite.ui.pushUIForm(UIForms.videoForm, {
                        completed: () => {
                            this.on2NextLevel();
                            this.onGameNext();
                        }
                    }, () => {

                    })
                }
            })
        })
        moosnow.form.applyClickAnim(this.btnFailHome, () => {
            let boxEx = this.checkboxContainer.getComponent(CheckboxEx);
            if (boxEx.getChecked()) {
                moosnow.platform.showVideo((res) => {
                    if (res == moosnow.VIDEO_STATUS.END) {
                        Lite.data.addVideoSp();
                        this.on2Home();
                    }
                    else if (res == moosnow.VIDEO_STATUS.ERR) {
                        moosnow.form.showToast(moosnow.VIDEO_MSG.ERR)
                    }
                    else
                        moosnow.form.showToast(moosnow.VIDEO_MSG.NOTEND)
                })
            }
            else {
                this.on2Home();
            }
        })
    }


    private on2NextLevel() {
        Lite.data.setUserLevel(this.FormData.level, 0)
        if (this.FormData.level < LevelCfg.getAll().length)
            Lite.data.addCurrentLevel();
    }

    private onGameNext() {
        Lite.ui.hideUIForm(UIForms.GameForm, null)
        Lite.ui.hideUIForm(UIForms.EndForm, null)
        Lite.ui.pushUIForm(UIForms.HomeForm)
    }

    private on2Home() {
        moosnow.form.hideAd(() => { })
        moosnow.event.sendEventImmediately(EventType.CLEAR_ALL_MAP, null)
        Lite.ui.hideUIForm(UIForms.GameForm, null)
        Lite.ui.hideUIForm(UIForms.EndForm, null)
        Lite.ui.pushUIForm(UIForms.HomeForm)
    }


    willHide() {
        this.remoteListener()
    }


    private remoteListener() {
        moosnow.form.removeClickAnim(this.btnWinNext)
        moosnow.form.removeClickAnim(this.btnWinHome)
    }
    // update (dt) {}
}
