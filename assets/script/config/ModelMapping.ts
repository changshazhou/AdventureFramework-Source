// import BallLogic from "../entity/BallLogic";
// import SceneLogic from "../entity/SceneLogic";
// import LightLogic from "../entity/LightLogic";
// import CameraLogic from "../entity/CameraLogic";
// import PlayerLogic from "../entity/PlayerLogic";
// import RoadLogic from "../entity/RoadLogic";
// import PersonLogic from "../entity/PersonLogic";
// import GuardrailLogic from "../entity/GuardrailLogic";

export default class ModelMapping {
    // public static scene = SceneLogic;
    // public static camera = CameraLogic;
    // public static light = LightLogic;
    // public static role = PlayerLogic;
    // public static person = PersonLogic;
    // public static ball = BallLogic;
    // public static road = RoadLogic;
    /**
     * 护栏
     */
    // public static guardrail = GuardrailLogic;



    public static getList() {
        let arr = [];
        for (let key in ModelMapping) {
            arr.push(new ModelMapping[key]().url);
        }
        return arr;
    }
}