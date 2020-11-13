
import AdViewItem from "./AdViewItem";
import { AD_POSITION } from "./AD_POSITION";
import UIForm from "../../../script/framework/ui/UIForm";
import Common from "../../../script/utils/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdForm extends UIForm {

    @property(cc.Node)
    public endContainer: cc.Node = null;
    @property(cc.Node)
    public endContainer_layout: cc.Node = null;

    @property(cc.Node)
    public exportContainer: cc.Node = null;
    @property(cc.Node)
    public exportContainer_scroll: cc.Node = null;
    @property(cc.Node)
    public exportContainer_layout: cc.Node = null;


    @property(cc.Node)
    public recommendContainer: cc.Node = null;
    @property(cc.Node)
    public recommendContainer_scroll: cc.Node = null;
    @property(cc.Node)
    public recommendContainer_layout: cc.Node = null;
    @property(cc.Node)
    public recommendClose: cc.Node = null;


    @property(cc.Node)
    public exportClose: cc.Node = null;
    @property(cc.Node)
    public formMask: cc.Node = null;
    @property(cc.Node)
    public exportCloseTxt: cc.Node = null;
    @property(cc.Node)
    public btnBack: cc.Node = null;

    @property(cc.Node)
    public floatContainer: cc.Node = null;
    @property(cc.Node)
    public floatFull: cc.Node = null;

    @property(cc.Node)
    public bannerContainer: cc.Node = null;
    @property(cc.Node)
    public bannerContainer_scroll: cc.Node = null;
    @property(cc.Node)
    public bannerContainer_layout: cc.Node = null;

    @property(cc.Node)
    public topContainer: cc.Node = null;
    @property(cc.Node)
    public topContainer_scroll: cc.Node = null;
    @property(cc.Node)
    public topContainer_layout: cc.Node = null;

    @property(cc.Node)
    public leftContainer: cc.Node = null;
    @property(cc.Node)
    public leftContainer_scroll: cc.Node = null;
    @property(cc.Node)
    public leftContainer_layout: cc.Node = null;

    @property(cc.Node)
    public rightContainer: cc.Node = null;
    @property(cc.Node)
    public rightContainer_scroll: cc.Node = null;
    @property(cc.Node)
    public rightContainer_layout: cc.Node = null;

    @property(cc.Node)
    public rotateContainer: cc.Node = null;
    @property(cc.Node)
    public rotateContainer_layout: cc.Node = null;



    @property(cc.Node)
    public sideContainer: cc = null;
    @property(cc.Node)
    public sideView: cc = null;
    @property(cc.Node)
    public sideLayout: cc.Node = null;
    @property(cc.Node)
    public btnSideShow: cc.Node = null;
    @property(cc.Node)
    public btnSideHide: cc.Node = null;



    private mShowAd = AD_POSITION.NONE;
    private mTempPoints: Array<cc.Vec2>;
    private mTempTempletes: Array<string>;

    private mPrevShowAd = AD_POSITION.NONE;
    private mPrevBackCall: Function
    private mPrevPoints: Array<cc.Vec2>;
    private mPrevTempletes: Array<string>;


    private mBackCall: Function
    private mScrollVec = [];
    private mEndLogic = [];
    private mMoveSpeed: number = 2;

    private addListener() {
        this.btnBack.on(cc.Node.EventType.TOUCH_START, this.onBack, this)
        this.exportClose.on(cc.Node.EventType.TOUCH_START, this.onNavigate, this)
        this.btnSideShow.on(cc.Node.EventType.TOUCH_START, this.sideOut, this)
        this.btnSideHide.on(cc.Node.EventType.TOUCH_START, this.sideIn, this)
        this.recommendClose.on(cc.Node.EventType.TOUCH_START, this.onRecommendClose, this)
        moosnow.event.addListener(moosnow.PLATFORM_EVENT.AD_VIEW_CHANGE, this, this.onAdChange)
    }
    private removeListener() {
        this.btnBack.off(cc.Node.EventType.TOUCH_START, this.onBack, this)
        this.exportClose.off(cc.Node.EventType.TOUCH_START, this.onNavigate, this)
        this.btnSideShow.off(cc.Node.EventType.TOUCH_START, this.sideOut, this)
        this.btnSideHide.off(cc.Node.EventType.TOUCH_START, this.sideIn, this)
        this.recommendClose.off(cc.Node.EventType.TOUCH_START, this.onRecommendClose, this)
        moosnow.event.removeListener(moosnow.PLATFORM_EVENT.AD_VIEW_CHANGE, this)
    }
    private onAdChange(data) {

        this.displayAd(false)

        if (data && data.points)
            this.mTempPoints = data.points
        if (data && data.templetes)
            this.mTempTempletes = data.templetes

        // this.mShowAd = AD_POSITION.NONE;
        if (!this.mShowAd) {
            this.mShowAd = data.showAd;
            this.mBackCall = data.callback;
        }
        if (data.showAd != AD_POSITION.RECOVER) {
            this.mPrevShowAd = this.mShowAd;
            this.mPrevBackCall = this.mBackCall;
            this.mPrevPoints = this.mTempPoints;
            this.mPrevTempletes = this.mTempTempletes;
        }
        if (data.showAd == AD_POSITION.RECOVER) {
            data.showAd = this.mPrevShowAd;
            data.callback = this.mPrevBackCall;
            this.mTempPoints = this.mPrevPoints
            this.mTempTempletes = this.mTempTempletes
        }
        this.displayChange(data.showAd, data.callback)

        if (!isNaN(data.zIndex)) {
            this.node.zIndex = data.zIndex;
        }
        else {
            this.node.zIndex = cc.macro.MAX_ZINDEX;
        }
    }

    public onRecommendClose() {
        this.recommendContainer.active = false;
    }
    public onBack() {
        if (this.mBackCall) {
            this.mBackCall();
        }
    }

    public get FormData(): showAdOptions {
        return this.mFormData;
    }




    private mFloatIndex = 0;
    private mFloatRefresh = 3;
    private mFloatCache = {};
    private mAdData: moosnowResult;

    private onAdCancel() {
        moosnow.form.showAd(AD_POSITION.EXPORT | AD_POSITION.MASK | AD_POSITION.BACK, () => {
            moosnow.form.showAd(AD_POSITION.RECOVER, () => { })
        })
    }

    private loadNum = 0;
    private loadManNum = 3;
    private checkLoad(callback?: Function) {
        this.loadNum++
        if (this.loadNum == this.loadManNum) {
            callback(this.mAdData.indexLeft)
        }
    }

    public onRandomNavigate() {
        let item = this.mAdData.indexLeft[Common.randomNumBoth(0, this.mAdData.indexLeft.length - 1)];
        moosnow.platform.navigate2Mini(item, () => { }, () => {

        })

    }
    public onNavigate() {
        moosnow.http.getAllConfig(res => {
            if (res && res.exportBtnNavigate == 1) {
                this.onRandomNavigate();
            }
            else {
                this.onBack();
            }
        })
    }
    public sideOut() {
        let wxsys = moosnow.platform.getSystemInfoSync();
        let statusBarHeight = 0;
        let notchHeight = 0;
        if (wxsys) {
            statusBarHeight = wxsys.statusBarHeight || 0;
            notchHeight = wxsys.notchHeight || 0;
        }

        this.sideView.node.runAction(cc.sequence(
            cc.moveTo(1, statusBarHeight + notchHeight + this.sideView.node.width + 20, 0),
            cc.callFunc(() => {
                this.btnSideShow.active = false;
                this.btnSideHide.active = true;
            })
        ))
    }

    public sideIn() {
        this.sideView.node.runAction(cc.sequence(
            cc.moveTo(1, 0, 0),
            cc.callFunc(() => {
                this.btnSideShow.active = true;
                this.btnSideHide.active = false;
            })
        ))
    }
    public pushScroll(scrollView: cc.ScrollView, layout: cc.Layout) {
        if (layout.type == cc.Layout.Type.GRID) {
            if (scrollView.vertical) {
                this.mScrollVec.push({
                    scrollView,
                    move2Up: false
                })
            }
            else {
                this.mScrollVec.push({
                    scrollView,
                    move2Left: false
                })
            }
        }
        else if (layout.type == cc.Layout.Type.HORIZONTAL) {
            this.mScrollVec.push({
                scrollView,
                move2Left: false
            })
        }
        else if (layout.type == cc.Layout.Type.VERTICAL) {
            this.mScrollVec.push({
                scrollView,
                move2Up: false
            })
        }
    }
    private addAd(ad) {
        this.mShowAd |= ad;
    }
    private removeAd(ad) {
        if (this.hasAd(ad))
            this.mShowAd ^= ad;
    }
    private hasAd(ad) {
        return (this.mShowAd & ad) == ad;
    }
    public showClose(visible) {

        this.exportClose.active = false;
        this.exportCloseTxt.active = false;
        this.btnBack.active = false;

        this.unschedule(this.onWaitShow)

        if (visible && this.hasAd(AD_POSITION.BACK)) {
            if (this.hasAd(AD_POSITION.WAIT)) {
                this.mSecond = 3;
                this.onWaitShow();
                this.schedule(this.onWaitShow, 1);
            }
            else {
                this.exportClose.active = true;
                this.btnBack.active = true;
                this.exportCloseTxt.active = false;
            }
        }
        else {
            this.exportClose.active = false;
            this.btnBack.active = false;
            this.exportCloseTxt.active = false;
        }
    }
    public mSecond: number = 3
    public onWaitShow() {
        this.mSecond -= 1;
        this.exportCloseTxt.active = true;
        if (this.mSecond <= 0) {
            this.exportClose.active = true;
            this.btnBack.active = true;
            this.exportCloseTxt.active = false;
            this.unschedule(this.onWaitShow)
            return;
        }
        moosnow.nodeHelper.changeText(this.exportCloseTxt, `剩余${this.mSecond}秒可关闭`)

    }

    private mAdItemList = [];
    public setPosition(source: Array<moosnowAdRow>, position: string = "", callback?: Function, refresh: boolean = false): Array<moosnowAdRow> {
        let retValue = Common.deepCopy(source) as [];
        retValue.forEach((item: moosnowAdRow) => {
            item.position = position;
            item.onCancel = callback;
            item.refresh = refresh;
        })
        return retValue;
    }
    /**
     * 
     * @param parentNode 父节点
     * @param prefabs 匹配的预制体
     * @param points 需要显示的坐标点
     * @param entityName  需要绑定的预制体
     * @param callback  跳转取消时的回调函数
     */
    public initFloatAd(callback?: Function) {
        if (!this.mAdData) return;
        if (this.mAdData.indexLeft.length == 0) return;

        let source = this.setPosition(this.mAdData.indexLeft, "浮动ICON", callback, true);
        let showIds = [];

        let points = this.mTempPoints || this.FormData.floatPositon;
        let templetes = this.mTempTempletes || this.FormData.floatTempletes;
        let showIndex = Common.randomNumBoth(0, source.length - 1);
        if (!points) return;
        points.forEach((point, idx) => {
            let nowIdx = (showIndex + idx) % (source.length - 1)
            let adRow = source[nowIdx] as any;
            showIds.push({
                appid: adRow.appid,
                position: adRow.position,
                index: nowIdx
            })
            let templateName = templetes.length - 1 > idx ? templetes[idx] as any : templetes[0];
            console.log('initFloatAd', point.x, point.y)
            adRow.x = point.x;
            adRow.y = point.y;
            adRow.source = source;
            adRow.showIds = showIds;
            adRow.index = idx;
            Lite.entity.showEntity(templateName, this.floatContainer, adRow);
            // moosnow.form.formFactory.createNodeByTemplate(templateName, CocosAdViewItem, adRow, this.floatContainer);

        })
        this.updateFloat();
        this.schedule(this.updateFloat, this.mFloatRefresh);
        this.floatAnim();
        this.floatRuning = false;

    }


    private removeFloatAd() {
        this.floatContainer.children.forEach(floatNode => {
            floatNode.stopAllActions();
        })

        let templetes = this.FormData.floatTempletes;
        if (templetes)
            templetes.forEach(tempName => {
                Lite.entity.hideAllEntity(tempName)
            });
        if (this.mTempTempletes) {
            this.mTempTempletes.forEach(tempName => {
                Lite.entity.hideAllEntity(tempName)
            })
        }
        this.unschedule(this.updateFloat)
    }


    private floatRuning = false;
    private floatAnim() {
        if (this.floatRuning)
            return;
        let templetes = this.mTempTempletes || this.FormData.floatTempletes;
        if (this.floatContainer.childrenCount >= templetes.length)
            this.floatRuning = true;
        this.floatContainer.children.forEach(floatNode => {
            floatNode.stopAllActions();
            floatNode.runAction(
                cc.sequence(
                    cc.rotateTo(0.3, 10),
                    cc.rotateTo(0.6, -10),
                    cc.rotateTo(0.3, 0),
                    cc.scaleTo(0.3, 0.8),
                    cc.scaleTo(0.3, 1)
                ).repeatForever()
            )
        })
    }


    private updateFloat() {
        let templetes = this.mTempTempletes || this.FormData.floatTempletes;
        if (templetes) {
            templetes.forEach(tempName => {
                let allFloat = Lite.entity.getAllEntity(tempName)
                allFloat.forEach((item: AdViewItem) => {
                    item.LogicData.index = (item.LogicData.index + this.floatContainer.childrenCount) % (this.mAdData.indexLeft.length - 1)
                    item.refreshImg({ ...this.mAdData.indexLeft[item.LogicData.index], onCancel: item.LogicData.onCancel });
                })
            })
        }
    }

    /**
       * 绑定广告数据-固定显示6个导出
       * @param container 列表容器节点，显示/隐藏  的核心节点
       * @param layout cc.Layout
       * @param position 位置信息，将提交到统计后台用于分析
       * @param entityName 需要绑定的预制体
       * @param callback 跳转取消时的回调函数
       */
    public initFiexdView(layout: cc.Node, position: string, templateName: string, callback?: Function) {
        if (!this.mAdData) return;
        layout.removeAllChildren();
        let banner = this.setPosition(this.mAdData.indexLeft, position, callback, true);
        let endAd: Array<moosnowAdRow> = [];
        let showIds = [];
        for (let i = 0; i < 8; i++) {
            let item = banner.length > i ? banner[i] : banner[0];
            showIds.push({
                appid: item.appid,
                position: item.position,
                index: i
            })
            endAd.push(item);
        }
        endAd.forEach(item => {
            let adRow = { ...item, showIds, source: banner }
            Lite.entity.showEntity(templateName, layout, adRow)
            // moosnow.form.formFactory.createNodeByTemplate(templateName, CocosAdViewItem, adRow, layout)
        })
    }
    /**
     * 绑定导出数据
     * @param container 列表容器节点，显示/隐藏  的核心节点
     * @param scrollView 
     * @param layout cc.Layout
     * @param position 位置信息，将提交到统计后台用于分析
     * @param entityName  需要绑定的预制体
     * @param callback  跳转取消时的回调函数
     */
    public initView(scrollView: cc.ScrollView, layout: cc.Node, position: string, templateName: string, callback?: Function, source?: Array<moosnowAdRow>) {

        this.hideAllAdNode(templateName, layout);
        if (!source)
            source = this.setPosition(this.mAdData.indexLeft, position, callback);
        source.forEach((item, idx) => {
            Lite.entity.showEntity(templateName, layout, item)
            // moosnow.form.formFactory.createNodeByTemplate(templateName, CocosAdViewItem, item, layout)
        })
        this.pushScroll(scrollView, layout.getComponent(cc.Layout));
    }


    public hideAllAdNode(templateName: string, node: cc.Node) {
        if (!node)
            return;
        for (let i = 0; i < node.childrenCount; i++) {
            Lite.entity.hideEntity(node.children[i].getComponent(AdViewItem), null)
            i--
        }
    }


    public update() {
        this.scrollMove();
    }

    private scrollMove() {
        for (let i = 0; i < this.mScrollVec.length; i++) {
            let item = this.mScrollVec[i];
            let scrollView = item.scrollView as cc.ScrollView;
            if (scrollView.isScrolling())
                continue;
            // scrollView.scrollToPercentHorizontal()
            let scrollOffset = scrollView.getMaxScrollOffset();
            let maxH = scrollOffset.y / 2 + 20;
            let maxW = scrollOffset.x / 2 + 20;
            let contentPos = scrollView.getContentPosition()
            if (item.move2Up == true) {
                // console.log("scrollMove ->  scrollView.content.height", scrollView.content.height, maxH)
                if (contentPos.y > maxH) {
                    item.move2Up = false;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x, contentPos.y + this.mMoveSpeed))
            }
            else if (item.move2Up == false) {
                if (contentPos.y < -maxH) {
                    item.move2Up = true;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x, contentPos.y - this.mMoveSpeed))
            }
            if (item.move2Left == true) {
                if (contentPos.x > maxW) {
                    item.move2Left = false;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x + this.mMoveSpeed, contentPos.y))
            }
            else if (item.move2Left == false) {
                if (contentPos.x < -maxW) {
                    item.move2Left = true;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x - this.mMoveSpeed, contentPos.y))
            }
        }
    }


    /**
     * 
     * @param data 
     */
    public willShow(data) {
        super.willShow(data);
        this.floatRuning = false;
        this.addListener();

        this.mAdItemList = [];
        this.mScrollVec = []
        // this.addEvent();
        this.displayChange(data.showAd, data.callback)
    }

    public willHide() {
        super.willShow();
        this.removeListener();
    }

    public displayChange(data, callback = null) {
        this.mShowAd = data;
        this.displayAd(true)
        this.mBackCall = callback;
    }

    private displayAd(visible: boolean) {
        this.endContainer.active = visible && this.hasAd(AD_POSITION.EXPORT_FIXED);
        this.endContainer.active && this.initEnd();

        // !this.endContainer.active && this.disableEnd();
        this.bannerContainer.active = visible && this.hasAd(AD_POSITION.BANNER);
        this.topContainer.active = visible && this.hasAd(AD_POSITION.TOP);

        this.floatContainer.active = visible && this.hasAd(AD_POSITION.FLOAT);

        this.floatContainer.active && this.initFloatAd(this.onAdCancel);

        if (!this.floatContainer.active) {
            this.removeFloatAd();
        }


        this.leftContainer.active = this.rightContainer.active = visible && this.hasAd(AD_POSITION.LEFTRIGHT);
        this.exportContainer.active = visible && this.hasAd(AD_POSITION.EXPORT)
        this.recommendContainer.active = visible && this.hasAd(AD_POSITION.RECOMMEND)
        this.rotateContainer.active = visible && this.hasAd(AD_POSITION.ROTATE);
        this.rotateContainer.active && this.initRotate(this.initRotate);
        !this.rotateContainer.active && this.disableRotate();
        this.formMask.active = visible && this.hasAd(AD_POSITION.MASK);
        if (visible && this.hasAd(AD_POSITION.EXPORT)) {
            moosnow.http.getAllConfig(res => {
                if (res.exportAutoNavigate == 1) {
                    moosnow.platform.navigate2Mini(this.mAdData.indexLeft[Common.randomNumBoth(0, this.mAdData.indexLeft.length - 1)])
                }
            })
            // this.exportClose.active = false;
            // this.unschedule(this.onWaitShow)
            // this.schedule(this.onWaitShow, 1)
        }
        this.showClose(visible);

    }

    public onShow(data) {
        super.onShow(data);

        moosnow.http.getAllConfig(res => {
            if (res) {
                if (!isNaN(res.adScrollViewSpeed))
                    this.mMoveSpeed = parseFloat(res.adScrollViewSpeed);
            }
        })
        moosnow.ad.getAd((res) => {
            this.mAdData = res;
            this.initBanner();
            this.initTop();
            this.initExport();
            this.initRecommend();
            this.initLeftRight();
            if (this.FormData && this.FormData.callback)
                this.FormData.callback();
        })
    }

    private initBanner() {

        // this.bannerContainer_layout.width = this.bannerContainer.width - 140;

        let layout = this.bannerContainer_layout.getComponent(cc.Layout);
        let scrollView = this.bannerContainer_scroll.getComponent(cc.ScrollView);
        layout.type = cc.Layout.Type.HORIZONTAL;
        layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        this.initView(scrollView, this.bannerContainer_layout, "banner", "adListBannerItem", this.onAdCancel);
        //控制显示广告  后续补充
    }

    private initTop() {
        let layout = this.topContainer_layout.getComponent(cc.Layout);
        let scrollView = this.topContainer_scroll.getComponent(cc.ScrollView);
        layout.type = cc.Layout.Type.HORIZONTAL;
        layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        this.initView(scrollView, this.topContainer_layout, "top", "adListBannerItem", this.onAdCancel);
        //控制显示广告  后续补充
    }
    private initLeftRight() {
        let source: Array<any> = Common.deepCopy(this.mAdData.indexLeft) as [];
        let endNum = source.length / 2
        let right = source.slice(0, endNum)
        let left = source.slice(endNum, source.length)

        let leftLayout = this.leftContainer_layout.getComponent(cc.Layout);
        leftLayout.type = cc.Layout.Type.VERTICAL;
        leftLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

        let rightLayout = this.rightContainer_layout.getComponent(cc.Layout);
        rightLayout.type = cc.Layout.Type.VERTICAL;
        rightLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

        let leftView = this.leftContainer_scroll.getComponent(cc.ScrollView);
        leftView.horizontal = false;
        leftView.vertical = true;
        let rightView = this.rightContainer_scroll.getComponent(cc.ScrollView);
        rightView.horizontal = false;
        rightView.vertical = true;

        let newLeft = this.setPosition(left, "left", this.onAdCancel);
        let newRight = this.setPosition(right, "right", this.onAdCancel);
        this.initView(leftView, this.leftContainer_layout, "left", "adListLeftItem", this.onAdCancel, newLeft);
        this.initView(rightView, this.rightContainer_layout, "right", "adListLeftItem", this.onAdCancel, newRight);
    }

    private initEnd() {
        let layout = this.endContainer_layout.getComponent(cc.Layout);
        layout.type = cc.Layout.Type.GRID;
        layout.resizeMode = cc.Layout.ResizeMode.NONE;
        this.initFiexdView(this.endContainer_layout, "8个固定大导出", "adFiexdItem", this.onAdCancel);
    }
    // private disableEnd() {
    //     moosnow.form.formFactory.hideNodeByTemplate("exportAdItem", null);
    // }



    private initExport() {
        let layout = this.exportContainer_layout.getComponent(cc.Layout);
        let scrollView = this.exportContainer_scroll.getComponent(cc.ScrollView);
        layout.type = cc.Layout.Type.GRID;
        layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        // layout.startAxis = cc.Layout.AxisDirection.VERTICAL;
        this.initView(scrollView, this.exportContainer_layout, "大导出", "adListExportItem");
    }


    private initRecommend() {
        let layout = this.recommendContainer_layout.getComponent(cc.Layout);
        let scrollView = this.recommendContainer_scroll.getComponent(cc.ScrollView);
        layout.type = cc.Layout.Type.GRID;
        layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        // layout.startAxis = cc.Layout.AxisDirection.VERTICAL;
        this.initView(scrollView, this.recommendContainer_layout, "大推荐", "adListBannerItem");
    }


    private disableRotate() {
        let tempName = "adRotateItem"
        Lite.entity.hideAllEntity(tempName, null)
        // moosnow.form.formFactory.hideNodeByTemplate(tempName, null);
    }
    private initRotate(callback?: Function) {
        if (!this.mAdData)
            return;
        let source = this.setPosition(this.mAdData.indexLeft, "旋转导出", callback, true);
        let beginIdx = Common.randomNumBoth(0, source.length - 1);
        let tempName = "adRotateItem";
        let itemLogic: AdViewItem = Lite.entity.showEntity(tempName, this.rotateContainer, null)
        let x = itemLogic.node.width / 2;
        let y = itemLogic.node.height / 2;
        let spacingX: number = 15;
        let spacingY: number = 15;

        let pos = [
            { x: -x - spacingX, y: y + spacingY },
            { x: x + spacingX, y: y + spacingY },
            { x: -x - spacingX, y: -y - spacingY },
            { x: x + spacingX, y: -y - spacingY }
        ];
        let showIds = [];
        let endAd: Array<moosnowAdRow> = [];
        for (let i = 0; i < 4; i++) {
            if (source.length == 0)
                break;
            let rowIndex = Common.randomNumBoth(0, source.length - 1);
            let adRow = source.splice(rowIndex, 1)[0] as any;
            adRow.x = pos[i].x;
            adRow.y = pos[i].y;

            showIds.push({
                appid: adRow.appid,
                position: adRow.position,
                index: i
            })
            endAd.push(adRow);
        }

        endAd.forEach(adRow => {
            adRow.source = source;
            adRow.showIds = showIds;
            Lite.entity.showEntity(tempName, this.rotateContainer_layout, adRow)
        })
        let t = cc.Canvas.instance.node.width / 2 / 800
        this.rotateContainer_layout.children.forEach((item, idx) => {

            item.x = pos[idx].x - cc.Canvas.instance.node.width / 2;
            item.stopAllActions();
            item.runAction(
                cc.spawn(
                    cc.moveTo(t, new cc.Vec2(pos[idx].x, pos[idx].y)),
                    cc.rotateBy(t, 360)
                )
            )
        })

    }


    public disableAd() {
        this.unschedule(this.onFwUpdate)
    }
}