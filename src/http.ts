import Http from './core/Http'
import { extend } from './helpers/util'
import { HttpInstance } from './type/dataInterface'


function createInstance(): HttpInstance {
  const context = new Http()
  // 创建一个指向 Http原型中request的方法并绑定了上下文 context
  const instance = Http.prototype.request.bind(context)
  // 将 context 合并到 instance 中
  extend(instance, context)

  return instance as HttpInstance
}

export default createInstance()