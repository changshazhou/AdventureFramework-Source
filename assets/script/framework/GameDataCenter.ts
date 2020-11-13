import BaseModule from '../framework/modules/BaseModule'
import EventType from '../utils/EventType';
import Common from '../utils/Common';
import { LevelCfg } from '../../sheets/vo/LevelCfg';
import { SkinCfg } from '../../sheets/vo/SkinCfg';
import { PrizeBox } from '../../sheets/vo/PrizeBox';

export default class GameDataCenter extends BaseModule {

    constructor() {
        super();
        this.initNewData();
    }

    private CURRENT_NEW_USER: string = "CURRENT_NEW_USER";
    private VIBRATE_SWITCH: string = "VIBRATE_SWITCH";
    private CURRENT_LEVEL: string = "CURRENT_LEVEL";
    private TOKEN: string = "token";
    private OPEN_ID: string = "OPEN_ID";
    private SP_NUM: string = "SP_NUM";
    private SP_DATE: string = "SP_DATE";
    private FOLLOW_TAG: string = "FOLLOW_TAG";


    private USER_LEVEL: string = "USER_LEVEL";

    private COIN: string = "COIN";
    private DIAMOND: string = "DIAMOND";
    private SIGN_NUM: string = "SIGN_NUM";
    private SIGN_DATE: string = "SIGN_DATE";
    private TRYING_DATE: string = "TRYING_DATE";
    private TRYING_GUN: string = "TRYING_GUN";
    private EGG_SKIN: string = "EGG_SKIN";
    private USE_EGG_SKIN: string = "USE_EGG_SKIN";
    private SIGN_VIDEO_DATE: string = "SIGN_VIDEO_DATE";
    private COIN_ADD: string = "COIN_ADD";

    private AIR_DROP_NUM: string = "AIR_DROP_NUM";
    private BENEFITS_TIME: string = "BENEFITS_TIME";

    private CURRENT_SKIN = "CURRENT_SKIN";
    private USER_SKIN = "USER_SKIN";
    private USER_PRIZE_KEY = "USER_PRIZE_KEY";
    private mCurrentMisTouchCount: number = 0;

    getCurrentMisTouchCount() {
        // if (!this.mCurrentMisTouchCount)
        //     this.mCurrentMisTouchCount = moosnow.setting.getInt(this.MIS_TOUCH_POS_COUNT, 0);
        return this.mCurrentMisTouchCount
    }
    setCurrentMisTouchCount(num: number) {
        this.mCurrentMisTouchCount = num;
        // moosnow.setting.setValue(this.MIS_TOUCH_POS_COUNT, num);
    }


    //获取当前的收益
    getCoinAdd() {
        return moosnow.setting.getInt(this.COIN_ADD, 1);
    }
    setCoinAdd(num: number) {
        moosnow.setting.setValue(this.COIN_ADD, num);
    }

    //是否新手
    getIsNew() {
        return moosnow.setting.getBool(this.CURRENT_NEW_USER, true);
    }
    setIsNew(on: boolean) {
        moosnow.setting.setBool(this.CURRENT_NEW_USER, on);
    }
    //获取token
    getToken() {
        return moosnow.setting.getString(this.TOKEN, "");
    }
    setToken(v) {
        moosnow.setting.setValue(this.TOKEN, v);
    }
    //获取openid
    getOpenid() {
        return moosnow.setting.getString(this.OPEN_ID, "");
    }
    setOpenid(v) {
        moosnow.setting.setValue(this.OPEN_ID, v);
    }

    //振动
    getVibrateSetting(): boolean {
        return moosnow.setting.getBool(this.VIBRATE_SWITCH, true);
    }
    setVibrateSetting(on: boolean) {
        moosnow.setting.setBool(this.VIBRATE_SWITCH, on);
        moosnow.event.sendEventImmediately(EventType.VIBRATESWITCH_CHANGED, on);
    }





