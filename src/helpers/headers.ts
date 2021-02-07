import { isPlainObject } from "./util"

// 设置 headers 的 标准名
function setHeaderName(headers: any, normalizeName: string) {
  if (!headers) return
  Object.keys(headers).map(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      // 大小写不一致
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  setHeaderName(headers, 'Content-Type')

  if (isPlainObject(data) && headers && !Object.prototype.hasOwnProperty.call(headers, 'Content-Type')) {
    // data为对象 && 有headers && 未设置headers  则设置默认的 Content-Type
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }

  return headers
}