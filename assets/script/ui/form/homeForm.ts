
import UIForms from "../../config/UIForms";
import EventType from "../../utils/EventType";
import Entitys from "../../config/Entitys";
import UIForm from "../../framework/ui/UIForm";


const { ccclass, property } = cc._decorator;

@ccclass
export default class homeForm extends UIForm {

    @property(cc.Node)
    public btnStar: cc.Node = null;

    @property(cc.Node)
    public btnPrev: cc.Node = null;


    @property(cc.Node)
    public btnNext: cc.Node = null;

    @property(cc.Node)
    public mapContainer: cc.Node = null;

    @property(cc.Node)
    public mapPoints: cc.Node = null;


    @property(cc.Node)
    public chapterTxt: cc.Node = null;


    @property(cc.Node)
    public shutter: cc.Node = null;


    @property(cc.Node)
    public btnSoundOn: cc.Node = null;

    @property(cc.Node)
    public btnSoundOff: cc.Node = null;

    @property(cc.Node)
    public btnGarage: cc.Node = null;

    @property(cc.Label)
    public coinNum: cc.Label = null;

    @property(cc.Node)
    public qqAppBox: cc.Node = null;

    @property(cc.Node)
    public ttAppBox: cc.Node = null;

    @property(cc.Node)
    public btnMore: cc.Node = null;

    @property(cc.Node)
    public btnLeft: cc.Node = null;

    @property(cc.Node)
    public easterEggContainer: cc.Node = null;


    @property(cc.Node)
    public floatContainer: cc.Node = null;


    @property(cc.Label)
    public txtSp: cc.Label = null;

    @property(cc.Node)
    public btnFollow: cc.Node = null;


    private mMapPos: Array<cc.Vec2> = [];
    start() {


    }

    onShow(data) {
        this.addListener();
        this.displayLevel();
        this.displayButton();
        let point = []
        this.floatContainer.children.forEach(item => {
            item.active = false;
            // point.push(item.position)
        })
        moosnow.form.showAd(moosnow.AD_POSITION.BANNER | moosnow.AD_POSITION.FLOAT, () => { });
        this.btnSoundOff.active = Lite.audio.isMute;
        moosnow.platform.showAutoBanner();
        this.btnLeft.x = cc.Canvas.instance.node.width / 2 - this.btnLeft.width / 2
        console.log('left x', this.btnLeft.x)
    }


    private starGame() {
        moosnow.form.showAd(moosnow.AD_POSITION.FLOAT, () => { }, [new cc.Vec2(0, 0)], ["floatAdItem2"])
        moosnow.event.sendEventImmediately(EventType.GAME_STATE_START, 1)
    }

    private showCoin() {
        // this.coinNum.string = `${Common.formatMoney(Lite.data.getCoin())}`
    }

    private addListener() {
        this.btnStar.on(cc.Node.EventType.TOUCH_END, this.starGame, this)
        // this.btnSet.on(cc.Node.EventType.TOUCH_END, this.onSet, this)
        this.btnPrev.on(cc.Node.EventType.TOUCH_END, this.onPrevChapterBigChange, this)
        this.btnNext.on(cc.Node.EventType.TOUCH_END, this.onNextChapterBigChange, this)
        this.btnSoundOn.on(cc.Node.EventType.TOUCH_END, this.onSoundChange, this)
        this.btnMore.on(cc.Node.EventType.TOUCH_END, this.onOpenMore, this)
        this.btnLeft.on(cc.Node.EventType.TOUCH_END, this.onOpenMore, this)
        this.btnFollow.on(cc.Node.EventType.TOUCH_END, this.onFollow, this)

        // this.qqAppBox.on(cc.Node.EventType.TOUCH_END, this.onShowAppBox, this)z
        // this.ttAppBox.on(cc.Node.EventType.TOUCH_END, this.onShowAppBox, this)
        moosnow.event.addListener(EventType.SKIN_CHANGE, this, this.showCoin)
        moosnow.event.addListener(EventType.COIN_CHANGED, this, this.showCoin)
        moosnow.event.addListener(EventType.COIN_CHANGED, this, this.showCoin)
        moosnow.event.addListener(EventType.FOLLOW_CHANGED, this, this.onFollowChanged);

    }
    private onFollowChanged() {
        this.btnFollow.active = false;
    }

    private removeListener() {
        this.btnStar.off(cc.Node.EventType.TOUCH_END, this.starGame, this)
        // this.btnSet.on(cc.Node.EventType.TOUCH_END, this.onSet, this)
        this.btnPrev.off(cc.Node.EventType.TOUCH_END, this.onPrevChapterBigChange, this)
        this.btnNext.off(cc.Node.EventType.TOUCH_END, this.onNextChapterBigChange, this)
        this.btnSoundOn.off(cc.Node.EventType.TOUCH_END, this.onSoundChange, this)
        this.btnMore.off(cc.Node.EventType.TOUCH_END, this.onOpenMore, this)
        this.btnLeft.off(cc.Node.EventType.TOUCH_END, this.onOpenMore, this)
        moosnow.event.removeListener(EventType.SKIN_CHANGE, this)
        moosnow.event.removeListener(EventType.COIN_CHANGED, this)
    }

