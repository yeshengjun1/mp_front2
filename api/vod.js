import request from '@/utils/request'

export default {
    //查询前两条banner数据
    getEpisodeInfo(vid) {
    return request({
      url: '/vodservice/vod/voucher/' + vid,
      method: 'get'
    })
  },
  
}