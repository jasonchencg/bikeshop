<template>
    <main class="col">
        <div class="vld-parent">
            <Loading :active.sync="isLoading" ></Loading>
        </div>
        <div class="mt-4">
            <ProductCard v-for="item in products" v-if="item.is_enabled && item.price!=item.origin_price" :data="item" :key="item.id"/>
        </div>
        <Pagination 
        :pagination="pagination" @getInform="getProducts"/>
    </main>
</template>

<script>
import ProductCard from '@/components/product_card';
import Pagination from '@/components/pagination';

export default {
    data() {
        return {
            products: [],
            product: {},
            pagination: {},
            bannerOptions: {
                imageUrl: 'https://images.unsplash.com/photo-1544011343-494fe72e6bab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                title: '特價區',
                subtitle: 'Sales',
                color: 'white',
            },
            isLoading: false,
        }
    },
    methods: {
        getProducts(page= 1) {
            const vm= this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
            vm.isLoading= true;
            this.$http.get(api).then((response) => {
                vm.isLoading= false;
                vm.pagination= response.data.pagination;
                vm.products= response.data.products;
            })
        },
        submitBannerOptions() {
            this.$emit('changeBanner', this.bannerOptions)
        },
    },
    created() {
        this.getProducts();
        this.submitBannerOptions();
    },
    components: {
        ProductCard,
        Pagination,
    }
}
</script>