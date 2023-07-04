/**
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-06-19 10:21:02
 * @LastEditTime: 2023-06-28 15:07:52
 * @FilePath: /snow-keyboard/example/main.js
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * @关注作者请访问 https://snowlove.synology.me:5
 */
// import { SnowKeyboard } from '../packages/snow_keyboard'
// import { SnowKeyboard } from '../dist/keyboard.es.js'

// 延迟加载方式报错
let keyboardModule = null
if (
  (await import.meta.globEager('../dist/style.css')) &&
  // (await import.meta.globEager('../dist/keyboard.es.js'))
  (keyboardModule = await import.meta.globEager('../dist/keyboard.es.js'))
) {
  // CSS 文件存在，延迟引入
  setTimeout(() => {
    const { SnowKeyboard } = keyboardModule['../dist/keyboard.es.js']
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '../dist/style.css'
    // 将 <link> 元素添加到页面的 <head> 元素中
    document.head.appendChild(link)
    new SnowKeyboard({
      inputEl: document.getElementById('keyboard-input'),
      theme: 'dark',
      mode: 'full-keyboard',
      type: '英',
    })
  }, 10) // 10 毫秒后引入 CSS
} else {
  // CSS 文件不存在
  console.log('CSS file does not exist.')
}
