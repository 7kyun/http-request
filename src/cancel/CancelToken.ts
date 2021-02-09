import { Canceler, CancelTokenSource, CancelExecutor } from './../type/dataInterface'
import Cancel from './Cancel'


interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve as ResolvePromise
    })

    executor(msg => {
      if (this.reason) return

      this.reason = new Cancel(msg)
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return { cancel, token }
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}