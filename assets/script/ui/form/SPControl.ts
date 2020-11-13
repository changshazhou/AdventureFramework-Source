// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import LayaNodeEvent from "../../../moosnowSdk/ui/laya/LayaNodeEvent";
import CutMask from "../../CutMask";
import Common from "../../utils/Common";
import EventType from "../../utils/EventType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SPControl extends cc.Component {

    @property(cc.Label)
    txtSp: cc.Label = null;

    @property(cc.Label)
    txtTime: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        moosnow.event.addListener(EventType.SP_NUM_CHANGED, this, (num) => {
            this.txtSp.string = num
        })
        this.txtSp.string = "" + Lite.data.getSpNum();

        let curTime = Lite.data.getSpTime();
        if (curTime == 0)
            curTime = Date.now();
        let maxTime = 1.5 * 60
        let useTime = 0;

        let val = Math.floor(parseInt("" + (curTime - Date.now()) / 1000 / maxTime));
        if (val > 0)
            Lite.data.addSp(val)

        this.schedule(() => {
            useTime++;
            this.txtTime.string = Common.secondToDate(maxTime - useTime)
            if (maxTime - useTime == 0) {
                useTime = 0
                Lite.data.addTimeSp();
            }
        }, 1)
    }


    // update (dt) {}
}
