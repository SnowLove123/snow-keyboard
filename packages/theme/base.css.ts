/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-05-19 17:50:25
 * @LastEditTime: 2023-06-08 18:36:47
 * @FilePath: /projects/test-collect/项目收集/snow-keyboard/packages/theme/base.css.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */
import { BASE_WIDTH, BASE_GRID_GAP } from '@snow-keyboard/constants'
import { globalKeyframes, globalStyle } from '@vanilla-extract/css'

/** ----------- 键盘主体 start------------------ */
globalStyle('.keyboard_wapper', {
  position: 'absolute',
  height: 'auto',
  left: '50%',
  display: 'grid',
  gridGap: `${BASE_GRID_GAP}em`,
  gridTemplateRows: `${0}em repeat(5,${BASE_WIDTH}em)`,
  transform: 'translate(-50%)',
  backgroundColor: '#424242',
  borderRadius: '0.4em',
  padding: `${BASE_GRID_GAP * 1.2}em`,
  boxShadow:
    '1em 1em 2.4em #41414180, -1em -1em 2.4em #f8fdffe6, inset 1em 1em 2.4em transparent, inset -1em -1em 2.4em transparent',
  transition: 'all 0.4s cubic-bezier(0.5, 0.2, 0.3, 1)',
  opacity: 1,
})
globalStyle('.hidden', {
  gridTemplateRows: 'repeat(6,0em)',
  padding: 0,
  opacity: 0,
  transform: 'translate(-50%,100%) scale3d(0.5, 1.2, 1)',
})
/** ----------- 键盘主体 end------------------ */

/** ----------- 候选字框 start------------------ */
globalStyle('.candidate-word-active_wapper', {
  gridTemplateRows: `${BASE_WIDTH * 0.6}em repeat(5,${BASE_WIDTH}em)`,
})
globalStyle('.candidate-word-active_wapper > .candidate-word_wapper', {
  visibility: 'visible',
})
globalStyle('.candidate-word_wapper', {
  display: 'grid',
  gridGap: `${BASE_GRID_GAP}em`,
  gridTemplateColumns: `${BASE_WIDTH * 1.5}em  ${BASE_WIDTH * 3}em auto ${
    BASE_WIDTH * 1.5
  }em`,
  gridTemplateRows: `repeat(1,${BASE_WIDTH * 0.45}em)`,
  backgroundImage: 'linear-gradient(to bottom,#191919,#151515 30%,#151515)',
  boxShadow: '0 0 0 0.1em #000',
  alignContent: 'center',
  padding: '0 0.2em',
  borderRadius: '0.4em',
  visibility: 'hidden',
})
globalStyle('.candidate-word-item_wapper', {
  borderRadius: '0.4em',
  lineHeight: `${BASE_WIDTH * 0.45}em`,
  textAlign: 'center',
  transition: 'grid-template-rows .6s',
})
/** ----------- 候选字部分 end------------------ */

/** ----------- 关闭按钮 start------------------ */
globalStyle('.close_wapper', {
  borderRadius: '50%',
  width: `${BASE_WIDTH * 0.325}em`,
  height: `${BASE_WIDTH * 0.325}em`,
  lineHeight: `${BASE_WIDTH * 0.45}em`,
  margin: '0 auto',
  border: '0.2em solid',
  borderColor: '#fff',
  transition: 'background-color .6s',
  cursor: 'pointer',
})
globalStyle('.close', {
  position: 'relative',
  width: `${BASE_WIDTH * 0.325}em`,
  height: `${BASE_WIDTH * 0.325}em`,
  cursor: 'pointer',
  pointerEvents: 'none',
})
globalStyle('.close::before,.close::after', {
  position: 'absolute',
  content: '',
  backgroundColor: '#fff',
  left: `${0.5}em`,
  // `${BASE_WIDTH * 0.15}em`,
  top: `${0.15}em`,
  // `${0.1}em`,
  width: `${0.1}em`,
  height: `${BASE_WIDTH * 0.25}em`,
})
globalStyle('.close::before', {
  transform: 'rotate(45deg)',
  transition: 'background-color .6s',
})
globalStyle('.close::after', {
  transform: 'rotate(-45deg)',
  transition: 'background-color .6s',
})
globalStyle(
  '.close_wapper:hover > .close::before,.close_wapper:hover > .close::after',
  {
    backgroundColor: '#ffffff33',
  },
)
globalStyle('.close_wapper:hover', {
  borderColor: '#ffffff33',
})
/** ----------- 关闭按钮 end------------------ */

/** ----------- 输入部分 start------------------ */
globalKeyframes('keyboard-cursor-blink', {
  '0%': { opacity: 1 },
  '50%': { opacity: 0 },
  '100%': { opacity: 1 },
})
globalStyle('.candidate-word-item_wapper:nth-child(2)', {
  background: 'rgba(255,255,255,.2)',
  color: '#fff',
  fontWeight: 'bold',
  letterSpacing: '.1em',
  lineHeight: `${BASE_WIDTH * 0.45}em`,
  padding: `0 ${0.5}em`,
  textAlign: 'left',
  cursor: 'pointer',
})
globalStyle('.candidate-word-item_wapper:nth-child(2)::after', {
  content: '|',
  display: 'inline-block',
  animation: '1s infinite ease-out keyboard-cursor-blink',
})
/** ----------- 输入部分 end------------------ */

