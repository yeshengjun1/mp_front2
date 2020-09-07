<template>
  <div>
      <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">搜索结果</span>
            </h2>
          </header>
          <section class="no-data-wrap" v-if="total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，正在努力整理中...</span>
          </section>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="resource in resourceList" :key="resource.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                      style="width:268px;height:178px;"
                        :src="resource.cover"
                        class="img-responsive"
                        :alt="resource.title"
                      >
                      <div class="cc-mask">
                        <a :href="'/resource/' + resource.id" title="详情" class="comm-btn c-btn-1">详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a :href="'/resource/' + resource.id" :title="resource.title" class="course-title fsize18 c-333">{{resource.title}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green" v-if="Number(resource.price) === 0">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{resource.viewCount}}人看过</i>
                        |
                        <i class="c-999 f-fA">{{resource.commentCount}}评论</i>
                      </span>
                    </section>
                  </div>
                </li>
               
              </ul>
              <div class="clear"></div>
            </article>
            
          </div>
        </section>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <a class="undisable" href="javascript:void(0);" @click.prevent="showResourceInfo(1)" title="首页">首</a>
            <a id="backpage" :class="disable"  href="javascript:void(0);"  @click.prevent="showResourceInfo(pageVo.page -1)" title>&lt;</a>
            <a v-for="index in totalPage" :key="index" :class="{lactive: index== pageVo.page}"  href="javascript:void(0);"  @click.prevent="showResourceInfo(index)" title>{{index}}</a>
            <a id="nextpage" :class="disable" href="javascript:void(0);"  @click.prevent="showResourceInfo(pageVo.page +1)" title>&gt;</a>
            <a href="javascript:void(0);" @click.prevent="showResourceInfo(totalPage)" title>末</a>
            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
  </div>
</template>

<script>
import resourceApi from '@/api/resource'
export default {
    data(){
        return {
            w_key: this.$route.params.key,
            pageVo: {
                classifictionId: null,
                classifictionParentId: null,
                key: null,
                page: 1,
                title: null
            },
            resourceList:[],
            total: 0,
            totalPage: 1,
            disable: 'undisable',
        }
    },
    created(){
        this.showResourceInfo(1)
    },

    methods: {
        //获取搜索结果列表
        showResourceInfo(pageNum,classId,index) {
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
            this.pageVo.key = this.$route.params.key
            resourceApi.getResourceByPage(this.pageVo)
                .then(response => {
                this.resourceList = response.data.data.map.resources
                this.total = response.data.data.map.total
                this.totalPage = response.data.data.map.totalPage
                })
            },
    }
}
</script>

<style>
    .lactive{
        border-color: #68cb9b!important;
        color: #68cb9b!important;
    }
</style>>
