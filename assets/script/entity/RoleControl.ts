

import EntityLogic from "../framework/entity/EntityLogic";
import EventType from "../utils/EventType";
import { ROLE_MOVE } from "../enum/ROLE_MOVE";
import { ROLE_ATTACK } from "../enum/ROLE_ATTACK";
import AnimControl from "./AnimControl";
import BaseControl from "./BaseControl";
import DragonBonesOptions from "./DragonBonesOptions";
import { SkinCfg } from "../../sheets/vo/SkinCfg";
import { BUFFER } from "../enum/BUFFER";
import Entitys from "../config/Entitys";
import EnemyControl from "./EnemyControl";
import MathUtils from "../utils/MathUtils";
import RoadControl from "./RoadControl";
const { ccclass, property } = cc._decorator;

@ccclass
export default class RoleControl extends BaseControl {


    @property({
        type: cc.Node,
        override: true
    })
    logo: cc.Node = null;

    public mMaxHp: number = 0;
    public mCurHp: number = 0
    public get currentHp() {
        return this.mCurHp
    }
    public set currentHp(value) {
        console.log('更新血量', value)
        if (this.mCurHp != value) {

            if (value < this.mCurHp) {
                this.fadeAnim();
            }

            if (value > this.mMaxHp)
                value = this.mMaxHp
            moosnow.event.sendEventImmediately(EventType.ROLE_HP_CHANGED, { hp: value, max: this.mMaxHp })
        }
        if (this.mCurHp != value && value <= 0) {
            this.logo.stopAllActions();
            moosnow.platform.vibrateShort();
            this.stopMove();
            moosnow.event.sendEventImmediately(EventType.GAME_STATE_OVER, { isWin: false })
        }
        this.mCurHp = value
    }

    public maxJumps: number = 2;
    public jumps: number = 2
    public acceleration: number = 1500;
    public jumpSpeed: number = 200;
    public drag: number = 1200
    public mBeUp: boolean = false;

    private mBody: cc.RigidBody;
    private mUp: boolean = false;
    private mMoveFlags: number = 0;



    public maxSpeed: number = 500;
    private quickSpeed: number = 1.5;
    private slowSpeed: number = 0.3;
    private scaleMax: number = 1.5;
    private scaleMin: number = 0.3;

    start() {
        Lite.myGame.role = this;
        this.mMoveFlags = 0;
        this.mUp = false;
        this.mBody = this.node.getComponent(cc.RigidBody);
    }

    private fadeAnim() {
        this.logo.stopAllActions();
        this.logo.runAction(
            cc.sequence(
                cc.fadeTo(0.1, 100),
                cc.fadeTo(0.1, 255),
            ).repeat(10)
        )
    }


    private addListener() {
        moosnow.event.addListener(EventType.ROCKER_MOVE, this, this.onRoleMove)
        moosnow.event.addListener(EventType.ROCKER_JUMP, this, this.onJump)
        moosnow.event.addListener(EventType.ROCKER_ATTACK, this, this.onAttack)
    }

    private removeListener() {
        moosnow.event.removeListener(EventType.ROCKER_MOVE, this)
        moosnow.event.removeListener(EventType.ROCKER_JUMP, this)
        moosnow.event.removeListener(EventType.ROCKER_ATTACK, this)
    }



    private onRoleMove(vec: cc.Vec2) {
        if (vec.x > 0) {
            this.mMoveFlags &= ~ROLE_MOVE.LEFT;
            this.mMoveFlags |= ROLE_MOVE.RIGHT;
            if (!this.animControl.isPlaying("run")) {
                this.animControl.playAnim("run", true)
            }
        }
        else if (vec.x < 0) {
            this.mMoveFlags &= ~ROLE_MOVE.RIGHT;
            this.mMoveFlags |= ROLE_MOVE.LEFT;
            if (!this.animControl.isPlaying("run")) {
                this.animControl.playAnim("run", true)
            }
        }
        else {
            this.mMoveFlags &= ~ROLE_MOVE.LEFT;
            this.mMoveFlags &= ~ROLE_MOVE.RIGHT;
            if (!this.animControl.isPlaying("stand")) {
                this.animControl.playAnim("stand", true)
            }
        }
    }

    private reset() {
        if (this.mBody) {
            this.mBody.enabled = true;
            this.mBody.type = cc.RigidBodyType.Dynamic;
        }
    }

