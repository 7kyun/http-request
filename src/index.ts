import { stringifyData } from './helpers/data'
import { processHeaders } from './helpers/headers';
import { buildUrl } from './helpers/url'
import { HttpRequestConfig } from './type/dataInterface'
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
// 格式化 data
function formatData(config: HttpRequestConfig) {
  return stringifyData(config.data)
}

// 加工处理 config
function processConfig(config: HttpRequestConfig) {
  config.url = formatUrl(config)
  config.headers = formatHeader(config)
  config.data = formatData(config)
}

export function http(config: HttpRequestConfig) {
  processConfig(config)
  xhr(config) // 发起数据请求
}