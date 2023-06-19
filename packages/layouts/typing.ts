// import type { KeyCode } from '@snow_keyboard/constants'
export interface Key {
  keyCode: number
  pri: string
  sec?: string
  tert?: string
  size?: number | string
}

export type Layout = Key[][]
