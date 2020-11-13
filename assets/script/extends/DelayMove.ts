// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class DelayMove extends cc.Component {

    @property(cc.Node)
    moveNode: cc.Node = null;
    @property
    distince: number = -100;
    @property
    showBanner: boolean = true;

    public pos1: cc.Vec2 = cc.Vec2.ZERO;
    public pos2: cc.Vec2 = cc.Vec2.ZERO;

    public mMistouchPosNum: number = 0;
    public mMistouchPosSecond: number = 2;


    public start() {

    }



    public onEnable() {
        this.move();
    }

    /**
     * 延迟移动
     * @param moveNode  需要移动的节点
     * @param distince 移动的距离
     * @param showBanner 移动后是否显示 banner
     */
    public move() {

        this.initPos();

        let count = moosnow.data.getCurrentMisTouchCount();
        moosnow.data.setCurrentMisTouchCount(count + 1);

        moosnow.http.getAllConfig(res => {
            if (!isNaN(res.mistouchPosSecond))
                this.mMistouchPosSecond = parseFloat(res.mistouchPosSecond)
            moosnow.http.getMistouchPosNum(num => {
                this.mMistouchPosNum = num;
                this.movePosition();
            })
        })

    }

    public movePosition() {
        if (this.mMistouchPosNum == 0) {
            this.setPosition(this.moveNode, true, this.pos1.x, this.pos1.y);
            if (this.showBanner)
                moosnow.platform.showBanner();
        }
        else {
            let count = moosnow.data.getCurrentMisTouchCount()
            if (count % this.mMistouchPosNum == 0) {
                let tempButtom = this.copyNode();
                this.scheduleOnce(() => {
                    this.onPosCallback(tempButtom)
                }, this.mMistouchPosSecond)
            }
        }
    }


    public initPos() {
        if (this.pos1.x == 0 && this.pos1.y == 0) {
            this.pos1 = this.moveNode.position.clone() as any;
            this.pos2 = this.pos1.add(new cc.Vec2(0, this.distince))
        }
        this.moveNode.active = false;
    }


    public setPosition(node, visible, x, y) {
        node.active = visible;
        node.x = x;
        node.y = y;
    }

    public copyNode() {
        let tempButtom = cc.instantiate(this.moveNode);
        tempButtom.active = true;
        this.moveNode.parent.addChild(tempButtom)
        tempButtom.x = this.pos2.x;
        tempButtom.y = this.pos2.y;
        return tempButtom;
    }

    public removeTemp(tempButtom) {
        tempButtom.active = false;
        tempButtom.removeFromParent();
        tempButtom.destroy();
    }

    public onPosCallback(tempButtom) {
        if (this.showBanner)
            moosnow.platform.showBanner();
        this.removeTemp(tempButtom);

        this.setPosition(this.moveNode, true, this.pos1.x, this.pos1.y);

        this.unschedule(this.onPosCallback)
    }

}
