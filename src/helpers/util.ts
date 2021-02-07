const toString = Object.prototype.toString

// 是否为 日期对象
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 是否为 标准对象
export function isPlainObject(val: any): val is object {
  return toString.call(val) === '[object Object]'
}

// 混合对象 （将 from的属性 都扩展到 to 内）
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}