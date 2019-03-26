<template>
  <el-pagination
    :current-page="pageCurrent"
    :page-size="pageSize"
    :total="pageTotal"
    :page-sizes="[10, 20, 30, 40]"
    layout="total, sizes, prev, pager, next, jumper"
    style="margin: -10px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageCurrent: {
      default: 0
    },
    pageSize: {
      default: 0
    },
    pageTotal: {
      default: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('change', {
        pageCurrent: this.pageCurrent,
        pageSize: val,
        pageTotal: this.pageTotal
      })
    },
    handleCurrentChange (val) {
      this.$emit('change', {
        pageCurrent: val,
        pageSize: this.pageSize,
        pageTotal: this.pageTotal
      })
    }
  }
}
</script>
