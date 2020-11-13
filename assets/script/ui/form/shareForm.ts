// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import UIForms from "../../config/UIForms";
import UIForm from "../../framework/ui/UIForm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class spForm extends UIForm {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    btnConfirm: cc.Node = null;

    @property(cc.Label)
    txtSp: cc.Label = null;

    @property(cc.Node)
    btnNo: cc.Node = null;
    // onLoad () {}

    isMask: boolean = true
    start() {
        super.start();
        moosnow.form.applyClickAnim(this.btnClose, () => {
            Lite.ui.hideUIForm(UIForms.ShareForm, null)
        })
        moosnow.form.applyClickAnim(this.btnNo, () => {
            Lite.ui.hideUIForm(UIForms.ShareForm, null)
        })
        moosnow.form.applyClickAnim(this.btnConfirm, () => {
            let isShort = false;
            moosnow.platform.share({
                channel: moosnow.SHARE_CHANNEL.VIDEO
            }, (shared) => {
                if (shared) {
                    Lite.data.addSp(2);
                    Lite.ui.hideUIForm(UIForms.ShareForm, null)
                }
                else {
                    if (!isShort) {
                        Lite.ui.showToast("分享失败")
                    }
                }
            }, () => {
                isShort = true;
                Lite.ui.showToast("录屏时间太短，无法分享")
            })
        })
    }

    // update (dt) {}
}
