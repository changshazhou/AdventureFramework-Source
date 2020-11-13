
import { SheetManager } from "./utils/SheetManager";
import { ConfigData } from "../sheets/vo/ConfigData";
import AppConfig from "./framework/modules/AppConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;


    private isLogin: boolean = false;
    private preloadSeceneFinish: boolean = false;
    private preloadSceneProgress: number = 0;
    private preloadUI: boolean = false;
    private preloadUIProgress: number = 0;
    private preloadEntity: boolean = false;
    private preloadEntityProgress: number = 0;
    private preloadCfg: boolean = false;
    private preloadCfgProgress: number = 0;

    start() {

        moosnow.platform.login();
        if ((moosnow.getAppPlatform() == moosnow.APP_PLATFORM.WX && window["wx"])
            || (moosnow.getAppPlatform() == moosnow.APP_PLATFORM.QQ && window["qq"])
            || (moosnow.getAppPlatform() == moosnow.APP_PLATFORM.VIVO && window["qg"])) {

            cc.loader.downloader.loadSubpackage('gameres', (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('load subpackage successfully.');

                this.loadMainpackage();
            });
            console.log('load subpackage.');
        }

        else {
            this.loadMainpackage();
            console.log('load main package.');
        }
    }
    private subNum: number = 2;
    private curNum: number = 0;
    private subpackageLoad() {
        this.curNum++;
        if (this.curNum == this.subNum) {
            this.loadMainpackage();
        }
    }

    private loadMainpackage() {
        let cfg = `data/cfg.json`;
        console.log('load cfg json ')
        SheetManager.loadDB(`${cfg}`, () => {
            ConfigData.init();
            Lite.data.initUserLevel();
            this.preloadCfg = true;
            this.preloadCfgProgress = 100;
            this.showProgress();
            console.log('preload config completed')
            // Lite.resource.loadAssetDir('prefab/ui', cc.Prefab, (precent) => {
            //     this.preloadUIProgress = precent;
            //     this.showProgress();
            // }, () => {
            this.preloadUIProgress = 100;
            console.log('preloadUI completed')
            this.preloadUIProgress = 100;
            this.preloadUI = true;

            Lite.resource.loadAssetDir('prefab/entity', cc.Prefab, (precent) => {
                this.preloadEntityProgress = precent;
                this.showProgress();
            }, () => {
                console.log('preloadEntity completed')
                this.preloadEntityProgress = 100;
                this.preloadEntity = true;
                cc.director.preloadScene('Main', (completedCount: number, totalCount: number, item: any) => {
                    var precent = completedCount / totalCount * 100;
                    this.preloadSceneProgress = isNaN(precent) ? 0 : precent
                    this.showProgress();
                }, (error: Error, asset: cc.SceneAsset) => {
                    this.preloadSeceneFinish = true;
                    this.showProgress();
                    this.loadScene();
                    console.log('error', error, ' SceneAsset ', asset)
                })
            });

            // });
        })
    }


    onLoad() {
        this.isLogin = false;
        this.preloadSeceneFinish = false;
    }

    private showProgress() {
        let val = 0.1 + this.preloadCfgProgress * 0.1 + this.preloadEntityProgress * 0.3 + this.preloadUIProgress * 0.3 + this.preloadSceneProgress * 0.2;

        if (isNaN(val))
            this.label.string = `${0}%`
        else
            this.label.string = `${val}%`;

        this.progressBar.progress = val / 100;

        // console.log('showProgress', val)

        // if (this.preloadCfg && this.preloadSeceneFinish && this.preloadEntity && this.preloadUI)
        //     this.loadScene();

        this.node.on(cc.Node.EventType.TOUCH_END, () => {

        }, this)
    }

    loadScene() {
        cc.director.loadScene("Main");
    }
}
