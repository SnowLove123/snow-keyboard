/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-06-28 16:48:34
 * @LastEditTime: 2023-06-28 17:03:57
 * @FilePath: /snow-keyboard/packages/utils/typing.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */
export type TagName = keyof HTMLElementTagNameMap

export type Attributes = {
  [key in string]: string
}
export interface BaseElement<T extends TagName> {
  tagName: T
  attribute: Attributes
  innerHTML?: string
  children?: BaseElement<T>[]
}

export interface NestTree {
  tagName: TagName
  attribute: Attributes
  innerHTML?: string
  children?: BaseElement<TagName>[]
}
