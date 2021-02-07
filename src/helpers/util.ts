const toString = Object.prototype.toString

// 是否为 日期对象
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 是否为标准对象
export function isPlainObject(val: any): val is object {
  return toString.call(val) === '[object object]'
}