    private stopMove() {
        this.mMoveFlags &= ~ROLE_MOVE.LEFT;
        this.mMoveFlags &= ~ROLE_MOVE.RIGHT;
        this.mBody.linearVelocity = cc.v2(0, 0);
    }

    private onJump() {
        if (!this.hasBuffer(BUFFER.HITRECOVER)) {
            if (this.jumps > 0 && this.jumps <= this.maxJumps) {
                this.mUp = true;
            }
        }
    }

    /**
     * 
     */
    public beJump() {
        this.mBeUp = true;
    }
    private attack1Time: number
    private attack2Time: number
    private attack3Time: number
    public onAttack(e) {

        if (e.attack == ROLE_ATTACK.ATTACK1) {
            if (!this.attack1Time || Date.now() - this.attack1Time > this.mCurrentSkinCfg.attack1CD * 1000) {
                this.attack1Time = Date.now();
                this.animControl.playAnim("attack1");
                this.hitEnemy(300, this.mCurrentSkinCfg.attack1Num)
            }
        }
        else if (e.attack == ROLE_ATTACK.ATTACK2) {
            if (!this.attack2Time || Date.now() - this.attack2Time > this.mCurrentSkinCfg.attack2CD * 1000) {
                this.attack2Time = Date.now();
                this.createFire2(this.mCurrentSkinCfg.attack2Num);
            }
        }
        else if (e.attack == ROLE_ATTACK.ATTACK3) {
            if (!this.attack3Time || Date.now() - this.attack3Time > this.mCurrentSkinCfg.attack3CD * 1000) {
                this.attack3Time = Date.now();
                this.createFire3(this.mCurrentSkinCfg.attack2Num);
            }
        }
    }


    private createFire2(attackNum: number) {
        let bulletData = {
            x: this.node.x,
            y: this.node.y,
            attackNum,
            xSpeed: this.node.scaleX
        }
        // console.log("RoleControl -> createFire -> bulletData 1", bulletData)
        let logic = Lite.entity.showEntity(Entitys.roleBullet, this.node.parent, bulletData)
        // console.log("RoleControl -> createFire -> bulletData 2", logic.node.x, logic.node.y)
    }

    private createFire3(attackNum: number) {
        let bulletData = {
            x: this.node.x,
            y: this.node.y,
            attackNum,
            xSpeed: this.node.scaleX,
            ySpeed: 10
        }
        // console.log("RoleControl -> createFire -> bulletData 1", bulletData)
        let logic = Lite.entity.showEntity(Entitys.roleBullet, this.node.parent, bulletData)
        // console.log("RoleControl -> createFire -> bulletData 2", logic.node.x, logic.node.y)
    }

    private hitEnemy(r: number, attackNum: number) {
        let allEnemy: Array<EnemyControl> = Lite.entity.getAllEntity(Entitys.enemy)
        for (let i = 0; i < allEnemy.length; i++) {
            let enemy = allEnemy[i];
            let vec = cc.v2(enemy.node.x, enemy.node.y).sub(cc.v2(this.node.x, this.node.y)).normalize().scale(cc.v2(r, r))
            let angle = MathUtils.getAngleTwoVec({
                x: this.node.scaleX > 0 ? 1 : -1,
                y: 0
            }, vec)
            if (angle > 0 && angle < 180) {
                enemy.beAttacked(attackNum);
            }
        }

        let allRoad: Array<RoadControl> = Lite.entity.getAllEntity(Entitys.road)
        for (let i = 0; i < allRoad.length; i++) {
            let road = allRoad[i];
            // let vec = road.node.position.sub(this.node.position).normalize().scale(cc.v2(dis, dis))
            // let angle = MathUtils.getAngleTwoVec({
            //     x: this.node.scaleX > 0 ? 1 : -1,
            //     y: 0
            // }, vec)
            let dis = MathUtils.getDistance({
                x: Lite.myGame.role.node.x,
                y: Lite.myGame.role.node.y
            }, {
                x: road.node.x,
                y: road.node.y
            })
            if (dis <= Lite.myGame.role.node.width / 2 + road.node.width / 2 + r
                && road.node.y < Lite.myGame.role.node.y + Lite.myGame.role.node.height / 2
                && road.node.y > Lite.myGame.role.node.y - Lite.myGame.role.node.height / 2) {
                road.beAttacked(attackNum);
            }
        }
    }



    /**
     * 被攻击
     * @param e 
     */
    public beAttacked(num: number) {
        console.log('角色被攻击', num)
        if (!this.hasBuffer(BUFFER.UNRIVALLED)) {
            this.currentHp -= num;
        }
    }

