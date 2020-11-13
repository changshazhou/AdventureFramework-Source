import EntityLogic from "../framework/entity/EntityLogic";
import BaseControl from "./BaseControl";
import EnemyControl from "./EnemyControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletControl extends EntityLogic {

    private xSpeed: number = 10;
    private angleSpeed: number = -50;
    private ySpeed: number = 10;


    private mBody: cc.RigidBody;
    private mCanCollision: boolean = true;
    private mAttackNum: number = 1;


    private contactNum: number = 3;
    private isDynamic() {
        return this.mBody.type == cc.RigidBodyType.Dynamic;
    }

    private reset() {
        this.contactNum = 0;
        this.mAttackNum = 0;
        this.mCanCollision = true;
    }

    /**
       * 当碰撞产生的时候调用
       * @param  {cc.PhysicsCollider} other 产生碰撞的另一个碰撞组件
       * @param  {cc.PhysicsCollider} self  产生碰撞的自身的碰撞组件
       */
    public onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {

        if (this.mCanCollision && ["enemy"].indexOf(otherCollider.node.group) != -1) {
            let enemyCtl = otherCollider.node.getComponent(EnemyControl)
            enemyCtl.beAttacked(this.mAttackNum)
            this.mCanCollision = false;
        }
        if (this.isDynamic()) {
            this.contactNum += 1
            if (this.contactNum > 3) {
                Lite.entity.hideEntity(this, null);
            }
        }
        else
            Lite.entity.hideEntity(this, null);
    }

    /**
     * 当碰撞结束后调用
     * @param  {cc.PhysicsCollider} other 产生碰撞的另一个碰撞组件
     * @param  {cc.PhysicsCollider} self  产生碰撞的自身的碰撞组件
     */
    public onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        this.mCanCollision = true;
        console.log("BulletControl -> onEndContact -> this.mCanCollision", this.mCanCollision)
    }



    public willShow(data) {
        this.reset();
        super.willShow(data)
        this.mBody = this.node.getComponent(cc.RigidBody);
        this.mAttackNum = data.attackNum;
        console.log("BulletControl -> willShow -> data.xSpeed", data.xSpeed)

        if (data.xSpeed > 0)
            this.xSpeed = data.xSpeed * 10;
        else
            this.xSpeed = data.xSpeed * 10;

        if (!isNaN(data.ySpeed)) {
            this.mBody.type = cc.RigidBodyType.Dynamic;
            this.mBody.gravityScale = 5;
            let force = cc.v2(this.xSpeed * 50, this.ySpeed * 40)
            console.log("BulletControl -> willShow -> force", force)
            // this.mBody.applyForce(force, cc.Vec2.ZERO, true)
            // this.mBody.applyLinearImpulse(force, cc.Vec2.ZERO, true)
            this.mBody.linearVelocity = force
            this.mBody.angularVelocity = 400
        }
        else {
            this.mBody.type = cc.RigidBodyType.Animated;
        }
    }

    public onShow(data) {
        super.onShow(data);

    }

    onFwUpdate(dt) {
        if (this.mBody.type != cc.RigidBodyType.Dynamic) {
            this.node.x += this.xSpeed;
            this.node.angle += this.angleSpeed
        }
        if (this.node.x > Lite.myGame.role.node.x + cc.Canvas.instance.node.width
            || this.node.x < Lite.myGame.role.node.x - cc.Canvas.instance.node.width) {
            Lite.entity.hideEntity(this, null);
        }
        // this.node.x = 0;
        // this.node.y = 0
    }
}
