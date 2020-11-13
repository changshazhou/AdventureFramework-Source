// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import EventType from "../utils/EventType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraControl extends cc.Component {


    private mCamera: cc.Camera = null

    onLoad() {
        this.mCamera = this.node.getComponent(cc.Camera);
        moosnow.event.addListener(EventType.CAMERA_CHANGED, this, (vec) => {
            this.node.x = vec.x
            this.node.y = vec.y
        })
    }

    // called every frame, uncomment this function to activate update callback
    lateUpdate() {
        if (!this.mCamera) return;
        if (!Lite.myGame.role) return;
        if (Lite.myGame.role.currentHp <= 0) return;
        if (!Lite.myGame.role.node.active) return;
        let globalRolePos = Lite.myGame.role.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let endPos = this.node.parent.convertToNodeSpaceAR(globalRolePos);
        let curPos = this.node.position.clone();
        let x = cc.misc.lerp(curPos.x, endPos.x, 0.1)
        let y = cc.misc.lerp(curPos.y, endPos.y, 0.1)
        this.node.x = x;
        this.node.y = y;

        let ratio = endPos.y / cc.winSize.height;
        this.mCamera.zoomRatio = 1 + (0.5 - ratio) * 0.5;
    }
}
