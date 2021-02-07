import { HttpPromise, HttpRequestConfig, Method } from "../type/dataInterface"
import dispatchRequest from "./dispatchRequest"


export default class Http {
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
  request(config: HttpRequestConfig): HttpPromise {
    return dispatchRequest(config)
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