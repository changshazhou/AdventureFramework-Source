import UIForm from "../../framework/ui/UIForm";
import { SkinCfg } from "../../../sheets/vo/SkinCfg";
import Common from "../../utils/Common";
import EventType from "../../utils/EventType";
import UIForms from "../../config/UIForms";


const { ccclass, property } = cc._decorator;

@ccclass
export default class skinForm extends UIForm {


    @property(cc.ScrollView)
    skinView: cc.ScrollView = null;

    @property(cc.Layout)
    skinLayout: cc.Layout = null;

    @property(cc.Node)
    btnBack: cc.Node = null;

    @property(cc.Node)
    btnVideo: cc.Node = null;

    @property(cc.Node)
    btnCoin: cc.Node = null;

    public isMask: boolean = true;


    willShow() {
        this.initSkin();
        this.addListener();
        this.onSkinChange();
        // let curApp = moosnow.getAppPlatform()
        // if (curApp == moosnow.APP_PLATFORM.VIVO || curApp == moosnow.APP_PLATFORM.OPPO) {
        //     // moosnow.platform.hideBanner();
        // }
        // else {

        // }
        moosnow.platform.showBanner(false);
    }
    willHide() {
        this.removeListener();
        if (moosnow.APP_PLATFORM.WX == moosnow.getAppPlatform()) {
            moosnow.platform.hideBanner();
            moosnow.form.showAd(moosnow.AD_POSITION.BANNER | moosnow.AD_POSITION.FLOAT, () => { })
        }
        else
            moosnow.platform.showBanner(false);
    }

    private initSkin() {
        Lite.entity.hideAllEntity("skinItem");
        let arr = SkinCfg.getAll() as Array<SkinCfg>;
        arr.forEach((item: SkinCfg) => {
            Lite.entity.showEntity("skinItem", this.skinLayout.node, {
                ...Common.deepCopy(item)
            })

        })
    }
    private addListener() {
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onSkinChange, this)
        this.btnBack.on(cc.Node.EventType.TOUCH_END, this.onBack, this)
        this.btnVideo.on(cc.Node.EventType.TOUCH_END, this.onUnlock, this)
        this.btnCoin.on(cc.Node.EventType.TOUCH_END, this.onCoinUnlock, this)
        moosnow.event.addListener(EventType.SKIN_SELECT, this, this.onSkinChange)

    }

    private removeListener() {
        // this.node.off(cc.Node.EventType.TOUCH_END, this.onSkinChange, this)
        this.btnBack.off(cc.Node.EventType.TOUCH_END, this.onBack, this)
        this.btnVideo.off(cc.Node.EventType.TOUCH_END, this.onUnlock, this)
        this.btnCoin.on(cc.Node.EventType.TOUCH_END, this.onCoinUnlock, this)
        moosnow.event.removeListener(EventType.SKIN_SELECT, this)

    }

    private onSkinChange() {
        let selectSkinId = Lite.data.getSelectSkin();
        let userSkin = Lite.data.getUserSkinById(selectSkinId)
        this.btnCoin.active = !!!userSkin
        this.btnVideo.active = !!!userSkin
    }

    private onBack() {
        Lite.ui.hideUIForm(UIForms.SkinForm, null);
    }


    private onCoinUnlock() {
        let selectSkinId = Lite.data.getSelectSkin();
        let selectSkin = SkinCfg.get(selectSkinId) as SkinCfg
        let coin = Lite.data.getCoin();
        if (selectSkin.coinNum <= coin) {
            Lite.data.setCoin(coin - selectSkin.coinNum);
            Lite.data.saveCoin();
            Lite.data.addUserSkinCoin(selectSkinId);
            Lite.data.setCurrentSkinId(selectSkinId);
            moosnow.event.sendEventImmediately(EventType.SKIN_CHANGE, selectSkinId);
            this.onSkinChange();
        }
        else {
            moosnow.form.showToast("金币不足");
        }
    }

    private onUnlock() {

        moosnow.platform.showVideo(res => {
            if (res == moosnow.VIDEO_STATUS.END) {
                let selectSkinId = Lite.data.getSelectSkin()
                Lite.data.addUserSkinVideo(selectSkinId);
                let userSkin = Lite.data.getUserSkinById(selectSkinId)
                let selectSkin = SkinCfg.get(selectSkinId) as SkinCfg
                if (selectSkin.videoNum <= userSkin.videoNum) {
                    Lite.data.setCurrentSkinId(selectSkinId);
                    moosnow.event.sendEventImmediately(EventType.SKIN_CHANGE, selectSkinId)
                    this.onSkinChange();
                }
            }
            else if (res == moosnow.VIDEO_STATUS.ERR)
                moosnow.form.showToast(moosnow.VIDEO_MSG.ERR)
            else {
                moosnow.form.showToast(moosnow.VIDEO_MSG.NOTEND)
            }
        })
    }

    // update (dt) {}
}
