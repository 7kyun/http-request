import { isPlainObject } from "./util";

export function stringifyData(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}