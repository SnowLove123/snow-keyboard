/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-05-19 17:52:45
 * @LastEditTime: 2023-06-15 13:02:36
 * @FilePath: /snow-keyboard/packages/snow-keyboard/index.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */
import { qwertyLayout, qwertyZhLayout } from '@snow-keyboard/layouts'
import type { Layout } from '@snow-keyboard/layouts'
import { KeyCode } from '@snow-keyboard/constants'
import {
  combineElement,
  initInputEl,
  isSingleLetter,
  isTouchScreen,
} from '@snow-keyboard/utils'
import {
  FocusTrigger,
  InputTrigger,
  TriggerEvent,
  MouseTrigger,
  TouchTrigger,
} from '@snow-keyboard/constants'
import { KeyboardOptions } from './typing'
import { Keyboard } from './keyboard'
import { Association } from './association'
import { GlobalEvent } from './event'
import { Dictionary, Mode, ZH_PINYIN_DICT } from '@snow-keyboard/dictionaries'
export * from './keyboard'
export * from '@snow-keyboard/theme'

export class SnowKeyboard {
  private focusTrigger: FocusTrigger = MouseTrigger.FOCUS
  private inputTrigger: InputTrigger = MouseTrigger.INPUT
  private keyboardEl: HTMLElement | undefined
  private associationEl: HTMLElement | null
  private association: Association
  private layout: Layout
  private dictionary: Dictionary | null
  private keyboard: Keyboard
  private globalEvent: GlobalEvent
  private fnKeyMap: Map<number, (args: { [key in string]: any }) => void> =
    new Map()
  private theme = 'dark'
  private mode = 'full-keyboard'
  private type: string = Mode['英']
  private size = 16
  // private showKeyboard = false
  private showAssociation = false
  private shiftMode = false
  private capslockMode = false

  static inputEl: HTMLInputElement | undefined

  constructor({ inputEl, theme, mode, type, size }: KeyboardOptions) {
    SnowKeyboard.inputEl = initInputEl(inputEl)
    console.log('SnowKeyboard.inputEl', SnowKeyboard.inputEl)
    this.theme = theme ?? this.theme
    this.mode = mode ?? this.mode
    this.type = type ?? this.type
    this.size = size ?? this.size
    // 获取布局及根据类型判断当前字典数据
    const [layout, dictionary] = this.getLayoutAndDictionary(type)
    // // console.log('layout, dictionary', layout, dictionary)
    this.layout = layout
    this.dictionary = dictionary
    this.globalEvent = new GlobalEvent()
    this.keyboard = new Keyboard({
      mode: this.mode,
      size: this.size,
      layout: this.layout,
    })
    // 联想部分
    this.association = new Association(this.globalEvent, this.dictionary)
    this.associationEl = this.association.getAssociationEl()
    const combineEle = combineElement(
      this.associationEl,
      this.keyboard.getKeyboardFirstEl(),
    )
    if (combineEle && combineEle instanceof HTMLElement)
      this.keyboardEl = combineEle
    this.keyboard.toggleKeyboardShow(false)
    this.initEvent()
    this.setFnKeys()
  }

  // 初始化事件
  private initEvent() {
    if (isTouchScreen()) {
      this.focusTrigger = TouchTrigger.FOCUS
      this.inputTrigger = TouchTrigger.INPUT
    }
    // 添加全局foucs事件
    document.addEventListener(this.focusTrigger, this.focusHandler, true)
    // 绑定键盘事件
    this.keyboardEl?.addEventListener(this.inputTrigger, this.keyboardHandler)
  }
  // 设置功能键
  private setFnKeys() {
    this.fnKeyMap.set(KeyCode.BACKSPACE, this.backSpaceEvent)
    this.fnKeyMap.set(KeyCode.TAB, this.tabEvent)
    this.fnKeyMap.set(KeyCode.CAPSLOCK, this.capslockEvent)
    this.fnKeyMap.set(KeyCode.ENTER, this.enterEvent)
    this.fnKeyMap.set(KeyCode.SHIFT, this.shfitEvent)
    this.fnKeyMap.set(KeyCode.DELETE, this.deleteEvent)
    this.fnKeyMap.set(KeyCode.SPACE, this.spaceEvent)
    this.fnKeyMap.set(KeyCode.LEFT, this.leftEvent)
    this.fnKeyMap.set(KeyCode.RIGHT, this.rightEvent)
    this.fnKeyMap.set(KeyCode.CLOSE, this.closeEvent)
    this.fnKeyMap.set(KeyCode.MODE, this.changeModeEvent)
  }

  // 初始全局按键事件
  private globalClickKeyEvent(
    target: HTMLElement,
    type: string,
    keyCode: number,
    text: string,
  ) {
    // // console.log(keyCode, text)
    if (type == Mode['中']) {
      this.globalEvent.getClickKeyTarget().dispatchEvent(
        new CustomEvent('clickKeyTarget', {
          detail: { target, keyCode, pri: text },
        }),
      )
      // 点击按钮 判断是否展示联想部分
      if (!this.showAssociation) {
        this.showAssociation = true
        this.keyboard.showCandidateWordWapper(true)
      }
      // 点击按钮 判断展示联想部分是否有输入字
      if (this.association.hasAssociationKeyword()) {
        this.showAssociation = false
        this.keyboard.showCandidateWordWapper(false)
      }
      return
    }
    this.setInputValue(text)
  }

