<template>
  <div class="left-root">
    <div class="header">
      <el-button type="primary" @click="showDialog = true">设置：打开弹窗</el-button>
      <el-button type="success" @click="openDrawer()">打开抽屉</el-button>
    </div>

    <el-card shadow="hover">
      <div slot="header">设置页面</div>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      :append-to-body="false"
      :modal-append-to-body="false"
      :lock-scroll="false"
      width="40%"
    >
      <span>这是局部弹窗，只遮住左侧区域。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LeftSettings',
  data() {
    return { showDialog: false }
  },
  methods: {
    openDrawer() {
      try {
        window.parent && window.parent.postMessage({ type: 'OPEN_DRAWER' }, window.location.origin)
      } catch (e) {
        // 在严格 eslint 下避免空 catch；非生产环境记录错误
        if (process && process.env && process.env.NODE_ENV !== 'production') {
          console.warn('openDrawer failed:', e)
        }
      }
    }
  },
  mounted() {
    this._onMsg = (e) => {
      try {
        if (e.origin !== window.location.origin) return
        if (e.data && e.data.type === 'OPEN_DIALOG') {
          this.showDialog = true
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
.left-root { min-height: 100%; }
.header { margin-bottom: 16px; display:flex; gap:12px; align-items:center; }
</style>
