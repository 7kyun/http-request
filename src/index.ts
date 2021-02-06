import { HttpRequestConfig } from './type/dataInterface'
import { xhr } from './xhr'

export function http(config: HttpRequestConfig) {
  xhr(config) // 发起数据请求
}