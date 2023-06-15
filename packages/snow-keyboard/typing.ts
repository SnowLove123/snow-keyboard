/**
 * @param el {HTMLElement}  :input输入框元素
 * @param theme {string}  :当前主题 明 light 暗 dark
 * @param mode {string}  :当前模式 全键盘 full-keyboard 数字键盘 num-keyboard
 * @param type {string}  :全键盘下 英文 en 中文 ch
 * @param size {number}  :键盘大小 12
 */
export interface KeyboardOptions {
  inputEl: HTMLInputElement | string | null
  keyboardEl: HTMLElement | string | null
  theme: string
  mode: string
  type: string
  size: number
}
