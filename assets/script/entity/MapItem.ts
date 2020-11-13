import EntityLogic from "../framework/entity/EntityLogic";
import UIForms from "../config/UIForms";
import EventType from "../utils/EventType";
import { LevelCfg } from "../../sheets/vo/LevelCfg";
import Common from "../utils/Common";
import { SkinCfg } from "../../sheets/vo/SkinCfg";
import UIForm from "../framework/ui/UIForm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapItem extends EntityLogic {


    @property(cc.Node)
    logo: cc.Node = null

    @property(cc.Node)
    player: cc.Node = null

    @property(cc.Node)
    locked: cc.Node = null

    @property(cc.Node)
    memo: cc.Node = null

    @property(cc.SpriteFrame)
    skinFrame: cc.SpriteFrame = null

    private addListener() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onOpendLevel, this)
        moosnow.event.addListener(EventType.REPLAY_LEVEL, this, this.onReplay)
    }

    private removeListener() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onOpendLevel, this)
        moosnow.form.removeClickAnim(this.node);
    }

    private onReplay(e) {
        if ((this.LogicData.level) == e.level) {
            this.onOpendLevel(true);
        }
    }

    private onOpendLevel(isReplay = false) {
        if (this.mOpening)
            return;
        if ((this.LogicData.level) > Lite.data.getCurrentLevel()) {
            Lite.ui.showToast("要依次通关哦!")
            return;
        }
        if (Lite.data.getSpNum() <= 0) {
            Lite.ui.pushUIForm(UIForms.spForm, null)
            return
        }
        this.mOpening = true;

        moosnow.platform.hideBanner();
        let mistouchTag = Lite.data.getMistouchTag();
        moosnow.http.getAllConfig(res => {
            moosnow.http.getMisTouchNum(misNum => {
                Lite.data.setMistouchTag(mistouchTag + 1);
                moosnow.form.hideAd(() => { })
                this.mOpening = false;
                if (misNum == 0) {
                    moosnow.event.sendEventImmediately(EventType.GAME_STATE_START, this.LogicData.level);
                }
                else {
                    let mistouchInterval = res && res.mistouchInterval ? parseInt(res.mistouchInterval) : 2;
                    if (mistouchTag % mistouchInterval == 0) {
                        Lite.ui.pushUIForm(UIForms.MistouchForm, {
                            isReplay: isReplay,
                            level: this.LogicData.level
                        }, () => {
                            this.mOpening = false;
                        })
                    }
                    else {
                        this.mOpening = false;
                        moosnow.event.sendEventImmediately(EventType.GAME_STATE_START, this.LogicData.level);
                    }
                }
            })

        })

    }

    private openTryForm() {
        let skinAll = SkinCfg.getAll() as SkinCfg[];
        let skinArr = [];
        skinAll.forEach(item => {
            let userSkin = Lite.data.getUserSkinById(item.ID);
            if (!userSkin) {
                skinArr.push(item)
            }
        })

        moosnow.form.hideAd(() => { })
        if (skinArr.length == 0) {
            moosnow.event.sendEventImmediately(EventType.GAME_STATE_START, this.LogicData.level);
            return;
        }
        Lite.ui.pushUIForm(UIForms.TryForm, Common.deepCopy(this.LogicData));
        return;
    }

    private mOpening: boolean = false;
    willShow(data) {
        super.willShow(data);
        this.mOpening = false;
        // if (!data.x)
        //     debugger
        this.node.setPosition(data.x, data.y);
        this.memo.getComponent(cc.Label).string = data.memo;
        let curLv = Lite.data.getCurrentLevel();

        this.player.active = false;
        this.locked.active = false;

        if (data.level > curLv) {
            this.logo.active = false
            this.locked.active = true
        }
        else if (data.level < curLv) {
            this.locked.active = false;
            this.logo.active = true
            this.showStar(data.prefab);
        }
        else {
            this.player.active = true;
        }
        this.addListener();
    }


    private showStar(level) {
        // let lvCfg = LevelCfg.get(level) as LevelCfg
        // let userLv = Lite.data.getUserLevel();
        // let num = 0;
        // let useTime = userLv[level] ? userLv[level].time : 0;

        // if (useTime == 0) {
        //     for (let i = num; i > 0; i--) {
        //         (this[`star${i}`] as cc.Node).getComponent(cc.Sprite).spriteFrame = this.star
        //     }
        //     return;
        // }
        // if (useTime < lvCfg.star3 * 1000) {
        //     num = 3
        // }
        // else if (useTime < lvCfg.star2 * 1000) {
        //     num = 2
        // }
        // else
        //     num = 1

        // for (let i = num; i > 0; i--) {
        //     (this[`star${i}`] as cc.Node).getComponent(cc.Sprite).spriteFrame = this.starActive
        // }
    }

    willHide() {
        this.removeListener();
    }
}
