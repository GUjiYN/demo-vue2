import Vue from 'vue'
import VueRouter from 'vue-router'
import PushDrawer from '@/views/PushDrawer.vue'
import ElementDrawer from '@/views/ElementDrawer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PushDrawer',
    component: PushDrawer
  },
  {
    path: '/element-drawer',
    name: 'ElementDrawer',
    component: ElementDrawer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router