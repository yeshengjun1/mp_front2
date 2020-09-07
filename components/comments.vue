<template>
  <div class="comments-item">
    <div class="pull-left">
      <img class="avatar-32" :src="avatar" alt="" v-if="avatar" @click="handleClickAvatar">
    </div>
    <div class="comments-box">
      <div class="comments-trigger">
        <div class="pull-right comments-option">
          <a href="javascript:void(0)" class="ml10" data-placement="top" :title="item.title" v-for="item in tools" :key="item.name" @click="handleClickTool($event, item)">
            <i :class="item.icon" v-if="item.icon"></i>
            <span v-if="item.text">{{item.text}}</span>
          </a>
        </div>
        <strong><a target="_blank" href="javascript:void(0)" @click="handleClickAuthor">{{author}}</a></strong>
        <span class="comments-date" style="color:#000000;">:&nbsp;{{content}}</span>
      </div>
      <p class="comments-ops">
        <span class="comments-date">{{time | filterTime}}</span>
        <span class="comments-reply-btn ml15" @click="showReply">回复</span>
      </p>
      <div v-if="replyBox" v-loading="loading">
            <el-input 
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="commentInfo.content">
            </el-input>
            <p>&nbsp;	</p>
          <el-button type="primary" size="small" @click="addReply">提交</el-button>
          <el-button type="danger" size="small" @click="closeReply">关闭</el-button>
        </div>
      <div class="reply-list" v-show="hasReply">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import commentApi from "@/api/comment"

export default {
  name: 'CommentsItem',
  props: {
    id: String,
    avatar: String,
    author: String,
    content: String,
    targetName:String,
    ops: Array,
    tools: Array,
    time: [String, Number],
    hasReply: Boolean
  },
  data () {
    return {
      replyBox: false,
      loading: false,
      commentInfo: {}
    }
  },
  methods: {
    closeReply(){
      this.replyBox = false
      this.commentInfo.content=''
    },
    showReply(){
      let self = this
      let userInfo = cookie.get('mp_ucenter')
      
      if(!userInfo){
          self.$message({
              type: 'error',
              message: "请先登录！"
            })
          return
      }
      //回复框
      this.replyBox = !this.replyBox
    },
    handleClickAvatar (event) {
      event.stopPropagation()
      this.$emit('clickAvatar', this)
    },
    handleClickTool (event, tool) {
      event.stopPropagation()
      this.$emit('clickTool', this, tool)
    },
    handleClickAuthor (event) {
      event.stopPropagation()
      this.$emit('clickAuthor', this)
    },
    addReply (event) {
      let self = this
      let userInfo = cookie.get('mp_ucenter')
      userInfo = JSON.parse(userInfo)
      self.commentInfo.memberId = userInfo.id
      self.commentInfo.nickname = userInfo.nickname
      self.commentInfo.avatar = userInfo.avatar
      self.commentInfo.resourceId = self.$route.params.id
      self.commentInfo.parentCommentId = self.id
      self.commentInfo.target = 1
      if(!self.commentInfo.content){
        self.$message({
                  type: 'error',
                  message: "内容不为空"
        })
        return
      }
      commentApi.submitComment(self.commentInfo)
      .then(
        response => {
          event.stopPropagation()
          this.$emit('showComment')
        }
      )
    }
  },
  filters: {
    filterTime (value) {
      if (!value) {
        return '未知时间'
      }
      if (Object.prototype.toString.call(value) === '[object String]') {
        return value
      }
      if (value === '' || isNaN(value)) {
        return '未知时间'
      }
      if (value <= 0) {
        return '未知时间'
      }
      if (value < 10000000000) {
        value *= 1000
      }
      let time = new Date(value)
      let tY = time.getFullYear()
      let tM = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
      let tD = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      let th = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
      let tm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
      let ts = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
      let now = new Date()
      let nY = now.getFullYear()
      let nM = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
      let nD = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
      let result = ''
      if (tY !== nY) {
        result += tY + '年'
      }
      if (tM !== nM || tD !== nD) {
        result += tM + '月'
        result += tD + '日'
      }
      if (result === '') {
        result = th + ':' + tm + ':' + ts
      }
      return result
    }
  }
}
</script>

<style scoped>
img {
  border: 0;
  vertical-align: middle;
}
.ml10 {
  margin-left: 10px !important;
}
.ml15 {
  margin-left: 15px !important;
}
.comments-item {
  padding: 15px 0;
  border-bottom: 1px solid rgba(0,0,0,0.09);
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  font-size: 14px;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
.avatar-32 {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.comments-item a {
  color: #009a61;
  text-decoration: none;
  background: transparent;
}
.comments-item a:hover,
.comments-item a:active,
.comments-item a:focus {
  outline: 0;
}
.comments-box {
  padding-left: 47px;
}
.comments-box strong {
  font-weight: bold;
}
.comments-trigger {
  margin-bottom: 10px;
  color: #999;
  font-size: 13px;
}
.comments-content {
  line-height: 1.6;
  word-wrap: break-word;
  margin-bottom: 10px !important;
}
.comments-content::before,
.comments-content::after {
  display: table;
}
.comments-content::after {
  content: "";
  clear: both;
}
.comments-ops {
  margin: 0;
  color: #999;
  font-size: 13px;
}
.comments-reply-btn {
  cursor: pointer;
}
.reply-list {
  margin-top: 10px;
  font-size: 13px;
  background-color: #FAFAFA;
  padding: 0 10px;
  color: #666;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}
.reply-item--ops {
  border-bottom: none;
}
.reply-item {
  padding-bottom: 10px;
  padding-top: 10px;
  word-break: break-word;
}
</style>