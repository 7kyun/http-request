const toString = Object.prototype.toString

// 是否为 日期对象
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 是否为普通对象
export function isObject(val: any): val is Object{
  return val !== null && typeof val === 'object'
}