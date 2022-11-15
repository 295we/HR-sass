<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 头部 -->
        <tree-tools :tree-node="company" :is-root="true" />
        <!-- 放置el-tree 身体部分-->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './component/tree-tools.vue'
import { getDepartments } from '@/api/department'
import { treeListToData } from '@/utils'
export default {
  components: { TreeTools },
  data() {
    return {
      company: { name: '武汉工程科技教育股份有限公司', manager: '负责人' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.departs = treeListToData(result.depts, '') // 这里定义一个空字符串 因为所有根节点的pid都是空字符串
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
