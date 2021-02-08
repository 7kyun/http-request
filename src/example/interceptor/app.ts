import http from '../../index'

// 请求拦截器
http.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
http.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
http.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

// 响应拦截器
http.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let resInterceptor2 = http.interceptors.response.use(res => {
  res.data += '2'
  return res
})
http.interceptors.response.use(res => {
  res.data += '3'
  return res
})

http.interceptors.response.eject(resInterceptor2)


http({
  method: 'get',
  url: '/interceptor/get',
  headers: { test: '' },
  params: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })