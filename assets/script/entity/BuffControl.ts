// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { BUFFER } from "../enum/BUFFER";
import EntityLogic from "../framework/entity/EntityLogic";
import DeployItem from "../model/DeployItem";
import MathUtils from "../utils/MathUtils";
import BaseControl from "./BaseControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuffControl extends BaseControl {


    private interval: number = 0;
    private time: number = 0;
    private num: number = 1
    private buffer: BUFFER = BUFFER.NONE;
    private speed: number = 10

    private mapping = {
        0: BUFFER.HEAL,
        1: BUFFER.QUICKEN,
        2: BUFFER.ZOOMIN,
        3: BUFFER.MAGNET,
        4: BUFFER.UNRIVALLED,
        5: BUFFER.REDUCEHEALTH,
        6: BUFFER.SLOWDOWN,
        7: BUFFER.ZOOMOUT,
        8: BUFFER.HITRECOVER,
        9: BUFFER.COIN
    }

    willShow(data) {
        super.willShow(data);
    }

    onShow(data: DeployItem) {
        if (this.mapping[data.attribute.props_type])
            this.buffer = this.mapping[data.attribute.props_type];

        if (this.buffer == BUFFER.HEAL) {
            this.num = parseFloat("" + data.attribute.hp_num)
            this.time = 0;
        }
        else if (this.buffer == BUFFER.QUICKEN) {
            this.num = parseFloat("" + data.attribute.move_speed_percentage)
            this.time = 5;
        }
        else if (this.buffer == BUFFER.ZOOMIN) {
            this.num = parseFloat("" + data.attribute.amplification)
            this.time = 5;
        }
        else if (this.buffer == BUFFER.MAGNET) {
            this.num = parseFloat("" + data.attribute.adsorption_range)
            this.time = 5;
        }
        else if (this.buffer == BUFFER.UNRIVALLED) {
            this.num = parseFloat("" + data.attribute.invincible_time)
            this.time = parseFloat("" + data.attribute.invincible_time)
        }
        else if (this.buffer == BUFFER.SLOWDOWN) {
            this.num = parseFloat("" + data.attribute.move_speed_percentage)
            this.time = 5;
        }
        else if (this.buffer == BUFFER.ZOOMOUT) {
            this.num = parseFloat("" + data.attribute.amplification)
            this.time = 5;
        }
        else if (this.buffer == BUFFER.HITRECOVER) {
            this.num = 0
            this.time = parseFloat("" + data.attribute.hard_straight_time)
        }
        else if (this.buffer == BUFFER.COIN) {
            this.num = parseFloat("" + data.attribute.gold_num)
            this.time = 0;
        }
    }

    onFwUpdate(dt) {
        if (!Lite.myGame.role) return;
        if (MathUtils.getDistance(Lite.myGame.role.node.position, this.node.position) <= this.node.width / 2 + Lite.myGame.node.width / 2) {
            Lite.entity.hideEntity(this, null);
            Lite.myGame.role.addBuffer(this.buffer, this.time, this.interval, this.num)
        }
        if (Lite.myGame.role.hasBuffer(BUFFER.MAGNET)) {
            let rolePos = Lite.myGame.role.node.position.clone();
            let moveSpeed = rolePos.sub(this.node.position.clone()).normalize().scale(cc.v3(this.speed, this.speed, this.speed))
            this.node.x += moveSpeed.x
            this.node.y += moveSpeed.y
        }
    }

}
