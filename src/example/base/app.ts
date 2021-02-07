import { http } from '../../index'

http({
  method: 'get',
  url: '/base/get',
  params: {
    date: new Date(),
    status: [1, 2, 3],
    obj: {
      a: 1,
      b: 2
    }
  }
})

http({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([12, 31])

http({
  method: 'post',
  url: '/base/buffer',
  data: arr
})