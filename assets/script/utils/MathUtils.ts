export default class MathUtils {

    constructor() {
    }

    /**
     * 弧度制转换为角度值
     * @param {number} radian
     * @returns {number}
     */
    public static getAngle(radian) {
        return 180 * radian / Math.PI;
    }

    /**
     * 角度值转换为弧度制6 不过 
     * @param {number} angle
     */
    public static getRadian(angle) {
        return angle / 180 * Math.PI;
    }


    /**
   * 2点之间的夹角弧度
   * @param {*} pointA 
   * @param {*} pointB 
   */
    public static getRadianByPoint(pointA, pointB) {
        //atan((B.y-A.y)/(A.x-B.x)) 
        return Math.atan2((pointB.y - pointA.y), (pointB.x - pointA.x))
    }
    /**
     * 2点之间的夹角
     * @param {*} pointA 
     * @param {*} pointB 
     */
    public static getAngleByPoint(pointA, pointB) {
        return this.getRadianByPoint(pointA, pointB) * 180 / Math.PI
    }
    /**
     * 矩形和圆形碰撞
     * @param rect 
     * @param circle 
     */
    public static detectCollision(rect, circle) {
        var cx, cy

        if (circle.x < rect.x) {
            cx = rect.x
        } else if (circle.x > rect.x + rect.w) {
            cx = rect.x + rect.w
        } else {
            cx = circle.x
        }

        if (circle.y < rect.y) {
            cy = rect.y
        } else if (circle.y > rect.y + rect.h) {
            cy = rect.y + rect.h
        } else {
            cy = circle.y
        }
        function distance(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        }
        if (distance(circle.x, circle.y, cx, cy) < circle.r) {
            return true
        }

        return false
    }



    /**
     * 根据角度旋转向量
     * @param vec 
     * @param angle 
     */
    public static vecRotate(vec, angle) {
        let radians = MathUtils.getRadian(angle);
        let sin = Math.sin(radians);
        let cos = Math.cos(radians);
        let x1 = cos * vec.x - sin * vec.y;
        let y1 = sin * vec.x + cos * vec.y;
        return new cc.Vec2(x1, y1);
    }

    /**
     * 获取两点间弧度
     * @param {Point} p1
     * @param {Point} p2
     * @returns {number}
     */
    public static getRadianTwoPoint(p1, p2) {
        let xdis = p2.x - p1.x;
        let ydis = p2.y - p1.y;
        return Math.atan2(ydis, xdis);
    }

    /**
     * 获取两点间旋转角度（顺时针）
     * @param {Point} p1
     * @param {Point} p2
     * @returns {number}
     */
    public static getAngleTwoPoint(p1, p2) {
        let vy = p2.y - p1.y;
        let vx = p2.x - p1.x;
        let ang;

        if (vy == 0) {
            if (vx < 0) {
                return 180;
            }
            return 0;
        }

        if (vx == 0) { //正切是vy/vx所以vx==0排除
            if (vy > 0) {
                ang = 90;
            }
            else if (vy < 0) {
                ang = 270;
            }
            return ang;
        }

        ang = this.getAngle(Math.atan(Math.abs(vy) / Math.abs(vx)));
        if (vx > 0) {
            if (vy < 0) {
                ang = 360 - ang;
            }
        }
        else {
            if (vy > 0) {
                ang = 180 - ang;
            }
            else {
                ang = 180 + ang;
            }
        }
        return ang;
    }
    /**
     * 两向量间的夹角
     * @param p1 
     * @param p2 
     */
    public static getAngleTwoVec(p1, p2) {
        let radian = Math.atan2(p2.y, p2.x) - Math.atan2(p1.y, p1.x);
        return this.getAngle(radian);
    }
    /**
     * 获取两点间距离
     * @param {Point} p1
     * @param {Point} p2
     * @returns {number}
     */
    public static getDistance(p1, p2) {
        let disX = p2.x - p1.x;
        let disY = p2.y - p1.y;
        let disQ = Math.pow(disX, 2) + Math.pow(disY, 2);
        return Math.sqrt(disQ);
    }
    /**
     * 精确到小数点后多少位（舍尾）
     * @param {number} 精确值
     * @param {number} 精确位数
     * @return {number}
     * */
    public static exactCount(exactValue, count = 0) {
        let num = Math.pow(10, count);
        let value = (exactValue * num) | 0;
        return value / num;
    }

    /**
     * [0-1]区间获取二次贝塞尔曲线点切线角度
     * @param {Point} p0起点
     * @param {Point} p1控制点
     * @param {Point} p2终点
     * @param {number} t [0-1]区间
     * @return {number}
     * */
    public static getBezierCutAngle(p0, p1, p2, t) {
        let _x = 2 * (p0.x * (t - 1) + p1.x * (1 - 2 * t) + p2.x * t);
        let _y = 2 * (p0.y * (t - 1) + p1.y * (1 - 2 * t) + p2.y * t);
        let angle = this.getAngle(Math.atan2(_y, _x));
        return angle;
    }



    public static randomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }

    public static probabilityCanHappen(num) {
        let random = MathUtils.randomNumBoth(0, 100);
        return random <= num;
    }


    public static rectCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y

    }
}