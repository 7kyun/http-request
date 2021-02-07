// 定义 method 请求方法
export type Method = 'get'     | 'GET'     |
              'post'    | 'POST'    |
              'put'     | 'PUT'     |
              'delete'  | 'DELETE'  |
              'head'    | 'HEAD'    |
              'options' | 'OPTIONS' |
              'patch'   | 'PATCH'

export interface HttpRequestConfig {
  url: string
  method?: Method
  headers?: any
  data?: any
  params?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface HttpResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: HttpRequestConfig
  request: any
}

export interface HttpPromise extends Promise<HttpResponse> {

}

export interface HttpError {
  message: string
  config: HttpRequestConfig
  code?: string
  request?: any
  response?: HttpResponse
  isHttpError: boolean
}

export interface Http {
  request(config: HttpRequestConfig): HttpPromise
  get(url: string, config?: HttpRequestConfig): HttpPromise
  post(url: string, data?: any, config?: HttpRequestConfig): HttpPromise
  put(url: string, data?: any, config?: HttpRequestConfig): HttpPromise
  delete(url: string, config?: HttpRequestConfig): HttpPromise
  head(url: string, config?: HttpRequestConfig): HttpPromise
  options(url: string, config?: HttpRequestConfig): HttpPromise
  patch(url: string, data?: any, config?: HttpRequestConfig): HttpPromise
}

// Http实例化的接口  这样http实例既是一个函数， 也拥有n个方法
export interface HttpInstance extends Http {
  (config: HttpRequestConfig): HttpPromise
}