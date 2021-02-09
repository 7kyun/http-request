import { CancelExecutor } from "../type/dataInterface"


interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string | undefined>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string | undefined>(resolve => {
      resolvePromise = resolve
    })

    executor(msg => {
      if (this.reason) return

      this.reason = msg
      resolvePromise(this.reason)
    })
  }
}