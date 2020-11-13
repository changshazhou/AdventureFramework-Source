

// export { } // 这个必须有，将文件转化为模块

import ResourceModule from "./assets/script/framework/modules/ResourceModule"
import GameDataCenter from "./assets/script/framework/GameDataCenter"
import AudioModule from "./assets/script/framework/modules/AudioModule"
import AppConfig from "./assets/Script/framework/modules/AppConfig"
import GameState from "./assets/Script/framework/modules/GameState"
import { UIModule } from "./assets/script/framework/modules/UIModule"
import EntityModule from "./assets/script/framework/modules/EntityModule"
import MoveUtil from "./assets/script/utils/MoveUtil"

declare global {
    class Lite {
        static ui: UIModule
        static resource: ResourceModule
        static model: any
        static data: GameDataCenter
        static audio: AudioModule
        static config: AppConfig
        static myGame: GameState
        static entity: EntityModule
        static audio: AudioModule
        static moveUtil: MoveUtil

    }
}