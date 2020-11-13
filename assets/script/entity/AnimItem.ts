export default class AnimItem {
    public name: string = "";
    public path: string = "";
    public index: number = 0
    public textures: Array<cc.Texture2D> = [];
    public urls: Array<string> = [];
    public frames: Array<cc.SpriteFrame> = [];
    public rate: number = 60;
    public speed: number = 1;
    public loop: boolean = false;
    public isPlaying: boolean = false;
    public node: cc.Sprite = null;
    public execTime: number = 0;
    public playCompleted: Function = null
}