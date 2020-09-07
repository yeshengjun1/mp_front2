import Comments from '@/components/comments'

Comments.install = function (Vue) {
  Vue.component(Comments.name, Comments)
}

export default Comments