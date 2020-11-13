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

    // onLoad () {}

    isMask: boolean = true;
    start() {
        super.start()
        moosnow.form.applyClickAnim(this.btnClose, () => {
            Lite.ui.hideUIForm(UIForms.spForm, null)
        })
        moosnow.form.applyClickAnim(this.btnConfirm, () => {
            moosnow.platform.showVideo((res) => {
                if (res == moosnow.VIDEO_STATUS.END) {
                    Lite.data.addVideoSp()
                    Lite.ui.hideUIForm(UIForms.spForm, null)
                }
                else if (res == moosnow.VIDEO_STATUS.ERR) {
                    moosnow.form.showToast(moosnow.VIDEO_MSG.ERR)
                }
                else
                    moosnow.form.showToast(moosnow.VIDEO_MSG.NOTEND)
            })
        })
    }

    // update (dt) {}
}
