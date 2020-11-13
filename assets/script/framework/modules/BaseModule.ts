const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseModule extends cc.Component {
    protected moduleName: string = "";
    constructor() {
        super();
        // this.moduleName = "";
    }

    onEnable() {
        // Lite.regisiterModule(this);

    }

    onDisable() {
    }
}