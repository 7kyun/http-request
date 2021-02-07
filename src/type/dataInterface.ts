// 定义 method 请求方法
type Method = 'get'     | 'GET'     |
              'post'    | 'POST'    |
              'put'     | 'PUT'     |
              'delete'  | 'DELETE'  |
              'head'    | 'HEAD'    |
              'options' | 'OPTIONS' |
              'patch'   | 'PATCH'

export interface HttpRequestConfig {
  url: string
  method?: Method
  header?: any
  data?: any
  params?: any
}
