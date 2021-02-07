import { isDate, isPlainObject } from "./util"

// 数据加密  并保留部分特殊字符
function encode(val: string): string {
  return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3a/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2c/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5b/gi, '[')
        .replace(/%5d/gi, ']')
}

// 组装路由的 路径 + 参数
export function buildUrl(url: string, params?: any) {
  if (!params) return url

  const parts: string[] = []

  Object.keys(params).map(key => {
    let val = params[key]

    // 排除掉 键值为 null和 undefined 的参数
    if (val === null || typeof val === 'undefined') return

    let values: string[]

    if (Array.isArray(val)) {
      // 参数为数组
      values = val // 直接赋值
      key += '[]' // key值加上数组标记  
    } else {
      values = [val]
    }

    values.map(v => {
      // 将对象转为字符串 
      if (isDate(v)) {
        v = v.toISOString()
      } else if (isPlainObject(v)) {
        v = JSON.stringify(v)
      }
      parts.push(`${encode(key)}=${encode(v)}`)
    })
  })

  // 组合所有参数
  let serializeParams = parts.join('&')

  if (serializeParams) {
    const hashIndex = url.indexOf('#')
    if (hashIndex > -1) {
      // 存在 # 则去除
      url = url.slice(0, hashIndex)
    }
    
    // 最后拼接
    url += (url.indexOf('?') < 0 ? '?' : '&') + serializeParams
  }

  return url
}
