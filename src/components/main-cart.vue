<template>
<div>
    <div class="cart" v-if="isCart">
        <div class="container-fluid" v-if="cart.total!=0">
            <div class="row">
                <div class="col">
                    <table class="item-table">
                        <tbody>
                            <tr v-for="item in cart.carts" :ket="item.id">
                                <td><div class="item-image" :style="{'backgroundImage': `url(${item.product.imageUrl})`}"></div></td>
                                <td class="item-title">{{ item.product.title }}</td>
                                <td class="item-quantity pl-4">*{{ item.qty }}</td>
                                <td class="item-price text-right pl-5">{{ item.product.price | currencyFilter }}</td>
                                <td class="pl-3">
                                    <button type="button" class="btn btn-outline-danger btn-sm"
                                    @click="removeFromCart(item.id)">
                                        <i class="far fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col ml-5 frame">
                    <div class="frame-header">
                        訂單摘要
                    </div>
                    <div class="frame-body">
                        <div>
                            <div class="label">商品總計</div>
                            <div class="price">{{ cart.total | currencyFilter }}</div>
                        </div>
                        <div v-if="cart.total != cart.final_total">
                            <div class="label">使用優惠卷折抵</div>
                            <div class="text-danger price">-{{ cart.total-cart.final_total | currencyFilter }}</div>
                        </div>
                        <div class="input-group my-3 input-group-sm">
                            <input type="text" class="form-control" placeholder="請輸入優惠碼"
                            v-model="code">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button"
                                @click="applyCoupon">
                                套用優惠碼
                                </button>
                            </div>
                        </div>
                        <div class="devider"></div>
                        <div>
                            <div class="label">結帳總金額</div>
                            <div class="price">{{ cart.final_total | currencyFilter }}</div>
                        </div>
                        <div class="mt-3 text-right">
                            <button class="btn btn-danger" @click="isInform= true; isCart= false">前往結帳</button>
                        </div>                
                    </div>            
                </div>
            </div>
        </div>
        <div v-else class="text-center">
            <div class="empty-title">您的購物車內沒有商品</div>
            <div><button class="btn btn-outline-dark mt-4" @click.prevent="$router.push('/shop')">回去逛逛</button></div>
        </div>
    </div>
    <div class="inform content-fluid" v-if="isInform">
        <div class="row justify-content-center">
            <table class="detail-table">
                <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                        <td></td>
                        <td class="text-center">{{ item.product.title }}</td>
                        <td>*{{ item.qty }}</td>
                        <td class="text-right">{{ item.product.price | currencyFilter }}</td>
                    </tr>
                    <tr class="note">
                        <td>小記</td>
                        <td></td>
                        <td></td>
                        <td class="text-right">{{ cart.total | currencyFilter }}</td>
                    </tr>
                    <tr class="coupon" v-if="cart.total != cart.final_total">
                        <td>優惠券</td>
                        <td></td>
                        <td></td>
                        <td class="text-right">-{{ cart.total-cart.final_total | currencyFilter }}</td>
                    </tr>
                    <tr class="checkout-price">
                        <td>結帳總金額</td>
                        <td></td>
                        <td></td>
                        <td class="text-primary text-right">{{ cart.final_total | currencyFilter }}</td>
                    </tr>
                </tbody>
            </table>        
        </div>
        <div class="row p-3 pt-5">
            <button class="btn btn-outline-dark" @click="isInform= false; isCart= true">返回購物車</button>
        </div>
        <div class="row justify-content-center">
            <form class="col" @submit.prevent="createOrder">
                <div class="form-group">
                    <label for="useremail">Email</label>
                    <input type="email" class="form-control" name="email" id="useremail"
                        v-model="form.user.email" v-validate="'required|email'" :class="{'is-invalid' : errors.has('email')}"
                        placeholder="請輸入 Email" >
                    <span class="text-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <input type="text" class="form-control" name="name" id="username"
                        v-model="form.user.name" v-validate="'required'" :class="{'is-invalid' : errors.has('name')}" 
                        placeholder="輸入姓名">
                    <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span>
                </div>
                <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <input type="tel" class="form-control" name="tel" id="usertel" 
                    v-model="form.user.tel" v-validate="'required'" :class="{'is-invalid' : errors.has('tel')}"
                    placeholder="請輸入電話">
                    <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
                </div>
                <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <input type="address" class="form-control" name="address" id="useraddress"
                    v-model="form.user.address" v-validate="'required'" :class="{'is-invalid' : errors.has('address')}"
                    placeholder="請輸入地址">
                    <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                </div>
                <div class="form-group">
                    <label for="useraddress">留言</label>
                    <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-danger" @click="createOrder">送出訂單</button>
                </div>
            </form>
        </div>      
    </div>    
</div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            isCart: true,
            isInform: false,
            cart: {},
            form:{
                user:{
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
            code: '',
        }
    },
    methods: {
        getCart() {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            this.$http.get(api).then((response) => {
                vm.cart= response.data.data;
            })
        },
        removeFromCart(id) {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
            vm.isLoading= true;
            this.$http.delete(api).then((response) => {
                vm.isLoading= false;
                if(response.data.success){
                    vm.getCart();
                    this.$bus.$emit('message:push', '刪除商品成功', 'success', '100%', '0');
                    this.$bus.$emit('cart:update');
                }
            })
        },
        applyCoupon() {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            vm.isLoading= true;
            this.$http.post(api, { 'data' : { 'code' : vm.code } }).then((response) => {
                vm.isLoading= false;
                if(response.data.success){
                    vm.cart.final_total= response.data.data.final_total;
                }else{
                    this.$bus.$emit('message:push', response.data.message, 'danger', '100%', '0');
                };
            })
        },
        createOrder() {
            this.$validator.validate().then((result) => {
                if (result) {
                    const vm= this;
                    const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
                    vm.isLoading= true;
                    this.$http.post(api, {data: vm.form}).then((response) => {
                        vm.isLoading= false;
                        if(response.data.success){
                            this.$bus.$emit('cart:update');
                            this.$router.push(`/checkout/${response.data.orderId}`);
                        }else{
                            this.$bus.$emit('message:push', '確認訂單失敗', 'danger');
                        }
                    });
                }
            });
        },
    },
    created() {
        this.getCart();
    }
}
</script>

<style scoped>
.cart {
    padding: 5% 10%;
}
.item-table {
    width: 100%
}
.item-image {
    background-size: auto 100%;
    background-position: center center;
    width: 90px;
    height: 90px;
    margin: 5px 20px;
}
.item-title {
    font-size: 22px;
    min-width: 130px;
}
.item-quantity {
    font-size: 16px
}
.item-price {
    font-size: 24px
}
.frame {
    max-width: 380px;
    min-width: 280px;
}
.frame-header {
    background-color: #ddd;
    font-size: 20px;
    line-height: 50px;
    padding: 10px 15px;
}
.frame-body {
    border: 1px solid #ddd;
    font-size: 18px;
    line-height: 36px;
    padding: 10px 15px 20px;
}
.label {
    display: inline-block;
}
.price {
    display: inline-block;
    float: right;
}
.devider {
    height: 2px;
    margin: 18px 0;
    background-color: #ddd;
}
.empty-title {
    font-size: 24px;
}
.inform {
    padding: 5% 20%;
}
.detail-table {
    font-size: 18px;
}
.detail-table td {
    padding: 0 10px
}
.note, .coupon{
    vertical-align: bottom;
}
.note {
    height: 45px;
}
.checkout-price {
    height: 35px;
    border-top: 2px solid #ddd;
}
.form-group {
    font-size: 18px
}
</style>