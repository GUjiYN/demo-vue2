<template>
  <div class="left-root">
    <div class="header">
      <el-button type="primary" @click="showDialog = true">左侧：打开弹窗</el-button>
      <el-button type="success" @click="openDrawer">打开抽屉</el-button>
    </div>

    <div class="content">
      <el-card shadow="hover">
        <div slot="header">左侧页面（iframe 内）</div>
        <p>这里的弹窗与遮罩只会作用在 iframe 内部，不会影响右边抽屉</p>
      </el-card>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      width="40%"
      :lock-scroll="false"
    >
      <span>这是 iframe 内部的 Dialog，只遮住左侧区域。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script>
export default {
  name: 'LeftApp',
  data() {
    return { showDialog: false }
  },
  methods: {
    // 通知父页面打开右侧抽屉
    openDrawer() {
      try {
        window.parent && window.parent.postMessage({ type: 'OPEN_DRAWER' }, window.location.origin)
      } catch (e) {
        // ignore
      }
    }
  },
  mounted() {
    // 监听父页面消息，用于从父页面打开本地弹窗
    this._onMsg = (e) => {
      try {
        // 同源校验（同域下才响应）
        if (e.origin !== window.location.origin) return
        if (e.data && e.data.type === 'OPEN_DIALOG') {
          this.showDialog = true
        }
      } catch (err) {
        // 忽略
      }
    }
    window.addEventListener('message', this._onMsg)
  },
  beforeDestroy() {
    window.removeEventListener('message', this._onMsg)
  }
}
</script>

<style>
.left-root {
  min-height: 100vh;

}
.header { margin-bottom: 16px; display:flex; gap:12px; align-items:center; }
.content { max-width: 960px; }
.dialog-footer { text-align: right; }
</style>
