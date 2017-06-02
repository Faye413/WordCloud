import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import WordCloud from '@/components/WordCloud'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/cloud',
      name: 'WordCloud',
      component: WordCloud
    }
  ]
})
