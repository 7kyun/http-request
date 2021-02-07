import { isPlainObject } from "./util"

// 设置 header 的 标准名
function setHeaderName(header: any, normalizeName: string) {
  if (!header) return
  Object.keys(header).map(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      // 大小写不一致
      header[normalizeName] = header[name]
      delete header.name
    }
  })
}

export function processHeaders(header: any, data: any): any {
  setHeaderName(header, 'Content-Type')

  if (isPlainObject(data) && header && !Object.prototype.hasOwnProperty.call(header, 'Content-Type')) {
    // data为对象 && 有header && 未设置header  则设置默认的 Content-Type
    header['Content-Type'] = 'application/json;charset=utf-8'
  }

  return header
}