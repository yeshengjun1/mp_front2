import request from '@/utils/request'
export default {
  //登录
  submitComment(data) {
    return request({
      url: `/mp_movie/comment`,
      method: 'post',
      data: data
    })
  },
  
}