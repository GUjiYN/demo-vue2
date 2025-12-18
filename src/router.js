import Vue from 'vue'
import VueRouter from 'vue-router'
import LeftApp from '@/views/LeftApp.vue'
import PushDrawer from "@/views/PushDrawer.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PushDrawer',
    component: PushDrawer
  },
  {
    path: '/left',
    name: 'LeftApp',
    component: LeftApp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router