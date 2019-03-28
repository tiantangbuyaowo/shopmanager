<template>


    <d2-container :filename="filename">
        <template slot="header">
            <searchForm @submit="handleSubmit"></searchForm>
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
            }
        }
    }
</script>
