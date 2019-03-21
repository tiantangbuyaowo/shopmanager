<template>
    <div>
        <el-table
                :data="currentTableData"
                v-loading="loading"
                size="mini"
                stripe
                style="width: 100%;"
        >

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>

            <el-table-column label="品牌名称" width="200">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>


            <el-table-column label="品牌首字母" width="200" align="center">
                <template slot-scope="scope">
                    {{scope.row.letter}}
                </template>
            </el-table-column>
            <el-table-column label="品牌图片" width="400" align="center">
                <template slot-scope="scope">

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {

        props: {
            tableData: {
                default: () => []
            },
            loading: {
                default: false
            }
        },
        data() {
            return {
                currentTableData: [],
                multipleSelection: [],
                downloadColumns: [
                    {label: '卡密', prop: 'name'},
                    {label: '面值', prop: 'value'},
                    {label: '状态', prop: 'type'},
                    {label: '管理员', prop: 'admin'},
                    {label: '管理员备注', prop: 'adminNote'},
                    {label: '创建时间', prop: 'dateTimeCreat'},
                    {label: '使用状态', prop: 'used'},
                    {label: '使用时间', prop: 'dateTimeUse'}
                ]
            }
        },
        watch: {
            tableData: {
                handler(val) {
                    this.currentTableData = val
                },
                immediate: true
            }
        },
        methods: {
            handleSwitchChange(val, index) {
                const oldValue = this.currentTableData[index]
                this.$set(this.currentTableData, index, {
                    ...oldValue,
                    type: val
                })
                // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            downloadDataTranslate(data) {
                return data.map(row => ({
                    ...row,
                    type: row.type ? '禁用' : '正常',
                    used: row.used ? '已使用' : '未使用'
                }))
            },
            handleDownloadXlsx(data) {
                this.$export.excel({
                    title: 'D2Admin 表格示例',
                    columns: this.downloadColumns,
                    data: this.downloadDataTranslate(data)
                })
                    .then(() => {
                        this.$message('导出表格成功')
                    })
            },
            handleDownloadCsv(data) {
                this.$export.csv({
                    title: 'D2Admin 表格示例',
                    columns: this.downloadColumns,
                    data: this.downloadDataTranslate(data)
                })
                    .then(() => {
                        this.$message('导出CSV成功')
                    })
            }
        }
    }
</script>
