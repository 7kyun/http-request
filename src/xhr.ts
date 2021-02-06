import { HttpRequestConfig } from './type/dataInterface'

export function xhr(config: HttpRequestConfig) {
  let { url, method = 'GET', data = null } = config
  const request = new XMLHttpRequest()
  // method 统一处理为大写
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}