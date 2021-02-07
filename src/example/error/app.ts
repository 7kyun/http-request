import http, { HttpError } from '../../index'

// http({
//   method: 'get',
//   url: '/error/get1'
// })
//   .then(res => {
//     console.log('get1 -- res --', res)
//   })
//   .catch(err => {
//     console.log('get1 --> err --', err)
//   })

// http({
//   method: 'get',
//   url: '/error/get'
// })
//   .then(res => {
//     console.log('get -- res --', res)
//   })
//   .catch(err => {
//     console.log('get --> err --', err)
//   })

http({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log('timeout -- res --', res)
  })
  .catch((err: HttpError) => {
    console.log(err)
    console.log(err.message)
    console.log(err.config)
    console.log(err.code)
    console.log(err.request)
  })