    private onFollow() {
        console.log('onFollow  ')
        // moosnow.platform.checkFollowAwemeSate((hasFollowed) => {
        //     if (!hasFollowed)
        //         moosnow.platform.openAwemeUserProile((has) => {

        //         }, (err) => {
        //             Lite.ui.showToast("关注失败")
        //             console.log('openAwemeUserProile err ', err)
        //         })
        //     else {
        //         Lite.ui.showToast("已成功关注")
        //     }
        // }, (err) => {
        //     console.log('checkFollowAwemeSate err ', err)
        //     Lite.ui.showToast("关注失败")
        // })

        Lite.ui.pushUIForm(UIForms.FollowForm, null)


        // moosnow.platform.navigate2Video("13104d105d7d1136520544465c29446751562b4200724166505542470e7d466c565642460872");
    }

    private onOpenMore() {
        moosnow.form.showAd(moosnow.AD_POSITION.EXPORT | moosnow.AD_POSITION.MASK | moosnow.AD_POSITION.BACK, () => {
            moosnow.form.showAd(moosnow.AD_POSITION.BANNER | moosnow.AD_POSITION.FLOAT, () => { });
            moosnow.platform.showAutoBanner();
        })
    }

    private onSoundChange() {
        Lite.audio.isMute = !Lite.audio.isMute
        this.btnSoundOff.active = Lite.audio.isMute;
        if (Lite.audio.isMute)
            Lite.audio.stopMusic()
        else
            Lite.audio.playMainMusic();
    }

    private onShowAppBox() {
        moosnow.platform.showAppBox(() => {

        }, false)
    }

    private onGarage() {
        Lite.ui.pushUIForm(UIForms.SkinForm)
    }


    private displayButton() {
        if (this.mChapterBig <= 0)
            this.btnPrev.active = false;
        else
            this.btnPrev.active = true;

        let maxLevel = Lite.data.getMaxLevel();
        let maxChapterBig = Math.ceil(maxLevel / this.mChapterSmall)
        if (this.mChapterBig >= maxChapterBig - 1)
            this.btnNext.active = false;
        else
            this.btnNext.active = true;
    }
    private onSet() {
        let setForm = Lite.ui.getUIFrom(UIForms.SetForm)
        if (setForm) {
            Lite.ui.hideUIForm(UIForms.SetForm, null)
        }
        else {
            Lite.ui.pushUIForm(UIForms.SetForm)
        }
    }
    private onPrevChapterBigChange() {
        this.mChapterBig--
        if (this.mChapterBig <= 0) {
            this.mChapterBig = 0
        }
        this.displayLevel();
        this.displayButton();
        this.runShutter();
    }
    private onNextChapterBigChange() {
        this.mChapterBig++;
        let maxLevel = Lite.data.getMaxLevel();
        let maxChapterBig = Math.ceil(maxLevel / this.mChapterSmall)
        if (this.mChapterBig >= maxChapterBig) {
            this.mChapterBig = maxChapterBig;
        }
        this.displayLevel();
        this.displayButton();
        this.runShutter();
    }



    private runShutter() {
        Lite.audio.playShutter();
        this.shutter.runAction(
            cc.sequence(
                cc.fadeIn(0),
                cc.fadeOut(0.5)
            )
        )
    }

    private initPosition() {
        if (this.mMapPos.length == 0) {
            this.mMapPos = [];
            this.mapPoints.children.forEach(item => {
                item.active = false
                this.mMapPos.push(item.position.clone());
            })
        }
    }
    private mChapterBig: number = 0
    private mChapterSmall: number = 5
    private displayLevel() {
        let userLevel = Lite.data.getUserLevel();
        let startNum = (this.mChapterBig) * this.mChapterSmall
        let endNum = startNum + this.mChapterSmall;
        this.mapPoints.removeAllChildren();
        for (let i = startNum; i < endNum; i++) {
            let entityData = {
                ...(this.mMapPos.length > i - startNum ? this.mMapPos[i - startNum] : new cc.Vec2(0, 0)),
                ...userLevel[i],
                level: i + 1,
                memo: i + 1
            }
            Lite.entity.showEntity(Entitys.mapItem, this.mapPoints, entityData)
        }
        moosnow.nodeHelper.changeText(this.chapterTxt, `${this.mChapterBig + 1}`)
    }

    willHide() {
        // Lite.entity.hideAllEntity("mapItem")
        this.removeListener();
    }

    willShow() {
        this.initPosition();
        // Lite.audio.playMainMusic();
        // this.initPosition();

        let sysinfo = moosnow.platform.getSystemInfoSync();
        if (["Douyin"].indexOf(sysinfo.appName) != -1) {
            if (Lite.data.getChangeTag() == 0)
                this.btnFollow.active = true
            else
                this.btnFollow.active = false;
        }
        else {
            this.btnFollow.active = false;
        }

    }
}   
