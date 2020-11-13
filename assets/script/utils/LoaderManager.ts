
export class LoaderManager {
    public static preLoad3D(urls: any) {
        return new Promise((resolve) => {
            if (urls.length == 0) {
                resolve();
            } else {
                Laya.Sprite3D.load(urls, Laya.Handler.create(this, () => {
                    resolve();
                }, null, false));
            }
        })
    }

    public static preLoad(urls: any) {
        return new Promise((resolve) => {
            if (urls.length == 0) {
                resolve();
            } else {
                Laya.loader.load(urls, Laya.Handler.create(this, () => {
                    resolve();
                }, null, false));
            }
        })
    }

    public static preLoadTexture2D(urls: string[]) {
        return new Promise((resolve) => {
            this.load(urls, resolve);
        })
    }

    private static load(urls: string[], resolve: any) {
        var url: string = urls.pop();
        if (!url) {
            resolve();
        } else {
            Laya.Texture2D.load(url, Laya.Handler.create(this, (r) => {
                this.load(urls, resolve);
            }, null, false));
        }
    }

    public static get3D(url: string, name: string, clone: boolean = true): any {
        var sp: Laya.Sprite3D = Laya.loader.getRes(url);
        if (!clone) return sp.getChildByName(name) as Laya.Sprite3D;
        return (sp.getChildByName(name) as Laya.Sprite3D).clone();
    }

    public static get3DTo(url: string, name: string): any {
        var sp: Laya.Sprite3D = Laya.loader.getRes(url);
        var cSp: Laya.Sprite3D = sp.getChildByName(name) as Laya.Sprite3D;
        var souce: Laya.Sprite3D = new Laya.Sprite3D();
        souce = cSp.clone() as any;
        return souce;
    }

    public static getCamera(url: string, name: string, clone: boolean = true): any {
        var sp: Laya.Sprite3D = Laya.loader.getRes(url);
        var camera: Laya.Camera = sp.getChildByName(name) as Laya.Camera;
        if (!clone) return camera;
        return camera.clone();
    }

    public static getLight(url: string, name: string): Laya.DirectionLight {
        var sp: Laya.Sprite3D = Laya.loader.getRes(url);
        var light: Laya.DirectionLight = sp.getChildByName(name) as Laya.DirectionLight;
        return light;
    }

    public static loadSounds(urls: string[]) {
        return new Promise((resovle) => {
            this.preDownFlie(urls, resovle);
        })

    }

    public static soundBaseUrl: string = "";

    public static preDownFlie(urls: string[], resovle: any): void {
        var url: string = urls.pop();
        if (!url) {
            resovle();
            return;
        }
        url = this.soundBaseUrl + url;
        if (Laya['BMiniAdapter']) {
            Laya['BMiniAdapter'].downLoadFile(url, "sound", Laya.Handler.create(this, () => {
                this.preDownFlie(urls, resovle);
            }));
        } else if (Laya.MiniAdpter) {
            if (!window["tt"]) {
                // url = ServerConfig.url + url
                // Laya.stage
            }
            Laya.MiniAdpter.downLoadFile(url, "sound", Laya.Handler.create(this, () => {
                this.preDownFlie(urls, resovle);
            }));
        } else {
            Laya.loader.load(url, Laya.Handler.create(this, () => {
                this.preDownFlie(urls, resovle);
            }), null, Laya.Loader.SOUND);
        }

    }

    /**
     * 注册纹理字体
     * @param {string} fontUrl 配置文件
     * @param {string} fontName
     */
    static registerFont(fontUrl, fontName) {
        return new Promise(resolve => {
            var mBitmapFont = new Laya.BitmapFont();
            mBitmapFont.loadFont(fontUrl, Laya.Handler.create(this, () => {
                Laya.Text.registerBitmapFont(fontName, mBitmapFont);
                resolve();
            }));
        });
    }

    public static preLoadJson(urls: any) {
        return new Promise(resolve => {
            if (urls.length == 0) {
                resolve();
            } else {
                Laya.loader.load(urls, Laya.Handler.create(this, () => {
                    resolve();
                }), null, Laya.Loader.JSON);
            }
        })
    }
}