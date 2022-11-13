<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col>
            <!-- 左侧内容 -->
            <i class="el-icon" />
            <span>武汉工程科技教育股份有限公司</span>
          </el-col>
          <el-col>
            <!-- 右侧内容 -->
            <el-row type="flex" justify="end" align="middle">
              <el-col>负责人</el-col>
              <el-col :span="4">
                <!-- 放置下拉菜单 -->
                <el-dropdown>
                  <el-button type="primary"> <span>操作</span><i class="el-icon-arrow-down el-icon--right" /> </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
