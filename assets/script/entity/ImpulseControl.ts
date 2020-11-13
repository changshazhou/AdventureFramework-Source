// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseControl from "./BaseControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ImpulseControl extends BaseControl {


    private impulse: cc.Vec2 = cc.v2(0, 1000)
    onBeginContact(contact, selfCollider, otherCollider) {

        var manifold = contact.getWorldManifold();
        if (manifold.normal.y < 1) return;

        let body = otherCollider.body;
        body.linearVelocity = cc.v2();
        body.applyLinearImpulse(this.impulse, body.getWorldCenter(), true);
        
    }

}
