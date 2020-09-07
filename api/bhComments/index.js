import Comments from '@/api/bhComments/comment'
import Reply from '@/api/bhComments/reply'

const components = [
  Comments,
  Reply
]

const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.1',
  name: 'BhComments',
  install,
  Comments,
  Reply
}