<template>
  <div class="page-container" :style="{ '--drawer-w': drawerAlways ? '500px' : (showDrawer ? '500px' : '0px') }">
    <section class="left-scope">
      <!-- 侧边栏导航：点击切换父路由 /frame/...，从而更新 iframe 的 src -->
      <aside class="sidebar">
        <el-menu :default-active="activeMenuPath" router>
          <el-menu-item index="/frame/left">
            <i class="el-icon-house"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/frame/left/reports">
            <i class="el-icon-document"></i>
            <span>报表</span>
          </el-menu-item>
          <el-menu-item index="/frame/left/settings">
            <i class="el-icon-setting"></i>
            <span>设置</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <main class="left-main">
        <iframe
          ref="leftFrame"
          class="left-app"
          :src="iframeSrc"
          loading="lazy"
          title="左侧页面"
        ></iframe>
      </main>
    </section>

    <!-- 右侧抽屉 -->
    <aside class="drawer" v-show="showDrawer">
      <div class="drawer-header">
        <h3>抽屉标题</h3>
        <el-button type="text" @click="toggle()">
          <i :class="showDrawer ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        </el-button>
      </div>
      <div class="drawer-body">
        <p>这里可以进行其他操作</p>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'PushDrawer',
  data() {
    return {
      showDrawer: true,
    }
  },
  computed: {
    // 从父路由 /frame/:leftPath 推导 iframe 的实际地址
    iframeSrc() {
      const p = this.$route.params.leftPath || 'left'
      return '/' + (p.startsWith('left') ? p : `left/${p}`)
    },
    activeMenuPath() {
      const p = this.$route.params.leftPath || 'left'
      return '/frame/' + p
    }
  },
  methods: {
    toggle() { this.showDrawer = !this.showDrawer },
  },
  mounted() {
    // 监听来自左侧 iframe 的指令
    this._onMsg = (e) => {
      try {
        if (e.origin !== window.location.origin) return
        if (e.data && e.data.type === 'OPEN_DRAWER') {
          this.showDrawer = true
        }
      } catch (err) {
        console.warn('Message handling error:', err)
      }
    }
    window.addEventListener('message', this._onMsg)
  },
  beforeDestroy() {
    window.removeEventListener('message', this._onMsg)
  }
}
</script>

<style scoped>
.page-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-columns: 1fr var(--drawer-w, 0px);
  grid-template-rows: 100vh;
  overflow: hidden;
  background: #f5f7fa;
}
.left-scope {
  position: relative;
  transform: translateZ(0);
  overflow: hidden;
  display: grid;
  grid-template-columns: 220px 1fr;
}

.sidebar {
  height: 100%;
  background: #fff;
  border-right: 1px solid #e8e8e8;
}

.left-main { padding: 0; overflow: hidden; }

.drawer {
  inline-size: var(--drawer-w, 0px);
  block-size: 100%;
  background-color: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.12);
  border-left: 1px solid #e8e8e8;
  overflow: auto;
  transition: inline-size 0.28s ease;
}

.drawer-header {
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.drawer-header h3 { margin: 0; font-size: 16px; color: #333; }
.drawer-body { padding: 16px; line-height: 1.7; }

.left-app {
  width: 100%;
  height: 100%;
  display: block;
  background: #fff;
  border: 0;
}
</style>
