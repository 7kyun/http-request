import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { HttpPromise, HttpRequestConfig, HttpResponse } from '../type/dataInterface'

export function xhr(config: HttpRequestConfig): HttpPromise {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    let { url, method = 'GET', headers, data = null, responseType, timeout } = config

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    // method 统一处理为大写
    request.open(method.toUpperCase(), url!, true)

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

    // 请求完成后
    request.onreadystatechange = () => {
      // 状态码 判断

      //  非 请求结束
      if (request.readyState !== 4) return
      // 网络错误 或 超时
      if (request.status === 0) return
      
      // 解析响应头
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())

      // 检查是否自行设置了responseType的值 并根据值来进行返回值来设置返回的值得类型
      // request.response 返回一个 ArrayBuffer、Blob、Document 或 DOMString 具体是哪种类型取决于 XMLHttpRequest.responseType 的值
      // request.responseText 返回一个 DOMString 该 DOMString 包含对请求的响应 如果请求未成功或尚未发送 则返回 null
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText

      const response: HttpResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      
      handleResponse(response)
    }

    function handleResponse(response: HttpResponse) {
      if (response.status < 300 && response.status >= 200) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }

    request.ontimeout = () => {
      reject(createError(`Timeout of ${request.timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    request.onerror = () => {
      reject(createError('Network Error', config, null, request))
    }
  })
}