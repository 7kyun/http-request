import http, { Canceler } from '../../index'

const CancelToken = http.CancelToken
const source = CancelToken.source()

http.get('/cancel/get', {
  cancelToken: source.token
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    if (http.isCancel(err)) {
      console.log('Request canceled:', err.msg)
    }
  })

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  http.post('/cancel/post', { a: 1 }, { cancelToken: source.token })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      if (http.isCancel(err)) {
        console.log(err.msg)
      }
    })
}, 100)

let cancel: Canceler

http.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log('get err ==', err)
    if (http.isCancel(err)) {
      console.log('Request canceled:', err.msg)
    }
  })
  