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

    <!-- 示例内容区域 -->
    <div class="content-container">
      <h1>主内容区域</h1>
      <p>这里是一些示例内容，用来对比 Element UI 默认抽屉的覆盖效果。</p>

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

    <!-- 使用 Element UI 的默认抽屉 -->
    <el-drawer
      title="抽屉标题"
      :visible.sync="showDrawer"
      direction="rtl"
      size="500px"
    >
      <div class="drawer-content">
        <p>这是 Element UI 的默认抽屉</p>
        <p>它覆盖在主内容之上</p>
        <p>主内容区的宽度不会改变</p>
      </div>
    </el-drawer>

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
  name: 'ElementDrawer',
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
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.button-group {
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
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

.drawer-content {
  padding: 20px;
  line-height: 1.8;
}

.dialog-footer {
  text-align: right;
}
</style>