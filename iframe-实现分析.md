## 关键代码片段

### 1. iframe 布局（PushDrawer.vue）

```vue
<!-- 左侧 iframe + 右侧抽屉 -->
<div class="page-container" :style="{ '--drawer-w': showDrawer ? '500px' : '0px' }">
  <iframe src="/left"></iframe>
  <aside class="drawer" v-show="showDrawer">...</aside>
</div>

<!-- 监听 iframe 消息 -->
mounted() {
  this._onMsg = (e) => {
    if (e.origin !== window.location.origin) return
    if (e.data.type === 'OPEN_DRAWER') this.showDrawer = true
  }
  window.addEventListener('message', this._onMsg)
}
```

### 2. CSS Grid 布局

```css
.page-container {
  display: grid;
  grid-template-columns: 1fr var(--drawer-w, 0px);
  grid-template-rows: 100vh;
  overflow: hidden;
}
```

### 3. 子页面通信（LeftApp.vue）

```vue
<!-- 打开抽屉按钮 -->
<el-button @click="openDrawer">打开抽屉</el-button>

<!-- 发送消息给父页面 -->
methods: {
  openDrawer() {
    window.parent.postMessage(
      { type: 'OPEN_DRAWER' },
      window.location.origin
    )
  }
}
```

## 核心机制

### postMessage 通信

**子 → 父**：`window.parent.postMessage({ type: 'OPEN_DRAWER' }, origin)`

**父 → 子**：`postMessage({ type: 'OPEN_DIALOG' }, origin)`

### 同源安全校验

```javascript
if (e.origin !== window.location.origin) return
```

### CSS 变量控制

```vue
:style="{ '--drawer-w': showDrawer ? '500px' : '0px' }"
```

### 生命周期管理

```javascript
mounted() { window.addEventListener('message', this._onMsg) }
beforeDestroy() { window.removeEventListener('message', this._onMsg) }
```