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