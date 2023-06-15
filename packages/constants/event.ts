/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-06-01 17:52:45
 * @LastEditTime: 2023-06-01 17:52:45
 * @FilePath: /projects/test-collect/项目收集/snow-keyboard/packages/constants/event.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */
export enum MouseTrigger {
  FOCUS = 'click',
  INPUT = 'mousedown',
}
export enum TouchTrigger {
  FOCUS = 'touchend',
  INPUT = 'touchstart',
}

export type FocusTrigger = MouseTrigger.FOCUS | TouchTrigger.FOCUS
export type InputTrigger = MouseTrigger.INPUT | TouchTrigger.INPUT
export type TriggerEvent = GlobalEventHandlersEventMap[
  | TouchTrigger
  | MouseTrigger]
