<template>


    <d2-container :filename="filename">
        <template slot="header">
            <searchForm @submit="handleSubmit" @showAddWin="showAddWin"></searchForm>
        </template>
        <brandtTable
                :table-data="table"
                :loading="loading"></brandtTable>
        <paginationFooter
                slot="footer"
                :pageCurrent="page.pageCurrent"
                :pageSize="page.pageSize"
                :pageTotal="page.pageTotal"
                @change="handlePaginationChange"></paginationFooter>


        <el-dialog title="添加品牌" :visible.sync="dialogAddFormVisible" :close-on-click-modal="false">
            <el-form :model="addform" ref="addForm" :rules="addRules">
                <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="品牌首字母" :label-width="formLabelWidth" prop="letter">
                    <el-input v-model="addform.letter" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBrand">确 定</el-button>
            </div>
        </el-dialog>


    </d2-container>


</template>

<script>
    import request from '@/plugin/axios'

    export default {

        components: {
            'searchForm': () => import('./componnets/searchform'),
            'brandtTable': () => import('./componnets/brandtable'),
            'paginationFooter': () => import('./componnets/paginationfooter')
        },
        data() {
            return {
                filename: __filename,
                table: [],
                loading: true,
                page: {
                    pageCurrent: 1,
                    pageSize: 10,
                    pageTotal: 0,
                    name: ''
                },
                dialogAddFormVisible: false,
                addform: {
                    name: '',
                    letter: ''
                },
                formLabelWidth: '120px'
                ,
                addRules: {
                    name: [
                        {required: true, message: '请输入品牌名称', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                    ],
                    letter: [
                        {required: true, message: '请输入品牌首字母', trigger: 'blur'},
                        {min: 1, max: 1, message: '首字母只能是一个大写字母', pattern: /^[A-Z]+$/, trigger: 'blur'}
                    ]
                }
            }
        },
        mounted: function () {

            this.loadBrandTableData();


        },
        methods: {
            handlePaginationChange(val) {
                this.page.pageTotal = val.pageTotal
                this.page.pageSize = val.pageSize
                this.page.pageTotal = val.pageTotal
                this.loadBrandTableData();

            },
            getTableData: function () {
                return request({
                    url: '/goods/brand/list',
                    method: 'post',
                    data: this.page

                })
            },
            addTableData: function () {
                return request({
                    url: '/goods/brand/brand',
                    method: 'post',
                    data: this.addform

                })
            },
            loadBrandTableData: function () {
                this.getTableData().then(res => {
                    this.loading = false;
                    //alert(res.pages)
                    this.page.pageTotal = res.total;
                    this.page.pageCurrent = res.pageNum;
                    this.page.pageSize = res.pageSize;
                    this.table = res.list
                })
                    .catch(err => {
                        this.loading = false;
                    })


            },
            handleSubmit(form) {
                //this.loading = true
                //alert(form.name);
                this.page.name = form.name
                this.loadBrandTableData();
            },
            showAddWin() {
                //this.loading = true
                this.dialogAddFormVisible = true

            }, addBrand() {
                //this.loading = true
                this.$refs["addForm"].validate((valid) => {
                    if (valid) {
                        //alert('submit!');

                        const formLoading = this.$loading({
                            lock: true,
                            text: '操作中',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });

                        this.addTableData().then(res => {
                            formLoading.close();
                            this.dialogAddFormVisible = false;
                            this.loadBrandTableData();

                        })
                            .catch(err => {
                                formLoading.close();
                            })


                    } else {
                        //console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>
