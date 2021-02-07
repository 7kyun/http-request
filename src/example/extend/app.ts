import http from '../../index'

// http({
//   method: 'post',
//   url: '/extend/post',
//   data: {
//     msg: '直接运行'
//   }
// })

// http.request({
//   method: 'post',
//   url: '/extend/post',
//   data: {
//     msg: '调用request方法'
//   }
// })

// http.get('/extend/get')
// http.options('/extend/options')
// http.delete('/extend/delete')
// http.head('/extend/head')
// http.post('/extend/post', { msg: 'post' })
// http.put('/extend/put', { msg: 'put' })
// http.patch('/extend/patch', { msg: 'patch' })

// http.get('/extend/user')

http({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'config'
  }
})
http('/extend/post', {
  method: 'post',
  data: {
    msg: 'url + config'
  }
})
