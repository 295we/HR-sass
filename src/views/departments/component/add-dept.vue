<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog" width="800px">
    <!-- 表单数据 -->
    <!-- label-width:设置所有标题的宽度 -->
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input type="textarea" :rows="3" style="width:80%" placeholder="1-300个字符" />
      </el-form-item>
    </el-form>
    <!-- 确认和取消 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6"><el-button size="small">取消</el-button> <el-button type="primary" size="small">确定</el-button></el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
