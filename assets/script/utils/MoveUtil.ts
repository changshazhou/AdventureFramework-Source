import ArrayUtil from "./ArrayUtil";

class MoveTaskItem {
    public mV: number = 3;
    public mT: number = 0;
    public mInterval: number = 0.01
    public mAccel: number = 5;
    public mCallback: (y: number) => boolean;

    constructor(v: number, t: number, interval: number, accel: number, callback: (y: number) => boolean) {
        this.mV = v;
        this.mT = t;
        this.mInterval = interval;
        this.mAccel = accel;
        this.mCallback = callback
    }

}
export default class MoveUtil {

    private mTaskId: number = 0;
    private mTask: Array<MoveTaskItem> = [];

    /**
     * 按照匀加速运动
     * @param v 初始速度
     * @param t 初始时间
     * @param interval 时间差
     * @param accel 加速度
     * @param callback  回调函数 返回false 时将中止触发回调
     */
    public addTask(v: number, t: number, interval: number, accel: number, callback: (y: number) => boolean) {
        this.mTask.push(new MoveTaskItem(v, t, interval, accel, callback))
    }
    public onUpdate(dt) {
        for (let i = 0; i < this.mTask.length; i++) {
            let taskParam: MoveTaskItem = this.mTask[i];
            taskParam.mT += taskParam.mInterval;
            let nextPoint = taskParam.mV * taskParam.mT + (taskParam.mAccel * Math.pow(taskParam.mT, 2)) / 2;
            this.mTask[i] = taskParam;
            if (taskParam.mCallback(nextPoint) == false) {
                ArrayUtil.remove(this.mTask, taskParam)
            }
        }
    }
}