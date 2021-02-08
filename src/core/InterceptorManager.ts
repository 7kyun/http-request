import { ResolvedFn, RejectedFn } from './../type/dataInterface'


interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

// 拦截器 管理器
export default class InterceptorManager<T> {
  // 已添加的拦截器
  private interceptors: Array<Interceptor<T> | null>
  
  constructor() {
    // 存储现有的拦截器
    this.interceptors = []
  }

  // 新建拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    // 添加存储 并 返回下标作为 id
    this.interceptors.push({ resolved, rejected })
    return this.interceptors.length - 1
  }

  // 遍历器   fn -> 用来遍历处理当前已有的拦截器对象
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        // 若拦截器存在则执行一遍传入的 fn
        fn(interceptor)
      }
    })
  }

  // 清除拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}