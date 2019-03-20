<template>
  <d2-container :filename="filename" >


    <el-row :gutter="24">

      <el-col :span="12":offset="6">
        <tree-table :key="key" :default-expand-all="defaultExpandAll" :data="data" :columns="columns" border>
          <!--<template slot="scope" slot-scope="{scope}">
            <el-tag>level: {{ scope.row._level }}</el-tag>
            <el-tag>expand: {{ scope.row._expand }}</el-tag>
            <el-tag>select: {{ scope.row._select }}</el-tag>
          </template>-->
          <template slot="operation" slot-scope="{scope}">
              <el-button type="primary" icon="el-icon-edit" @click="showUpdateModal(scope)" circle></el-button>
          </template>
        </tree-table>
      </el-col>
    </el-row>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </d2-container>



</template>

<script>
import treeTable from '@/components/TreeTable'
import request from '@/plugin/axios'

export default {
  components: { treeTable },
  data() {
    return {
      filename: __filename,
      formTitle:"商品分类修改",
      dialogFormVisible : false,
      defaultExpandAll: false,
      formLabelWidth: '120px',
      showCheckbox: true,
      key: 1,
      form: {
        name: '',
        id : ''
      },
      columns: [
        /*{
          label: 'Checkbox',
          checkbox: true
        },*/
        /*{
          label: '主键id',
          key: 'id',
          hidden:true
        },*/
        {
          label: '分类名称',
          key: 'name',
          width: 400,
          align: 'left',
          expand: true
        },
        {
          label: '操作',
          width: 200,
          key: 'operation'

        }
      ],
      data: []
    }
  },
  mounted: function () {
    const loading = this.$loading({
      lock: true,
      text: '拼命加载中',
      target: document.querySelector('.el-row'),
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    this.getTbCategoryTree().then(res => {
      loading.close();
     this.data = res;
     })
     .catch(err => {
     // 异常情况
     })

  },
  methods: {

    getTbCategoryTree: function () {
      return request({
        url: '/goods/category/list',
        method: 'post'
      })
    },
    showUpdateModal(scope) {
      // console.log(scope)
      this.dialogFormVisible = true
      const row = scope.row
      // alert(row.name);
      this.form.name = row.name
      this.form.id = row.id
      console.log(row)
      /*const message = Object.keys(row)
        .map(i => {
          return `<p>${i}: ${row[i]}</p>`
        })
        .join('')

      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: message,
        type: 'success'
      })*/
    }
  }
}
</script>

<style scoped>
.option-item{
  display: inline-block;
  margin-right: 15px;
}
</style>
