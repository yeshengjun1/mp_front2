<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">佳剧赏析</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部"  href="javascript:void(0);" :class="{linkActive:oneIndex == -1}" @click.prevent="showResourceInfo(1,null,-1)">全部</a>
                </li>
                <li v-for="(item,index) in classifictionList" :key="index" >
                  <!-- todo -->
                  <a :title="item.title"  href="javascript:void(0);" :class="{linkActive:oneIndex == index}" @click.prevent="showResourceInfo(1,item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="mt40">

          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="(item,index) in resourceList" :key="index">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" style="width:268px;height:178px;" class="img-responsive" :alt="item.title">
                    <div class="cc-mask">
                      <a :href="'/resource/' + item.id" title="详情" class="comm-btn c-btn-1">详情</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/resource/' + item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA" v-if="item.price == 0">免费</i>
                      <i class="c-fff fsize12 f-fA" v-if="item.price != 0" >会员</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{item.viewCount}}人看过</i>
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
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <a class="undisable" href="javascript:void(0);" @click.prevent="showResourceInfo(1)" title="首页">首</a>
            <a id="backpage" :class="disable"  href="javascript:void(0);"  @click.prevent="showResourceInfo(pageVo.page -1)" title>&lt;</a>
            <a v-for="index in totalPage" :key="index"   href="javascript:void(0);"  @click.prevent="showResourceInfo(index)" title>{{index}}</a>
            <a id="nextpage" :class="disable" href="javascript:void(0);"  @click.prevent="showResourceInfo(pageVo.page +1)" title>&gt;</a>
            <a href="javascript:void(0);" @click.prevent="showResourceInfo(totalPage)" title>末</a>
            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import resourceApi from '@/api/resource'
export default {
  name: "playInfo",
  data(){
    return {
      classifictionList: [],
      resourceList: [],
      classifictionParentId: this.$route.query.rclass,
      pageVo:{
        classifictionParentId: this.$route.query.rclass,
        classifictionId: null,
        key: null,
        page: 1,
      },
      total: 0,
      totalPage: 1,
      disable: 'undisable',
      oneIndex: -1,
    }
  },
  created(){
    this.getSubClassification()
    this.showResourceInfo(1)
  },
  methods: {
    //获取资源分页
    showResourceInfo(pageNum,classId,index){
      //avtive
      if(index || index == 0){
        this.oneIndex = index
      }
      if(pageNum == 0 || pageNum > this.totalPage ){
        this.disable = 'undisable'
        return
      }
      this.disable = ''
      this.pageVo.page = pageNum
      this.pageVo.classifictionId = classId
      resourceApi.getResourceByPage(this.pageVo)
      .then(
        response => {
          this.resourceList = response.data.data.map.resources
          this.total = response.data.data.map.total
          if(response.data.data.map.totalPage){
            this.totalPage =  response.data.data.map.totalPage
          }

        }
      )
    },
    //获取资源子分类
    getSubClassification(){
      resourceApi.getSubClassification(this.classifictionParentId)
      .then(
        response => {
           this.classifictionList = response.data.data.items
        }
      )
    }
  }
};
</script>
<style scoped>
  .linkActive {
    color: red;
  }
</style>
