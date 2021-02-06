import { http } from '../../index'

http({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})