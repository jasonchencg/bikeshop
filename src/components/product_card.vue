<template>
<div class="product-card">
    <div class="col">
        <div>
            <div class="product-card-picture"
            :style="`backgroundImage: url(${data.imageUrl})`">
            </div>
            <div class="card-body text-center">
                <div class="product-card-title">{{ data.title }}</div>
                <div class="mt-3">
                    <div class="product-card-originprice" 
                    v-if="data.origin_price != data.price">{{ data.origin_price | currencyFilter }}</del></div>
                    <div class="product-card-price">{{ data.price | currencyFilter }}</div>
                </div>
                <button type="button" class="btn btn-outline-secondary btn-block mt-2"
                @click="directToProduct(data.id)">
                    <i class="fas fa-spinner fa-spin" v-if="fileUpLoading"></i>
                    MORE
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        data:{
            default: Object
        }
    },
    data() {
        return {
            fileUpLoading: false,
        }
    },
    methods: {
        getDetail(id) {
            console.log(id)
            this.fileUpLoading= true;
            this.$emit('directToProduct', id);
            this.fileUpLoading= false;
        },
        directToProduct(id) {
            this.$router.push(`/shop/product/${id}`);
        },
    }
}
</script>

<style scoped>
.product-card {
    display: inline-block;
    width: 33%;
    max-width: 300px;
}
.product-card-picture {
    height: 150px;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
}
.product-card-title {
    font-weight: 900;
    font-size: 20px;
}
.product-card-originprice {
    text-decoration: line-through;
    font-size: 10px;
}
.product-card-price {
    font-size: 14px;
}
.btn {
    font-size: 14px;
    line-height: 1;
}
.card-body {
    padding: 1.25rem 0;
}
</style>