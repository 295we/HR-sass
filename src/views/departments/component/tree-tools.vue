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
        this.$emit('addDepts', this.$treeNode) // 触发自定义事件告诉父组件来显示dialog 因为是添加子部门 所以需要传递父部门的信息
      } else if (type === 'edit') {
        // 执行修改部门的操作
      } else {
        // 执行删除部门的操作
        this.$confirm('确认删除该部门吗？').then(async result => {
          await delDepartments(this.treeNode.id)
          // 如果await执行了 那么就会执行下面的代码，此时代表删除数据成功了，我们应该重新获取页面的数据
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style></style>
