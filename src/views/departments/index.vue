<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <!-- 导航菜单 -->
        <el-tabs>
          <el-tab-pane label="组织架构">
            <!-- 放置结构内容 头部 -->
            <TreeTools :tree-node="company" :is-root="true" style="font-weight: 700" @addDepts="addDepts" />
            <el-divider class="line" />
            <!-- 放置el-tree 身体部分-->
            <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
              <!-- 插槽内容会循环多次 有多少tree节点就循环多少次 -->
              <!-- 接收传递给插槽的数据 这里的data就是每个节点的数据对象-->
              <TreeTools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
            </el-tree>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- loading进度条 -->
      <span v-loading="loading" class="dashboard-container" />
      <AddDept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
    </div>
  </div>
</template>

<script>
import TreeTools from './component/tree-tools.vue'
import AddDept from './component/add-dept.vue'
import { getDepartments } from '@/api/department'
import { transListToData } from '@/utils'
export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      company: { name: '武汉工程科技教育股份有限公司', manager: '负责人', id: '' },
      departs: [],
      defaultProps: {
        label: 'name', // 表示 从这个属性显示内容
        children: 'children' // 从这个属性去找子节点
      },
      showDialog: false, // 默认关闭dialog
      node: null, // 记录当前点击的node节点
      loading: false // 添加进度条且默认关闭
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.departs = transListToData(result.depts, '') // 这里定义一个空字符串 因为所有根节点的pid都是空字符串
      this.loading = false
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id) // 调用子组件的方法 完成编辑的时候呈现数据的回显
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
.line {
  width: 100%;
  margin: 0 0 10px 0;
}
.el-tabs {
  margin-top: -30px;
}
.el-tab-pane {
  margin-top: 20px;
}
</style>
