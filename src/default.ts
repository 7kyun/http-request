import { HttpRequestConfig } from './type/dataInterface'

// 默认配置
const defaults: HttpRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    // 通用 headers
    common: {
      Accept: 'application/json,text/plain,*/*' // 接收的的参数格式
    }
  }
}

// 初始化部分 方法 headers 的默认属性
const noDataMethods = ['delete', 'get', 'head', 'options']
noDataMethods.map(method => {
  defaults.headers[method] = {}
})
const withDataMethods = ['post', 'put', 'patch']
withDataMethods.map(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export { defaults }