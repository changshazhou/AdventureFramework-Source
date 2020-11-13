// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CheckboxEx extends cc.Component {

    @property(cc.Node)
    checked: cc.Node = null;

    @property(cc.Node)
    unchecked: cc.Node = null;

    @property(cc.Label)
    text: cc.Label = null;


    public reset(checked: boolean, msg?: string) {
        this.checked.active = checked;
        if (msg)
            this.text.string = msg;
    }

    public getChecked() {
        return this.checked.active
    }


    start() {
        moosnow.form.applyClickAnim(this.unchecked, () => {
            if (this.checked.active) {
                moosnow.http.getAllConfig(res => {
                    if (res && res.checkBoxMistouch > 0) {
                        moosnow.platform.showVideo((res) => {
                            if (res == moosnow.VIDEO_STATUS.END) {
                                Lite.data.addVideoSp();
                            }
                            else if (res == moosnow.VIDEO_STATUS.ERR)
                                moosnow.form.showToast(moosnow.VIDEO_MSG.ERR)
                            else {
                                moosnow.form.showToast(moosnow.VIDEO_MSG.NOTEND)
                            }
                        })
                    }
                })
            }

            this.checked.active = !this.checked.active;
        })
    }



    // update (dt) {}
}
