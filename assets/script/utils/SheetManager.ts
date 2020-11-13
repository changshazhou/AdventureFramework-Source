export class SheetManager {
    private static data: any;

    public static loadDB(url: string, callback: Function) {

        if (url.indexOf("http") == -1) {
            cc.loader.loadRes(url, (err, res) => {
                if (err)
                    console.warn('loadDB err ', err)
                console.log('load db ', res)
                this.data = res.json;
                callback();
            })
        }
        else {
            cc.loader.load(url, (err, res) => {
                if (err)
                    console.warn('loadDB err ', err)
                console.log('load db ', res)
                this.data = res;
                callback();
            })
        }

    }

    public static get(table: string, id: any, clz: any): any {
        var value: any = this.data[table][id];
        if (!value) return;
        var keys: string[] = this.getKeys(this.data[table].keys);
        var v: any;
        var vo: any = new clz();
        for (var i: number = 0; i < keys.length; i++) {
            v = this.data.dic[value[i]];
            vo[keys[i]] = v !== "null" ? v : null;
        }
        clz[id] = vo;
        return vo;
    }

    private static getKeys(indexs: number[]): string[] {
        var keys: string[] = [];
        for (var i: number = 0; i < indexs.length; i++) {
            var index: number = indexs[i];
            keys.push(this.data.dic[index]);
        }
        return keys;
    }

    public static getTableLength(tableName: string): number {
        var obj: any = this.data[tableName];
        if (obj.length) return obj.length;
        var count: number = 0;
        for (var key in obj) {
            count++;
        }
        obj.length = count - 1;
        return count - 1;
    }

    // public static get(table: string, id: any, vo: any, keyStr: string, index: number = -1): any {
    //     var value: any;
    //     if (index != -1) value = this.data[table][id][index];
    //     else value = this.data[table][id];
    //     if (!value) return null;
    //     var keys: string[] = keyStr.split(",");
    //     var v: any;
    //     for (var i: number = 0; i < keys.length; i++) {
    //         v = this.data.dic[value[i]];
    //         vo[keys[i]] = v !== "null" ? v : null;
    //     }
    //     return vo;
    // }


    public static getList(table: string): object {
        return this.data[table];
    }

    public static getComplexLength(table: string, id: any): number {
        return this.data[table][id].length;
    }

    public static getComplex(table: string, id: any, cls: any): Array<any> {
        var arr: Array<any> = this.getList(table)[id];
        var keys: string[] = this.getKeys(this.data[table].keys);
        var vos: Array<any> = [];
        for (var j: number = 0; j < arr.length; j++) {
            var v: any;
            var vo: any = new cls();
            for (var i: number = 0; i < keys.length; i++) {
                v = this.data.dic[arr[j][i]];
                vo[keys[i]] = v !== "null" ? v : null;
            }
            vos.push(vo);
        }
        return vos;
    }

    public static getAllSheets(table: string, clz: any): Array<any> {
        var obj: any = this.getList(table);
        var arr: Array<any> = [];
        for (var key in obj) {
            if (key != "keys")
                arr.push(this.get(table, key, clz));
        }
        return arr;
    }
}