    /**
     * 被击杀
     */
    public beKilled() {
        if (!this.hasBuffer(BUFFER.UNRIVALLED)) {
            console.log('角色被击杀')
            if (this.currentHp != 0) {
                this.currentHp = 0;
            }
            this.stopMove();
            this.removeListener();
            this.mBody.enabled = false;
            this.node.active = false
            this.mBody.type = cc.RigidBodyType.Static
            this.node.active = true;
        }
    }


    private mBuffer: BUFFER = BUFFER.NONE;
    private mBufferQuene: Array<{ buffer: BUFFER, time: number, num: number, maxTime: number, maxNum: number, interval: number }> = [];
    /**
     * 增加buff效果
     * @param buffer 类型 
     * @param time 持续时间
     * @param interval 
     * @param num 效果的数量  
     */
    public addBuffer(buffer: BUFFER, time: number, interval: number, num: number) {
        if (this.hasBuffer(BUFFER.UNRIVALLED)) {
            if ([BUFFER.REDUCEHEALTH, BUFFER.SLOWDOWN, BUFFER.HITRECOVER].indexOf(buffer) != -1) {
                return;
            }
        }
        if (buffer == BUFFER.UNRIVALLED) {
            this.removeBuffer(BUFFER.REDUCEHEALTH)
            this.removeBuffer(BUFFER.SLOWDOWN)
            this.removeBuffer(BUFFER.HITRECOVER)

        }
        if (buffer == BUFFER.ZOOMOUT) {
            this.removeBuffer(BUFFER.ZOOMIN)
        }
        if (buffer == BUFFER.ZOOMIN) {
            this.removeBuffer(BUFFER.ZOOMOUT)
        }

        this.mBuffer |= buffer;
        this.mBufferQuene.push({
            buffer,
            time: 0,
            num,
            maxTime: time,
            maxNum: num,
            interval
        })
    }
    public removeBuffer(buffer) {
        if (this.hasBuffer(buffer))
            this.mBuffer ^= buffer;

        // for (let i = 0; i < this.mBufferQuene.length; i++) {
        //     if (this.mBufferQuene[i].buffer == buffer) {
        //         this.mBufferQuene.splice(i, 1)
        //         i--;
        //     }
        // }
    }
    /**
     * 当前是否存在buff
     * @param buffer 
     */
    public hasBuffer(buffer) {
        return (this.mBuffer & buffer) == buffer;
    }

    public willShow(data) {
        super.willShow(data);
        this.initRole();
        this.initRoleAnim(data);
        this.addListener();
        this.addBuffer(BUFFER.UNRIVALLED, 3, 0, 0);
        this.fadeAnim();
        this.reset();
    }

    public onShow() {
        this.node.zIndex = cc.macro.MAX_ZINDEX;
    }

    public willHide() {
        this.removeListener();
    }

    private initRoleAnim(data) {
        this.animControl = this.logo.getComponent(AnimControl);
        if (data) {
            let options = new DragonBonesOptions("map/nezha_ske", "map/nezha_tex", "map/nezha_tex");
            options.loadCompleted = () => {
                this.logo.y = -this.node.height / 2;
                // this.mBody.type = cc.RigidBodyType.Dynamic
            }
            this.animControl.loadDragonBones(options);
        }
        else {
            this.animControl.playAnim("stand", true, () => {
                // this.mBody.type = cc.RigidBodyType.Dynamic
            })
        }
    }

    private mCurrentSkinCfg: SkinCfg
    private initRole() {
        let skin: SkinCfg = SkinCfg.get(Lite.data.getCurrentSkinId());
        this.acceleration = skin.acceleration
        this.maxJumps = skin.maxJumps
        this.jumps = skin.maxJumps
        this.jumpSpeed = skin.jumpSpeed
        this.mMaxHp = skin.maxHp
        this.currentHp = skin.maxHp
        this.maxSpeed = skin.maxSpeed;
        this.mCurrentSkinCfg = skin;
        this.node.scaleX = 1;
    }

