/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-05-19 11:22:02
 * @LastEditTime: 2023-06-14 17:45:06
 * @FilePath: /snow-keyboard/packages/utils/dom.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */

import { Key } from '@snow-keyboard/layouts'
import { isHTMLElement } from './utils'
import { KeyCode } from '@snow-keyboard/constants'

type Attributes = {
  [key in string]: string
}
interface BaseElement<T> {
  tagName: T
  attribute: Attributes
  innerHTML?: string
  children?: BaseElement<T>[]
}

interface NestTree<T> {
  tagName: keyof HTMLElementTagNameMap
  attribute: Attributes
  innerHTML?: string
  children?: BaseElement<T>[]
}

// 根据input框获取input dom实例
export function initInputEl(inputEl: HTMLInputElement | string | null) {
  switch (isHTMLElement(inputEl)) {
    case 'string':
      const ele = document.querySelector(inputEl as string) as HTMLInputElement
      return ele
    case 'Element':
      return inputEl as HTMLInputElement
    default:
      return undefined
  }
}

/**
 * @description: 根据起点终点删除或插入input框的值
 * @param inputEl {HTMLInputElement}  :input元素
 * @param action {number}  :动作 insert delete
 * @response: 最终input的值
 * @return {*}
 */
export function computeInputSelection(
  action: string,
  inputEl: HTMLInputElement,
  text: string | undefined = '',
): [string, number[]] {
  const selectionStart = inputEl.selectionStart || 0,
    selectionEnd = inputEl.selectionEnd || 0,
    oldValue = inputEl.value || '',
    oldLen = oldValue.length,
    newLen = text?.length ?? 0,
    selected = selectionEnd - selectionStart
  let result = '',
    range = [0, 0]
  switch (action) {
    case 'insert':
      // 未多选内容 光标为最后
      if (!selected) {
        // 光标在最前
        if (selectionEnd == 0 && selectionStart == 0) {
          if (oldLen) result = text + oldValue
          else result = text
          range = [newLen, newLen]
        }
        // 光标在最后
        else if (selectionEnd == oldLen) {
          result = oldValue + text
          range = [selectionEnd + newLen, selectionEnd + newLen]
        }
        // 光标在中间
        else {
          result =
            oldValue.slice(0, selectionEnd) +
            text +
            oldValue.slice(selectionEnd)
          range = [selectionEnd + newLen, selectionEnd + newLen]
        }
        // 多选内容
      } else {
        result = oldValue.replace(
          oldValue.substring(selectionStart, selectionEnd),
          text as string,
        )
        range = [selectionStart + newLen, selectionStart + newLen]
      }
      break
    case 'delete':
      // 未多选内容 光标为最后
      if (!selected) {
        // 光标在最后
        if (selectionEnd == oldLen) {
          // result = oldValue.slice(0, oldLen - 1)
          result = oldValue.slice(0, -1)
          range = [selectionEnd - 1, selectionEnd - 1]
          // 光标在中间
        } else {
          result =
            oldValue.slice(0, selectionEnd - 1) + oldValue.slice(selectionEnd)
          range = [selectionEnd - 1, selectionEnd - 1]
        }
        // 多选内容
      } else {
        result = oldValue.replace(
          oldValue.substring(selectionStart, selectionEnd),
          '',
        )
        range = [selectionStart, selectionStart]
      }
      break
  }
  return [result, range]
}

/**
 * @description:
 * @param inputEl {HTMLInputElement}  :
 * @param forward {number}  :
 * @response:
 * @return {*}
 */
export function moveCursor(inputEl: HTMLInputElement, forward: number) {
  const selectionStart = inputEl.selectionStart || 0,
    selectionEnd = inputEl.selectionEnd || 0
  if (selectionEnd == 0) return
  if (forward) {
    // 多选模式单选模式
    inputEl.setSelectionRange(selectionStart, selectionEnd + 1)
  } else {
    // 多选模式单选模式
    inputEl.setSelectionRange(selectionStart, selectionEnd - 1)
  }
}

/**
 * @description: 根据输入字号计算整体页面大小
 * @param size {number}  :
 * @response:
 * @return {*}
 */
export function computeBaeFont(size: number) {
  const html = document.querySelector('html')
  if (html) {
    html.setAttribute('style', `font-size:${size}px`)
  }
}
/**
 * @description: 创建元素
 * @param type {string}  :
 * @param attribute {any}  :
 * @response:
 * @return {*}
 */
export function createElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  attribute: Attributes,
  innerHTML?: string,
) {
  const ele = document.createElement(tagName)
  Object.keys(attribute).forEach((key: string) => {
    ele.setAttribute(key, attribute[key])
  })
  if (innerHTML) {
    ele.innerHTML = innerHTML
  }
  return ele
}

