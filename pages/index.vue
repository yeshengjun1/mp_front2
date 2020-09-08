<template>
  <div>
    <!-- 幻灯片 开始 -->
  <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">

          <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" style="background: #040B1B;">
              <a :href="banner.linkUrl">
                  <img style="width:1160px;weight:656px" :src="banner.imageUrl" :alt="banner.title">
              </a>
          </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
<!--      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>-->
<!--      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
  </div>
  <!-- 幻灯片 结束 -->

      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门资源</span>
            </h2>
          </header>
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
      </div>
    </div>
</template>

<script>
import banner from '@/api/banner'
import resourceApi from '@/api/resource'
export default {
  data () {
    return {

      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        }
      },
      //banner数组
      bannerList:[],
      resourceList:[],
    }
  },
  created() {
    //调用查询banner的方法
    this.getBannerList()
    this.getHotResources()

  },
  methods:{
    //查询热门资源
    getHotResources() {
      resourceApi.getHotResources()
        .then(response => {
          this.resourceList = response.data.data.list
        })
    },
    //查询banner数据
    getBannerList() {
      banner.getListBanner()
        .then(response => {
          this.bannerList = response.data.data.banners
        })
    }
  }
}
</script>
