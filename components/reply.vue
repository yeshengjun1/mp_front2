<template>
  <div class="reply-item">
    <div class="reply-content-block">
      
      <div class="comment-func inline-block">
        <span class="pull-right comment-tools ml15">
          <a href="javascript:void(0)" class="ml10" data-placement="top" :title="item.title" v-for="item in tools" :key="item.name" @click="handleClickTool($event, item)">
            <i :class="item.icon" v-if="item.icon"></i>
            <span v-if="item.text">{{item.text}}</span>
          </a>
        </span>
        <span class="comment-meta inline-block">
          <a target="_blank" href="javascript:void(0)" @click="handleClickAuthor($event)">{{author}}<span v-if="targetName"> @ {{targetName}}</span></a>:
          <span class="comments-date">{{content}}</span>
        </span>
      </div>

      <div class="reply-content">
        
        <span class="comments-date">  {{time | filterTime}}</span>
        
        <a href="javascript:void(0)" @click="showReply"><span> &nbsp;	&nbsp;	回复</span></a>
        <div v-if="replyBox" v-loading="loading">
            <el-input 
              type="textarea"
              :rows="2"
              v-model="commentInfo.content"
              placeholder="请输入内容"
              >
            </el-input>
            <p>&nbsp;	</p>
          <el-button type="primary" size="small" @click="addTwoReply">提交</el-button>
          <el-button type="danger" size="small" @click="closeReply">关闭</el-button>
        </div>
        <!-- <p>hello</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import commentApi from "@/api/comment"
export default {
  name: 'ReplyItem',
  props: {
    pid: String,
    rid: String,
    author: String,
    content: String,  
    tools: Array,
    time: [String, Number],
    targetName:String,
  },
  data () {
    return {
      replyBox: false,
      loading: false,
      commentInfo: {},
    }
  },
  computed: {
  },
  created(){
    // 1596457639219
  },
  methods: {
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
    closeReply(){
      this.replyBox = false
      this.commentInfo = {}
    },
    //添加二级评论
    addTwoReply(){
      let self = this
      let userInfo = cookie.get('mp_ucenter')
      userInfo = JSON.parse(userInfo)
      self.commentInfo.memberId = userInfo.id
      self.commentInfo.nickname = userInfo.nickname
      self.commentInfo.avatar = userInfo.avatar
      self.commentInfo.resourceId = self.$route.params.id
      self.commentInfo.parentCommentId = self.pid
      self.commentInfo.targetName = self.author
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
          this.$emit('showComment')
        }
      )
    },

    handleClickTool (event, tool) {
      event.stopPropagation()
      this.$emit('clickTool', this, tool)
    },
    handleClickAuthor (event) {
      event.stopPropagation()
      this.$emit('clickAuthor', this)
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
.ml10 {
  margin-left: 10px !important;
}
.ml15 {
  margin-left: 15px !important;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
.reply-item {
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px dashed rgba(0,0,0,0.09);
  word-break: break-word;
}
.reply-item a {
  color: #009a61;
  text-decoration: none;
  background: transparent;
}
.reply-item a:hover,
.reply-item a:active,
.reply-item a:focus {
  outline: 0;
}
.reply-item p {
  margin-bottom: 5px;
}
.comment-meta {
  color: #999;
}
.inline-block {
  display: inline-block;
}
</style>