    //新手初始化
    initNewData() {
        if (this.getToken()) return;
        //关卡初始化
        moosnow.setting.setValue(this.CURRENT_LEVEL, 1);
        moosnow.setting.setValue(this.COIN, 500);
        moosnow.setting.setObject(this.USER_SKIN, {
            10001: { "coinNum": 1000 }
        });

        this.addSp(3);
        this.setToken(Common.generateUUID())
    }
    //空投数量
    getAirdropNum() {
        return moosnow.setting.getInt(this.AIR_DROP_NUM, 10);
    }
    setAirdropNum(value: number = 1) {
        let v = moosnow.setting.setValue(this.AIR_DROP_NUM, value);
    }
    //获得福利时间
    getBenefitsTime() {
        return moosnow.setting.getInt(this.BENEFITS_TIME, 0);
    }
    //设置获得福利时间
    setBenefitsTime(num: number) {
        moosnow.setting.setValue(this.BENEFITS_TIME, num);
    }

    private mCurrentLevel: number
    private mTempLevel: number;
    //当前关卡
    getCurrentLevel() {
        if (!this.mCurrentLevel)
            return moosnow.setting.getInt(this.CURRENT_LEVEL, 1);
        return this.mCurrentLevel;
    }
    setCurrentLevel(value: number) {
        this.mCurrentLevel = value;
        return moosnow.setting.getInt(this.CURRENT_LEVEL, value);
    }
    addCurrentLevel(value: number = 1) {
        let v = moosnow.setting.appendInt(this.CURRENT_LEVEL, value);
        this.mCurrentLevel = v;
        moosnow.event.sendEventImmediately(EventType.LEVEL_CHANGED, v);

    }

    private mUserLevel = null;
    getUserLevel() {
        if (!this.mUserLevel)
            this.mUserLevel = moosnow.setting.getObject(this.USER_LEVEL, "{}")
        return this.mUserLevel;
    }
    getMaxLevel() {
        let maxLevel: number = 0;
        let userLevel = Lite.data.getUserLevel();
        for (let k in userLevel) {
            if (parseInt(k) > maxLevel) {
                maxLevel = parseInt(k)
            }
        }
        return maxLevel + 1;
    }
    initUserLevel() {
        let all = LevelCfg.getAll();
        let playerLevel = this.getUserLevel();
        if (Common.isEmpty(playerLevel)) {
            for (let i = 0; i < all.length; i++) {
                let prefab = all[i].prefab;
                playerLevel[i] = {
                    time: 0,
                    prefab: prefab  //预制体名称 level1 开始
                }
            }
            moosnow.setting.setObject(this.USER_LEVEL, this.mUserLevel)
        }


    }
    setUserLevel(level, time = 0) {
        let playerLevel = this.getUserLevel();
        if (playerLevel[level]) {
            playerLevel[level].time = time;
        }
        moosnow.setting.setObject(this.USER_LEVEL, this.mUserLevel)
    }

    getNextLevel() {
        let playerLevel = this.getUserLevel();
        let nextLv = this.getCurrentLevel();
        for (let lv in playerLevel) {
            if (playerLevel[lv].time == 0) {
                if (parseInt(lv) < nextLv)
                    nextLv = parseInt(lv)
            }
        }
        return nextLv;
    }


    private mCoin: number = 0;
    /***********
     * 金币
     */
    public getCoin() {
        if (this.mCoin == 0)
            this.mCoin = moosnow.setting.getInt(this.COIN, 0);
        return this.mCoin;
    }
    public subCoin(v: number) {
        this.mCoin -= v;
        moosnow.event.sendEventImmediately(EventType.COIN_CHANGED, this.mCoin);
    }
    public addCoin(v: number) {
        this.mCoin += v
        moosnow.event.sendEventImmediately(EventType.COIN_CHANGED, this.mCoin);
    }
    public setCoin(v: number) {
        this.mCoin = v;
        moosnow.event.sendEventImmediately(EventType.COIN_CHANGED, this.mCoin);
    }
    public saveCoin() {
        moosnow.setting.setValue(this.COIN, this.mCoin);
        // moosnow.event.sendEventImmediately(EventType.COIN_CHANGED, this.mCoin);
    }

