<template>
  <div class="container">
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" >
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />
    
    <article class="article-content">
        <div id="J_prismPlayer" ref="playerRef" class="prism-player" style="width:60%;height: 400px;"/>
        <div id="video_list_li"  class="video_list_li">
            <div class="vlink" style="margin-left: 10px;">
                <a class="link-active" v-for="(item,index) in episodeList" :key="index" :href="'/player/' + item.videoSourceId" target="_blank"  id="ODg1MS0xLTA=" >
                    &nbsp;&nbsp;{{item.episodeNum}}&nbsp;&nbsp;
                </a>
            </div>
        </div>
    <!-- 定义播放器dom -->
    </article>
  </div>
</template>
<script>
import vod from '@/api/vod'
import resourceApi from '@/api/resource'

export default {
    layout: 'default',//应用video布局
    data(){
        return {
            playAuth: '', //播放凭证
            vid: '', //资源vid
            episodeList: [], //集列表
            aliPlayer: {},
        }
    },
    methods: {
        initPlayDom(videoId) {
            
            this.play = false
            this.playAuth= ''
            vod.getEpisodeInfo(videoId)
            .then(response => {
                this.aliPlayer = null
                this.playAuth = response.data.data.playAuth
                this.vid = videoId
                this.aliPlayer= new Aliplayer({
                    id: 'J_prismPlayer',
                    vid: this.vid, // 视频id
                    playauth: this.playAuth, // 播放凭证
                    // encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
                    width: '60%',
                    height: '400px',
                    // 以下可选设置
                    // cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
                    qualitySort: 'asc', // 清晰度排序

                    mediaType: 'video', // 返回音频还是视频
                    autoplay: false, // 自动播放
                    isLive: false, // 直播
                    rePlay: false, // 循环播放
                    preload: true,
                    controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
                    useH5Prism: true, // 播放器类型：html5
                }, function(player) {
                    console.log('播放器创建成功')
                })
            })
        },
        getEpisodes(){
            resourceApi.getEpisodes(this.$route.params.vid)
            .then(
                response => {
                    this.episodeList = response.data.data.list
                }
            )
        }
    },

    created(){
        this.initPlayDom(this.$route.params.vid) //加载video
        this.getEpisodes() //获取分集
    },

}
</script>
<style scoped>
    @import "~/assets/css/fstyle.css";
    .link-active {
        border:2px solid #00a1d6;
    }
</style>
