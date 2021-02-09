import http from '../../index'
import qs from 'qs'

http.defaults.headers.common['test2'] = 123

http({
  method: 'post',
  url: '/config/post',
  data: qs.stringify({ foo: 'bar' }),
  headers: {
    test: 321
  }
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })