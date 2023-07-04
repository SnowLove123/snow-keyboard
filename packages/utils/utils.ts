/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-05-17 13:11:29
 * @LastEditTime: 2023-06-28 17:15:24
 * @FilePath: /snow-keyboard/packages/utils/utils.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */

/**
 * @description: 是否是dom元素
 * @response:
 * @return {*}
 * @internal
 */
export const isHTMLElement = (
  variable: Element | string | undefined | null,
) => {
  if (typeof variable === 'undefined' || variable === null) return false
  else if (typeof variable === 'string') return 'string'
  else if (variable instanceof Element) return 'Element'
  else return false
}

/**
 * @description: 是否支持触摸
 * @response:
 * @return {*}
 * @internal
 */
export const isTouchScreen = () => {
  return 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0
}
/**
 * @description: 是否为英文字母
 * @param key {string}  :
 * @response:
 * @return {*}
 * @internal
 */
export const isSingleLetter = (key: string | undefined) => {
  return !!key && /^[a-zA-Z]$/.test(key)
}

/**
 * @description: 切换大小写字母
 * @param key {string}  :
 * @response:
 * @return {*}
 * @internal
 */
export const toggleCase = (key: string) => {
  console.log(key)
  return key.toUpperCase() === key ? key.toLowerCase() : key.toUpperCase()
}
