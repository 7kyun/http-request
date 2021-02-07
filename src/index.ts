import { buildUrl } from './helpers/url'
import { HttpRequestConfig } from './type/dataInterface'
import { xhr } from './xhr'

// 格式化 url
function formatUrl(config: HttpRequestConfig) {
  const { url, params } = config
  return buildUrl(url, params)
}

// 加工处理 config
function processConfig(config: HttpRequestConfig) {
  config.url = formatUrl(config)
}

export function http(config: HttpRequestConfig) {
  processConfig(config)
  xhr(config) // 发起数据请求
}