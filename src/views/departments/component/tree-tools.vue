<template>
  <el-row type="flex" justify="space-between" align="middle" class="row">
    <el-col>
      <i v-if="treeNode.manager === '负责人'" class="iconfont icon-gongsi" />
      <i v-if="treeNode.manager !== '负责人' && !treeNode.pid" class="iconfont icon-person" /> <span>{{ treeNode.name }}</span>
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
        this.$emit('addDepts', this.treeNode) // 触发自定义事件告诉父组件来显示dialog 因为是添加子部门 所以需要传递当前部门的信息
      } else if (type === 'edit') {
        // 执行编辑部门的操作
        this.$emit('editDepts', this.treeNode)
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

<style scoped>
.row {
  height: 40px;
  width: 100%;
  color: #000;
}
</style>
