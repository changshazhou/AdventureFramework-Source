import { DeployAnimation } from "./DeployAnimation";
import { DeployGroup } from "./DeployGroup";

export default class DeployItemAttribute {

    /**
    *  0 不可击毁
    *  1 可击毁
    *  2 可顶毁
    *  4 可穿透
     */
    public obstacle_type: number = 0;
    public attack_num: number = 0;
    /**
     * 移动类型 0 不移动 1 左右移动  2上下移动
     */
    public move_type: number = 0;
    public move_speed: number = 0;
    public points: Array<number> = [];

    public trigger_distance: number = 0;
    public props_type: number = 0;
    public adsorption_range: number = 0;
    public hp_num: number = 0;
    public move_speed_percentage: number = 0;
    public amplification: number = 0;
    public invincible_time: number = 0;
    /**
     * 缩小倍数
     */
    public narrow: number = 0;
    /**
     * 金币数
     */
    public gold_num: number = 0;

    /**
     * 硬直时间
     */
    public hard_straight_time: number = 0;



    public jump_animation: DeployAnimation;
    public walk_animation: DeployAnimation;
    public attack_animation: DeployAnimation;
    public run_animation: DeployAnimation;
    public stand_animation: DeployAnimation;


    public resources: Array<Array<string>> = []

}