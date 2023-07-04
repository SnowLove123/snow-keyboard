/**
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-06-21 15:29:05
 * @LastEditTime: 2023-06-21 15:30:24
 * @FilePath: /snow-keyboard/intit-keyboard.js
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * @关注作者请访问 https://snowlove.synology.me:5
 */
// 加载css
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'https://cdn.jsdelivr.net/gh/SnowLove123/CDN/css/style.css'
document.head.appendChild(link)

// 加载keyboard.js
const scriptUrl =
  'https://snowlove.synology.me:5106/usr/themes/Joe-master/assets/js/keyboard.es.js'
// 'https://cdn.jsdelivr.net/gh/SnowLove123/CDN/js/keyboard.es.js'
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}
loadScript(scriptUrl)
  .then(() => {
    // 在脚本加载完成后，使用 import() 动态导入模块
    return import(scriptUrl)
  })
  .then((module) => {
    const { SnowKeyboard } = module
    new SnowKeyboard({
      inputEl: document.getElementById('keyboard-input'),
      theme: 'dark',
      mode: 'full-keyboard',
      type: '中',
    })
  })
  .catch((error) => {
    console.error('Failed to load script:', error)
  })