  // 初始化后退功能键事件
  private backSpaceEvent() {
    this.globalEvent
      .getBackSpaceKeyTarget()
      .dispatchEvent(new CustomEvent('backSpaceKeyTarget'))
    if (this.type == Mode['英'] && this.association.hasAssociationKeyword()) {
      this.showAssociation = false
      this.keyboard.showCandidateWordWapper(false)
    }
  }
  // 初始化tab功能键事件
  private tabEvent() {
    this.globalEvent
      .getCaplockKeyTarget()
      .dispatchEvent(new CustomEvent('caplockKeyTarget'))
  }
  // 初始化capslock功能键事件
  private capslockEvent() {
    this.capslockMode = !this.capslockMode
    this.keyboard.toggleKeys()
  }
  // 初始化后退功能键事件
  private enterEvent() {
    this.globalEvent
      .getEnterKeyTarget()
      .dispatchEvent(new CustomEvent('enterKeyTarget'))
    if (this.type == Mode['英'] && this.showAssociation) {
      this.showAssociation = false
      this.keyboard.showCandidateWordWapper(false)
    }
  }
  // 初始化shfit功能键事件
  private shfitEvent() {
    if (this.capslockMode) {
      this.shiftMode = true
      this.capslockMode = false
    } else this.shiftMode = !this.shiftMode
    this.keyboard.toggleShiftKeys(this.shiftMode)
  }
  // 初始化delete功能键事件
  private deleteEvent() {
    this.association.deleteAssociationText()
  }
  // 初始化space功能键事件
  private spaceEvent() {
    this.association.spaceAssociationText()
  }
  // 初始化left功能键事件
  private leftEvent() {
    this.association.moveCursor(0)
  }
  // 初始化right功能键事件
  private rightEvent() {
    this.association.moveCursor(1)
  }
  // 初始化close功能键事件
  private closeEvent() {
    this.blurHandler()
  }
  // 初始化输入法切换功能键事件
  private changeModeEvent() {
    this.type = this.type == Mode['中'] ? Mode['英'] : Mode['中']
    // 获取布局及根据类型判断当前字典数据
    const [layout, dictionary] = this.getLayoutAndDictionary(this.type)
    console.log('changeModeEvent', dictionary)
    this.shiftMode = false
    this.keyboard.toggleShiftKeys(false)
    this.showAssociation = false
    // this.association.clearText()
    this.keyboard.showCandidateWordWapper(false)
    this.keyboard.setKeyboardMode(layout)
    this.association.setDictionary(dictionary!)
  }
  // 输入框赋值
  private setInputValue(text: string) {
    if (SnowKeyboard.inputEl instanceof HTMLInputElement) {
      this.association.insertText(text)
    }
  }
  // focus事件
  private focusHandler = (e: TriggerEvent) => {
    console.log('focusHandler')
    const { target } = e,
      { type, id } = target as HTMLInputElement
    if (type == 'text' && id?.indexOf('keyboard-input') >= 0) {
      // this.showKeyboard = true
      this.keyboard.toggleKeyboardShow(true)
      SnowKeyboard.inputEl?.addEventListener('blur', this.blurHandler)
    }
  }
  // focus事件
  private blurHandler = () => {
    console.log('blurHandler')
    // this.showKeyboard = false
    this.showAssociation = false
    this.association.clearAssociationKeyword()
    this.keyboard.showCandidateWordWapper(false)
    this.keyboard.toggleKeyboardShow(false)
  }
  // 键盘点击事件
  private keyboardHandler = (e: TriggerEvent) => {
    e.preventDefault()
    if (e.target instanceof HTMLElement) {
      const {
        dataset: { keycode, pri, sec },
      } = e.target

      const fn = this.fnKeyMap.get(Number(keycode))
      console.log('fn', fn)
      if (fn) return fn?.call(this, {})
      const text =
        this.shiftMode || this.capslockMode
          ? ((isSingleLetter(pri) ? pri?.toLocaleUpperCase() : sec) as string)
          : (pri as string)
      // console.log(keycode, Number(keycode), text)
      if (isNaN(Number(keycode)) && !text) return
      this.globalClickKeyEvent(e.target, this.type, Number(keycode), text)
    }
  }

  // 根据初始化模式获取layout数据
  private getLayoutAndDictionary(type: string): [Layout, Dictionary | null] {
    // // console.log('ZH_PINYIN_DICT', ZH_PINYIN_DICT)
    switch (type) {
      case Mode['英']:
        return [qwertyLayout, null]
      case Mode['中']:
        return [qwertyZhLayout, ZH_PINYIN_DICT]
      case Mode['日']:
        return [qwertyLayout, null]
      default:
        return [qwertyLayout, null]
    }
  }
}
