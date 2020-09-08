import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1a93cbbe = () => interopDefault(import('..\\pages\\actor\\index.vue' /* webpackChunkName: "pages/actor/index" */))
const _c3fdc6ac = () => interopDefault(import('..\\pages\\comments\\index.vue' /* webpackChunkName: "pages/comments/index" */))
const _4bc79a79 = () => interopDefault(import('..\\pages\\feedback\\index.vue' /* webpackChunkName: "pages/feedback/index" */))
const _7e3c2ab5 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _4c0213f2 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _f1a77b60 = () => interopDefault(import('..\\pages\\resource\\index.vue' /* webpackChunkName: "pages/resource/index" */))
const _2168a1ee = () => interopDefault(import('..\\pages\\resource\\comic\\index.vue' /* webpackChunkName: "pages/resource/comic/index" */))
const _e6adb192 = () => interopDefault(import('..\\pages\\resource\\documentary\\index.vue' /* webpackChunkName: "pages/resource/documentary/index" */))
const _81a489d8 = () => interopDefault(import('..\\pages\\resource\\movie\\index.vue' /* webpackChunkName: "pages/resource/movie/index" */))
const _4143deb2 = () => interopDefault(import('..\\pages\\resource\\teleplay\\index.vue' /* webpackChunkName: "pages/resource/teleplay/index" */))
const _4f9630c9 = () => interopDefault(import('..\\pages\\actor\\_id.vue' /* webpackChunkName: "pages/actor/_id" */))
const _68818a57 = () => interopDefault(import('..\\pages\\player\\_vid.vue' /* webpackChunkName: "pages/player/_vid" */))
const _42f2ce90 = () => interopDefault(import('..\\pages\\resource\\_id.vue' /* webpackChunkName: "pages/resource/_id" */))
const _d375af66 = () => interopDefault(import('..\\pages\\seacher\\_key.vue' /* webpackChunkName: "pages/seacher/_key" */))
const _96d6f0c4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/actor",
    component: _1a93cbbe,
    name: "actor"
  }, {
    path: "/comments",
    component: _c3fdc6ac,
    name: "comments"
  }, {
    path: "/feedback",
    component: _4bc79a79,
    name: "feedback"
  }, {
    path: "/login",
    component: _7e3c2ab5,
    name: "login"
  }, {
    path: "/register",
    component: _4c0213f2,
    name: "register"
  }, {
    path: "/resource",
    component: _f1a77b60,
    name: "resource"
  }, {
    path: "/resource/comic",
    component: _2168a1ee,
    name: "resource-comic"
  }, {
    path: "/resource/documentary",
    component: _e6adb192,
    name: "resource-documentary"
  }, {
    path: "/resource/movie",
    component: _81a489d8,
    name: "resource-movie"
  }, {
    path: "/resource/teleplay",
    component: _4143deb2,
    name: "resource-teleplay"
  }, {
    path: "/actor/:id",
    component: _4f9630c9,
    name: "actor-id"
  }, {
    path: "/player/:vid?",
    component: _68818a57,
    name: "player-vid"
  }, {
    path: "/resource/:id",
    component: _42f2ce90,
    name: "resource-id"
  }, {
    path: "/seacher/:key?",
    component: _d375af66,
    name: "seacher-key"
  }, {
    path: "/",
    component: _96d6f0c4,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
