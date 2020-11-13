
export default class EventType {
  //**************游戏状态****************** */

  static readonly GAME_STATE_START: string = "GAME_STATE_START";
  /**
   * 游戏结束
   */
  static readonly GAME_STATE_OVER: string = "GAME_STATE_OVER";
  /**
    * 剪切结束
    */
  static readonly GAME_CUT_END: string = "GAME_CUT_END";
  static readonly GAME_REFRESH_CUT_NUM: string = "GAME_REFRESH_CUT_NUM";

  /**
  * 关卡结束
  */
  static readonly GAME_LEVEL_END: string = "GAME_LEVEL_END";
  static readonly GAME_STATE_RESPAWN: string = "GAME_STATE_RESPAWN";
  static readonly GAME_STATE_PAUSE: string = "GAME_STATE_PAUSE";
  static readonly GAME_STATE_RESUME: string = "GAME_STATE_RESUME";
  static readonly GAME_STATE_NEXT: string = "GAME_STATE_NEXT";
  static readonly GAME_STATE_REPLAY: string = "GAME_STATE_REPLAY";
  static readonly GAME_STATE_CANCEL: string = "GAME_STATE_CANCEL";
  static readonly GAME_STATE_FAST_END: string = "GAME_STATE_FAST_END";


  static readonly REPLAY_LEVEL: string = "REPLAY_LEVEL";


  //******************************** */

  static readonly VIBRATESWITCH_CHANGED: string = "VIBRATESWITCH_CHANGED";
  static readonly SOUNDSWITCH_CHANGED: string = "SOUNDSWITCH_CHANGED";
  static readonly MUSICSWITCH_CHANGED: string = "MUSICSWITCH_CHANGED";
  static readonly ON_PLATFORM_SHOW: string = "ON_PLATFORM_SHOW";
  static readonly ON_PLATFORM_HIDE: string = "ON_PLATFORM_HIDE";



  static readonly SKIN_CHANGE: string = "SKIN_CHANGE";
  static readonly SKIN_UNLOCK: string = "SKIN_UNLOCK";
  static readonly SKIN_SELECT: string = "SKIN_SELECT";


  static readonly TOUCH_UP: string = "TOUCH_UP";
  static readonly TOUCH_MOVE: string = "TOUCH_MOVE";
  static readonly TOUCH_DOWN: string = "TOUCH_DOWN";

  static readonly ROCKER_MOVE: string = "ROCKER_MOVE";
  static readonly ROCKER_JUMP: string = "ROCKER_JUMP";
  static readonly ROCKER_ATTACK: string = "ROCKER_ATTACK";


  static readonly LEVEL_CHANGED: string = "LEVEL_CHANGED";
  static readonly COIN_CHANGED: string = "LEVEL_CHANGED";
  static readonly DIAMOND_CHANGED: string = "DIAMOND_CHANGED";

  static readonly ROLE_HP_CHANGED: string = "ROLE_HP_CHANGED";
  static readonly CLEAR_ALL_MAP: string = "CLEAR_ALL_MAP";
  static readonly RECEIVE_RAIN: string = "RECEIVE_RAIN";


  static readonly SP_NUM_CHANGED: string = "SP_NUM_CHANGED";
  static readonly FOLLOW_CHANGED: string = "FOLLOW_CHANGED";

  static readonly CAMERA_CHANGED: string = "CAMERA_CHANGED";


}

