import { HttpRequestConfig } from './type/dataInterface'

export function xhr(config: HttpRequestConfig) {
  let { url, method = 'GET', headers, data = null } = config
  const request = new XMLHttpRequest()
  // method 统一处理为大写
  request.open(method.toUpperCase(), url, true)

  // 设置 headers
  Object.keys(headers).map(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      // data 为空时 无需设置 content-type
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}