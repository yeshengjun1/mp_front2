<template>
    <div id="aResourceList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="tac">
          <span class="c-333">新上资源</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <div class="mt40">
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="(item,index) in newResouceList" :key="index" >
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img style="width:268px;height:178px;" :src="item.cover" class="img-responsive" :alt="item.title">
                    <div class="cc-mask">
                      <a :href="'/resource/'+item.id" title="详情" class="comm-btn c-btn-1">详情</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/resource/'+ item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{item.viewCount}}人观看</i>
                      |
                      <i class="c-999 f-fA">{{item.commentCount}}评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import resourceApi from '@/api/resource'
export default {
  name: "side",
  data(){
      return {
          newResouceList: [], //新增资源
      }
  },
  created(){
      //获取新增资源
      this.getNewResourceList()
  },
  methods: {
    getNewResourceList(){
      resourceApi.getNewResourceList()
      .then(
          response => {
              this.newResouceList = response.data.data.list
          }
      )
    }
  }
}
</script>
<style scoped>
    #side-box {
        width: 1160px;
        margin-left: auto;
        margin-right: auto;
    }
</style>