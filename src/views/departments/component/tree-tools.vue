<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end" align="middle">
        <el-col><span>{{ treeNode.manager }}</span></el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/department'
export default {
  name: 'TreeTools',
  props: {
    // 定义一个props属性
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 执行添加部门的操作
      } else if (type === 'edit') {
        // 执行修改部门的操作
      } else {
        // 执行删除部门的操作
        this.$confirm('确认删除该部门吗？')
          .then(() => {
            // 如果点击确定就会进入then
            return delDepartments(this.treeNode.id) // 返回promise对象
          })
          .then(result => {
            // 如果删除成功了就会进入这里
            this.$emit('delDepts') // 让父组件触发子组件的自定义事件
            this.$message('删除成功')
            console.log(result)
          })
      }
    }
  }
}
</script>

<style></style>
