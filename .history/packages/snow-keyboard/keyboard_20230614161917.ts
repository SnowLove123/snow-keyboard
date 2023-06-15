/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-05-19 17:52:45
 * @LastEditTime: 2023-06-14 16:19:17
 * @FilePath: /snow-keyboard/packages/snow-keyboard/keyboard.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */

import {
  createElement,
  computeBaeFont,
  createKeyButtonElement,
  createCandidateElement,
  createNestElement,
  isSingleLetter,
  toggleCase,
  removeAllGridItem,
} from '@snow-keyboard/utils'
import { BASE_WIDTH } from '@snow-keyboard/constants'
import { Key, Layout } from '@snow-keyboard/layouts'
import { SnowKeyboard } from '.'
export class Keyboard {
  private keyboardDocumentElement: HTMLDivElement | undefined
  private keyboardEl: HTMLElement | undefined
  private mode: string
  private size: number
  private layout: Layout
  private top = 0
  constructor({
    mode,
    size,
    layout,
  }: {
    mode: string
    size: number
    layout: Layout
  }) {
    this.mode = mode
    this.size = size
    this.layout = layout
    if (SnowKeyboard.inputEl)
      this.render(mode, size, SnowKeyboard.inputEl, layout)
  }
  // 创建键盘
  private render(
    mode: string,
    size: number,
    inputEl: HTMLElement,
    layout: Layout,
  ) {
    switch (mode) {
      // 全键盘
      case 'full-keyboard':
        // console.log('size', size)
        // 计算基础属性
        computeBaeFont(size)
        // 创建键盘
        const keyboardWapper = this.keyboardDocumentElement
          ? this.keyboardDocumentElement
          : createElement('div', {
              class: 'keyboard_wapper',
            })
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.top = inputEl!.offsetTop + inputEl!.offsetHeight + 20
        // 根据input位置定位键盘位置
        keyboardWapper.style.top = `${this.top}px`
        // 渲染选字部分
        // const candidateWapper = createCandidateElement()
        // keyboardWapper.appendChild(candidateWapper)
        // 渲染按键
        for (let k = 0; k < layout.length; k++) {
          const wapper = layout[k],
            keyWapper = createElement('div', {
              class: `key-row-base_wapper key-row_${k + 1}`,
              style: this.computeGridTemplateColumns(wapper),
            })
          for (let j = 0; j < wapper.length; j++) {
            keyWapper.appendChild(createKeyButtonElement(wapper[j]))
          }
          keyboardWapper.appendChild(keyWapper)
        }
        // 添加键盘
        document.body.appendChild(keyboardWapper)
        this.keyboardDocumentElement = keyboardWapper
        this.keyboardEl = keyboardWapper

        break
      // 数字键盘
      case 'num-keyboard':
        break
      default:
        break
    }
  }
  // 计算grid网格布局 gridTemplateColumns
  private computeGridTemplateColumns(wapper: Key[]) {
    return (
      'grid-template-columns:' +
      wapper
        .map((w) =>
          w.size != undefined
            ? typeof w.size == 'string'
              ? w.size
              : `${BASE_WIDTH * w.size}em`
            : `${BASE_WIDTH}em`,
        )
        .join(' ')
    )
  }
  // 展示预选字体部分
  public showCandidateWordWapper(show: boolean) {
    if (show) {
      this.keyboardEl?.classList.add('candidate-word-active_wapper')
    } else {
      this.keyboardEl?.classList.remove('candidate-word-active_wapper')
    }
  }
  // 切换展示键盘
  public toggleKeyboardShow(show = false) {
    if (show) {
      if (this.keyboardEl?.style !== undefined) {
        this.keyboardEl.style.top = `${this.top}px`
        this.keyboardEl.style.removeProperty('bottom')
        // this.keyboardEl?.classList.add('candidate-word-active_wapper')
        this.keyboardEl?.classList.remove('hidden')
      }
      // this.keyboardEl?.classList.remove('hidden')
    } else {
      if (this.keyboardEl?.style !== undefined) {
        this.keyboardEl.style.removeProperty('top')
        this.keyboardEl.style.bottom = `${BASE_WIDTH * 2}em`
      }
      this.keyboardEl?.classList.add('hidden')
      this.keyboardEl?.classList.remove('candidate-word-active_wapper')
    }
  }
  // 获取键盘元素
  public getKeyboardEl() {
    return this.keyboardEl
  }
  // 获取键盘元素
  public getKeyboardFirstEl() {
    return this.keyboardEl?.querySelector('.key-row_1') as HTMLElement
  }
  // 获取键盘预选字部分
  public getCandidateWordEl() {
    return (
      (this.keyboardEl?.querySelector(
        '.candidate-word_wapper',
      ) as HTMLElement) || null
    )
  }
  // 切换键盘正副键
  public toggleKeys() {
    this.keyboardEl
      ?.querySelectorAll('.key_wapper:not(.is-double)')
      .forEach((key) => {
        if (key instanceof HTMLElement) {
          const keyText = key.innerText
          isSingleLetter(keyText)
            ? (key.innerText = toggleCase(keyText as string))
            : null
        }
      })
  }
  // 切换键盘模式
  public setKeyboardMode(layout: Layout) {
    this.keyboardDocumentElement &&
      removeAllGridItem(this.keyboardDocumentElement, '.key-row-base_wapper')
    SnowKeyboard.inputEl &&
      this.render(this.mode, this.size, SnowKeyboard.inputEl!, layout)
  }
  // 绑定键盘事件
  public toggleShiftKeys(flag: boolean) {
    // shift添加dot
    this.keyboardEl?.querySelectorAll('.is-shift').forEach((target, index) => {
      if (target instanceof HTMLElement) {
        const {
          dataset: { pri },
        } = target
        flag
          ? (target.innerHTML = `${pri} <span class="switch-key ${
              !index ? 'dot' : 'dot-right'
            }"></span>`)
          : (target.innerHTML = `${pri} <span class="switch-key"></span>`)
      }
    })
    // 切换键盘正副键
    this.keyboardEl?.querySelectorAll('.is-double').forEach((target) => {
      if (target instanceof HTMLElement) {
        const {
          dataset: { pri, sec },
        } = target
        flag
          ? (target.innerHTML = `${sec} <span class="switch-key">${pri}</span>`)
          : (target.innerHTML = `${pri} <span class="switch-key">${sec}</span>`)
      }
    })
    // 切换大小写
    this.toggleKeys()
  }
}
