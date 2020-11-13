import BaseModule from './BaseModule'
export default class AppConfig extends BaseModule {
    constructor() {
        super();
    }

    public static resUrl = "https://liteplay-1253992229.cos.ap-guangzhou.myqcloud.com/Game/tomato/";
    public avatarUrl = "https://moyun-1257000992.cos.ap-guangzhou.myqcloud.com/avatar/" 	//1-100.jpg

    //网络配置
    private mLayoutConfig: any = {}
    public respawnNum: string = "0";        //复活次数限制
    public comboTime: string = "1";         //连击时间限制
    public killCoin: string = "10";          //击杀金币奖励
    public comboCoin: any = {};              //连击金币奖励
    public killEnergy: string = "10";        //击杀能量
    public respawnTime: string = "10";       //复活倒计时
    public coinPricePr: string = "0";        //金币价值系数
    public coinRewardTotalTime: string = "0" //日常收益总时间
    public coinRewardPr: string = "0"        //日常收益系数
    public coinRewardTime: string = "0"        //日常收益周期时间
    public comboVibrate: string = "0"        //连击震动数
    public respawnSkillCF: string = "0"      //复活技能伤害系数
    public killTips: any = {};               //击杀提示（大杀特杀...）
    public changeCoinCF: string = "0";        //金币换钻石比例
    public getDiamond: string = "0";        //每次看视屏获取的钻石数量
    public mapWidth: number = 3600;        //每次看视屏获取的钻石数量
    public mapHeight: number = 3600;        //每次看视屏获取的钻石数量
    public showInviteDelayTime: string = "2"
    public gameEndVideoChecked: string = "0"
    public showAdForm: string = "0";
    public showTryingForm: string = "0";
    public tryingLevel: Array<number> = [];
    public tryingMode: string = "0";


    public bg: string = "bg0";
    public bgArr: string[] = [
        "bg0",
        "bg1"
    ];

    public isOpenVideo: boolean = false;

    public get layoutConfig() {
        return this.mLayoutConfig;
    }
    public set layoutConfig(value) {
        this.mLayoutConfig = value;
    }

    //本地内存
    public attackId = 0;      //每次攻击，ID加1，防止一次攻击多次扣血
    public playerAttackId = 0;  //玩家攻击ID，根据ID判断连击

    onEnable() {

    }

    onDisable() {
    }
}
