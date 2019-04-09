<template>
    <main class="col">
        <div class="vld-parent">
            <Loading :active.sync="isLoading" ></Loading>
        </div>
        <div class="mt-4">
            <ProductCard 
            v-for="item in products" v-if="item.is_enabled && item.category==category" :data="item" :key="item.id"/>
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
                imageUrl: 'https://images.unsplash.com/photo-1470920456752-d50214d7ed59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80',
                title: '單速車',
                subtitle: 'Pista Bike',
                color: 'white',
            },
            isLoading: false,
            category: '單速車',
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
        getCondition(item) {
            if(!item.is_enabled){
                return false
            }else if(item.category==category){
                return true
            }else if(sales && item.price!=item.origin_price){
                return true
            }else if(!category && !sales){
                return true
            }else{
                return false
            };
        }
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