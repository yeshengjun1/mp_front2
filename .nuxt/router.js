import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7a5f03d2 = () => interopDefault(import('../pages/actor/index.vue' /* webpackChunkName: "pages/actor/index" */))
const _68af2f68 = () => interopDefault(import('../pages/comments/index.vue' /* webpackChunkName: "pages/comments/index" */))
const _377abbf0 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _b7124c58 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _175485fc = () => interopDefault(import('../pages/resource/index.vue' /* webpackChunkName: "pages/resource/index" */))
const _29456c4e = () => interopDefault(import('../pages/resource/comic/index.vue' /* webpackChunkName: "pages/resource/comic/index" */))
const _36f9ee40 = () => interopDefault(import('../pages/resource/documentary/index.vue' /* webpackChunkName: "pages/resource/documentary/index" */))
const _383c32e3 = () => interopDefault(import('../pages/resource/movie/index.vue' /* webpackChunkName: "pages/resource/movie/index" */))
const _d74d383e = () => interopDefault(import('../pages/resource/teleplay/index.vue' /* webpackChunkName: "pages/resource/teleplay/index" */))
const _6fc51a3f = () => interopDefault(import('../pages/actor/_id.vue' /* webpackChunkName: "pages/actor/_id" */))
const _00813f9f = () => interopDefault(import('../pages/player/_vid.vue' /* webpackChunkName: "pages/player/_vid" */))
const _a659d02c = () => interopDefault(import('../pages/resource/_id.vue' /* webpackChunkName: "pages/resource/_id" */))
const _f7881902 = () => interopDefault(import('../pages/seacher/_key.vue' /* webpackChunkName: "pages/seacher/_key" */))
const _1a9afef1 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _7a5f03d2,
    name: "actor"
  }, {
    path: "/comments",
    component: _68af2f68,
    name: "comments"
  }, {
    path: "/login",
    component: _377abbf0,
    name: "login"
  }, {
    path: "/register",
    component: _b7124c58,
    name: "register"
  }, {
    path: "/resource",
    component: _175485fc,
    name: "resource"
  }, {
    path: "/resource/comic",
    component: _29456c4e,
    name: "resource-comic"
  }, {
    path: "/resource/documentary",
    component: _36f9ee40,
    name: "resource-documentary"
  }, {
    path: "/resource/movie",
    component: _383c32e3,
    name: "resource-movie"
  }, {
    path: "/resource/teleplay",
    component: _d74d383e,
    name: "resource-teleplay"
  }, {
    path: "/actor/:id",
    component: _6fc51a3f,
    name: "actor-id"
  }, {
    path: "/player/:vid?",
    component: _00813f9f,
    name: "player-vid"
  }, {
    path: "/resource/:id",
    component: _a659d02c,
    name: "resource-id"
  }, {
    path: "/seacher/:key?",
    component: _f7881902,
    name: "seacher-key"
  }, {
    path: "/",
    component: _1a9afef1,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
