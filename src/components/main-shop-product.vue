<template>
<div class="col">
    <div class="vld-parent">
        <Loading :active.sync="isLoading" ></Loading>
    </div>
    <div class="row product-header">
        <div class="col">
            <div class="product-title mb-2">{{ product.title }}</div>
            <span class="product-originprice mr-2" 
            v-if="product.origin_price !=  product.price">{{ product.origin_price | currencyFilter }}</span>
            <span class="product-price">{{ product.price | currencyFilter }}</span>
        </div>
        <div class="col text-center vertical-center-father">
            數量：
            <div class="d-inline-block">
                <select name="quantity" class="text-left product-form vertical-center-son" 
                v-model="form.qty" v-validate="'min_value:1'" :class="{'border-danger':errors.has('quantity')}">
                    <option v-for="num in Number(optionNum)" :value="num" :key="num">{{ num }}</option>
                </select>
                <span class="text-danger" v-if="errors.has('quantity')">請選擇數量</span>
            </div>
        </div>
        <div class="col text-right vertical-center-father">
            <button type="button" class="btn btn-outline-primary btn-sm ml-auto vertical-center-son"
            @click="addToCart(product.id, form.qty)">
                    <i class="fas fa-spinner fa-spin" 
                    v-if="fileUpLoading"></i>
                    加到購物車
            </button>
        </div>
    </div>
    <div class="row product-body">
        <span>{{ product.content }}</span>
    </div>
    <div class="row product-footer">
        <span>{{ product.description }}</span>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            productId: '',
            isLoading: false,
            fileUpLoading: false,
            product: {},
            bannerOptions: {},
            form: {
                product_id: '',
                qty: 0,
            },
            optionNum: 0,
        }
    },
    methods: {
        getProduct() {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
            vm.isLoading= true;
            this.$http.get(api).then((response) => {
                vm.product= response.data.product;
                vm.bannerOptions.imageUrl= response.data.product.imageUrl;
                vm.form.product_id= response.data.product.id;
                if(response.data.product.quantity > 10) {
                    vm.optionNum= 10
                }else {
                    vm.optionNum= response.data.product.quantity
                };
                vm.isLoading= false;
            })
        },
        addToCart(id, qty) {
            this.$validator.validate().then((result) => {
                if(result){
                    const vm= this;
                    const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                    vm.fileUpLoading= true;
                    this.$http.post(api, {data: vm.form}).then((response) => {
                        vm.fileUpLoading= false;
                        if(response.data.success) {
                            this.$bus.$emit('message:push', `已成功將 ${vm.product.title} * ${vm.form.qty} 加入購物車`, 'success', '100%', '0');
                            this.$bus.$emit('cart:update');

                        }else {
                            this.$bus.$emit('message:push', `加入購物車失敗`, 'danger', '100%', '0');
                        }
                    })    
                }
            })
        },
        submitBannerOptions() {
            this.$emit('changeBanner', this.bannerOptions)
        },
    },
    created() {
        this.productId= this.$route.params.product_id;
        this.getProduct();
        this.submitBannerOptions();
    },
}
</script>

<style scoped>
.product-header {
    padding: 2% 15% 5%;
}
.product-body {
    padding: 0 10%;
    font-size: 14px;
    line-height: 28px;
}
.product-footer {
    padding: 0 10%;
    font-size: 20px;
    line-height: 40px;
}
.product-title {
    font-weight: 900;
    font-size: 30px;
}
.product-originprice {
    text-decoration: line-through;
    font-size: 20px;
}
.product-price {
    font-size: 24px;
}
.product-form {
    min-width: 20%; 
}
.hidden-content {
    height: 200px;
    overflow: hidden;
    position: relative;
}
.containt-showmore {
    background: white;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    text-align: center;
}
</style>