import { config } from 'shelljs';
import { config } from 'shelljs';
import { parseData, stringifyData } from './helpers/data'
import { processHeaders } from './helpers/headers';
import { buildUrl } from './helpers/url'
import { HttpPromise, HttpRequestConfig, HttpResponse } from './type/dataInterface'
import { xhr } from './xhr'

// 格式化 url
function formatUrl(config: HttpRequestConfig) {
  const { url, params } = config
  return buildUrl(url, params)
}
// 格式化 header
function formatHeader(config: HttpRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
// 格式化 request data
function formatRequestData(config: HttpRequestConfig) {
  return stringifyData(config.data)
}
// 格式化 response data
function formatResponseData(res: HttpResponse) {
  res.data = parseData(res.data)
  return res
}

// 加工处理 config
function processConfig(config: HttpRequestConfig) {
  config.url = formatUrl(config)
  config.headers = formatHeader(config)
  config.data = formatRequestData(config)
}

export function http(config: HttpRequestConfig): HttpPromise {
  processConfig(config)
  // 发起数据请求
  return xhr(config).then(res => {
    return formatResponseData(res)
  })
}