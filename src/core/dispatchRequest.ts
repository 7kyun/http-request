import { parseData, stringifyData } from '../helpers/data'
import { headersFlattening, processHeaders } from '../helpers/headers';
import { buildUrl } from '../helpers/url'
import { HttpPromise, HttpRequestConfig, HttpResponse } from '../type/dataInterface'
import transform from './transform';
import { xhr } from './xhr'

// 格式化 url
function formatUrl(config: HttpRequestConfig) {
  const { url, params } = config
  return buildUrl(url!, params)
}
// 格式化 header
function formatHeader(config: HttpRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
// 格式化 request data
function formatRequestData(config: HttpRequestConfig) {
  // 将原有的数据处理 改为新的 转化方式
  // return stringifyData(config.data)
  return transform(config.data, config.headers, config.transformRequest!)
}
// 格式化 response data
function formatResponseData(res: HttpResponse) {
  // 将原有的数据处理 改为新的 转化方式
  // res.data = parseData(res.data)
  res.data = transform(res.data, res.headers, res.config.transformResponse!)
  return res
}

// 加工处理 config
function processConfig(config: HttpRequestConfig) {
  config.url = formatUrl(config)
  // transform 已经对headers进行处理了
  // config.headers = formatHeader(config)
  config.data = formatRequestData(config)
  // 将headers进行扁平化处理
  config.headers = headersFlattening(config.headers, config.method!)
}

export default function dispatchRequest(config: HttpRequestConfig): HttpPromise {
  processConfig(config)
  // 发起数据请求
  return xhr(config).then(res => {
    return formatResponseData(res)
  })
}