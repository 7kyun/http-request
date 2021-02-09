import http from '../../index'
import qs from 'qs'
import { HttpTransformer } from '../../type/dataInterface'

// http.defaults.headers.common['test2'] = 123

// http({
//   method: 'post',
//   url: '/config/post',
//   data: qs.stringify({ foo: 'bar' }),
//   headers: {
//     test: 321
//   }
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })

http({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(http.defaults.transformRequest as HttpTransformer[])
  ],
  transformResponse: [
    ...(http.defaults.transformResponse as HttpTransformer[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
})
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })
