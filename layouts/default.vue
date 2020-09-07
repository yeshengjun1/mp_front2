<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="ysj">
            <img src="~/assets/img/pic/logo.png" width="100%" alt="ysj">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/resource/movie?rclass=1178214681118568449" tag="li" active-class="current">
              <a>电影</a>
            </router-link>
            <router-link to="/resource/teleplay?rclass=1178214681139539969" tag="li" active-class="current">
              <a>电视剧</a>
            </router-link>
            <router-link to="/resource/comic?rclass=1285866955915997186" tag="li" active-class="current">
              <a>动漫</a>
            </router-link>
            <router-link to="/resource/documentary?rclass=1285866956918435841" tag="li" active-class="current">
              <a>纪录片</a>
            </router-link>
            <router-link to="/qa" tag="li" active-class="current">
              <a class="nav-a">反馈</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
                <a href="/login" title="登录">
                    <em class="icon18 login-icon">&nbsp;</em>
                    <span class="vam ml5">登录</span>
                </a>
                |
                <a href="/register" title="注册">
                    <span class="vam ml5">注册</span>
                </a>
            </li>
            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
                <a id="headerMsgCountId" href="javascript:void(0);" title="消息">
                    <em class="icon18 news-icon">&nbsp;</em>
                </a>
                <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
                <a href="/ucenter" title>
                    <img
                        :src="loginInfo.avatar"
                        width="30"
                        height="30"
                        class="vam picImg"
                        alt
                        >
                    <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
                </a>
                <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
        </ul>
          <aside class="h-r-search">
              <label class="h-r-s-box">
                <input type="text" placeholder="影片"  v-model="key">
                <button  @click="$router.push('/seacher/'+key)" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    
    <!-- /公共头引入 -->
    <nuxt/>
    <side/>
    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>

          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="javascript:void(0);" title="关于我们" >关于我们</a>|
                <a href="javascript:void(0);" title="联系我们" >联系我们</a>|
                <a href="javascript:void(0);" title="帮助中心" >帮助中心</a>|
                <a href="javascript:void(0);" title="资源下载" >资源下载</a>|
                <span>服务热线：17721537540(南京)</span>
                <span>Email：2735898908@qq.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>© 皖ICP备19024575号-1</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import "~/assets/css/player.css";
import "~/assets/css/dplayer.css";
import side from "@/components/aside.vue"
import userApi from '@/api/login'
import cookie from 'js-cookie'
import resourceApi from '@/api/resource'
export default {
  data(){
   return {
      key: '',
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }
   }
  },
  components:{
      side
  },
  created(){
    this.token = this.$route.query.token
    if(this.token){
      this.wxLogin() //微信登录
    }
    this.showInfo() //显示登录信息
  },
  methods: {
    showInfo() {
      var jsonStr = cookie.get("mp_ucenter");
      if (jsonStr) {
        this.loginInfo = JSON.parse(jsonStr)
      }
  },
  logout() {
    //  注销登录
      cookie.set('mp_ucenter', "", {domain: 'localhost'})
      cookie.set('mp_token', "", {domain: 'localhost'})
      //跳转页面
      window.location.href = "/"
  },
  wxLogin() {
      if (this.token == '') return
      cookie.set('mp_token', this.token, {domain: 'localhost'})
      cookie.set('mp_ucenter', '', {domain: 'localhost'})
      //登录成功根据token获取用户信息
      userApi.getLoginInfo().then(response => {
        this.loginInfo = response.data.data.item
        //将用户信息记录cookie
        cookie.set('mp_ucenter', this.loginInfo, {domain: 'localhost'})
      })
    }
  },
  //搜索功能
  
}
</script>
<style scoped>
a {
    color: #000;
}
</style>