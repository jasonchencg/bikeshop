<template>
<div class="checkout">
    <div class="vld-parent">
        <loading :active.sync="isLoading" ></loading>
    </div>
    <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
            <table class="table">
            <thead>
                <th>品名</th>
                <th>數量</th>
                <th class="text-right pr-4">結帳單價</th>
            </thead>
            <tbody>
                <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}</td>
                    <td class="align-middle text-right">{{ item.product.price | currencyFilter }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total | currencyFilter }}</td>
                </tr>
            </tfoot>
            </table>

            <table class="table mt-5">
            <tbody>
                <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                <th>付款狀態</th>
                <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                </td>
                </tr>
            </tbody>
            </table>
            <div class="text-right" v-if="!order.is_paid">
                <button class="btn btn-danger">確認付款去</button>
            </div>
            <div class="text-right" v-if="order.is_paid">
                <button class="btn btn-primary" @click.prevent="$router.push('/')">回到首頁</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            orderId: '',
            order: {
                user:{}
            },
            isLoading: false,
        }
    },
    methods: {
        getOrder() {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
            vm.isLoading= true;
            this.$http.get(api).then((response) => {
                if(response.data.success){
                    vm.isLoading= false;
                    vm.order= response.data.order;
                }  
            })
        },
        payOrder() {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
            vm.isLoading= true;
            this.$http.post(api).then((response) => {
                if(response.data.success){
                    vm.isLoading= false;
                    this.$bus.$emit('message:push', '付款成功', 'success');
                    vm.getOrder();
                }else{
                    this.$bus.$emit('message:push', '付款失敗', 'danger')
                }
            })
        }
    },
    created() {
        this.orderId = this.$route.params.order_id;
        this.getOrder();
    },
}
</script>

<style scoped>
.checkout {
    padding: 5% 10%;
}
.table{
    border-bottom: 1px solid #ddd;
}
</style>