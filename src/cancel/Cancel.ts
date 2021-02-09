export default class Cancel {
  msg?: string

  constructor(msg?: string) {
    this.msg = msg
  }
}

// 判断是否为 Cancel的实例
export function isCancel(val: any): boolean {
  return val instanceof Cancel
}