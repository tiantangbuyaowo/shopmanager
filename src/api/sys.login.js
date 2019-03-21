import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/goods/category/login',
    method: 'post',
    data
  })
}
