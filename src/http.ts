import Cancel, { isCancel } from './cancel/Cancel'
import CancelToken from './cancel/CancelToken'
import Http from './core/Http'
import mergeConfig from './core/mergeConfig'
import { defaults } from './default'
import { extend } from './helpers/util'
import { HttpInstance, HttpRequestConfig, HttpStatic } from './type/dataInterface'


function createInstance(defaultConfig: HttpRequestConfig): HttpStatic {
  const context = new Http(defaultConfig)
  // 创建一个指向 Http原型中request的方法并绑定了上下文 context  即直接调用 http 会调用 Http中的request
  const instance = Http.prototype.request.bind(context)
  // 将 context 合并到 instance 中
  extend(instance, context)

  return instance as HttpStatic
}

// 创建 http 实例
const http = createInstance(defaults)

http.create = function create(config: HttpRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

http.CancelToken = CancelToken
http.Cancel = Cancel
http.isCancel = isCancel

export default http