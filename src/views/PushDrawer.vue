<template>
  <div class="page-container">
    <!-- 操作按钮组 -->
    <div class="button-group">
      <el-button type="primary" @click="showDialog = true">
        打开对话框
      </el-button>
      <el-button type="success" @click="showDrawer = true">
        打开抽屉
      </el-button>
    </div>

    <!-- 主内容区域容器 -->
    <div class="main-content-wrapper" :class="{ 'drawer-open': showDrawer }">
      <!-- 示例内容区域 -->
      <div class="content-container">
        <h1>主内容区域</h1>
        <p>这里是一些示例内容，用来验证抽屉打开时主内容区的响应式收缩效果。</p>

        <!-- 卡片网格 -->
        <div class="card-grid">
          <el-card class="demo-card" shadow="hover">
            <div slot="header">
              <span>卡片 1</span>
            </div>
            <div>这是一些内容</div>
          </el-card>

          <el-card class="demo-card" shadow="hover">
            <div slot="header">
              <span>卡片 2</span>
            </div>
            <div>这里是另一部分内容</div>
          </el-card>

          <el-card class="demo-card" shadow="hover">
            <div slot="header">
              <span>卡片 3</span>
            </div>
            <div>更多的内容在这里</div>
          </el-card>
        </div>

        <!-- 表格示例 -->
        <el-table :data="tableData" style="width: 100%; margin-top: 20px;" border>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 右侧抽屉区域 -->
    <transition name="slide">
      <div class="right-drawer" v-show="showDrawer">
        <div class="drawer-header">
          <h3>抽屉标题</h3>
          <el-button type="text" @click="showDrawer = false">
            <i class="el-icon-close"></i>
          </el-button>
        </div>
        <div class="drawer-body">
          <p>这是自定义的推动抽屉</p>
          <p>主内容区会被向左推动</p>
          <p>页面宽度会响应式调整</p>
        </div>
      </div>
    </transition>

    <!-- 对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      width="30%"
      :lock-scroll="false"
    >
      <span>这是一个使用 Element UI 创建的对话框</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PushDrawer',
  data() {
    return {
      showDialog: false,
      showDrawer: false,
      tableData: [
        {
          date: '2024-01-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2024-01-02',
          name: '张小刚',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2024-01-03',
          name: '李小明',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ]
    }
  }
}
</script>

<style>
.page-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.button-group {
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.main-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  transition: margin-right 0.3s ease;
}

.main-content-wrapper.drawer-open {
  margin-right: 500px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

p {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.demo-card {
  min-height: 150px;
}

.right-drawer {
  width: 500px;
  background-color: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  border-left: 1px solid #e8e8e8;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
}

.drawer-header {
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.drawer-body {
  padding: 20px;
  overflow-y: auto;
  line-height: 1.8;
}

/* 宽度动画 */
.slide-enter-active,
.slide-leave-active {
  transition: width 0.3s ease;
}

.slide-enter {
  width: 0 !important;
}

.slide-leave-to {
  width: 0 !important;
}

.dialog-footer {
  text-align: right;
}
</style>