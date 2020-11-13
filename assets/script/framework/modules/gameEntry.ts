
import { UIModule } from "./UIModule";
import AppConfig from "./AppConfig";
import AudioModule from "./AudioModule";
import ResourceModule from "./ResourceModule";
import GameDataCenter from "../GameDataCenter";
import GameState from "./GameState";
import MoveUtil from "../../utils/MoveUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameEntry extends cc.Component {


    constructor() {
        super()
    }

    start() {

        // this.mMyGame = new GameState();
        this.mData = new GameDataCenter();
        this.mAudio = new AudioModule();
        window["Lite"] = this;
        cc.game.addPersistRootNode(this.node);
    }

    private mMyGame: GameState;
    public get myGame() {
        return this.mMyGame;
    }

    public set myGame(value) {
        this.mMyGame = value;
    }

    private mData: GameDataCenter;
    public get data() {
        return this.mData;
    }

    private mConfig: AppConfig = new AppConfig();
    public get config() {
        return this.mConfig;
    }

    private mAudio: AudioModule;
    public get audio() {
        return this.mAudio;
    }
    public set audio(value: AudioModule) {
        this.mAudio = value;
    }


    private mUi: UIModule;
    public get ui() {
        return this.mUi;
    }
    public set ui(value) {
        this.mUi = value
    }


    private mResource: ResourceModule = new ResourceModule();
    public get resource() {
        return this.mResource;
    }

    private mMoveUtil: MoveUtil = new MoveUtil();
    public get moveUtil() {
        return this.mMoveUtil;
    }


    update(dt) {
        this.moveUtil.onUpdate(dt);
        // Lite.entity.update(dt);
    }
}