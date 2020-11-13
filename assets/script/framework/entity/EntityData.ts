export class EntityData {
    /**
     * 位置
     */
    public position: { x: number, y: number, z: number } = null
    /**
    * 缩放大小
    */
    public scale: { x: number, y: number, z: number } = null
    /**
     * 旋转角度
     */
    public rotation: { x: number, y: number, z: number } = null
    public data: any = null;
    public static get empty() {
        let data = new EntityData();
        return data;
    }
    public positionEmpty() {
        this.position = { x: 0, y: 0, z: 0 }
    }
    public scaleEmpty() {
        this.scale = { x: 1, y: 1, z: 1 }
    }
    public rotationEmpty() {
        this.rotation = { x: 0, y: 0, z: 0 }
    }
    constructor(position?: boolean, rotation?: boolean, scale?: boolean) {
        if (position)
            this.positionEmpty()
        if (rotation)
            this.rotationEmpty();
        if (scale)
            this.scaleEmpty();
    }
}