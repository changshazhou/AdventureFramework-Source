// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { ROLE_ATTACK } from "../enum/ROLE_ATTACK";
import EventType from "../utils/EventType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ActionControl extends cc.Component {

    @property(cc.Node)
    btnLeft: cc.Node = null;

    @property(cc.Node)
    btnRight: cc.Node = null;

    @property(cc.Node)
    btnJump: cc.Node = null;

    @property(cc.Node)
    btnAttack1: cc.Node = null;

    @property(cc.Node)
    btnAttack2: cc.Node = null;

    @property(cc.Node)
    btnAttack3: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.btnAttack1.on(cc.Node.EventType.TOUCH_START, this.onAttack1, this)
        this.btnAttack2.on(cc.Node.EventType.TOUCH_START, this.onAttack2, this)
        this.btnAttack3.on(cc.Node.EventType.TOUCH_START, this.onAttack3, this)
        this.btnJump.on(cc.Node.EventType.TOUCH_START, this.onJump, this)

        this.btnLeft.on(cc.Node.EventType.TOUCH_START, this.onLeft, this)
        this.btnLeft.on(cc.Node.EventType.TOUCH_END, this.onStop, this)
        this.btnLeft.on(cc.Node.EventType.TOUCH_MOVE, this.onLeft, this)
        this.btnLeft.on(cc.Node.EventType.TOUCH_CANCEL, this.onStop, this)

        this.btnRight.on(cc.Node.EventType.TOUCH_START, this.onRight, this)
        this.btnRight.on(cc.Node.EventType.TOUCH_END, this.onStop, this)
        this.btnRight.on(cc.Node.EventType.TOUCH_MOVE, this.onRight, this)
        this.btnRight.on(cc.Node.EventType.TOUCH_CANCEL, this.onStop, this)

        // this.btnLeft.on(EventType.TOUCH_DOWN, this.onTouchDown, this)
        // this.btnLeft.on(EventType.TOUCH_MOVE, this.onTouchMove, this)
        // this.btnLeft.on(EventType.TOUCH_UP, this.onTouchUp, this)
    }



    private onTouchDown(e: cc.Event.EventTouch) {
        if (this.isCollision(e, this.btnLeft))
            this.onLeft()
        else if (this.isCollision(e, this.btnRight))
            this.onRight()
        else
            this.onStop();
    }

    private onTouchMove(e: cc.Event.EventTouch) {
        if (this.isCollision(e, this.btnLeft))
            this.onLeft()
        else if (this.isCollision(e, this.btnRight))
            this.onRight()
        else
            this.onStop();
    }

    private onTouchUp(e: cc.Event.EventTouch) {
        this.onStop();
    }


    public isCollision(e: cc.Event.EventTouch, node: cc.Node) {
        let globalPos = e.touch.getLocation();
        let pos = this.node.convertToNodeSpaceAR(globalPos);
        if (pos.x >= node.x && pos.x <= node.x + node.width / 2) {
            if (pos.y >= node.y && pos.y <= node.y + this.node.height / 2)
                return true
            if (pos.y < node.y && pos.y > node.y - node.height / 2)
                return true
        }
        if (pos.x < node.x && pos.x > node.x - node.width / 2) {
            if (pos.y >= node.y && pos.y <= node.y + node.height / 2)
                return true
            if (pos.y < node.y && pos.y > node.y - node.height / 2)
                return true
        }
        return false;
    }

    private onLeft() {
        moosnow.event.sendEventImmediately(EventType.ROCKER_MOVE, { x: -1, y: 0 })
    }

    private onRight() {
        moosnow.event.sendEventImmediately(EventType.ROCKER_MOVE, { x: 1, y: 0 })
    }

    private onStop() {
        moosnow.event.sendEventImmediately(EventType.ROCKER_MOVE, { x: 0, y: 0 })
    }

    private onJump(e) {
        moosnow.event.sendEventImmediately(EventType.ROCKER_JUMP, { x: 1, y: 0 })
    }

    private onAttack1(e) {
        moosnow.event.sendEventImmediately(EventType.ROCKER_ATTACK, {
            attack: ROLE_ATTACK.ATTACK1
        })
    }
    private onAttack2(e) {
        moosnow.event.sendEventImmediately(EventType.ROCKER_ATTACK, {
            attack: ROLE_ATTACK.ATTACK2
        })
    }
    private onAttack3(e) {
        moosnow.event.sendEventImmediately(EventType.ROCKER_ATTACK, {
            attack: ROLE_ATTACK.ATTACK3
        })
    }

    update(dt) {

    }
}
