<template>
  <!-- 新增部门的弹出层 -->
  <el-dialog title="新增部门">
    <el-form>
      <el-form-item label="部门名称" label-width="120px">
        <el-input placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码" label-width="120px">
        <el-input placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门负责人" label-width="120px">
        <el-select placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input v-model="model" type="textarea" placeholder="1-300个字符" :rows="3" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {}
</script>

<style></style>
