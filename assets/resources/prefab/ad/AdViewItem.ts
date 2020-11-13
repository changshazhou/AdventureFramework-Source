import EntityLogic from "../../../script/framework/entity/EntityLogic";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AdViewItem extends EntityLogic {

    @property(cc.Node)
    public logo: cc.Node = null;
    @property(cc.Node)
    public title: cc.Node = null;
    @property(cc.Node)
    public animLogo: cc.Node = null;
    @property(cc.Node)
    public nameBg: cc.Node = null;

    public mAdItem: moosnowAdRow;


    private mLogoWidth: number
    private mLogoHeight: number

    private addListener() {
        this.logo.on(cc.Node.EventType.TOUCH_START, this.onClickAd, this)
    }

    private removeListener() {
        this.logo.off(cc.Node.EventType.TOUCH_START, this.onClickAd, this)
    }


    public initPosition(data) {

    }



    public willShow(cell: moosnowAdRow) {
        super.willShow(cell);
        // console.log('ad view item data 1 ', cell.title, this.node.x, this.node.y)
        this.mAdItem = cell;
        this.addListener();

        // this.scheduleOnce(() => {
        //     console.log('ad view item data 2 ', cell.title, this.node.x, this.node.y)
        // }, 2)
    }



    public refreshImg(cell: moosnowAdRow) {
        this.mAdItem = cell;
        this.updateUI();
    }

    private updateUI() {
        let { width, height } = this.logo;
        // console.log('logo complete 1', this.mAdItem.title, "logo ", this.logo.width, this.logo.height, "node ", this.node.width, this.node.height)
        moosnow.nodeHelper.changeSrc(this.logo, { url: this.mAdItem.img, width, height } as any, () => {
            // console.log('logo complete 2 ', this.mAdItem.title, "logo ", this.logo.width, this.logo.height, "node ", this.node.width, this.node.height)
            this.logo.width = width;
            this.logo.height = height;
            // console.log('logo complete 3 ', this.mAdItem.title, "logo ", this.logo.width, this.logo.height, "node ", this.node.width, this.node.height)
        });



        moosnow.nodeHelper.changeText(this.title, this.mAdItem.title);
    }

    public onClickAd() {
        let openAd = this.mAdItem
        if (this.LogicData && this.LogicData.refresh) {
            let nextAd = this.findNextAd();
            if (nextAd) {
                if (nextAd.refresh)
                    moosnow.event.sendEventImmediately(moosnow.PLATFORM_EVENT.AD_VIEW_REFRESH, {
                        current: openAd,
                        next: nextAd
                    })
                this.refreshImg(nextAd);
            }

        }
        moosnow.platform.navigate2Mini(openAd, () => { }, () => {
            if (this.mAdItem && this.mAdItem.onCancel)
                this.mAdItem.onCancel(openAd);
        })
    }

    private findNextAd(): moosnowAdRow {
        if (!this.LogicData.source)
            return null
        if (!this.LogicData.showIds)
            return null
        for (let i = 0; i < this.LogicData.source.length; i++) {
            let isShow = false;
            for (let j = 0; j < this.LogicData.showIds.length; j++) {
                if (this.LogicData.showIds[j].appid == this.LogicData.source[i].appid
                    && this.LogicData.showIds[j].position == this.LogicData.source[i].position) {
                    isShow = true;
                }
            }
            if (!isShow) {
                return this.LogicData.source[i];
            }
        }
        return null;
    }

    private onAdViewChange(e) {
        if (!this.LogicData.showIds) return;
        if (!this.LogicData.source) return;
        let { current, next } = e;

        let showApps = this.LogicData.showIds;
        let sourceApps = this.LogicData.source;

        for (let i = 0; i < showApps.length; i++) {
            if (current.appid == showApps[i].appid && current.position == showApps[i].position) {
                this.LogicData.showIds[i] = next.appid;
            }
        }
        for (let i = 0; i < sourceApps.length; i++) {
            if (next.appid == sourceApps[i].appid) {
                this.LogicData.source.splice(i, 1)
                this.LogicData.source.push(current);
                break;
            }
        }
    }

    public onShow(data) {
        super.onShow(data)
        this.updateUI();
        moosnow.event.addListener(moosnow.PLATFORM_EVENT.AD_VIEW_REFRESH, this, this.onAdViewChange)
    }

    public onHide(data) {
        super.onHide(data)
        if (this.mAdItem)
            this.mAdItem.onCancel = null;
        this.removeListener();
        moosnow.event.removeListener(moosnow.PLATFORM_EVENT.AD_VIEW_REFRESH, this);
    }
}