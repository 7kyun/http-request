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
const specialConfigsKeys = ['url', 'params', 'data']
function specialConfigStrategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2
}
specialConfigsKeys.map(key => {
  strategies[key] = specialConfigStrategy
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