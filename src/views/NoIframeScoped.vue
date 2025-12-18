<template>
  <!-- 无 iframe 版本：通过 CSS 创建“局部视口”，让弹窗/遮罩只覆盖左侧容器 -->
  <div class="page-container" :style="{ '--drawer-w': showDrawer ? '500px' : '0px' }">
    <!-- 左侧作用域容器：transform/contain 限定 fixed 的参照与绘制边界 -->
    <section class="left-scope">
      <div class="header">
        <el-button type="primary" @click="showDialog = true">左侧：打开弹窗</el-button>
        <el-button type="success" @click="showDrawer = true">打开抽屉</el-button>
      </div>

      <div class="content">
        <el-card shadow="hover">
          <div slot="header">左侧页面（无 iframe）</div>
          <p>这里的弹窗与遮罩只会作用在左侧作用域容器内部，右侧抽屉可继续操作</p>
        </el-card>
      </div>

      <!-- 关键：不逃逸到 body，锁定在 left-scope 内；遮罩/对话框的 fixed 将以 left-scope 为参照 -->
      <el-dialog
        title="提示"
        :visible.sync="showDialog"
        :append-to-body="false"
        :modal-append-to-body="false"
        :lock-scroll="false"
        width="40%"
      >
        <span>这是无 iframe 的局部弹窗，只遮左侧区域。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="showDialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </section>

    <!-- 右侧抽屉：与 PushDrawer 一致的样式与结构 -->
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
  name: 'NoIframeScoped',
  data() {
    return { showDialog: false, showDrawer: false }
  }
}
</script>

<style>
/* 与 PushDrawer 一致的两列布局，不使用 padding */
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

/* 左侧作用域容器：创建 fixed 的包含块 + 绘制裁剪 */
.left-scope {
  position: relative;
  transform: translateZ(0); /* 创建包含块，后代 fixed 以此为参照 */
  /* contain: paint;  */     /* 若需要更强限制可打开发，兼容性注意 */
  /* overflow: clip;  */     /* 新特性：也可改用 overflow:hidden 兜底 */
  overflow: hidden;
  padding: 20px;            /* 与 iframe 版本视觉一致 */
}

.header { margin-bottom: 16px; display: flex; gap: 12px; align-items: center; }
.content { max-width: 960px; }
.dialog-footer { text-align: right; }

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
