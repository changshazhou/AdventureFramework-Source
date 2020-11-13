/**
 * Delay
 */
export class Delay {

    public static clearAll() {
        // cc.Canvas.instance.unscheduleAllCallbacks()
    }

    // public static frameDelay(num: number) {
    //     return new Promise((resolve) => {
    //         if (num == 0) {
    //             resolve();
    //             return;
    //         }
    //         Laya.timer.frameOnce(num, this, () => {
    //             resolve(true);
    //         }, null, false);
    //     })
    // }

    public static delay(time: number) {
        return new Promise((resolve) => {
            if (time == 0) {
                resolve();
                return;
            }
            cc.Canvas.instance.scheduleOnce(() => {
                resolve(true);
            }, time)
        })
    }

    public static delay1(time: number) {
        return new Promise((resolve) => {
            if (time == 0) {
                resolve();
                return;
            }
            setTimeout(() => {
                resolve(true);
            }, time);
        })
    }


    public static delayTo(time: number, parm: any) {
        return new Promise((resolve) => {
            cc.Canvas.instance.schedule(() => {
                resolve(parm);
            }, time)
        })
    }
}