import { HttpTransformer } from "../type/dataInterface";


export default function transform(
  data: any,
  headers: any,
  fns: HttpTransformer | HttpTransformer[]
): any {
  // 无转化函数 直接输出
  if (!fns) return data
  // 只有一个转化函数 且 非数组 将其改为数组
  if (!Array.isArray(fns)) fns = [fns]
  fns.map(fn => {
    data = fn(data, headers)
  })
  return data
}