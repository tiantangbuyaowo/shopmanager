<template>
    <div style="margin-bottom: -18px;">
        <el-form
                :inline="true"
                :model="form"
                :rules="rules"
                ref="form"
                size="mini"
        >

            <el-form-item label="品牌名称" prop="name">
                <el-input
                        v-model="form.name"
                        placeholder="请输入品牌名称"
                        style="width: 300px;"/>
            </el-form-item>
            <el-form-item>
                <el-button
                        type="primary"
                        @click="handleFormSubmit">
                    <d2-icon name="search"/>
                    查询
                </el-button>
            </el-form-item>

            <el-form-item>
                <el-button
                        @click="handleFormReset">
                    <d2-icon name="refresh"/>
                    重置
                </el-button>
            </el-form-item>

        </el-form>


        <el-form
                :inline="true"
                size="mini">
            <el-form-item>
                <el-button
                        type="success"
                        @click="showAddWin">
                    <d2-icon name="plus"/>
                    添加
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    user: ''
                },
                rules: {}
            }
        },
        methods: {
            handleFormSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form)
                    }
                    /*else {
                      this.$notify.error({
                        title: '错误',
                        message: '表单校验失败'
                      })
                      return false
                    }*/
                })
            },
            handleFormReset() {
                this.$refs.form.resetFields()
            }
            ,
            showAddWin() {
                this.$emit('showAddWin')
            }
        }
    }
</script>
