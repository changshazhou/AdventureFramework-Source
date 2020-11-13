import EntityLogic from "../framework/entity/EntityLogic";
import { ROLE_MOVE } from "../enum/ROLE_MOVE";
import AnimControl from "./AnimControl";
import BaseControl from "./BaseControl";
import DeployItem from "../model/DeployItem";
import { ObstacleGroup } from "../model/ObstacleGroup";
import { DeployAnimationNames } from "../model/DeployAnimationNames";
const { ccclass, property } = cc._decorator;

@ccclass
export default class RoadControl extends BaseControl {


    public obstacleGroup: ObstacleGroup = ObstacleGroup.NONE
    public smashNum: number = 0
    public attackNum: number = 0;
    public beAttacked(attackNum) {
        if (this.obstacleGroup == ObstacleGroup.SMASH) {
            this.attackNum++;
            if (this.attackNum >= this.smashNum) {
                this.animControl.playAnim(DeployAnimationNames.died_animation, false, () => {
                    Lite.entity.hideEntity(this, null)
                })
            }
        }
    }

    public reset() {
        this.obstacleGroup = ObstacleGroup.NONE
        this.smashNum = 0
        this.attackNum = 0;
    }
    public willShow(data) {
        super.willShow(data);
        this.reset();
    }

    onShow(data) {
        this.obstacleGroup = this.LogicData.attribute.obstacle_type
        this.smashNum = this.LogicData.attribute.attack_num
    }

    public onFwUpdate(dt) {
    }

}
