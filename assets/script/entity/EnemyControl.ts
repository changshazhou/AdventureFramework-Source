
import EntityLogic from "../framework/entity/EntityLogic";
import EventType from "../utils/EventType";
import { ROLE_MOVE } from "../enum/ROLE_MOVE";
import { ROLE_ATTACK } from "../enum/ROLE_ATTACK";
import AnimControl from "./AnimControl";
import BaseControl from "./BaseControl";
import DragonBonesOptions from "./DragonBonesOptions";
import MathUtils from "../utils/MathUtils";
import DeployItem from "../model/DeployItem";
import { DeployAnimationNames } from "../model/DeployAnimationNames";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyControl extends BaseControl {



    @property({
        type: cc.Node,
        override: true
    })
    logo: cc.Node = null

    private mMaxHp: number = 3;
    private mCurHp: number = 3
    private mAttackNum: number = 1

    private mWarnDistince: number = 300;

    private mPoints: Array<cc.Vec2> = [];
    private mEndPointIndex: number = 0;
    private mPointDirection: number = 1
    private mSpeed: number = 3
    private mMoveSpeed: cc.Vec2 = cc.Vec2.ZERO;
    private mMoveVector: cc.Vec2; ''
    private mMoveEnd: cc.Vec2;


    private mCanCollision: boolean = true;
    start() {

    }
    public move() {
        if (!this.animControl.isPlaying(DeployAnimationNames.run_animation))
            this.animControl.playAnim(DeployAnimationNames.run_animation, true)
        this.node.x += this.mMoveSpeed.x;
        this.node.y += this.mMoveSpeed.y;



        if (this.mMoveSpeed.x > 0)
            if (this.node.scaleX > 0) {
                this.node.scaleX *= -1;
            }
        if (this.mMoveSpeed.x < 0)
            if (this.node.scaleX < 0) {
                this.node.scaleX *= -1;
            }
    }

    public findNextPoint() {
        if (this.mPoints.length == 1)
            return;
        let begin = this.mPoints[0];
        if (!this.mMoveEnd) {
            this.mMoveEnd = this.mPoints[this.mEndPointIndex + this.mPointDirection];
            // if (begin.x == 0 && begin.y == 0) {
            //     begin.x = 1
            // }
            this.updateSpeed(begin)
        }
        if (((this.mMoveSpeed.x >= 0 && this.node.x >= this.mMoveEnd.x)
            || (this.mMoveSpeed.x <= 0 && this.node.x <= this.mMoveEnd.x))
            && ((this.mMoveSpeed.y >= 0 && this.node.y >= this.mMoveEnd.y)
                || (this.mMoveSpeed.y <= 0 && this.node.y <= this.mMoveEnd.y))) {
            begin = this.mMoveEnd;
            if (this.mEndPointIndex + this.mPointDirection >= this.mPoints.length) {
                this.mEndPointIndex = 0;
                this.mMoveEnd = this.mPoints[this.mEndPointIndex];
            }
            else {
                this.mEndPointIndex += this.mPointDirection
                this.mMoveEnd = this.mPoints[this.mEndPointIndex];
            }

            // console.log("EnemyControl -> findNextPoint -> begin ,mMoveEnd", begin.x, begin.y, this.mMoveEnd.x, this.mMoveEnd.y)
            // console.log("EnemyControl -> findNextPoint -> this.node", this.node.x, this.node.y)
            this.updateSpeed(begin)
        }
    }



    private updateSpeed(begin) {
        this.mMoveSpeed = cc.v2(this.mMoveEnd.x, this.mMoveEnd.y).sub(cc.v2(begin.x, begin.y)).normalize().scale(cc.v2(this.mSpeed, this.mSpeed));
    }


    public attack1() {
        this.animControl.playAnim("attack")
    }
    public attack2() {
        this.animControl.playAnim("attack")
    }

    public reset() {
        this.mCanCollision = true;
    }

    willShow(data: DeployItem) {
        this.animControl = this.logo.getComponent(AnimControl);
        this.animControl.onDragonBonesCallback = () => {
            this.logo.y = -this.node.height / 2
        }
        super.willShow(data);


        this.mWarnDistince = data.attribute.trigger_distance;
        for (let i = 0; i < data.attribute.points.length; i++) {
            let point = data.attribute.points[i]
            this.mPoints.push(cc.v2(parseFloat(point[0]), parseFloat(point[1])))
        }
        this.mCurHp = this.mMaxHp;
        this.reset();
    }


    public beAttacked(num: number) {
        this.mCurHp -= num;
        if (this.mCurHp <= 0) {
            this.died();
        }
    }

    public died() {
        this.animControl.playAnim(DeployAnimationNames.died_animation, false, () => {
            Lite.entity.hideEntity(this, null)
        });
    }

    /**
      * 当碰撞产生的时候调用
      * @param  {cc.PhysicsCollider} other 产生碰撞的另一个碰撞组件
      * @param  {cc.PhysicsCollider} self  产生碰撞的自身的碰撞组件
      */
    public onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {

        if (this.mCanCollision && ["role"].indexOf(otherCollider.node.group) != -1) {

            // debugger
            if (otherCollider.node.y - selfCollider.node.y > 0
                && (otherCollider.node.x < selfCollider.node.x + selfCollider.node.width / 2)
                && (otherCollider.node.x > selfCollider.node.x - selfCollider.node.width / 2)) {
                console.log('怪物死亡')
                this.died();
                Lite.myGame.role.beJump();
            }
            else {
                Lite.myGame.role.beAttacked(this.mAttackNum)
                this.mCanCollision = false;
            }
        }
    }

    /**
     * 当碰撞结束后调用
     * @param  {cc.PhysicsCollider} other 产生碰撞的另一个碰撞组件
     * @param  {cc.PhysicsCollider} self  产生碰撞的自身的碰撞组件
     */
    public onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if (["role"].indexOf(otherCollider.node.group) != -1) {
            this.mCanCollision = true;
        }

    }

    private isMove: boolean = false;
    public onFwUpdate(dt) {
        this.findNextPoint();
        if (!this.isMove
            && Lite.myGame.role
            && this.mMoveEnd
            && MathUtils.getDistance(this.node, Lite.myGame.role.node) <= this.mWarnDistince) {
            this.isMove = true;
        }
        if (this.isMove && this.node.active)
            this.move();
    }

}
