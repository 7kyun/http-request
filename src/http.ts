import Http from './core/Http'
import { defaults } from './default'
import { extend } from './helpers/util'
import { HttpInstance, HttpRequestConfig } from './type/dataInterface'


function createInstance(defaultConfig: HttpRequestConfig): HttpInstance {
  const context = new Http(defaultConfig)
  // 创建一个指向 Http原型中request的方法并绑定了上下文 context  即直接调用 http 会调用 Http中的request
  const instance = Http.prototype.request.bind(context)
  // 将 context 合并到 instance 中
  extend(instance, context)

  return instance as HttpInstance
}

// 创建 http 实例
const http = createInstance(defaults)

export default http