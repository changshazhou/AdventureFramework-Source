import EntityLogic from '../entity/EntityLogic'
import BaseModule from './BaseModule'

const { ccclass, property } = cc._decorator;

@ccclass
export default class EntityModule extends BaseModule {

    @property(cc.Prefab)
    end: cc.Prefab = null;

    @property(cc.Prefab)
    beautify: cc.Prefab = null;

    @property(cc.Prefab)
    role: cc.Prefab = null;

    @property(cc.Prefab)
    rolebullet: cc.Prefab = null;

    @property(cc.Prefab)
    road: cc.Prefab = null;

    @property(cc.Prefab)
    enemy: cc.Prefab = null;

    @property(cc.Prefab)
    enemybullet: cc.Prefab = null;

    @property(cc.Prefab)
    buffer: cc.Prefab = null;

    @property(cc.Prefab)
    side: cc.Prefab = null;

    @property(cc.Prefab)
    trap: cc.Prefab = null;

    @property(cc.Prefab)
    mapItem: cc.Prefab = null;


    private entityLogics: Array<any> = [];
    private _serializeId: number = 0;
    private paused: boolean = true;
    private prefabPath: string = "prefab/entity/";



    private entityPools: Array<cc.NodePool> = [];
    private mIsSlow: boolean = true;

    constructor() {
        super();

        this.entityLogics = [];
        this._serializeId = 0;


        this._serializeId = 0;

    }



    start() {
        Lite.entity = this;
        this.resume();
    }
    update(dt) {
        if (this.paused) return;
        for (let i = 0; i < this.entityLogics.length; i++) {
            let element = this.entityLogics[i];
            element.onFwUpdate(dt);
        }
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }
    public getAllEntity(name: any) {
        return this.entityLogics.filter(item => item.poolName == name);
    }
    showEntity(name, parentNode, data) {
        let logic = this._showEntity(name);
        logic.id = this._serializeId++;
        logic.node.parent = parentNode;
        logic.node.active = false;
        logic.willShow(data);
        logic.node.active = true;
        logic.node.zIndex = logic.id;
        logic.onShow(data);
        this.entityLogics.push(logic);
        return logic;
    }

    hideEntity(logic, data, isDestory: boolean = false) {
        this._hideEntity(logic, data, isDestory);
    }

    hideAllEntity(name, isDestory: boolean = false) {
        for (let i = 0; i < this.entityLogics.length; i++) {
            let item = this.entityLogics[i];
            if (item.poolName == name) {
                this.hideEntity(item, null, isDestory);
                i--
            }
        }
    }

    private _showEntity(name) {
        let pool = this._getOrNewEntityPool(name);
        let entity = pool.get();
        if (entity == null) {
            entity = this._createEntity(name);
        }
        let logic = entity.getComponent(EntityLogic);
        logic.poolName = pool.name;
        return logic;
    }

    private _hideEntity(logic: EntityLogic, data, isDestory: boolean = false) {
        if (isDestory) {
            logic.willHide(data);
            logic.node.active = false;
            logic.onHide(data);
            logic.node.destroy();
        }
        else {
            let pool = this._getOrNewEntityPool(logic.poolName);
            logic.willHide(data);
            pool.put(logic.node);
            logic.node.active = false;
            logic.onHide(data);
            logic.node.removeFromParent();
        }
        cc.js.array.remove(this.entityLogics, logic);

    }

    private _createEntity(name) {
        let prefab: cc.Prefab = this._getPrefabByName(name);
        // console.log('prefab.asyncLoadAssets',prefab.asyncLoadAssets)
        return cc.instantiate(prefab);
    }

    private _getPrefabByName(name) {
        return this[name];
    }

    private _getOrNewEntityPool(name) {
        let pool = this._getEntityPool(name);
        if (pool == null) {
            pool = this._newEntityPool(name);
        }
        return pool;
    }

    private _getEntityPool(name) {
        for (let i = 0; i < this.entityPools.length; i++) {
            let pool: any = this.entityPools[i];
            if (pool.name === name) {
                return pool;
            }
        }
        return null;
    }

    private _newEntityPool(name) {
        let pool: any = new cc.NodePool(name);
        pool.name = name;
        this.entityPools.push(pool);
        return pool;
    }

}   