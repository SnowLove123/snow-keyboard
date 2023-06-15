/**
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-05-19 17:50:25
 * @LastEditTime: 2023-06-15 09:21:06
 * @FilePath: /snow-keyboard/example/main.js
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * @关注作者请访问 https://snowlove.synology.me:5
 */
import { SnowKeyboard } from 'snow-keyboard'
import 'snow-keyboard/dist/style.css'
// new OSKeyboard({
//   size: 'small',
//   zIndex: 2000,
//   modes: [
//     { name: 'en', layout: qwertyLayout },
//     { name: '拼', layout: qwertyZhLayout, associate: ZH_PINYIN_DICT },
//   ]
// })

// console.log(
'keyboard',
  new SnowKeyboard({
    inputEl: document.getElementById('keyboard-input'),
    theme: 'dark',
    mode: 'full-keyboard',
    type: 'en',
  })
