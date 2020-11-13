
export class LevelCfgBase{
            
      ID:number;//
      des:string;//描述
      prefab:string;//数据
      coin:number;//过关金币数
      shareCoin:number;//分享金币数

}
export class PrizeBoxBase{
            
      ID:number;//
      videoNum:number;//需求视频次数
      coinNum:Array<any>;//金币数量
      keyNum:number;//钥匙数量

}
export class EasterEggBase{
            
      ID:number;//
      name:string;//名字
      level:number;//获得关卡
      skin:string;//皮肤地址

}
export class SignBase{
            
      ID:number;//
      name:string;//名称
      value:number;//值
      good:string;//物品
      img:string;//图片
      videoValue:number;//视频钻石量

}
export class SkinCfgBase{
            
      ID:number;//
      name:string;//名字
      videoNum:number;//需求视频次数
      coinNum:number;//金币数量
      skin:string;//皮肤地址
      acceleration:number;//加速能力
      maxSpeed:number;//最大速度
      maxJumps:number;//最大跳跃次数
      jumpSpeed:number;//跳跃速度
      maxHp:number;//血量
      attack1Dis:number;//攻击距离
      attack1Num:number;//攻击力
      attack1CD:number;//攻击间隔
      attack2Dis:number;//攻击距离
      attack2Num:number;//攻击力
      attack2CD:number;//攻击间隔
      attack3Dis:number;//攻击距离
      attack3Num:number;//攻击力
      attack3CD:number;//攻击间隔

}
export class SignVoBase{
            
      ID:number;//
      des:string;//描述
      icon:string;//图标
      data:Array<any>;//数据

}
export class ConfigDataBase{
            
      ID:number;//
      name:string;//字段名
      value:any;//字段值

}