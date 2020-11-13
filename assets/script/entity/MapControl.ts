import LayaNodeEvent from "../../moosnowSdk/ui/laya/LayaNodeEvent";
import Entitys from "../config/Entitys";
import EntityLogic from "../framework/entity/EntityLogic";
import { DeployGroup } from "../model/DeployGroup";
import DeployItem from "../model/DeployItem";
import Common from "../utils/Common";
import EventType from "../utils/EventType";
import MathUtils from "../utils/MathUtils";

const { ccclass, property } = cc._decorator;
@ccclass
export default class MapControl extends EntityLogic {
    private get mapUrl() {
        let url = "https://liteplay-1253992229.cos.ap-guangzhou.myqcloud.com/GameEdit/resources/"
        if (window && window.location && window.location.search) {
            let appid = Common.getQueryVariable("appid")
            url += `${appid}/`;
            console.log("MapControl -> getmapUrl -> appid", appid)
        }
        else {
            url += `${moosnow.appConfig().moosnowAppId}/`
        }
        return url
    }
    private mCachedMap: any = {};
    private getCachedMap(level) {
        return this.mCachedMap[level];
    }

    private mStart: cc.Vec2;
    private mEnd: cc.Vec2;



    private createMap(mapJson) {

        let mapCreator = {
            [DeployGroup.road]: this.createRoad,
            [DeployGroup.start]: this.createRole,
            [DeployGroup.end]: this.createEnd,
            [DeployGroup.enemy]: this.createEnemy,
            [DeployGroup.buff]: this.createBuff,
            [DeployGroup.side]: this.createSide,
            [DeployGroup.trap]: this.createTrap,
            [DeployGroup.beautifyScene]: this.createScene,

        }


        for (let key in mapJson) {
            let childJson: DeployItem = mapJson[key];
            if (mapCreator[childJson.type]) {
                childJson.x = childJson.position[0];
                childJson.y = childJson.position[1];
                mapCreator[childJson.type].apply(this, [childJson]);
            }
        }


    }

    // private createLadder(data: DeployItem) {
    //     Lite.entity.showEntity(Entitys.enemy, this.node, data)
    // }

    private createEnemy(data: DeployItem) {
        Lite.entity.showEntity(Entitys.enemy, this.node, data)
    }

    private createBuff(data: DeployItem) {
        Lite.entity.showEntity(Entitys.buffer, this.node, data)
    }

    private createSide(data: DeployItem) {
        Lite.entity.showEntity(Entitys.side, this.node, data)
    }

    private createScene(data: DeployItem) {
        Lite.entity.showEntity(Entitys.beautifyScene, this.node, data)
    }

    private createRoad(data: DeployItem) {
        if (data.attribute.obstacle_type == 4) {
            this.createSide(data);
        }
        else {
            Lite.entity.showEntity(Entitys.road, this.node, data)
        }
    }

    private createRole(data: DeployItem) {
        this.mStart = new cc.Vec2(data.x, data.y);
        data.width = 50;
        data.height = 120;
        Lite.entity.showEntity(Entitys.role, this.node, data);
        moosnow.event.sendEventImmediately(EventType.CAMERA_CHANGED, data)
    }

    private createEnd(data: DeployItem) {
        this.mEnd = new cc.Vec2(data.position[0], data.position[0]);
        Lite.entity.showEntity(Entitys.end, this.node, data)
    }

    private createTrap(data: DeployItem) {
        Lite.entity.showEntity(Entitys.trap, this.node, data)
    }


    private hideMapAll() {
        Lite.entity.hideAllEntity(Entitys.role)
        Lite.entity.hideAllEntity(Entitys.road)
        Lite.entity.hideAllEntity(Entitys.end)
        Lite.entity.hideAllEntity(Entitys.buffer)
        Lite.entity.hideAllEntity(Entitys.enemy)
        Lite.entity.hideAllEntity(Entitys.trap)
        Lite.entity.hideAllEntity(Entitys.roleBullet)
        Lite.entity.hideAllEntity(Entitys.enemyBullet)
        Lite.entity.hideAllEntity(Entitys.beautifyScene)
        // Lite.entity.hideEntity(this, null)
    }


    public loadMap(level: number, remote: boolean, callback) {
        let queryLevel = Common.getQueryVariable("level")
        if (queryLevel != false) {
            level = Number(queryLevel)
        }
        if (this.getCachedMap(level)) {
            this.createMap(this.getCachedMap(level))
        }
        else {
            if (remote) {
                cc.loader.load("", (err, res) => {
                    this.createMap(res)
                })
            }
            else {
                cc.assetManager.loadRemote(`${this.mapUrl}/level/${level}.json?rand=${Math.random()}`, cc.JsonAsset, (err, jsonAsset: cc.JsonAsset) => {
                    this.createMap(jsonAsset.json)
                });
                // cc.loader.loadRes("map/" + level, cc.JsonAsset, (error, res) => {
                //     this.createMap(res.json)
                // })
            }

        }

    }

    public onEnable() {
        moosnow.event.addListener(EventType.CLEAR_ALL_MAP, this, this.hideMapAll)
    }

    public onDisable() {
        moosnow.event.removeListener(EventType.CLEAR_ALL_MAP, this)
    }


    public onFwUpdate() {
        if (Lite.myGame && Lite.myGame.role) {
            // let allBullet = Lite.entity.getAllEntity(Entitys.roleBullet);
            // let allBullet = Lite.entity.getAllEntity(Entitys.enemy);

        }
    }



}
