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

// http({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'config'
//   }
// })
// http('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'url + config'
//   }
// })

interface ResponseData<T = any> {
  code: number
  data: T
  msg: string
}

interface User {
  name: string
  age: number
}

// http<ResponseData<User>>('/extend/user')
//   .then(res => {
//     console.log(res.data)
//   })
//   .catch(err => {
//     console.log(err)
//   })

function getUser<T>() {
  return http<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function getUserData() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.data.age)
  }
}

getUserData()