<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 切换到第一页 -->
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary">新增角色</el-button>
            </el-row>
            <el-table border>
              <el-table-column label="序号" width="120" />
              <el-table-column label="角色名称" width="240" />
              <el-table-column label="描述" />
              <el-table-column label="操作">
                <el-button type="success" size="small">分配权限</el-button>
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination layout="prev,pager,next" />
            </el-row>
          </el-tab-pane>
          <!-- 切换到第二页 -->
          <el-tab-pane label="公司信息">
            <!-- 前置消息 -->
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" :show-icon="true" :closable="false" />
            <el-form ref="form" label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="3" disabled style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {}
  }
}
</script>

<style scoped>
.el-menu-item {
  height: 50px;
}
.el-button {
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