    private mDiamond: number = 0;
    public getDiamond() {
        if (this.mDiamond == 0)
            this.mDiamond = moosnow.setting.getInt(this.DIAMOND, 0);
        return this.mDiamond;
    }
    public subDiamond(v) {
        this.mDiamond -= v
        moosnow.event.sendEventImmediately(EventType.DIAMOND_CHANGED, this.mDiamond);
    }
    public addDiamond(v) {
        this.mDiamond += v
        moosnow.event.sendEventImmediately(EventType.DIAMOND_CHANGED, this.mDiamond);
    }
    public setDiamond(v) {
        this.mDiamond = v;
        moosnow.event.sendEventImmediately(EventType.DIAMOND_CHANGED, this.mDiamond);
    }
    public saveDiamond() {
        moosnow.setting.setValue(this.DIAMOND, this.mDiamond);
        // moosnow.event.sendEventImmediately(EventType.DIAMOND_CHANGED, this.mDiamond);
    }



    //每日签到
    getSignNum() {
        return moosnow.setting.getInt(this.SIGN_NUM, 0);
    }
    addSignNum() {
        moosnow.setting.appendInt(this.SIGN_NUM, 1);
        moosnow.setting.setValue(this.SIGN_DATE, Common.formatTime(new Date()));
    }
    setVideoSign() {
        moosnow.setting.setValue(this.SIGN_VIDEO_DATE, Common.formatTime(new Date()));
    }
    getIsSign() {
        let now = Common.formatTime(new Date());
        return (now == moosnow.setting.getString(this.SIGN_DATE, ""));
    }
    getIsVideoSign() {
        let now = Common.formatTime(new Date());
        return (now == moosnow.setting.getString(this.SIGN_VIDEO_DATE, ""));
    }




    private mCurrentSkinId: number;
    getCurrentSkinId() {
        if (!this.mCurrentSkinId)
            this.mCurrentSkinId = moosnow.setting.getInt(this.CURRENT_SKIN, 10001)
        return this.mCurrentSkinId;
    }

    setCurrentSkinId(skinId: number) {
        this.mCurrentSkinId = skinId;
        moosnow.setting.setValue(this.CURRENT_SKIN, skinId)
        return this.mCurrentSkinId;
    }

    private mUserSkin: Object
    getUserSkin() {
        if (!this.mUserSkin)
            this.mUserSkin = moosnow.setting.getObject(this.USER_SKIN, "{}")
        return this.mUserSkin;
    }
    addUserSkinCoin(skinId: number) {
        let userSkin = this.getUserSkin();
        let addSkin = SkinCfg.get(skinId) as SkinCfg;
        if (!userSkin[skinId]) {
            userSkin[skinId] = {
                coinNum: addSkin.coinNum
            }

        }
        this.mUserSkin = userSkin;
        moosnow.setting.setObject(this.USER_SKIN, this.mUserSkin)
        return this.mUserSkin;
    }
    addUserSkinVideo(skinId: number) {
        let userSkin = this.getUserSkin();
        if (userSkin[skinId]) {
            userSkin[skinId].videoNum += 1
        }
        else {
            userSkin[skinId] = {
                videoNum: 1
            }
        }
        this.mUserSkin = userSkin;
        moosnow.setting.setObject(this.USER_SKIN, this.mUserSkin)
        return this.mUserSkin;
    }
    getUserSkinById(skinId: number) {
        let userSkin = this.getUserSkin();
        return userSkin[skinId];
    }



    addTrying(tryingId) {
        moosnow.setting.setValue(this.TRYING_GUN, tryingId);
        moosnow.setting.setValue(this.TRYING_DATE, Common.formatTime(new Date()));
    }
    getIsTrying() {
        let now = Common.formatTime(new Date());
        return (now == moosnow.setting.getString(this.TRYING_DATE, ""));
    }
    getTrying() {
        return moosnow.setting.getInt(this.TRYING_GUN, 0)
    }

    private mSelectSkin: number;
    public getSelectSkin() {
        if (!this.mSelectSkin)
            this.mSelectSkin = this.getCurrentSkinId();
        return this.mSelectSkin;
    }
    public setSelectSkin(value: number) {
        this.mSelectSkin = value;
    }


