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
                    <img :src="scope.row.image" width="100%">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary"
                               size="mini"
                               @click="handleEdit(scope.row)" icon="el-icon-edit">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger" icon="el-icon-delete"
                            @click="handleDelete(scope.row)">删除
                    </el-button>
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
                currentTableData: []

            }
        }
   ,
        watch: {
            tableData: {
                handler(val) {

                    this.currentTableData = val

                },
                immediate: true
            }
        }
    ,
        methods: {
            handleDelete(row) {
                this.$emit('deleteRow', row)
            }
        }
    }
</script>
