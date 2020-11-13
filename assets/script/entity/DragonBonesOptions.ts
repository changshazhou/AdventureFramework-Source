export default class DragonBonesOptions {
    constructor(skePath = "", texPath = "", texJson = "", animName = "stand", armatureName = "armatureName", loadCompleted?: Function) {
        this.skePath = skePath
        this.texPath = texPath
        this.texJson = texJson
        this.animName = animName
        this.armatureName = armatureName
        this.loadCompleted = loadCompleted
    }

    public skePath: string = "";
    public texPath: string = "";
    public texJson: string = "";
    public animName: string = "stand";
    public armatureName: string = "armatureName";
    public loadCompleted?: Function
}