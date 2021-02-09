import InterceptorManager from "../core/InterceptorManager";

// 定义 method 请求方法
export type Method = 'get'     | 'GET'     |
              'post'    | 'POST'    |
              'put'     | 'PUT'     |
              'delete'  | 'DELETE'  |
              'head'    | 'HEAD'    |
              'options' | 'OPTIONS' |
              'patch'   | 'PATCH'

export interface HttpRequestConfig {
  url?: string
  method?: Method
  headers?: any
  data?: any
  params?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number

  // 添加一个字符串索引的属性 值为 any类型 
  [propName: string]: any

  // 
  transformRequest?: HttpTransformer | HttpTransformer[]
  transformResponse?: HttpTransformer | HttpTransformer[]
}

// 返回data的定义： 泛型 默认为 any
export interface HttpResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: HttpRequestConfig
  request: any
}

// 
export interface HttpPromise<T = any> extends Promise<HttpResponse<T>> {

}

export interface HttpError {
  message: string
  config: HttpRequestConfig
  code?: string
  request?: any
  response?: HttpResponse
  isHttpError: boolean
}

// 定义方法时 保证实际传入的泛型 与 返回的promise的泛型一致
export interface Http {
  defaults: HttpRequestConfig
  interceptors: {
    request: InterceptorManager<HttpRequestConfig>
    response: InterceptorManager<HttpResponse>
  }
  request<T = any>(config: HttpRequestConfig): HttpPromise<T>
  get<T = any>(url: string, config?: HttpRequestConfig): HttpPromise<T>
  post<T = any>(url: string, data?: any, config?: HttpRequestConfig): HttpPromise<T>
  put<T = any>(url: string, data?: any, config?: HttpRequestConfig): HttpPromise<T>
  delete<T = any>(url: string, config?: HttpRequestConfig): HttpPromise<T>
  head<T = any>(url: string, config?: HttpRequestConfig): HttpPromise<T>
  options<T = any>(url: string, config?: HttpRequestConfig): HttpPromise<T>
  patch<T = any>(url: string, data?: any, config?: HttpRequestConfig): HttpPromise<T>
}

// Http实例化的接口  这样http实例既是一个函数， 也拥有n个方法
export interface HttpInstance extends Http {
  <T = any>(config: HttpRequestConfig): HttpPromise<T>
  <T = any>(url: string, config?: HttpRequestConfig): HttpPromise<T> // 运用函数重载 增加第二种函数定义
}

// 拦截器
export interface HttpInterceptorManger<T> {
  // 对 Http 的 req,res 在 promise.then.catch 前进行拦截  输出对应拦截器的id
  use(resolve: ResolvedFn<T>, reject?: RejectedFn): number
  // 通过对应拦截器的id 移除该拦截器
  eject(id: number): void
}
// then 的处理函数定义
export interface ResolvedFn<T = any> {
  // 返回一个联合类型 T 或 resolve(T)的 promise
  (val: T): T | Promise<T>
}
// catch 的处理函数定义
export interface RejectedFn {
  (err: any): any
}