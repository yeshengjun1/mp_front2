<template>
  <div class="container">
    <article class="article-content">
            <div class="video_box">
                <div class="video_img"><img :src="resourceInfo.cover"
                        :alt="resourceInfo.title"></div>
                <div class="video_info">
                    <strong>导演:</strong> 未知<br />
                    <strong>主演:</strong> {{resourceInfo.actorName}}<br/>
                    <strong>类型:</strong> {{resourceInfo.oneLevelClassification}}/{{resourceInfo.twoLevelClassification}}<br />
                    <strong>上映日期:</strong> {{resourceInfo.gmtCreate}}<br />
                </div>
                <div class="video_tga" id="video_tga"></div>
                <div style="clear:both;"></div>
            </div>
            
            <h4 class="ctitle"><strong>在线播放:</strong></h4>
            <div id="video_list_li"  class="video_list_li">
                <div class="vlink" style="margin-left: 10px;">
                    <a  v-for="(item,index) in resourceInfo.episodes" :key="index" :href="'/player/' + item.videoSourceId" id="ODg1MS0xLTA=" >
                      	&nbsp;&nbsp;{{item.episodeNum}}&nbsp;&nbsp;
                    </a>
                </div>
            </div>
            <h4 class="ctitle"><strong>剧情简介:</strong></h4>
            <p class="jianjie">
                <span>{{resourceInfo.description}}</span>
            </p>
    </article>
        
        <div class="article-tags">
            标签：<a href="javascript:void(0);" rel="tag">{{resourceInfo.twoLevelClassification}}</a>
         </div>
        <div class="relate">
          <h3 class="title"><strong>相关视频</strong></h3>
            <section class="no-data-wrap" v-if="false">
                <em class="icon30 no-data-ico">&nbsp;</em>
                <span class="c-666 fsize14 ml10 vam">没有相关数据，正在努力整理中...</span>
            </section>
        
            <article v-for="(item,index) in relevantResourceList" :key="index" class="u-movie">
                <a :title="item.title" :href="'/resource/' + item.id">
                    <div class="list-poster" style="height:170px!important;">
                        <img :src="item.cover" style="height:150px!important;" class="thumb" />
                        <!-- <div class="pingfen"><span>5</span></div> -->
                    </div>
                    <h2>{{item.title}}</h2>
                </a>
            </article>
        </div>
        <h3 class="title" id="comments">
            <div class="text-muted pull-right">
            </div>
            <strong>歡迎留言/評論 <b> 0 </b></strong>
        </h3>
        
        <div id="respond" class="no_webshot">
                <div class="comt-title">
                    <div class="comt-avatar">
                        <img :data-original="user.avatar"
                            class="avatar avatar-100" height="100" width="100"> </div>
                    <div class="comt-author">
                    </div>
                    <a id="cancel-comment-reply-link" href="javascript:void(0);">取消</a>
                </div>
                <!-- <img :src="user.avatar" /> -->
                <div class="comt">
                    <div class="comt-box">
                        <textarea placeholder="请勿发布与网站无关的言论！" class="input-block-level comt-area"
                             id="comment" cols="100%" rows="3" tabindex="1" v-model="comment.content"
                            ></textarea>
                        <div class="comt-ctrl">
                            <div class="comt-tips"><input type='hidden' name='comment_post_ID' value='8851'
                                    id='comment_post_ID' />
                                <input type='hidden' name='comment_parent' id='comment_parent' value='0' />
                            </div>
                            <!-- todo 提交前进行登录判断，未登录无法提交评论 -->
                            <button   id="submit" tabindex="5" @click="submitComment"><i
                                    class="icon-ok-circle icon-white icon12" ></i>提交</button>
                        </div>
                    </div>
                </div>
        </div>
        <div>
            <el-main>
                <comments
                v-for="comment in comments"
                :key="comment.id"
                :id="comment.id"
                :avatar="comment.avatar"
                :author="comment.nickname"
                :content="comment.content"
                :time="comment.gmtCreate"
                :hasReply="replys[comment.id] && replys[comment.id].length > 0"
                @clickAvatar="handleClickAvatar(comment)"
                @clickAuthor="handleClickAuthor(comment)"
                @addReply="handleAddReply(comment)"
                @showComment="listComments()"
                >
                <reply 
                v-for="reply in replys[comment.id]" 
                :key="reply.id" 
                :rid="reply.id" 
                :pid="comment.id" 
                :author="reply.nickname" 
                :content="reply.content" 
                :time="reply.gmtCreate" 
                :targetName="reply.targetName" 
                @showComment="listComments()">
                </reply>
                </comments>
            </el-main>
    </div>
  </div>
</template>
<script>
import resourceApi from "@/api/resource"
import vod from '@/api/vod'
import commentApi from "@/api/comment"
import cookie from 'js-cookie'
import comments from '@/components/comments.vue'
import reply from '@/components/reply.vue'
export default {
    data(){
        return {
            resourceInfo: {},
            rInfo: false,
            play: true,
            vid: '',
            relevantResourceList: [],
            comment:{
                
            },
            user:{},
            comments: [],
            replys: {}
        }
    },
    created(){
        this.listComments() //显示评论
        this.selectResource() //显示资源
        this.showRelevantResource()//显示相关资源
    },
    components: {                                                                                                                                                         comments,
        reply,
    },
    mounted(){
    },
    methods: {
        stopSubmit(){
            return false
        },
        selectResource(){
            resourceApi.selectResource(this.$route.params.id)
            .then(
                response => {
                    this.resourceInfo = response.data.data.resource;
                }
            )
        },
        //查询相关资源
        showRelevantResource(){
            resourceApi.selectRelevantResource(this.$route.params.id)
            .then(
                response => {
                    this.relevantResourceList = response.data.data.items
                }
            )
        },
        //提交评论
        submitComment(){
            let self = this
            let userInfo = cookie.get('mp_ucenter')
            
            if(!userInfo){
                self.$message({
                    type: 'error',
                    message: "请先登录！"
                  })
                return
            }
            userInfo = JSON.parse(userInfo)
            self.comment.memberId = userInfo.id
            self.comment.nickname = userInfo.nickname
            self.comment.avatar = userInfo.avatar
            self.user.avatar = userInfo.avatar
            self.comment.resourceId = self.$route.params.id
            self.comment.target = userInfo.target
            console.log(self.comment)
            commentApi.submitComment(self.comment)
            .then(
                //重新展示评论
                response => {
                    self.listComments()
                    self.comment={}

                }
            )
            
        },
        //显示评论列表
        listComments (){
            let self = this
            let map = {"resourceId": this.$route.params.id}
            // map = JSON.parse(map)
            resourceApi.commentList(map)
            .then(
                response => {
                    response = response.data.data.items
                    self.comments = response ? [].concat(response) : []
                    
                    if (self.comments.length > 0) {
                    this.listReply() // todo 二级回复列表展示
                    }          
                }
        )},
        listReply () {
            let self = this
            self.replys = {}
            if (self.comments.length < 0) {
                return
            }
            for (let i = 0; i < self.comments.length; i++) {
                let value = self.comments[i]
                resourceApi.replyList(value.id)
                .then(response => {
                    response = response.data.data.items
                    self.$set(self.replys, value.id, response ? [].concat(response) : [])
                })
            }
        },
        handleClickAvatar (item) {
            console.log('点击了头像')
        },
        handleClickAuthor (item) {
            console.log('点击了用户')
        },
        handleAddReply (item) {
            console.log(item)
        },
        commentShow(item){
            console.log("index.vue");
        }
    }  
};
</script>
<style scoped >
    @import "~/assets/css/fstyle.css";
</style>