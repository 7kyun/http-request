import { deepMerge, isPlainObject } from '../helpers/util'
import { HttpRequestConfig } from './../type/dataInterface'

/**
 * 默认合并方案 如有新的则采用，否则采用默认
 * @val1  已有配置值
 * @val2  新的配置值
 */
function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2
}

// 存储各种合并方法的对象（某些特殊数据需要采用特殊的方案）
const strategies = Object.create(null)

// 针对一些特殊的 配置使用特殊的 合并方法
function specialConfigStrategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2
}
const specialConfigsKeys = ['url', 'params', 'data']
specialConfigsKeys.map(key => {
  strategies[key] = specialConfigStrategy
})

/**
 * 深度合并方案
 * @val1 已有参数
 * @val2 需要合并的参数
 */
function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    // val2 为对象则采用深度合并工具
    return deepMerge([val1, val2])
  } else if (typeof val2 !== 'undefined') {
    // val2 非对象且不为空
    return val2
  } else if (isPlainObject(val1)) {
    // 只有val1 且 val1 为对象
    return deepMerge([val1])
  } else if(typeof val1 !== 'undefined') {
    // 只有val1 且 val1 非对象 且 不为空
    return val1
  }
}
// 需要深度合并的配置 采用深度合并策略
const deepConfigKeys = ['headers']
deepConfigKeys.map(key => {
  strategies[key] = deepMergeStrategy
})

/**
 * 合并配置
 * @config1 当前配置
 * @config2 可选，需要合并的配置
 */
export default function mergeConfig(
  config1: HttpRequestConfig,
  config2?: HttpRequestConfig
): HttpRequestConfig {
  if (!config2) config2 = {}

  const config = Object.create(null)

  // 先把config2的配置全部写入
  for (let key in config2) {
    mergeField(key)
  }

  // 再将config2中没有的config1的配置写入
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    // 如有特别定义改配置的合并方法则使用  否则 使用默认
    const strategy = strategies[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  return config
}