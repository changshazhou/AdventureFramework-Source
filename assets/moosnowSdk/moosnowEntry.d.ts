import PlatformModule from "./platform/PlatformModule";
import AdModule from "./ad/AdModule";
import { HttpModule } from "./http/HttpModule";
import GameDataCenter from "./framework/GameDataCenter";
import SettingModule from "./framework/SettingModule";
import Common from "./utils/Common";
import { PlatformType } from "./enum/PlatformType";
import EventModule from "./framework/EventModule";
import EventType from "./utils/EventType";
import ResourceModule from "./framework/ResourceModule";
import AudioModule from "./framework/AudioModule";
import { BLOCK_HORIZONTAL, BLOCK_VERTICAL } from "./enum/BLOCK_POSITION";
import { BANNER_HORIZONTAL, BANNER_VERTICAL } from "./enum/BANNER_POSITION";
import moosnowAppConfig from "./model/moosnowAppConfig";
declare global {
    class moosnow {
        static VIDEO_STATUS: {
            END: string;
            NOTEND: string;
            ERR: string;
        };
        static VIDEO_MSG: {
            ERR: string;
            NOTEND: string;
        };
        static SHARE_MSG: {
            FAIL: string;
        };
        static BANNER_HORIZONTAL: typeof BANNER_HORIZONTAL;
        static BANNER_VERTICAL: typeof BANNER_VERTICAL;
        static BLOCK_HORIZONTAL: typeof BLOCK_HORIZONTAL;
        static BLOCK_VERTICAL: typeof BLOCK_VERTICAL;
        static SHARE_CHANNEL: {
            ARTICLE: string;
            VIDEO: string;
            TOKEN: string;
            LINK: string;
        };
        static APP_PLATFORM: typeof PlatformType;
        static PLATFORM_EVENT: typeof EventType;
        static Common: typeof Common;
        static AD_POSITION: {
            NONE: number;
            BANNER: number;
            FLOAT: number;
            SIDE: number;
            CENTER: number;
            EXPORT: number;
            BACK: number;
            MASK: number;
            WAIT: number;
            LEFTRIGHT: number;
            EXPORT_FIXED: number;
            ROTATE: number;
            EXTEND2: number;
            EXTEND3: number;
            EXTEND4: number;
            TOP: number;
            RECOVER: number;
        };
        /**
             * 获取当前的游戏平台
             */
        static getAppPlatform(): PlatformType;
        static appConfig(): moosnowAppConfig;
        constructor();
        private initHttp;
        private initPlatform;
        private initAd;
        private mPlatform;
        static get platform(): PlatformModule;
        private mAd;
        /**
         * 墨雪广告
         */
        static get ad(): AdModule;
        private mHttp;
        static get http(): HttpModule;
        private mData;
        /**
         * 本地内存
         */
        static get data(): GameDataCenter;
        private mResource;
        static get resource(): ResourceModule;
        private mSetting;
        /**
         * 本地持久化缓存
         */
        static get setting(): SettingModule;
        /**
         * 事件消息
         */
        private mEvent;
        static get event(): EventModule;
        private mAudio;
        static get audio(): AudioModule;
        static set audio(value: AudioModule);
    }
}

