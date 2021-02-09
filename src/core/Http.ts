import { ResolvedFn, RejectedFn } from './../type/dataInterface'
import { HttpPromise, HttpRequestConfig, HttpResponse, Method } from "../type/dataInterface"
import dispatchRequest from "./dispatchRequest"
import InterceptorManager from "./InterceptorManager"
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<HttpRequestConfig>
  response: InterceptorManager<HttpResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: HttpRequestConfig) => HttpPromise)
  rejected?: RejectedFn
}


export default class Http {
  defaults: HttpRequestConfig
  interceptors: Interceptors

  // 实例化的时候 传入默认配置
  constructor(defaultConfig: HttpRequestConfig) {
    this.defaults = defaultConfig
    this.interceptors = {
      request: new InterceptorManager<HttpRequestConfig>(),
      response: new InterceptorManager<HttpResponse>()
    }
  }

  _requestMethodWithoutData(method: Method, url: string, config?: HttpRequestConfig) {
    // 私有方法 定义 无数据的基本请求
    return this.request(
      Object.assign(config || {}, { method, url })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: HttpRequestConfig) {
    // 私有方法 定义 有数据的基本请求
    return this.request(
      Object.assign(config || {}, { method, url, data })
    )
  }

  // 默认请求
  request(url: string | HttpRequestConfig, config?: HttpRequestConfig): HttpPromise {
    if (typeof url === 'string') {
      // url 为路由的情况
      if (!config) {
        // 无config
        config = {}
      }
      config.url = url
    } else {
      // url 为 config
      config = url
    }

    // 在拦截器之前 先将输入配置与默认配置合并
    config = mergeConfig(this.defaults, config)

    // 把默认的处理 xhr 请求的函数放在此处,作为初始值,不管有没有拦截器,这个一定是会执行的
    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    // 设置 请求 拦截器函数, 把后面的放在数组前面
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    // 设置 响应 拦截器函数, 把后面的放在数组后面
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    // 初始化 promise
    let promise = Promise.resolve(config)

    // 遍历 实现拦截器的 链式调用
    while (chain.length) {
      // 提取 第一个 拦截器
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise as HttpPromise
  }
  // 指定请求
  get(url: string, config?: HttpRequestConfig): HttpPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  post(url: string, data?: any, config?: HttpRequestConfig): HttpPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: HttpRequestConfig): HttpPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  delete(url: string, config?: HttpRequestConfig): HttpPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: HttpRequestConfig): HttpPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: HttpRequestConfig): HttpPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  patch(url: string, data?: any, config?: HttpRequestConfig): HttpPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
}