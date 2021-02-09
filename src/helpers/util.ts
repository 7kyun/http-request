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

/**
 * 深度合并 
 * @objects | Array 传进来的若干对象（需要合并的参数）
 */
export function deepMerge(...objects: any[]): any {
  const result = Object.create(null)
  objects.map(obj =>{
    if (obj) {
      Object.keys(obj).map(key => {
        const val = obj[key]
        // 若值为对象 需要递归写入值
        if (isPlainObject(val)) {
          // 若已存储该属性 且 值也为对象
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val) // 将 result 和 val 递归合并
          } else {
            result[key] = deepMerge({}, val) // 将 val 递归写入 空对象
          }
        } else {
          // 非 对象 直接写入值
          result[key] = val
        }
      })
    }
  })

  return result
}