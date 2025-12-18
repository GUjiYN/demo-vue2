<template>
  <!-- 父页面：Grid 两列布局 + iframe 左侧 + 右侧抽屉 -->
  <div class="page-container" :style="{ '--drawer-w': showDrawer ? '500px' : '0px' }">
    <!-- 左侧业务：子文档（同源路由 /left）-->
    <iframe
      ref="leftFrame"
      class="left-app"
      src="/left"
      loading="lazy"
      title="左侧页面"
    ></iframe>
    <!-- 右侧抽屉：处于父页面右列，不受左侧遮罩影响 -->
    <aside class="drawer" v-show="showDrawer">
      <div class="drawer-header">
        <h3>抽屉标题</h3>
        <el-button type="text" @click="showDrawer = false"><i class="el-icon-close"></i></el-button>
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
    return { showDrawer: false }
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
  },
  methods: {}
}
</script>

<style>
.page-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-columns: 1fr var(--drawer-w, 0px);
  grid-template-rows: 100vh;
  overflow: hidden;
}

.left-app {
  width: 100%;
  height: 100%;
  display: block;
  background: #fff;
  border: 0;
}

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
  justify-content: space-between;
  align-items: center;
}

.drawer-header h3 { margin: 0; font-size: 16px; color: #333; }
.drawer-body { padding: 16px; line-height: 1.7; }
</style>