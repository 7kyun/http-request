import { HttpRequestConfig, HttpResponse } from "../type/dataInterface"

// 
export class HttpError extends Error {
  isHttpError: boolean
  config: HttpRequestConfig
  code?: string | null
  request?: any
  response?: HttpResponse

  constructor(
    message: string,
    config: HttpRequestConfig,
    code?: string | null,
    request?: any,
    response?: HttpResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isHttpError = true

    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

export function createError(
  message: string,
  config: HttpRequestConfig,
  code?: string | null,
  request?: any,
  response?: HttpResponse
): HttpError {
  const error = new HttpError(message, config, code, request, response)
  return error
}