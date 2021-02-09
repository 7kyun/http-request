import { Method } from '../type/dataInterface'
import { deepMerge, isPlainObject } from "./util"

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

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed

  // 通过 \r\n 切割 headers字符串
  // \r 回到首行 \n 换行
  headers.split('\r\n').map(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })

  return parsed
}

// 扁平化处理
export function headersFlattening(headers: any, method: Method): any {
  // 若不存在headers 则不作处理直接返回 undefined
  if (!headers) return

  // 将 通用配置、该method的配置、自定义的配置 合并
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  // 移除配置项
  const delKeys = ['get', 'delete', 'head', 'options', 'patch', 'put', 'post', 'common']
  delKeys.map(key => {
    delete headers[key]
  })

  return headers
}