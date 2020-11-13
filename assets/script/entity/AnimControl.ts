import NodeAttribute from "../../moosnowSdk/ui/attribute/NodeAttribute";
import { DeployAnimationNames } from "../model/DeployAnimationNames";
import { DeployAnimationType } from "../model/DeployAnimationType";
import DeployItem from "../model/DeployItem";
import Common from "../utils/Common";
import AnimItem from "./AnimItem";
import DragonBonesOptions from "./DragonBonesOptions";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimControl extends cc.Component {

    public onDragonBonesCallback() {

    }
    private currentAnim: AnimItem = null
    private animQuene: Array<AnimItem> = [];
    private cacheAnimData: DeployItem;

    private reset() {
        this.cacheAnimData = null;
        this.currentAnim = null;
        this.animQuene = [];
    }
    public initAnim(data: DeployItem, origin?: Array<string>) {
        this.reset();
        this.cacheAnimData = data;
        if (origin && origin.length >= 3) {
            let skePath = "https://liteplay-1253992229.cos.ap-guangzhou.myqcloud.com/GameEdit/resources/wx840e2e246968f224/bianfu_ske_ske.json"
            let texPath = "https://liteplay-1253992229.cos.ap-guangzhou.myqcloud.com/GameEdit/resources/wx840e2e246968f224/bianfu_ske_tex.png"
            let texJPath = "https://liteplay-1253992229.cos.ap-guangzhou.myqcloud.com/GameEdit/resources/wx840e2e246968f224/bianfu_ske_tex.json"
            let options = new DragonBonesOptions(origin[0], origin[2], origin[1]);
            // let options = new DragonBonesOptions(skePath, texPath, texJPath);
            options.loadCompleted = () => {
                this.onDragonBonesCallback();
            }
            this.loadDragonBones(options);
        }
        if (data && data.attribute)
            if (data.attribute.stand_animation && data.attribute.stand_animation.type == DeployAnimationType.Frame)
                this.playTexAnim(DeployAnimationNames.stand_animation, data.attribute.stand_animation.resources, 30, 30, true)
            else if (data.attribute.run_animation && data.attribute.run_animation.type == DeployAnimationType.Frame)
                this.playTexAnim(DeployAnimationNames.run_animation, data.attribute.run_animation.resources, 30, 30, true)
    }

    public playAnim(name: string, loop: boolean = false, callback?: Function) {
        this.playingAnimName = name;
        if (this.cacheAnimData && this.cacheAnimData.attribute[name]) {
            if (this.cacheAnimData.attribute[name].type == DeployAnimationType.Frame) {
                if (this.cacheAnimData.attribute[name] && this.cacheAnimData.attribute[name].resources)
                    this.playTexAnim(this.cacheAnimData.attribute[name], this.cacheAnimData.attribute[name].resources, 30, 1, loop, callback)
            }
            else {
                this.playDragonBoneAnim(name, loop, callback)
            }
        }
        else {
            if (this.dragonBone) {
                this.playDragonBoneAnim(name, loop, callback)
            }
        }
    }


    private playingAnimName: string = "";
    private dragonBone: dragonBones.ArmatureDisplay;
    public loadDragonBones(options: DragonBonesOptions) {
        if (!this.dragonBone) {
            this.dragonBone = this.node.addComponent(dragonBones.ArmatureDisplay);
        }
        if (this.dragonBone.dragonAtlasAsset) {
            return;
        }

        if (Common.isRemote(options.skePath)) {
            this.loadDragonBonesSke(options.skePath, (dragonBonesJson) => {
                this.loadDragonBonesTexJson(options.texJson, (atlasJson) => {
                    this.loadDragonBonesTex(options.texPath, (texture) => {

                        var atlas = new dragonBones.DragonBonesAtlasAsset();
                        if (atlasJson)
                            atlas.atlasJson = atlasJson;
                        atlas.texture = texture;

                        var asset = new dragonBones.DragonBonesAsset();
                        asset.dragonBonesJson = dragonBonesJson;

                        this.dragonBone.dragonAtlasAsset = atlas;
                        this.dragonBone.dragonAsset = asset;

                        this.dragonBone.armatureName = options.armatureName;
                        if (options.loadCompleted)
                            options.loadCompleted()
                        if (this.dragonBone.getAnimationNames(this.dragonBone.armatureName).indexOf(options.animName) == -1) {
                            options.animName = this.dragonBone.getAnimationNames(this.dragonBone.armatureName)[0]
                        }
                        this.playAnim(name, true, null)
                    })
                })
            })
        }
        else {
            cc.loader.loadRes(options.skePath, dragonBones.DragonBonesAsset, (err, res) => {
                if (err) cc.error(err);
                this.dragonBone.dragonAsset = res;
                cc.loader.loadRes(options.texPath, dragonBones.DragonBonesAtlasAsset, (err, res) => {
                    this.dragonBone.dragonAtlasAsset = res;
                    this.dragonBone.armatureName = options.armatureName;
                    if (options.loadCompleted)
                        options.loadCompleted()
                    if (this.dragonBone.getAnimationNames(this.dragonBone.armatureName).indexOf(options.animName) == -1) {
                        options.animName = this.dragonBone.getAnimationNames(this.dragonBone.armatureName)[0]
                    }
                    this.playAnim(name, true, null)
                })
            })
        }
    }

    private loadDragonBonesSke(url, callback: (res: string) => void) {
        if (Common.isRemote(url)) {
            console.log("AnimControl -> loadDragonBonesSke -> url", url)
            cc.loader.load({ url, type: 'txt' }, (error, dragonBonesJson) => {
                callback(dragonBonesJson);
            })
            // cc.assetManager.loadRemote<dragonBones.DragonBonesAsset>(url, (err, res) => {
            //     if (err) cc.error(err);
            //     callback(res)
            // })
        }
        else {
            cc.loader.loadRes(url, dragonBones.DragonBonesAsset, (err, res) => {
                if (err) cc.error(err);
                callback(res);
            });
        }
    }

    private loadDragonBonesTexJson(url, callback: (res: string) => void) {
        if (Common.isRemote(url)) {
            console.log("AnimControl -> loadDragonBonesTexJson -> url", url)
            cc.loader.load({ url, type: 'txt' }, (error, atlasJson) => {
                callback(atlasJson);
            })
            // cc.assetManager.loadRemote<cc.TextAsset>(url, (err, res: cc.JsonAsset) => {
            //     callback(res.json);
            // })
        }
        else {
            callback(null);
            // cc.loader.loadRes(url, cc.JsonAsset, (err, res) => {
            //     console.log(" AnimControl -> loadDragonBonesTexJson -> local url ", res)
            //     callback(JSON.stringify(res.json));
            // });
        }
    }
    private loadDragonBonesTex(url, callback: (res: cc.Texture2D) => void) {
        if (Common.isRemote(url)) {
            console.log("AnimControl -> loadDragonBonesTex -> url", url)
            cc.assetManager.loadRemote<cc.Texture2D>(url, (err, res) => {
                callback(res);
            })
        }
        else {
            cc.loader.loadRes(url, cc.Texture2D, (err, res) => {
                callback(res);

            });
        }
    }

    public isPlaying(name: string) {
        return this.playingAnimName == name
    }



    public playTexAnim(name: string, urls: Array<string>, rate: number = 60, speed: number = 1, loop: boolean = false, callback?: Function) {
        this.playingAnimName = name;
        let animIdx = this.getAnim(name);
        if (animIdx == -1) {
            let item = new AnimItem();
            item.node = this.node.getComponent(cc.Sprite);
            item.path = name;
            item.rate = rate;
            item.speed = speed;
            item.loop = loop;
            item.playCompleted = callback;
            let frames = []
            urls.forEach((url, idx) => {
                this.loadFrame(idx, url, (i, frame) => {
                    frames.push({
                        i,
                        frame
                    });
                    if (frames.length == urls.length) {
                        this.animQuene.push(item);
                        this.currentAnim = item;
                        let temp = frames.sort((a, b) => {
                            return a.i - b.i
                        })
                        item.frames = temp.map(item => {
                            return item.frame
                        })
                    }
                })
                // this.loadTex(idx, url, (i, tex) => {
                //     item.textures[i] = tex;
                //     if (item.textures.length == urls.length) {
                //         this.animQuene.push(item);
                //         this.currentAnim = item;
                //     }
                // })
            })
            // item.urls = urls
            // this.animQuene.push(item);
            // this.currentAnim = item;
        }
        else {
            this.animQuene[animIdx].index = 0
            this.animQuene[animIdx].playCompleted = callback;
            this.currentAnim = this.animQuene[animIdx]
        }
    }
    private loadTex(idx, url, callback) {
        if (Common.isRemote(url)) {
            cc.assetManager.loadRemote(url, (error, res) => {
                // console.log("AnimControl -> loadTex -> error, res", error, res)
                if (error)
                    callback(idx, null)
                else
                    callback(idx, res);
            })
        }
        else {
            cc.loader.loadRes(url, cc.Texture2D, (error, res) => {
                if (error)
                    callback(idx, null)
                else
                    callback(idx, res);
            })
        }

    }
    private loadFrame(idx, url, callback) {
        this.loadTex(idx, url, (i, tex) => {
            callback(i, new cc.SpriteFrame(tex))
        })
    }
    private playDragonBoneAnim(name: string, loop: boolean = false, callback) {
        if (!this.dragonBone)
            return
        this.playingAnimName = name;// this.cacheAnimData.attribute[name].name;
        this.dragonBone.removeEventListener(dragonBones.EventObject.COMPLETE)
        if (callback)
            this.dragonBone.addEventListener(dragonBones.EventObject.COMPLETE, (e) => {
                callback();
            }, this.dragonBone);
        if (this.cacheAnimData && this.cacheAnimData.attribute[name]) {
            let animName = this.cacheAnimData.attribute[name].name
            this.dragonBone.playAnimation(animName, loop ? 0 : 1);
        }
        else {
            this.dragonBone.playAnimation(name, loop ? 0 : 1);
        }
    }



    private getAnim(path: string) {
        for (let i = 0; i < this.animQuene.length; i++) {
            if (this.animQuene[i].path == path) {
                return i;
                break;
            }
        }
        return -1;
    }
    public playDirAnim(name: string, path: string, rate: number = 60, speed: number = 1, loop: boolean = false, callback?: Function) {
        this.playingAnimName = name;
        let animIdx = this.getAnim(name);
        if (animIdx == -1) {
            let item = new AnimItem();
            item.node = this.node.getComponent(cc.Sprite);
            item.path = path;
            item.rate = rate;
            item.speed = speed;
            item.loop = loop;
            item.playCompleted = callback;
            cc.loader.loadResDir(path, cc.Texture2D, (error, res) => {
                item.textures = res;
                this.animQuene.push(item);
                this.currentAnim = item;
            })
        }
        else {
            this.animQuene[animIdx].index = 0
            this.animQuene[animIdx].playCompleted = callback;
            this.currentAnim = this.animQuene[animIdx]
        }
    }

    update(dt) {
        if (this.currentAnim) {
            this.currentAnim.execTime += dt;
            if (this.currentAnim.execTime >= 1 / this.currentAnim.rate) {
                this.currentAnim.execTime = 0;
                this.currentAnim.index += 1;
                if (this.currentAnim.index > this.currentAnim.frames.length - 1) {
                    if (this.currentAnim.loop) {
                        this.currentAnim.index = 0
                    }
                    else {
                        if (this.currentAnim.playCompleted)
                            this.currentAnim.playCompleted();
                        this.currentAnim = null;
                        return;
                    }
                    // this.currentAnim.node.spriteFrame = this.currentAnim.frames[this.currentAnim.index];
                    // this.currentAnim.node.spriteFrame = new cc.SpriteFrame(this.currentAnim.textures[this.currentAnim.index]);
                    // console.log('update url ', this.currentAnim.textures[this.currentAnim.index].nativeUrl, this.currentAnim.textures[this.currentAnim.index].url)
                    // moosnow.nodeHelper.changeSrc(this.currentAnim.node, {
                    //     url: this.currentAnim.urls[this.currentAnim.index],
                    //     width: this.node.width,
                    //     height: this.node.height
                    // } as NodeAttribute)
                }
                // this.currentAnim.node.spriteFrame = new cc.SpriteFrame(this.currentAnim.textures[this.currentAnim.index]);
                // console.log('update url ', this.currentAnim.textures[this.currentAnim.index].nativeUrl, this.currentAnim.textures[this.currentAnim.index].url)
                this.currentAnim.node.spriteFrame = null;
                this.currentAnim.node.spriteFrame = this.currentAnim.frames[this.currentAnim.index]
                // console.log('update url ', this.currentAnim.frames[this.currentAnim.index].nativeUrl, this.currentAnim.frames[this.currentAnim.index].url)
            }
        }
    }
}
