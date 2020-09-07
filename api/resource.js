import request from '@/utils/request'

export default {
  // 获取热门资源
  getHotResources() {
    return request({
      url: '/mp_movie/f_resource/hot',
      method: 'get'
    })
  },

  //获取资源详情
  selectResource(id){
    return request({
      url: `/mp_movie/f_resource/${id}`,
      method: 'get'
    })
  },
  //获取集id获取集列表
  getEpisodes(vid){
    return request({
      url: '/mp_movie/f_episode/' + vid,
      method: 'get'
    })
  },
  //获取新增资源
  getNewResourceList(){
    return request({
      url: '/mp_movie/f_resource',
      method: 'get'
    })
  },


  //根据资源分类获取
  getResourceByPage(pageInfo){
    return request({
      url: '/mp_movie/f_resource/page',
      method: 'post',
      data: pageInfo
    })
  },
  //根据资源分类获取子分类
  getSubClassification(id){
    return request({
      url: '/mp_movie/classifications/'+id,
      method: 'get'
    })
  },
  //获取相关资源

  // /mp_movie/f_resource/relevantResource/{id}

  selectRelevantResource(id){
    return request({
      url: '/mp_movie/f_resource/relevantResource/'+id,
      method: 'get'
    })
  },
  
  // 回复功能
  commentList(data){
    return request({
      url: '/mp_movie/comment/commentList',
      method: 'post',
      data: data
    })
  },
  replyList(id){
    return request({
      url: '/mp_movie/comment/replyList/'+id,
      method: 'get'
    })
  }
}

