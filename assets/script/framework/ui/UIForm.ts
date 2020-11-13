import DelayEx from "../../extends/DelayEx";
import Common from "../../utils/Common";

export default class UIForm extends cc.Component {


    public isPopEffect: boolean = false;
    public isMask: boolean = false;
    public fullView: boolean = true;
    protected formName: string = "";
    private maskName = "img_mask";
    private texture: cc.Texture2D = null;
    constructor() {
        super();
        this.formName = "";
    }
    start() {
        if (this.isMask) {
            this.addMask();
        }
    }

    private getSingleTexture() {
        if (this.texture) {
            return this.texture;
        }

        let data: any = new Uint8Array(2 * 2 * 4);
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                data[i * 2 * 4 + j * 4 + 0] = 255;
                data[i * 2 * 4 + j * 4 + 1] = 255;
                data[i * 2 * 4 + j * 4 + 2] = 255;
                data[i * 2 * 4 + j * 4 + 3] = 255;
            }
        }

        let texture = new cc.Texture2D();
        texture.initWithData(data, cc.Texture2D.PixelFormat.RGBA8888, 2, 2);
        texture.handleLoadedTexture();
        this.texture = texture;
        return this.texture;
    }

    public addMask() {
        if (this.node.getChildByName(this.maskName)) {
            this.node.active = true;
            return;
        }

        let skin = "texture/game/img_mask";
        let mask = new cc.Node();
        let sprite = mask.addComponent(cc.Sprite);
        let widget = mask.addComponent(cc.Widget);
        widget.isAlignLeft = widget.isAlignTop = widget.isAlignRight = widget.isAlignBottom = true;
        widget.left = widget.top = widget.right = widget.bottom = 0;

        let maskTexture = this.getSingleTexture();
        sprite.spriteFrame = new cc.SpriteFrame(maskTexture);
        mask.color = new cc.Color(0, 0, 0);
        mask.opacity = 126;
        mask.active = true;
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.spriteFrame.insetBottom = 1;
        sprite.spriteFrame.insetTop = 1;
        sprite.spriteFrame.insetLeft = 1;
        sprite.spriteFrame.insetRight = 1;
        mask.width = this.node.width
        mask.height = this.node.height
        this.node.addChild(mask);
        mask.name = this.maskName;
        mask.zIndex = -1
        mask.on(cc.Node.EventType.TOUCH_START, this.onMaskMouseDown, this)
    }

    public showDelay() {
        let dex = this.getComponent(DelayEx);
        if (dex)
            dex.onShow();
    }

    public removeMask() {
        if (this.node.getChildByName(this.maskName)) {
            this.node.active = false;
            return;
        }
    }

    public onMaskMouseDown(e: cc.Event.EventTouch) {
        e.stopPropagation();
    }
    /**
    * 隐藏UIForm
    */
    hide() {
        // MLF.UI.destroyUIForm(this.formName)
    }

    private mFormData: any;
    /**
     * 父类缓存willShow，onShow传递到实体的逻辑数据
     */
    public get FormData() {
        return this.mFormData;
    }
    willShow(data?) {
        this.mFormData = data;
        this.showDelay();
    }

    onShow(data) {

    }

    willHide(data) {

    }

    onHide(data) {

    }

    onEnable() {
    }

    onDisable() {
    }

    hideAnim(cb) {
        cb();
    }
}
