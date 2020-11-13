
import EventType from "../utils/EventType";
import { SkinCfg } from "../../sheets/vo/SkinCfg";
import Common from "../utils/Common";
import EntityLogic from "../framework/entity/EntityLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinItem extends EntityLogic {


    @property(cc.Sprite)
    logo: cc.Sprite = null;

    @property(cc.Sprite)
    locked: cc.Sprite = null;

    @property(cc.Node)
    checked: cc.Node = null;

    @property(cc.Label)
    coinNum: cc.Label = null;



    start() {
        this.addListener();
    }


    private addListener() {
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            Lite.data.setSelectSkin(this.LogicData.ID);
            if (Lite.data.getUserSkinById(this.LogicData.ID)) {
                Lite.data.setCurrentSkinId(this.LogicData.ID);
            }
            moosnow.event.sendEventImmediately(EventType.SKIN_SELECT, this.LogicData.ID)
        }, this)

        moosnow.event.addListener(EventType.SKIN_SELECT, this, (skinId) => {
            if (this.LogicData.ID != skinId) {
                this.checked.active = false;
            }
            else {
                this.checked.active = true;
            }
        })

        moosnow.event.addListener(EventType.SKIN_CHANGE, this, (skinId) => {
            this.showLocked(skinId)
        })
    }

    willShow(data) {
        super.willShow(data);
        let showSkin = SkinCfg.get(this.LogicData.ID) as SkinCfg;
        let curSkinId = Lite.data.getCurrentSkinId();



        this.checked.active = false;
        this.locked.node.active = true;



        this.showLocked(curSkinId)

        this.coinNum.string = `${Common.formatMoney(showSkin.coinNum)}`

        Lite.resource.loadAsset(`skin/${this.LogicData.ID}/7.png`, cc.SpriteFrame, (err, spriteFrame: cc.SpriteFrame) => {
            if (err)
                return;
            this.logo.spriteFrame = spriteFrame;
        })

    }


    private showLocked(curSkinId) {
        let showSkin = SkinCfg.get(this.LogicData.ID) as SkinCfg;
        let userSkin = Lite.data.getUserSkin();
        if (curSkinId == showSkin.ID) {
            this.checked.active = true;
            this.locked.node.active = false;
        }
        else {
            for (let k in userSkin) {
                if (k == this.LogicData.ID && (userSkin[k].videoNum >= showSkin.videoNum || userSkin[k].coinNum != 0)) {
                    this.locked.node.active = false;
                }
            }
        }
    }


}
