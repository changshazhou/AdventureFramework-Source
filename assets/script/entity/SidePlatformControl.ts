import EntityLogic from "../framework/entity/EntityLogic";
import DeployItem from "../model/DeployItem";
import BaseControl from "./BaseControl";
import RoadControl from "./RoadControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SidePlatformControl extends RoadControl {

    private pointVelPlatform = cc.v2();
    private pointVelOther = cc.v2();
    private relativeVel = cc.v2();
    private relativePoint = cc.v2();
    private _pointsCache = {};

    onBeginContact(contact, selfCollider, otherCollider) {
        let cache = this._pointsCache;

        let otherBody = otherCollider.body;
        let platformBody = selfCollider.body;

        let worldManifold = contact.getWorldManifold();
        let points = worldManifold.points;

        let pointVelPlatform = this.pointVelPlatform;
        let pointVelOther = this.pointVelOther;
        let relativeVel = this.relativeVel;
        let relativePoint = this.relativePoint;

        //check if contact points are moving into platform
        for (let i = 0; i < points.length; i++) {
            platformBody.getLinearVelocityFromWorldPoint(points[i], pointVelPlatform);
            otherBody.getLinearVelocityFromWorldPoint(points[i], pointVelOther);
            platformBody.getLocalVector(pointVelOther.subSelf(pointVelPlatform), relativeVel);

            if (relativeVel.y < -32) //if moving down faster than 32 pixel/s (1m/s), handle as before
                return;  //point is moving into platform, leave contact solid and exit
            else if (relativeVel.y < 32) { //if moving slower than 32 pixel/s (1m/s)
                //borderline case, moving only slightly out of platform
                platformBody.getLocalPoint(points[i], relativePoint);
                let platformFaceY = selfCollider.getAABB().height / 2;  //front of platform, should only used on a box collider
                if (relativePoint.y > platformFaceY - 0.1 * 32)
                    return;  //contact point is less than 3.2pixel (10cm) inside front face of platfrom
            }
            else {
                //moving up faster than 1 m/s
            }
        }

        // store disabled state to contact
        contact.disabled = true;
    }

    private mSpeed: number = 3
    private mMoveSpeed: cc.Vec2 = cc.Vec2.ZERO;
    private mMoveEnd: cc.Vec2;
    private mEndPointIndex: number = 0;
    willShow(data: DeployItem) {
        super.willShow(data);
        let p = data.attribute.points[0]
        this.mMoveEnd = cc.v2(p[0], p[1]);
        this.mMoveSpeed = this.mMoveEnd.sub(cc.v2(this.node.x, this.node.y)).normalize().scale(cc.v2(this.mSpeed, this.mSpeed));

    }

    public findNextPoint() {
        if (((this.mMoveSpeed.x >= 0 && this.node.x >= this.mMoveEnd.x)
            || (this.mMoveSpeed.x <= 0 && this.node.x <= this.mMoveEnd.x))
            && ((this.mMoveSpeed.y >= 0 && this.node.y >= this.mMoveEnd.y)
                || (this.mMoveSpeed.y <= 0 && this.node.y <= this.mMoveEnd.y))) {

            this.mEndPointIndex++;
            if (this.mEndPointIndex >= this.LogicData.attribute.points.length)
                this.mEndPointIndex = 0;
            let p = this.LogicData.attribute.points[this.mEndPointIndex]
            let nextPoint = cc.v2(p[0], p[1])
            this.mMoveEnd = cc.v2(nextPoint.x, nextPoint.y);
            this.mMoveSpeed = this.mMoveEnd.sub(cc.v2(this.node.x, this.node.y)).normalize().scale(cc.v2(this.mSpeed, this.mSpeed));
        }
    }

    private move() {
        this.node.x += this.mMoveSpeed.x;
        this.node.y += this.mMoveSpeed.y;
    }

    public onFwUpdate(dt) {
        this.findNextPoint()
        this.move();
    }
}