    private move(dt) {
        if (!this.mBody) return;
        var speed = this.mBody.linearVelocity.clone();
        if (this.hasBuffer(BUFFER.HITRECOVER)) {
            this.stopMove();
            if (!this.animControl.isPlaying("stand"))
                this.animControl.playAnim("stand", false)
            return;
        }

        if (this.mMoveFlags === ROLE_MOVE.LEFT) {

            if (this.node.scaleX > 0) {
                this.node.scaleX *= -1;
            }
            speed.x -= this.acceleration * dt;
            if (speed.x < -this.maxSpeed) {
                speed.x = -this.maxSpeed;
            }
            // this.isDirectionCollision(ROLE_MOVE.LEFT)
        }
        else if (this.mMoveFlags === ROLE_MOVE.RIGHT) {
            // this.anim.play('walk');

            if (this.node.scaleX < 0) {
                this.node.scaleX *= -1;
            }

            speed.x += this.acceleration * dt;
            if (speed.x > this.maxSpeed) {
                speed.x = this.maxSpeed;
            }
            // this.isDirectionCollision(ROLE_MOVE.RIGHT)

        }
        else {
            if (speed.x != 0) {
                var d = this.drag * dt;
                if (Math.abs(speed.x) <= d) {
                    speed.x = 0;
                    // this.anim.play('idle');
                } else {
                    speed.x -= speed.x > 0 ? d : -d;
                }
            }
            speed.x = 0
        }

        if (Math.abs(speed.y) < 1 && this.jumps <= 0) {
            this.jumps = this.maxJumps
        }

        if ((this.jumps > 0 && this.mUp) || this.mBeUp) {
            speed.y = this.jumpSpeed;
            if (this.mBeUp)
                this.mBeUp = false;
            else
                this.jumps--;
            this.animControl.playAnim("jump", false, () => {
                this.animControl.playAnim("stand", false)
            })
        }

        this.mUp = false;
        this.mBody.linearVelocity = speed;
    }


    private addHP(num: number) {
        this.currentHp += num
    }
    private applyBuffer(dt) {
        for (let i = 0; i < this.mBufferQuene.length; i++) {
            this.mBufferQuene[i].time += dt;
            let bufferItem = this.mBufferQuene[i];
            if (bufferItem.buffer == BUFFER.HEAL) {
                this.addHP(bufferItem.maxNum)
                this.mBufferQuene.splice(i, 1)
                i--;
            }
            else if (bufferItem.buffer == BUFFER.REDUCEHEALTH) {
                this.addHP(-bufferItem.maxNum)
                this.mBufferQuene.splice(i, 1)
                i--;
            }
            else {
                if (this.mBufferQuene[i].time >= this.mBufferQuene[i].maxTime) {
                    this.removeBuffer(this.mBufferQuene[i].buffer)
                    this.mBufferQuene.splice(i, 1)
                    i--;
                }
            }
        }
    }

    public onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        console.log('角色碰到了', otherCollider.node.group)
    }

    private applySpeed(dt) {
        if (this.hasBuffer(BUFFER.QUICKEN)) {
            this.maxSpeed = this.mCurrentSkinCfg.maxSpeed * this.quickSpeed;
            let speed = this.mBody.linearVelocity.clone();
            speed.x = this.maxSpeed
            console.log("RoleControl -> applySpeed ->QUICKEN maxSpeed", this.maxSpeed)
        }
        else if (this.hasBuffer(BUFFER.SLOWDOWN)) {
            this.maxSpeed = this.mCurrentSkinCfg.maxSpeed * this.slowSpeed;
            let speed = this.mBody.linearVelocity.clone();
            speed.x = this.maxSpeed
            console.log("RoleControl -> applySpeed ->SLOWDOWN maxSpeed", this.maxSpeed)
        }
        else
            this.maxSpeed = this.mCurrentSkinCfg.maxSpeed
    }

    private applyScale(dt) {
        let vec = this.node.scale / Math.abs(this.node.scale)
        if (this.hasBuffer(BUFFER.ZOOMIN)) {
            if (this.node.scaleX < this.scaleMax) {
                this.node.scaleX += (vec / 60);
                this.node.scaleY += (1 / 60);
            }
            else {
                this.node.scaleX = this.scaleMax * vec
                this.node.scaleY = this.scaleMax
            }
        }
        else if (this.hasBuffer(BUFFER.ZOOMOUT)) {
            if (this.node.scaleX > this.scaleMin) {
                this.node.scaleX -= (vec / 60);
                this.node.scaleY -= (1 / 60);
            }

            else {
                this.node.scaleX = this.scaleMin * vec
                this.node.scaleY = this.scaleMin
            }
        }
        else {
            this.node.scaleX = vec
            this.node.scaleY = 1
        }
    }

    private checkTrap() {

    }

    public onFwUpdate(dt) {
        this.move(dt);
        this.applyBuffer(dt)
        this.applyScale(dt)
        this.applySpeed(dt);
    }

}
