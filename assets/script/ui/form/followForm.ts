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
import EventType from "../../utils/EventType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class followForm extends UIForm {

    @property(cc.Node)
    btnFollow: cc.Node = null;

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.EditBox)
    txtKey: cc.EditBox = null;

    @property(cc.Node)
    btnCopy: cc.Node = null;

    isMask: boolean = true;

    private changeKey = "rHtvizC7b2"
    start() {
        super.start();
        this.btnFollow.on(cc.Node.EventType.TOUCH_END, () => {
            if (this.changeKey == this.txtKey.string.trim()) {
                Lite.data.addChangeTag();
                Lite.data.addFollowSp();
                Lite.ui.hideUIForm(UIForms.FollowForm, null, () => {
                    Lite.ui.showToast("兑换成功");
                    moosnow.event.sendEventImmediately(EventType.FOLLOW_CHANGED, null);
                })
            }
            else {
                Lite.ui.showToast("兑换码错误")
            }
        }, this)

        this.btnClose.on(cc.Node.EventType.TOUCH_END, () => {
            Lite.ui.hideUIForm(UIForms.FollowForm, null)
        }, this)

        this.btnCopy.on(cc.Node.EventType.TOUCH_END, () => {
            moosnow.platform.setClipboardData("dysb0x4d3xhz", () => {
                Lite.ui.showToast("复制成功")
            }, () => {

            })
        }, this)

    }
    onShow() {
        this.txtKey.string = "";
    }
}
