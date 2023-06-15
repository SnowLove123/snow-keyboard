/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-05-17 13:11:29
 * @LastEditTime: 2023-06-14 17:47:37
 * @FilePath: /snow-keyboard/packages/utils/utils.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */

// 是否是dom元素
export const isHTMLElement = (
  variable: Element | string | undefined | null,
) => {
  if (typeof variable === 'undefined' || variable === null) return false
  else if (typeof variable === 'string') return 'string'
  else if (variable instanceof Element) return 'Element'
  else return false
}

// // 全局拦截事件
// export const eventListenerHandle = (
//   dom,
//   type: string,
//   callback: (e: Event) => void,
// ) => {
//   window.addEventListener(
//     type,
//     (e) => {
//       e.stopPropagation()
//       callback && callback(e)
//     },
//     // 拦截事件先到这里 再到所拦截元素上
//     false,
//   )
// }

// 是否支持触摸
export const isTouchScreen = () => {
  return 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0
}
// 是否为英文字母
export const isSingleLetter = (key: string | undefined) => {
  return !!key && /^[a-zA-Z]$/.test(key)
}

// 切换大小写字母
export const toggleCase = (key: string) => {
  // console.log(key)
  return key.toUpperCase() === key ? key.toLowerCase() : key.toUpperCase()
}
