## 实现原理

### 1. 创建局部作用域容器

```css
.left-scope {
  position: relative;              /* 建立定位上下文 */
  transform: translateZ(0);        /* 创建包含块，子元素 fixed 以此为参照 */
  overflow: hidden;                /* 裁剪超出边界的内容 */
}
```


### 2. Element UI 配置

```vue
<el-dialog
  :append-to-body="false"          <!-- dialog 留在容器内 -->
  :modal-append-to-body="false"    <!-- 遮罩也限制在容器内 -->
  :lock-scroll="false"
>
```