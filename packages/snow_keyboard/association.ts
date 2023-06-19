/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-06-02 17:08:35
 * @LastEditTime: 2023-06-15 11:55:10
 * @FilePath: /snow_keyboard/packages/snow_keyboard/association.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */

import {
  computeInputSelection,
  createElement,
  createNestElement,
  moveCursor,
} from '@snow_keyboard/utils'
import { Dictionary } from '@snow_keyboard/dictionaries'
import { GlobalEvent } from './event'
import { SnowKeyboard } from '.'

export class Association {
  private globalEvent: GlobalEvent
  private associationEl: HTMLElement
  private closeEl: HTMLElement
  private inputEl: HTMLElement
  private candidateListEl: HTMLElement
  private arrowEl: HTMLElement
  private prvKey: HTMLElement
  private nextKey: HTMLElement
  private dictionary: Dictionary | null
  private assoArr: string[] = []
  private keyword = ''
  private limit = 10
  private current = 1
  private total = 0

  constructor(globalEvent: GlobalEvent, dictionary: Dictionary | null) {
    this.globalEvent = globalEvent
    // 联想部分
    this.associationEl = createElement('div', {
      class: 'candidate-word_wapper',
    })
    // 关闭按钮
    this.closeEl = createNestElement({
      tagName: 'div',
      attribute: {
        class: 'candidate-word-item_wapper',
      },
      children: [
        {
          tagName: 'div',
          attribute: {
            class: 'close_wapper',
            'data-keycode': '-10',
          },
          children: [
            {
              tagName: 'div',
              attribute: {
                class: 'close',
              },
            },
          ],
        },
      ],
    })
    // 输入框
    this.inputEl = createElement('div', {
      class: 'candidate-word-item_wapper',
      'data-keycode': '-11',
    })
    // 后选择列表
    this.candidateListEl = createNestElement({
      tagName: 'div',
      attribute: {
        class: 'candidate-word-item_wapper',
      },
      children: new Array(this.limit).fill(null).map(() => ({
        tagName: 'div',
        attribute: {
          class: 'word_wapper',
          'data-keycode': '-12',
        },
      })),
    })
    // 左键右键部分
    this.arrowEl = createNestElement({
      tagName: 'div',
      attribute: {
        class: 'candidate-word-item_wapper',
      },
      children: [
        {
          tagName: 'div',
          attribute: {
            class: 'arrow_wapper',
          },
          children: [
            {
              tagName: 'div',
              attribute: {
                class: 'arrow-left_wapper',
                'data-keycode': '-14',
              },
            },
            {
              tagName: 'div',
              attribute: {
                class: 'arrow-right_wapper',
                'data-keycode': '-15',
              },
            },
          ],
        },
      ],
    })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.prvKey = this.arrowEl.querySelector('.arrow-left_wapper')!
    // console.log('this.prvKey', this.prvKey)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.nextKey = this.arrowEl.querySelector('.arrow-right_wapper')!
    ;[this.closeEl, this.inputEl, this.candidateListEl, this.arrowEl].forEach(
      (el) => {
        this.associationEl.appendChild(el)
      },
    )
    // 赋值字典
    this.dictionary = dictionary
    // 初始化事件
    this.initEvent()
  }
  // 初始化时间
  private initEvent() {
    // 拦截按键点击事件
    this.globalEvent
      .getClickKeyTarget()
      .addEventListener('clickKeyTarget', (event: Event) => {
        if (event instanceof CustomEvent) {
          const {
            detail: { target, pri, keyCode },
          } = event
          // 以下code代表association部分点击事件
          pri && this.setAssociationText(pri)
          console.log('clickKeyTarget', this.inputEl.innerText, this.keyword)
          ;[-10, -11, -12, -14, -15].some((n) => n == keyCode)
            ? this.associationClickEvent(target, keyCode)
            : this.sssociationwordsbar()
        }
      })
    // 退格键
    this.globalEvent
      .getBackSpaceKeyTarget()
      .addEventListener('backSpaceKeyTarget', () => {
        const [text, range] = computeInputSelection(
          'delete',
          SnowKeyboard.inputEl!,
        )
        if (SnowKeyboard.inputEl?.value != undefined) {
          SnowKeyboard.inputEl.value = text
        }
        SnowKeyboard.inputEl?.setSelectionRange(range[0], range[1])
      })
    // caplock键
    this.globalEvent
      .getCaplockKeyTarget()
      .addEventListener('caplockKeyTarget', () => {
        this.insertText('\t')
      })
    // 回车键
    this.globalEvent
      .getEnterKeyTarget()
      .addEventListener('enterKeyTarget', () => {
        this.insertText()
        this.keyword = ''
      })
  }

