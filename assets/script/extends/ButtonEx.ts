const { ccclass, property } = cc._decorator;

@ccclass
export default class ButtonEx extends cc.Component {
    @property
    public enableEffect: boolean = true;
    @property
    public enableMusic: boolean = true;
    @property
    public autoScale: boolean = false;

    @property
    public autoSwing: boolean = false;

    @property
    public zoomTime: number = 1;

    @property
    public scaleMax: number = 1;
    @property
    public scaleMin: number = 0.8;
    @property
    public enableLogPoint: boolean = false;
    @property
    public logPointName: string = "";

    private mDownEffect: boolean = false;


    private mSwingAction = cc.sequence(
        cc.rotateTo(0.3, 10),
        cc.rotateTo(0.6, -10),
        cc.rotateTo(0.3, 0),
        cc.scaleTo(0.3, 0.8),
        cc.scaleTo(0.3, 1)
    ).repeatForever()

    private runAnim() {
        if (this.autoScale)
            this.autoScaleZoomOut();
        else
            if (this.autoSwing)
                this.node.runAction(this.mSwingAction)
    }

    public start() {
        this.runAnim();
    }


    public onEnable() {
        this.node.scale = 1;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.mouseUpEffect, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.mouseUpEffect, this);



    }
    public onMouseDown() {
        if (this.mDownEffect)
            return;
        this.mDownEffect = true;

        Lite.audio.playClickEffect();

        if (this.enableEffect)
            this.mouseDownEffect();

    }
    private removeMouseEffect() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.mouseDownEffect, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.mouseUpEffect, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.mouseUpEffect, this);
    }

    private mouseDownEffect() {
        this.node.scale = 1;
        this.node.runAction(
            cc.sequence(
                cc.scaleTo(0.1, 0.7, 0.7),
                cc.callFunc(() => {
                    // this.mouseUpEffect();
                }, this)
            )
        )
    }
    private mouseUpEffect() {
        this.node.stopAllActions();
        this.runAnim();
        this.node.scale = 0.7;
        this.node.runAction(
            cc.sequence(
                cc.scaleTo(0.1, 1, 1),
                cc.callFunc(() => {
                    this.mDownEffect = false;
                }, this)
            )
        )
    }

    private autoScaleZoomOut() {
        this.node.runAction(
            cc.sequence(
                cc.scaleTo(this.zoomTime, this.scaleMin, this.scaleMin),
                cc.callFunc(() => {
                    this.autoScaleZoomIn();
                }, this)
            )
        )
    }
    /** 
     * 
     */
    private autoScaleZoomIn() {
        this.node.runAction(
            cc.sequence(
                cc.scaleTo(this.zoomTime, this.scaleMax, this.scaleMax),
                cc.callFunc(() => {
                    this.autoScaleZoomOut();
                }, this)
            )
        )
    }
    public onDisable() {
        this.removeMouseEffect();
        // this.node.stopAction(this.mSwingAction)
    }
}