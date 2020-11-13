// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import NodeAttribute from "../../moosnowSdk/ui/attribute/NodeAttribute";
import EntityLogic from "../framework/entity/EntityLogic";
import { DeployAnimationNames } from "../model/DeployAnimationNames";
import { DeployAnimationType } from "../model/DeployAnimationType";
import DeployItem from "../model/DeployItem";
import AnimControl from "./AnimControl";
import DragonBonesOptions from "./DragonBonesOptions";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseControl extends EntityLogic {

    @property({
        type: cc.Node,
        override: true
    })
    logo: cc.Node = null

    private mAnimControl: AnimControl = null;
    public get animControl() {
        return this.mAnimControl;
    }
    public set animControl(value) {
        this.mAnimControl = value;
    }

    public mLogicData: DeployItem;
    public get LogicData() {
        return this.mLogicData;
    }

    public willShow(data: DeployItem) {
        super.willShow(data);

        this.refreshCollider(data);

        if (!this.mAnimControl) {
            this.mAnimControl = this.node.getComponent(AnimControl);
        }

        if (this.mAnimControl)
            this.loadAnim(data);
        else
            this.loadSprite(data);

        if (this.getOrigin(data).length > 0) {
            this.refreshOffset(0, parseFloat("" + data.height) / 2);
        }



    }

    public loadSprite(data: DeployItem) {
        if (data.component && data.component.length > 0) {
            for (let i = 0; i < data.component.length; i++) {
                let item = data.component[i];
                if (item.type = "sprite")
                    this.refreshImage(item.sprite_frame);
            }
        }
    }

    public getOrigin(data: DeployItem) {
        let origin = [];
        [DeployAnimationNames.run_animation, DeployAnimationNames.jump_animation].forEach(name => {
            if (data && data.attribute && data.attribute[name] && data.attribute[name].type == DeployAnimationType.DragonBones
                && data.attribute[name].resources) {
                origin = data.attribute[name].resources;
                return false;
            }
        })
        return origin
    }



    public loadAnim(data: DeployItem) {
        if (this.mAnimControl) {
            let origin = this.getOrigin(data);
            if (data && data.attribute) {
                if ((data.attribute.stand_animation && data.attribute.stand_animation.resources)
                    || (data.attribute.run_animation && data.attribute.run_animation.resources)) {
                    this.mAnimControl.initAnim(data, origin)
                }
                else {
                    this.loadSprite(data);
                }
            }
            else {
                this.loadSprite(data);
            }
        }
        else
            this.loadSprite(data);
    }



    public willHide(data: DeployItem) {
        this.mAnimControl = null;
    }

    public refreshImage(url) {
        moosnow.nodeHelper.changeSrc(this.logo || this.node, { url, width: this.node.width, height: this.node.height } as NodeAttribute)
    }

    public refreshCollider(data: { width?, height?, radius?, points?}) {
        let boxCollider = this.node.getComponent(cc.PhysicsCollider);
        if (boxCollider) {
            if (boxCollider instanceof cc.PhysicsBoxCollider) {
                boxCollider.size = new cc.Size(data.width, data.height);
            }
            else if (boxCollider instanceof cc.PhysicsCircleCollider) {
                boxCollider.radius = data.radius;
            }
            else if (boxCollider instanceof cc.PhysicsPolygonCollider) {
                boxCollider.points = data.points;
            }
            else if (boxCollider instanceof cc.PhysicsChainCollider) {
                boxCollider.points = data.points;
            }
            boxCollider.apply();
        }


    }

    public refreshOffset(x: number = 0, y: number = 0) {
        let boxCollider = this.node.getComponent(cc.PhysicsCollider);
        if (boxCollider) {
            if (boxCollider instanceof cc.PhysicsBoxCollider) {
                boxCollider.offset = cc.v2(x, y)
            }
            else if (boxCollider instanceof cc.PhysicsCircleCollider) {
                boxCollider.offset = cc.v2(x, y)
            }
            else if (boxCollider instanceof cc.PhysicsPolygonCollider) {
                boxCollider.offset = cc.v2(x, y)
            }
            else if (boxCollider instanceof cc.PhysicsChainCollider) {
                boxCollider.offset = cc.v2(x, y)
            }
            boxCollider.apply();
        }
    }

}
