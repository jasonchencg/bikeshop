<template>
<div>
    <i class="fas fa-shopping-cart">
        <div class="cart-quantity bg-danger text-white" v-if="cartLen>0">{{ cartLen }}</div>
    </i>
</div>
</template>

<script>
export default {
    data() {
        return {
            cartLen: 0,
        }
    },
    methods: {
        getCart() {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            this.$http.get(api).then((response) => {
                vm.cart= response.data.data;
                vm.cartLen= response.data.data.carts.length;
            })
        },
    },
    created() {
        const vm= this;
        vm.getCart();
        vm.$bus.$on('cart:update', vm.getCart);
    }
}
</script>

<style scoped>
.fas {
    font-size: 24px;
    color: black;
    position: relative;
}
.fas:hover {
    color: #dc3545;
}
.cart-quantity {
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    height: 20px;
    width: 20px;
    border-radius: 20px;
    position: absolute;
    top: -12px;
    right: -12px;
}
</style>