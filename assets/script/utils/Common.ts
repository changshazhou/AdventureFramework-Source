import EventType from "./EventType";

export default class Common {
    /**
     * 根据填入的系数，获得一个概率分布为前后小，中间高的概率数组
     */
    public static getRandomArr(min: number, max: number, xs: number = 0): number {
        var arr: Array<number> = [];
        var center: number = (max - min) / 2;
        var maxNum: number = 0;
        for (var i: number = 0; i <= max - min; i++) {
            arr[i] = 1;
            var num: number = Math.abs(i - center);
            for (var j: number = 0; j < num; j++) {
                arr[i] *= xs;
            }
            maxNum += arr[i];
            //    console.log("测试数组1>>>",i,arr[i]);
        }

        for (var i: number = 0; i < arr.length; i++) {
            arr[i] = arr[i] / maxNum;
            if (i - 1 >= 0) arr[i] = arr[i] + arr[i - 1];
        }
        var randomNum: number = Math.random();
        var relNum: number = 0;
        for (var i: number = 0; i < arr.length; i++) {
            if (randomNum <= arr[i]) {
                relNum = i;
                break;
            }
        }
        //    console.log("测试数组2>>>",min,max,arr,randomNum,relNum);
        return relNum + min;
    }
    /**
     * 转换速度
     * @param speed 
     * @param delta 
     */
    static convertSpeedByDelta(speed, delta) {
        if (delta > 167)
            delta = 16.67
        return (speed * (delta / 1000));
    }
    static convertRotationByDelta(rotation, delta) {
        if (delta > 167)
            delta = 16.67
        return (rotation * (delta / 1000));
    }
    //for循环  
    static titleCase(s) {
        var i, ss = s.toLowerCase().split(/\s+/);
        for (i = 0; i < ss.length; i++) {
            ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1);
        }
        return ss.join(' ');
    }
    static numFixed(num, len) {
        return parseFloat(parseFloat(num).toFixed(len))
    }
    static parseMoney(value) {
        if (isNaN(value))
            return 0.00;
        return parseFloat(parseFloat(value).toFixed(2))
    }
    static formatMoney(value: number) {
        let retValue: any = "0";
        if (isNaN(value))
            value = 0;
        if (value < 9999) {
            retValue = parseInt(`${value}`);
        }
        else if (value < 9999999) {
            retValue = parseFloat(`${value / 1000}`).toFixed(2) + "K";
        }
        else if (value < 9999999999) {
            retValue = parseFloat(`${value / 1000000}`).toFixed(2) + "M";
        }
        else if (value < 9999999999999) {
            retValue = parseFloat(`${value / 1000000000}`).toFixed(2) + "G";
        }
        else if (value < 9999999999999999) {
            retValue = parseFloat(`${value / 1000000000000}`).toFixed(2) + "T";
        }
        else if (value < 9999999999999999999)
            retValue = parseFloat(`${value / 1000000000000000}`).toFixed(2) + "P";
        else if (value < 9999999999999999999999)
            retValue = parseFloat(`${value / 1000000000000000000}`).toFixed(2) + "E";
        else
            retValue = parseFloat(`${value / 1000000000000000000000}`).toFixed(2) + "B";
        return retValue;
    }
    static formatDiamond(value) {
        let retValue: string = "0";
        if (isNaN(value))
            value = 0;
        if (value < 9999) {
            retValue = parseFloat(value).toFixed(0);
        }
        else if (value < 9999999) {
            retValue = parseFloat(`${value / 1000}`).toFixed(0) + "K";
        }
        else {
            retValue = parseFloat(`${value / 1000000}`).toFixed(0) + "M";
        }
        return retValue;
    }
    static formatAttack(value: number) {
        let retValue: any = "0";
        if (isNaN(value))
            value = 0;
        if (value < 9999) {
            retValue = `${value}`;
        }
        else if (value < 9999999) {
            retValue = parseFloat(`${value / 1000}`).toFixed(0) + "K";
        }
        else if (value < 9999999999) {
            retValue = parseFloat(`${value / 1000000}`).toFixed(0) + "M";
        }
        else if (value < 9999999999999) {
            retValue = parseFloat(`${value / 1000000000}`).toFixed(0) + "G";
        }
        else if (value < 9999999999999999) {
            retValue = parseFloat(`${value / 1000000000000}`).toFixed(0) + "T";
        }
        else if (value < 9999999999999999999)
            retValue = parseFloat(`${value / 1000000000000000}`).toFixed(0) + "P";
        else if (value < 9999999999999999999999)
            retValue = parseFloat(`${value / 1000000000000000000}`).toFixed(0) + "E";
        else
            retValue = parseFloat(`${value / 1000000000000000000000}`).toFixed(0) + "B";
        return retValue;
    }
    static objKeySort(obj) {//排序的函数
        var newkey = Object.keys(obj).sort();
        //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newObj = {};//创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newObj;//返回排好序的新对象
    }
    static isWeChat() {
        // cc.log("is wechat ", cc.sys.platform == cc.sys.WECHAT_GAME)
        return !!window["wx"];
    }
    static isQQPlay() {
        return false
    }
    static isObject(x) {
        var type = typeof x;
        return x !== null && (type === 'object' || type === 'function');
    }
    static object2Query(obj) {
        var args = []
        for (var k in obj)
            args.push(k + "=" + obj[k])
        return args.join("&"); // 返回对象  
    }
    static getQueryVariable(variable) {
        if (window && window.location && window.location.search) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
        }
        return (false);
    }
    /*格式化字符，类似于C# String.Format */
    static format() {
        var str = arguments[0];
        if (typeof (str) == "undefined" || str == null || str == '' || str == 'undefined') return str;
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    }
    static isFunction(fun) {
        if (typeof fun == 'function')
            return true
        return false
    }
    static isEmpty(obj) {
        if (typeof obj == 'object') {
            var name
            for (name in obj)
                return false
            return true
        }
        else if (obj === null || obj === undefined || obj === 'null' || obj === 'undefined' || obj === '')
            return true

        return false
    }
    static dateFtt(fmt, date) { //author: meizz   
        var o = {
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    static formatTime(date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return [year, month, day].map(this.formatNumber).join('/')
        // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }
    static millisecondToDate(msd: number): string {
        return this.secondToDate(msd / 1000)
    }
    static secondToDate(time: number): string {
        let retValue: string = "";
        if (isNaN(time)) {
            retValue = "00:00"
        }
        else {
            if (time < 60) {
                retValue = this.formatNumber(0) + ":" + this.formatNumber(time)
            }
            if (time > 60 && time < 60 * 60) {
                let minute = parseInt(`${time / 60.0}`)
                let second = time - minute * 60;
                retValue = this.formatNumber(minute) + ":" + this.formatNumber(second)
            }
        }
        return retValue;
    }
    //补零
    static getzf(num: number): string {
        let retValue: string = "";
        if (parseInt(`${num}`) < 10) {
            retValue = '0' + num;
        }
        else
            retValue = `${num}`
        return retValue;
    }
    static formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
    static colorRGB2Hex(color) {
        var rgb = color.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);

        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    }
    /**
     * 复制源对象属性到目标上
     * @param {*} from 
     * @param {*} target 
     */
    static copy(from, target) {
        for (let k in from) {
            target[k] = from[k]
        }
    }
    static deepCopy(obj): object | [] {
        //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
        var objClone = Array.isArray(obj) ? [] : {};
        //进行深拷贝的不能为空，并且是对象或者是
        if (obj && typeof obj === "object") {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] && typeof obj[key] === "object") {
                        objClone[key] = this.deepCopy(obj[key]);
                    } else {
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    }

    static randomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }

    public static randomToRatio(start: number, end: number, range: number): boolean {
        var num: number = this.randomNumBoth(start, end);
        if (num <= range) {
            return true;
        }
        return false;
    }

    static randName() {
        var names = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var randName = "";
        for (var int = 0; int < 8; int++) {
            var rand = names[this.randomNumBoth(0, names.length - 1)];
            if (rand) randName += rand;
        }
        randName += this.randomNumBoth(100, 999);
        return randName;
    }
    public static generateUUID(): string {
        var d = new Date().getTime();
        var uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    static isNumber(obj) {
        return typeof obj == 'number' || Object.prototype.toString.call(obj) == '[object Number]';
    }

    static isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    }

    static isString(obj) {
        return Object.prototype.toString.call(obj) === "[object String]";
    }

    static popOpenAnim(node: cc.Node) {

        return new Promise(resolve => {
            node.scale = 0.8;
            node.runAction(
                cc.sequence(
                    cc.scaleTo(0.1, 1.2, 1.2),
                    cc.scaleTo(0.1, 1, 1),
                    cc.callFunc(() => {
                        resolve();
                    }, this)
                )
            )
        })
    }

    static popCloseAnim(node: cc.Node) {
        return new Promise(resolve => {
            node.scale = 1;
            node.runAction(cc.sequence(
                cc.scaleTo(0.1, 0, 0),
                cc.callFunc(() => {
                    resolve();
                }, this)
            ))
        });
    }


    static addCoin(parent: cc.Node, coinNum: number, callback: Function) {

        for (let i = 0; i < 30; i++) {
            let delayTime = Common.randomNumBoth(0, 100) / 200.0;

            let logic = Lite.entity.showEntity("coin", parent, {
                x: Common.randomNumBoth(-100, 100),
                y: Common.randomNumBoth(-100, 100)
            })
            console.log('addCoin', logic.node.x, logic.node.y, logic.node.active);
            logic.node.runAction(
                cc.sequence(
                    cc.delayTime(delayTime),
                    cc.spawn(
                        cc.moveTo(1, -530, 315),
                        cc.fadeOut(1.0),
                        cc.sequence(
                            cc.scaleTo(0.8, 1.2, 1.2),
                            cc.scaleTo(0.8, 0.8, 9.8)
                        )
                    ),
                    cc.callFunc(() => {
                        Lite.entity.hideEntity(logic, null, true);
                    })
                )

            )
        }
        let t = setTimeout(() => {
            Lite.data.addCoin(coinNum)
            Lite.data.saveCoin();
            moosnow.event.sendEventImmediately(EventType.COIN_CHANGED, null);
            clearTimeout(t);
            if (this.isFunction(callback))
                callback();
        }, 2100)
    }

    public static isRemote(url: string) {
        return url.indexOf('http') != -1
    }
}