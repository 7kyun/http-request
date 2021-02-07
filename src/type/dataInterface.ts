import { config } from 'shelljs';
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