    private mMistouchTag: number = 1;
    public getMistouchTag() {
        return this.mMistouchTag;
    }
    public setMistouchTag(value) {
        this.mMistouchTag = value;
    }

    private mPrizeBox;
    public getPrizeBox() {
        if (!this.mPrizeBox)
            this.mPrizeBox = {}
        return this.mPrizeBox;
    }

    public clearPrizeBox() {
        this.mPrizeBox = {}
    }

    public lockPrizeBox(prizeId: number, type: number, coinNum: number = 0) {
        let userBox = this.getPrizeBox();
        userBox[prizeId] = {
            prizeId: prizeId,
            type: type == 0 ? 0 : 1,
            coinNum
        }
        this.mPrizeBox = userBox
    }
    public getUserPrizeBoxById(prizeId: number) {
        let userBox = this.getPrizeBox();
        return userBox[prizeId];
    }

    private mPrizeKey: number;
    public getPrizeKey() {
        if (this.mPrizeKey == null)
            this.mPrizeKey = 3
        return this.mPrizeKey
    }

    public addPrizeKey(keyNum) {
        this.mPrizeKey += keyNum
    }


    public clearPrizeKey() {
        this.mPrizeKey = null;
        moosnow.setting.setValue(this.USER_PRIZE_KEY, "")
    }


    private mEggSkin: object
    public getEggSkin() {
        if (!this.mEggSkin)
            this.mEggSkin = moosnow.setting.getObject(this.EGG_SKIN, "{}");
        return this.mEggSkin;
    }

    public hasEggSkin(id) {
        let eggSkin = this.getEggSkin();
        return !!eggSkin[id]
    }

    public unlockEggSkin(id) {
        let eggSkin = this.getEggSkin();
        eggSkin[id] = true;
        moosnow.setting.setObject(this.EGG_SKIN, eggSkin);
    }


    public useEggSkin(id) {
        moosnow.setting.setValue(this.USE_EGG_SKIN, id);
    }

    public getUseEggSkin() {
        return moosnow.setting.getInt(this.USE_EGG_SKIN, 0)
    }

    public clearUseEggSkin() {
        moosnow.setting.setValue(this.USE_EGG_SKIN, "0")
    }

    private mCutNum: number = 0;
    public clearCutNum() {
        this.mCutNum = 0;
    }

    public addCutNum(num) {
        this.mCutNum += num;
        moosnow.event.sendEventImmediately(EventType.GAME_REFRESH_CUT_NUM, this.mCutNum)
    }

    public getCutNum() {
        return this.mCutNum;
    }

    public addFollowSp() {
        this.getSpNum();
        this.mSpNum += 5;
        moosnow.setting.setValue(this.SP_NUM, this.mSpNum);
        moosnow.event.sendEventImmediately(EventType.SP_NUM_CHANGED, this.mSpNum)
    }

    public addVideoSp() {
        this.addSp(5)
    }
    public getSpTime() {
        return moosnow.setting.getInt(this.SP_DATE, 0);
    }

    public addChangeTag() {
        moosnow.setting.setValue(this.FOLLOW_TAG, Date.now());
    }
    public getChangeTag() {
        return moosnow.setting.getInt(this.FOLLOW_TAG, 0);
    }

    public addTimeSp() {
        this.addSp(1);
        moosnow.setting.setValue(this.SP_DATE, Date.now());

    }
    public addSp(value: number) {
        this.getSpNum();
        this.mSpNum += value;
        if (this.mSpNum > 10) {
            this.mSpNum = 10
        }
        if (this.mSpNum <= 0)
            this.mSpNum = 0
        moosnow.setting.setValue(this.SP_NUM, this.mSpNum);
        moosnow.event.sendEventImmediately(EventType.SP_NUM_CHANGED, this.mSpNum)
    }
    private mSpNum: number;
    public getSpNum() {
        if (!this.mSpNum)
            this.mSpNum = moosnow.setting.getInt(this.SP_NUM, 0)
        if (this.mSpNum < 0)
            this.mSpNum = 0
        return this.mSpNum;
    }

}