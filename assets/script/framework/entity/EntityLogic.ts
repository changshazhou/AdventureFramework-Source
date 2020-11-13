export default class EntityLogic extends cc.Component {

    constructor() {
        super();
    }
    public poolName: string = "";
    onEnable() {
    }
    start() {

    }
    public mLogicData: any;
    /**
     * 父类缓存willShow，onShow传递到实体的逻辑数据
     */
    public get LogicData() {
        return this.mLogicData;
    }
    willShow(data?) {
        this.mLogicData = data;
        if (data) {
            if (!isNaN(data.x))
                this.node.x = data.x
            if (!isNaN(data.y))
                this.node.y = data.y
            if (!isNaN(data.width))
                this.node.width = data.width
            if (!isNaN(data.height))
                this.node.height = data.height
        }
    }



    onShow(data?) { }
    /**
     * 框架更新
     * @param {*} dt 
     */
    onFwUpdate(delta) { }
    willHide(data?) { }
    onHide(data?) { }
    /**
     * 碰撞回调
     */
    onCollision(other: EntityLogic) {

    }
    unuse() {
    }
    reuse() {
    }
    pause() {
    }
    resume() {
    }
    onDisable() {
    }
}