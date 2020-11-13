import EntityLogic from "../framework/entity/EntityLogic";
import MathUtils from "../utils/MathUtils";
import AnimControl from "./AnimControl";
import BaseControl from "./BaseControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TrapControl extends BaseControl {


    private mSpeed: number = 3
    private mMoveSpeed: cc.Vec2 = cc.Vec2.ZERO;
    private mBegin: cc.Vec2;
    private mEnd: cc.Vec2;
    private mMoveIndex: number = 0;


    private mRepeat: number = 1;
    private mWarnDistince: number = 500;
    private mInterval: number = 1;
    private mMaxKeep: number = 1;
    private mKeep: number = 0


    willShow(data) {
        super.willShow(data);
        this.mBegin = this.node.position.clone();
        this.mEnd = this.node.position.clone();
        if (data && data.points) {
            if (data.points.length > 0)
                this.mBegin = cc.v2(data.points[0].x, data.points[0].y);
            if (data.points.length > 1)
                this.mEnd = cc.v2(data.points[1].x, data.points[1].y);
        }


        this.node.x = this.mBegin.x;
        this.node.y = this.mBegin.y;

        this.mMoveIndex = 0;
        if (!isNaN(data.warnDistince))
            this.mWarnDistince = data.warnDistince;
        this.mRepeat = data.repeat;
        this.mInterval = data.interval;
        this.mMaxKeep = data.keep;

        this.mMoveSpeed = this.mEnd.sub(this.mBegin).normalize().scale(cc.v2(this.mSpeed, this.mSpeed));
    }

    public isMoveFinish(point: cc.Vec2) {
        if (((this.mMoveSpeed.x >= 0 && this.node.x >= point.x)
            || (this.mMoveSpeed.x <= 0 && this.node.x <= point.x))
            && ((this.mMoveSpeed.y >= 0 && this.node.y >= point.y)
                || (this.mMoveSpeed.y <= 0 && this.node.y <= point.y))) {
            return true
        }
        return false
    }

    private move(dt) {
        if (this.mRepeat == -1) {
            return;
        }
        else if (this.mRepeat > 0 && this.mMoveIndex > this.mRepeat) {
            return;
        }
        this.node.x += this.mMoveSpeed.x;
        this.node.y += this.mMoveSpeed.y;



        if (this.mMoveIndex % 2 == 0) {
            if (this.isMoveFinish(this.mEnd)) {
                this.mMoveSpeed = cc.Vec2.ZERO;
                this.mKeep += dt;
                if (this.mKeep >= this.mMaxKeep) {
                    this.mMoveIndex += 1
                    this.mKeep = 0
                    this.mMoveSpeed = this.mBegin.sub(this.mEnd).normalize().scale(cc.v2(this.mSpeed, this.mSpeed));
                }
            }
        }
        else {
            if (this.isMoveFinish(this.mBegin)) {
                this.mMoveSpeed = cc.Vec2.ZERO;
                this.mKeep += dt;
                if (this.mKeep >= this.mMaxKeep) {

                    if (this.mKeep >= this.mMaxKeep + this.mInterval) {
                        this.mKeep = 0
                        this.mMoveIndex += 1;
                        this.mMoveSpeed = this.mEnd.sub(this.mBegin).normalize().scale(cc.v2(this.mSpeed, this.mSpeed));
                    }

                }
            }
        }
    }

    private isMove: boolean = false;
    public onFwUpdate(dt) {
        if (!this.isMove
            && Lite.myGame.role
            && MathUtils.getDistance(this.node, Lite.myGame.role.node) <= this.mWarnDistince) {
            this.isMove = true;
        }
        if (this.isMove) {
            this.move(dt);
        }


    }


    /**
      * 当碰撞产生的时候调用
      * @param  {cc.PhysicsCollider} other 产生碰撞的另一个碰撞组件
      * @param  {cc.PhysicsCollider} self  产生碰撞的自身的碰撞组件
      */
    public onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        console.log('trap 碰到了 ', otherCollider.node.group)
        if (["role"].indexOf(otherCollider.node.group) != -1) {
            this.scheduleOnce(() => {
                Lite.myGame.role.beKilled()
            }, 0)
        }
    }



}
