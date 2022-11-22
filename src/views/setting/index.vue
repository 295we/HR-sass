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
            <el-table border :data="list">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button type="success" size="small">分配权限</el-button>
                  <el-button type="primary" size="small">编辑</el-button>
                  <el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    cancel-button-type="info"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定删除该角色吗?"
                    style="margin-left: 10px"
                    @onConfirm="deleteRole(row.id)"
                  >
                    <el-button slot="reference" type="danger" size="small">删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination :current-page="page.page" :total="page.total" layout="prev,pager,next" :page-size="page.pageSize" @current-change="changePage" />
            </el-row>
          </el-tab-pane>
          <!-- 切换到第二页 -->
          <el-tab-pane label="公司信息">
            <!-- 前置消息 -->
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" :show-icon="true" :closable="false" />
            <el-form ref="form" label-width="120px" style="margin-top: 50px" :data="formData">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      list: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pageSize: 10,
        total: 0 // 记录总数
      },
      formData: {
        name: '武汉工程科技教育股份有限公司',
        companyAddress: '武汉市江夏区纸坊街道熊廷弼街特8号',
        mailbox: 'wuhues@163.com',
        remarks: '好的大学不需要学费!!!\r武汉工程科技学院牛逼666'
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 获取角色列表
    // this.getCompanyInfo() // 获取公司信息
  },
  methods: {
    // 获取角色列表的方法
    async getRoleList() {
      const { rows, total } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    // 当页码变动时需要调用的方法 用于获取最新的角色信息
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    // 用于获取公司信息的方法
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    // 用于删除角色的方法
    async deleteRole(id) {
      await deleteRole(id)
      this.getRoleList()
      this.$message.success('删除角色成功')
    }
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