/** ----------- 候选字部分 start------------------ */
globalStyle('.candidate-word-item_wapper:nth-child(3)', {
  display: 'grid',
  gridGap: `${BASE_GRID_GAP}em`,
  gridTemplateColumns: `repeat(10,${BASE_WIDTH * 0.45}em)`,
  gridTemplateRows: `repeat(1,${BASE_WIDTH * 0.45}em)`,
  paddingRight: '10%',
  justifyContent: 'right',
})
globalStyle('.word_wapper', {
  // width: `1.8em`,
  // height: `1.8em`,
  borderRadius: `${BASE_GRID_GAP * 0.5}em`,
  color: '#fff',
  transition: 'background-color .4s',
  cursor: 'pointer',
  // margin: `0 0.2em`,
})
globalStyle('.word_wapper:hover', {
  backgroundColor: '#555555',
})
/** ----------- 候选字部分 end------------------ */

/** ----------- 箭头 start------------------ */
globalStyle('.arrow_wapper', {
  display: 'grid',
  gridTemplateColumns: `repeat(2,${BASE_WIDTH * 0.325}em)`,
  gridTemplateRows: `${BASE_WIDTH * 0.5}em`,
  borderRadius: '50%',
  lineHeight: `${BASE_WIDTH * 0.45}em`,
  margin: '0 auto',
  alignItems: 'center',
  gridGap: '0.5em',
  cursor: 'pointer',
})
globalStyle('.arrow-left_wapper:hover', {
  borderRightColor: '#d5d5d5cc',
})
globalStyle('.arrow-right_wapper:hover', {
  borderLeftColor: '#d5d5d5cc',
})

globalStyle('.arrow-left_wapper', {
  width: '0',
  height: '0',
  border: `${BASE_WIDTH * 0.15}em solid transparent`,
  borderRightColor: '#fff',
  transition: 'border-color .6s',
  cursor: 'pointer',
})
globalStyle('.arrow-right_wapper', {
  width: '0',
  height: '0',
  border: `${BASE_WIDTH * 0.15}em solid transparent`,
  borderLeftColor: '#fff',
  transition: 'border-color .6s',
  cursor: 'pointer',
})
globalStyle('.arrow-left_disabled', {
  borderRightColor: '#ffffff33',
  cursor: 'not-allowed',
})
globalStyle('.arrow-right_disabled', {
  borderLeftColor: '#ffffff33',
  cursor: 'not-allowed',
})
/** ----------- 箭头 end------------------ */

/** 单个键位基础样式 */
globalStyle('.key_wapper', {
  backgroundImage: 'linear-gradient(to bottom,#191919,#151515 30%,#151515)',
  color: '#c1c1c1',
  borderRadius: '0.15em',
  boxShadow: '0 0 0 0.1em #000',
  display: 'grid',
  justifyContent: 'center',
  alignContent: 'center',
  position: 'relative',
  cursor: 'pointer',
  // transition: `all`,
})
globalStyle('.key-row-base_wapper', {
  display: 'grid',
  gridGap: `${BASE_GRID_GAP}em`,
  gridTemplateRows: `repeat(1, ${BASE_WIDTH}em)`,
})
globalStyle('.switch-key', {
  position: 'absolute',
  top: '0.1em',
  right: '0.5em',
  fontSize: '0.5em',
  fontWeight: 'bolder',
})
globalStyle('.key_wapper:active', {
  boxShadow: '0 0 0.1em 0.4em rgba(255,255,255,0.3)',
  transform: 'scale(1.1)',
  fontSize: '1.1em',
})

/** ----------- 单个键位基础样式 end------------------ */

/** ----------- shift状态 start------------------ */
globalStyle('.dot', {
  height: '0.8em',
  width: '0.8em',
  display: 'inline-block',
  background: '#10B981',
  borderRadius: '50%',
  left: '1em',
  top: '0.8em',
})
globalStyle('.dot-right', {
  height: '0.8em',
  width: '0.8em',
  display: 'inline-block',
  background: '#10B981',
  borderRadius: '50%',
  right: '1em',
  top: '0.8em',
})
/** ----------- shift状态 end------------------ */

/** ----------- 滚动条 start------------------ */
globalStyle('::-webkit-scrollbar,.thumb::-webkit-scrollbar', {
  height: '0.1em',
  width: '0.1em',
})
globalStyle('::-webkit-scrollbar-track,.thumb::-webkit-scrollbar-track', {
  backgroundColor: 'transparent',
  outline: '0.1em solid transparent',
  borderRadius: '0.9em',
})
globalStyle('::-webkit-scrollbar-thumb,.thumb::-webkit-scrollbar-thumb', {
  backgroundColor: 'transparent',
  outline: '0.1em solid transparent',
  borderRadius: '0.9em',
})
/** ----------- 滚动条 end------------------ */