  // 根据输入信息渲染候选字列表
  private sssociationwordsbar() {
    const associationStr =
      (this.dictionary && this.keyword && this.dictionary[this.keyword]) || null
    this.current = 1
    // // console.log(
    //   'associationStr',
    //   this.dictionary,
    //   this.keyword,
    //   this.dictionary[this.keyword],
    // )
    if (associationStr) {
      this.assoArr = associationStr.split('')
      this.total = this.assoArr.length
      this.getArrowAction()
      this.setAssociationBar(this.assoArr)
    }
  }

  // 判断左右箭头行为
  private getArrowAction() {
    // 左边 只要当前页大于1就可以点击
    this.setArrowStatus(this.prvKey, 0, this.current > 1)
    // 右边 只要小于总数就可以点击
    this.setArrowStatus(
      this.nextKey,
      1,
      Math.ceil(this.total / (this.current * this.limit)) > 1,
    )
  }
  // 设置箭头状态
  private setArrowStatus(
    arrow: HTMLElement,
    foaward: number,
    allowed: boolean,
  ) {
    allowed
      ? arrow?.classList.remove(
          foaward ? 'arrow-right_disabled' : 'arrow-left_disabled',
        )
      : arrow?.classList.add(
          foaward ? 'arrow-right_disabled' : 'arrow-left_disabled',
        )
  }
  // 设置预选字列表
  private setAssociationBar(assoArr: string[]) {
    const currentArr = assoArr.slice(
      (this.current - 1) * this.limit,
      this.current * this.limit,
    )
    if (currentArr.length) {
      this.candidateListEl
        .querySelectorAll('.word_wapper')
        .forEach((ele, index: number) => {
          if (ele instanceof HTMLElement) {
            if (currentArr[index]) {
              ele.innerText = currentArr[index]
              ele.style.pointerEvents = 'auto'
            } else {
              ele.innerText = ''
              ele.style.pointerEvents = 'none'
            }
          }
        })
    } else {
      this.candidateListEl.querySelectorAll('.word_wapper').forEach((ele) => {
        if (ele instanceof HTMLElement) {
          ele.innerText = ''
          ele.style.pointerEvents = 'none'
        }
      })
    }
  }

  // 联想部分点击事件
  private associationClickEvent(target: any, keyCode: number) {
    switch (keyCode) {
      case -10:
        this.keyword = ''
        this.setAssociationText('')
        break
      case -11:
        this.insertText()
        this.keyword = ''
        break
      case -12:
        if (target instanceof HTMLElement) {
          // console.log('target.innerText', target.innerText)
          if (SnowKeyboard.inputEl instanceof HTMLInputElement) {
            target.innerText && this.insertText(target.innerText)
            this.keyword = ''
          }
        }
        break
      case -14:
      case -15:
        this.current = keyCode == -14 ? this.current - 1 : this.current + 1
        this.getArrowAction()
        this.setAssociationBar(this.assoArr)
        break
      default:
        break
    }
  }

  // 根据光标位置插入内容
  public insertText(input: string | undefined = '') {
    const [text, range] = computeInputSelection(
      'insert',
      SnowKeyboard.inputEl!,
      input || this.keyword,
    )
    if (SnowKeyboard.inputEl?.value != undefined) {
      SnowKeyboard.inputEl.value = text
    }
    SnowKeyboard.inputEl?.setSelectionRange(range[0], range[1])
  }
  // 删除所有内容
  // public clearText() {
  //   console.log('clearText', this.inputEl.innerText, this.keyword)
  //   if (this.inputEl instanceof HTMLInputElement) {
  //     this.associationClickEvent(this.inputEl, -10)
  //   }
  // }

  // 删除一位联想部分字符
  public deleteAssociationText() {
    this.inputEl.innerText = this.keyword = this.keyword.slice(0, -1)
    if (!this.keyword) return this.setAssociationBar([])
    this.sssociationwordsbar()
  }

  // 联想部分是否为空
  public hasAssociationKeyword() {
    return !this.keyword
  }

  // 获取联想部分
  public getAssociationEl() {
    return this.associationEl
  }

  // 获取联想部分
  public clearAssociationKeyword() {
    return (this.keyword = '')
  }

  // 设置联想部分文字
  public setAssociationText(text: string) {
    // console.log('text', text)
    if (this.keyword.length > this.limit) return
    this.keyword += text
    this.inputEl.innerText = this.keyword
  }

  // 设置联想部分添加空格
  public spaceAssociationText() {
    this.insertText(' ')
  }

  // input左键光标移动
  public moveCursor(forward: number) {
    moveCursor(SnowKeyboard.inputEl!, forward)
  }

  // 切换输入法时 设置当前字典信息
  public setDictionary(dictionary: Dictionary) {
    this.dictionary = dictionary
    this.keyword = ''
    console.log('setDictionary')
    this.setAssociationBar([])
  }
}
