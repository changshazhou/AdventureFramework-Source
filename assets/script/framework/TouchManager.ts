import EventType from "../utils/EventType";
const { ccclass, property } = cc._decorator;
@ccclass
export default class TouchManager extends cc.Component {
    constructor() {
        super();
    }

    private mListen = ["HomeForm"];

    start() {
        this.addListener();
    }


    addListener() {

        this.node.on(cc.Node.EventType.TOUCH_START, this.mouseDown, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.mouseMove, this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.mouseUp, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.mouseUp, this)
    }

    mouseDown(e: cc.Event.EventTouch) {
        console.log('mouseDown ', e.getTouches()[0])
        // if (!Lite.myGame.gameStarted)
        //     return;
        // console.log('donw e.target.name', e.target.name)
        // if (this.mListen.indexOf(e.target.name) == -1) return;
        // let touchPoint = e.getLocationInView();
        moosnow.event.sendEventImmediately(EventType.TOUCH_DOWN, e)
    }
    mouseMove(e) {
        // if (!Lite.myGame.gameStarted)
        //     return;
        console.log('move e.target.name', e.target.name)
        // if (this.mListen.indexOf(e.target.name) == -1) return;
        moosnow.event.sendEventImmediately(EventType.TOUCH_MOVE, e)
    }
    mouseUp(e) {
        // if (!Lite.myGame.gameStarted)
        //     return;
        // console.log('up e.target.name', e.target.name)
        // if (this.mListen.indexOf(e.target.name) == -1) return;
        moosnow.event.sendEventImmediately(EventType.TOUCH_UP, e)
    }
    removeListener() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.mouseDown, this)
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.mouseMove, this)
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.mouseUp, this)
    }

    onDisable() {
        this.removeListener();
    }
}