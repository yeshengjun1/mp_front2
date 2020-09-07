<template>
  <div>
      <!-- <el-main>
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
        @showComments="commentShow(comment)"
        >
        
        <reply v-for="reply in replys[comment.id]" :key="reply.id" :author="reply.nickname" :content="reply.content" :time="reply.gmtCreate">
        </reply>
        </comments>
    </el-main> -->
  </div>
</template>
<script>
import comments from '@/components/comments.vue'
import reply from '@/components/reply.vue'
import resourceApi from '@/api/resource'
export default {
  name: 'Dashboard',
  data () {
    return {
      resourceId: this.$route.params.id,
      comments: [],
      replys: {}
    }
  },
  created () {
    //  this.listComments()s
  },
  components: {
    comments,
    reply,
  },
  methods: {
    // commentList (){
    //   console.log('listcomm')
    //     let self = this
    //     let map = {"resourceId": this.resourceId}
    //     resourceApi.commentList(map)
    //     .then(
    //         response => {
    //             response = response.data.data.items
    //             self.comments = response ? [].concat(response) : []
                
    //             if (self.comments.length > 0) {
    //               this.listReply()
    //             }          
    //         }
    //     )
    // },
    // listReply () {
    //   let self = this
    //   self.replys = {}
    //   if (self.comments.length < 0) {
    //     return
    //   }
    //   for (let i = 0; i < self.comments.length; i++) {
    //     let value = self.comments[i]
    //     resourceApi.replyList(value.id)
    //     .then(response => {
    //       response = response.data.data.items
    //       self.$set(self.replys, value.id, response ? [].concat(response) : [])
          
    //     })
    //   }
    // },
    commentShow(item){
      console.log("index.vue");
    },
    handleClickAvatar (item) {
      console.log('点击了头像')
      console.log("index.vue");
    },
    handleClickAuthor (item) {
      console.log('点击了用户')
    },
    handleAddReply (item) {
      //新增回复
      console.log(item)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