/**
 * @description: tree结构创建元素
 * @param tree {NestTree}  :
 * @response:
 * @return {*}
 */
export function createNestElement(tree: NestTree<keyof HTMLElementTagNameMap>) {
  let father: HTMLElement
  // // console.log(tree)
  while (true) {
    const { tagName, attribute, innerHTML } = tree
    father = createElement(tagName, attribute, innerHTML)
    if (!!tree.children) {
      tree.children.forEach((item) => {
        father.appendChild(createNestElement(item))
      })
      break
    } else {
      break
    }
  }
  // // console.log('father', father)
  return father
}

/**
 * @description: 创建单个键位元素
 * @param item {Key}  :
 * @response:
 * @return {*}
 */
export function createKeyButtonElement(item: Key) {
  const keyWapper = document.createElement('div'),
    switchKey = document.createElement('span')
  switchKey.setAttribute('class', 'switch-key')
  switchKey.innerHTML = (item.sec as string) || ''
  keyWapper.setAttribute('class', 'key_wapper')
  keyWapper.setAttribute('data-pri', item.pri + '')
  // 有副键添加class属性
  if (item.sec) {
    keyWapper.setAttribute('data-sec', item.sec + '')
    keyWapper.classList.add('is-double')
  }
  // shift添加class属性
  if (item.keyCode == KeyCode.SHIFT) {
    keyWapper.classList.add('is-shift')
  }
  keyWapper.setAttribute('data-keycode', item.keyCode + '')
  keyWapper.innerHTML = item.pri as string
  keyWapper.appendChild(switchKey)
  return keyWapper
}

/**
 * @description:  合并元素
 * @param type {string}  :元素之前 元素之后
 * @param obj {
    newEle,
    referenceEle
  }  :
 * @response: 合并元素
 * @return {*}
 */
export function combineElement(newEle: HTMLElement, targetEle: HTMLElement) {
  const parentEle = targetEle.parentNode
  if (parentEle?.lastChild == targetEle) {
    parentEle.appendChild(newEle)
  } else {
    // // console.log('targetEle.nextSibling', targetEle.nextSibling)
    if (parentEle?.firstChild == targetEle) {
      parentEle?.insertBefore(newEle, targetEle)
    } else if (targetEle.nextSibling) {
      parentEle?.insertBefore(newEle, targetEle.nextSibling)
    } else {
      parentEle?.appendChild(newEle)
    }
  }
  return parentEle
}

/**
 * @description: 创建候选字区域
 * @response:
 * @return {*}
 */
export function createCandidateElement() {
  const candWapper = document.createElement('div')
  candWapper.setAttribute('class', 'candidate-word_wapper')
  ;['one', 'two', 'three', 'four'].forEach((_i, index) => {
    const child = document.createElement('div')
    child.setAttribute('class', 'candidate-word-item_wapper')
    // child.innerHTML = i
    switch (index) {
      // 关闭按钮
      case 0:
        const circular = document.createElement('div'),
          close = document.createElement('div')
        circular.setAttribute('class', 'close_wapper')
        close.setAttribute('class', 'close')
        circular.appendChild(close)
        child.append(circular)
        break
      // 拼音显示
      case 1:
        // const entering = document.createElement('div')
        // entering.setAttribute('class', 'entering_wapper')
        break
      // 候选字
      case 2:
        // 我正在车是这个预选字体框的问题
        '我正在测试这预选字体'.split('').forEach((t) => {
          child.append(createCandidateWordElement(t))
        })
        break
      // 按钮
      case 3:
        const arrowWapper = document.createElement('div'),
          left = document.createElement('div'),
          right = document.createElement('div')
        arrowWapper.setAttribute('class', 'arrow_wapper')
        left.setAttribute('class', 'arrow-left_wapper')
        right.setAttribute('class', 'arrow-right_wapper')
        arrowWapper.appendChild(left)
        arrowWapper.appendChild(right)
        child.append(arrowWapper)
        break
      default:
        break
    }
    candWapper.appendChild(child)
  })
  return candWapper
}

/**
 * @description: 创建预选字元素
 * @param item {*}  :
 * @response:
 * @return {*}
 */
export function createCandidateWordElement(item) {
  const word = document.createElement('div')
  word.setAttribute('class', 'word_wapper')
  word.innerText = item
  return word
}

/**
 * @description: 创建键位点击效果
 * @param item {*}  :
 * @response:
 * @return {*}
 */
export function createKeyClickEvent(item) {}

/**
 * @description: 移除所有键位元素
 * @param parent {HTMLElement}  :父类element
 * @param className {string}  : 类名
 * @response:
 * @return {*}
 */
export function removeAllGridItem(parent: HTMLElement, className: string) {
  if (parent instanceof HTMLElement) {
    parent.querySelectorAll(className).forEach((ele) => {
      parent.removeChild(ele)
    })
  }
}
