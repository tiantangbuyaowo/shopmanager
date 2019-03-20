<template>


        <d2-container :filename="filename" >
            <template slot="header">商品分类管理</template>

            <el-row :gutter="24">
                <el-col :span="6"><el-tree :data="pros" :load="loadNode"  lazy node-key="id"
                                           show-checkbox></el-tree></el-col>
                <el-col :span="18"><d2-crud
                        :columns="columns"
                        :data="data"
                        :loading="loading"
                        :pagination="pagination"
                        @pagination-current-change="paginationCurrentChange"/></el-col>
            </el-row>


        </d2-container>

</template>

<script>
    import request from '@/plugin/axios'
    export default {
        data() {
            return {
                filename: __filename,
                pros: [],
                columns: [
                    {
                        title: '卡密',
                        key: 'key',
                        width: 320
                    },
                    {
                        title: '面值',
                        key: 'value'
                    },
                    {
                        title: '管理员',
                        key: 'admin'
                    },
                    {
                        title: '创建时间',
                        key: 'dateTimeCreat'
                    },
                    {
                        title: '使用时间',
                        key: 'dateTimeUse'
                    }
                ],
                data: [],
                loading: false,
                pagination: {
                    currentPage: 1,
                    pageSize: 5,
                    total: 0
                }
            }
        },
        mounted: function () {

            /*this.BusinessTable1List(0).then(res => {
               // alert(res.length);
                this.pros = res;
            })
            .catch(err => {
                // 异常情况
            })*/

        },
        methods: {
            paginationCurrentChange (currentPage) {
                this.pagination.currentPage = currentPage
                // this.fetchData()
            },
            loadNode (node, resolve){
                let parentId = 0
                console.log(node);
                if(node.level == 0){ //第一层，初次加载

                }else{
                    parentId = node.data.id;
                }

                this.BusinessTable1List(parentId).then(res => {
                    // alert(res.length);
                    resolve(res);
                })
                .catch(err => {
                    // 异常情况
                })
            }
           ,
            BusinessTable1List: function (parentId) {
                return request({
                    url: '/goods/category/list?parentId='+parentId,
                    method: 'post',
                    parentId:parentId
                })
            },
        }
    }
</script>
