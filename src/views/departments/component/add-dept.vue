<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" width="40%" :close-on-click-modal="false" @close="btnCancel">
    <!-- 表单数据 -->
    <!-- label-width:设置所有标题的宽度 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width: 85%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width: 85%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width: 85%" placeholder="请选择" @focus="getEmployeeSimple">
          <!-- 需要循环生成选项   这里做一下简单的处理 显示的是用户名 存的也是用户名-->
          <el-option v-for="item in peoples" :key="item.id" :value="item.username" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="3" style="width: 85%" placeholder="1-300个字符" />
      </el-form-item>
    </el-form>
    <!-- 确认和取消 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="3"><el-button size="small" @click="btnCancel">取消</el-button></el-col>
      <el-col :span="3"><el-button type="primary" size="small" @click="btnOK">确定</el-button></el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/department'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 定义这个函数用于检查同级部门下是否有重复的部门名称
    const checkNameRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      // depts是所有的部门数据
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑部门
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 新增部门
        // 如何去找技术部所有的子节点
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    // 定义这个函数用于检查部门编码在整个组织架构模块中都不允许重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
        isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value不为空 因为我们的部门有可能没有code
      }
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: checkNameRepeat // 自定义函数的形式校验
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: checkCodeRepeat
          }
        ],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-300个字符' }
        ]
      },
      peoples: [] // 接收获取的员工简单列表的数据
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      // 获取简单员工列表
      this.peoples = await getEmployeeSimple()
    },
    btnOK() {
      // 固定的搭配 el-form的实例上会有一个表单验证方法，给它传入一个函数 就可以验判断表单验证是否通过
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          // 如果表单验证通过 就调用接口将数据发送给后端
          if (this.formData.id) {
            await updateDepartments(this.formData)
            this.$message.success('编辑部门成功')
          } else {
            // 因为是添加子部门，所以我们需要将新增的部门pid设置成当前部门的id，新增的部门就成了自己的子部门
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
            this.$message.success('添加部门成功')
          }
          this.$emit('addDepts')
          this.$emit('update:show-dialog', false) // 父组件只要在事件后面加.sync，就可以省略父组件的监听和方法，直接将值赋值给showDialog update冒号后面跟的是本组件的props属性名 update是固定写法
          // 这里要注意 在关闭dialog的时候会自动调用dialog的close事件
        }
      })
    },
    btnCancel() {
      // 这里需要手动重置一下formData中的数据，因为element-ui自带的resetFields不能重置表单之外的数据
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$emit('update:show-dialog', false) // 关闭dialog
      this.$refs.deptForm.resetFields() // el-form固定写法 用于重置校验字段 必须给每个el-form-item绑定prop 否则不生效
    },
    // 调用获取部门详情的接口封装为一个方法 并将得到的数据赋值给formData
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style></style>
