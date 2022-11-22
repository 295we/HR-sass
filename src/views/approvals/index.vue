<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>审批</h2>
      <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="确定删除该角色吗?" style="margin-left: 10px">
        <el-button slot="reference" type="danger" size="small">删除</el-button>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
