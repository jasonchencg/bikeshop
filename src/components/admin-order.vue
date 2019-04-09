<template>
<div>
    <div class="vld-parent">
        <loading :active.sync="isLoading" ></loading>
    </div>
    <table class="table table-striped table-sm mt-4">
        <thead>
            <tr>
                <th class="pl-4">Time</th>
                <th width="20%">Email</th>
                <th width="25%">Items</th>
                <th class="text-right">Amount</th>
                <th class="pl-4">Situation</th>
                <th class="text-center">Detail</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in orders" v-if="item.is_paid==situa || situa==-1" :key="item.id">
                <td class="pl-3" width="160px">{{ item.create_at | momentFilter }}</td>
                <td>{{ item.user.email }}</td>
                <td >
                    <div v-for="product in item.products">{{ product.product.title }} * {{ product.qty }}</div>
                </td>
                <td class="text-right">{{ item.total | currencyFilter }}</td>
                <td class="pl-4">
                    <span class="text-danger" v-if="item.is_paid==0">尚未付款</span>
                    <span class="text-warning" v-else-if="item.is_paid==1">已付款</span>
                    <span class="text-dark" v-else-if="item.is_paid==2">已取消</span>
                    <span class="text-success" v-else>已完成</span>
                </td>
                <td width="65px" class="pr-3">
                    <button class="btn btn-outline-primary" @click="editOrder(item, index)">detail</button>
                </td>
            </tr>
        </tbody>
    </table>
    <Pagination 
    :pagination="pagination" @getInform="getOrders"/>
    <div class="modal fade bd-example-modal-lg" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>訂單詳情</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <header class="mb-3">
                                    <h6 class="d-inline-block text-primary font-weight-bold mr-4">訂單資訊</h6>
                                    <select name="" class="form-control-sm text-left align-middle mr-1"
                                    v-model="modifyOrder.is_paid">
                                        <option value="0">尚未付款</option>
                                        <option value="1">已付款</option>
                                        <option value="2">已取消</option>
                                        <option value="3">已完成</option>
                                    </select>
                                    <button class="btn btn-sm btn-outline-primary align-middle" @click="updateOrder">
                                        編輯<i class="fas fa-spinner fa-spin" v-if="updateLoading"></i>
                                    </button>                               
                                </header>
                                <div class="mb-2"><h6>訂單日期</h6><span>{{ order.create_at | momentFilter }}</span></div>
                                <div>
                                    <h6 class="pb-2">訂單狀態</h6>
                                    <span class="situa bg-danger" v-if="order.is_paid==0">尚未付款</span>
                                    <span class="situa bg-warning" v-else-if="order.is_paid==1">已付款</span>
                                    <span class="situa bg-dark" v-else-if="order.is_paid==2">已取消</span>
                                    <span class="situa bg-success" v-else>已完成</span>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <h6 class="text-primary font-weight-bold mb-3">訂購人資訊</h6>
                                <div class="mb-2"><h6>訂購人</h6><span>{{ order.user.name }}</span></div>
                                <div class="mb-2"> <h6>連絡電話</h6><span>{{ order.user.tel }}</span></div>
                                <div class="mb-2"><h6>電子郵件</h6><span>{{ order.user.email }}</span></div>
                                <div><h6>訂購地址</h6><span>{{ order.user.address }}</span></div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <div class="form-group">
                                    <h6 class="text-primary font-weight-bold mb-3">商品詳情</h6>
                                    <div v-for="item in order.products" class="mb-2">
                                        <img :src="item.product.imageUrl" alt="" height="50px" class="mr-1">
                                        {{ item.product.title }} * {{ item.qty }}
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="form-row">
                                <h6 class="text-primary font-weight-bold mb-3">顧客備註</h6>
                                <span>{{ order.message }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Pagination from '@/components/pagination';
import $ from 'jquery';

export default {
    data() {
        return {
            isLoading: false,
            updateLoading: false,
            orders: [],
            order: {
                user: {},
                product: [],
            },
            modifyOrder:{},
            pagination: {},
            tempIdx: '',
            situa: -1,
        }
    },
    methods:{
        getOrders(page= 1) {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`;
            vm.isLoading= true;
            this.$http.get(api).then((response) => {
                vm.isLoading= false;
                if(response.data.success){
                    vm.orders= response.data.orders;
                    vm.pagination= response.data.pagination;
                }else{
                    this.$bus.$emit('message:push', '獲取訂單失敗', 'danger');
                }
            })
        },
        editOrder(item, index) {
            this.order= Object.assign({}, item);
            this.modifyOrder= Object.assign({}, item);
            this.tempIdx= index;
            $('#orderModal').modal('show');
        },
        updateOrder() {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.modifyOrder.id}`;
            vm.updateLoading= true;
            this.$http.put(api, {data:vm.modifyOrder}).then((response) => {
                if(response.data.success){
                    vm.getOrders(vm.pagination.current_page);
                    vm.order= Object.assign({}, vm.modifyOrder);
                }else{
                    this.$bus.$emit('message:push', '變更狀態失敗', 'danger');
                };
                vm.updateLoading= false;
            });
        },
        changeSitua(num) {
            this.situa= num;
        },
    },
    computed:{
    },
    created() {
        this.getOrders();
    },
    components:{
        Pagination,
    },
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}
td{
    vertical-align: middle
}
td div{
    padding:5px 0px;
}
.btn{
    line-height: 1
}
.form-control-sm {
    font-size: 12px;
    line-height: 1;
}
.situa{
    border-radius: 0.25rem;
    color: white;
    padding: 0.2rem 0.5rem;
}
.situaList {
    display: table-cell;
    background: #fafafa;
    margin: 0;
    padding: 0;
}
.situaList li {
    display: inline-block;
}
.situaList li a {
    color: #aaa;
    font-size: 16px;
    line-height: 2.5;
    padding: 0 10px;
}
.currentSitua {
    background: white;
    border: 1px solid #eee;
    border-bottom: 1px solid white;
}
</style>