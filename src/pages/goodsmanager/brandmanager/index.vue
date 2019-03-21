<template>


    <d2-container :filename="filename">
        <template slot="header">
            <searchForm></searchForm>
        </template>
        <brandtTable
                :table-data="table"
                :loading="loading"></brandtTable>
        <paginationFooter
                slot="footer"
                :current="page.pageCurrent"
                :size="page.pageSize"
                :total="page.pageTotal"></paginationFooter>


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
                    pageTotal: 0
                }
            }
        },
        mounted: function () {

            this.loadBrandTableData().then(res => {
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
            ;


        },
        methods: {
            loadBrandTableData: function () {
                return request({
                    url: '/goods/brand/list',
                    method: 'post'
                })
            }

        }
    }
</script>
