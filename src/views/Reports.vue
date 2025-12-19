<template>
  <div class="left-root">
    <div class="header">
      <el-button type="primary" @click="showDialog = true">报表：打开弹窗</el-button>
      <el-button type="success" @click="openDrawer()">打开抽屉</el-button>
    </div>

    <el-card shadow="hover">
      <div slot="header">报表页面</div>
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
  name: 'LeftReports',
  data() {
    return { showDialog: false }
  },
  methods: {
    // 通知父页面打开右侧抽屉（iframe -> parent）
    openDrawer() {
      try {
        window.parent && window.parent.postMessage({ type: 'OPEN_DRAWER' }, window.location.origin)
      } catch (e) {
        // ignore
      }
    }
  },
  mounted() {
    // 来自父页面的打开弹窗指令
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
