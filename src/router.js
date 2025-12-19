import Vue from 'vue'
import VueRouter from 'vue-router'
import LeftApp from '@/views/LeftApp.vue'
import PushDrawer from '@/views/PushDrawer.vue'
import NoIframeScoped from '@/views/NoIframeScoped.vue'
import Reports from '@/views/Reports.vue'
import Settings from '@/views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/frame/left' },
  { path: '/frame/:leftPath(.*)?', name: 'PushDrawerFrame', component: PushDrawer },
  { path: '/left', name: 'LeftApp', component: LeftApp },
  { path: '/left/reports', name: 'LeftReports', component: Reports },
  { path: '/left/settings', name: 'LeftSettings', component: Settings },
  { path: '/no-iframe', name: 'NoIframeScoped', component: NoIframeScoped },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
