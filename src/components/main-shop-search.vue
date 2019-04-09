<template>
    <main class="col">
        <div class="vld-parent">
            <Loading :active.sync="isLoading" ></Loading>
        </div>
        <div class="mt-4">
            <ProductCard v-for="item in filtedProducts" :data="item" :key="item.id"/>
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
            keyWord: '',
            products: [],
            product: {},
            pagination: {},
            bannerOptions: {
                imageUrl: 'https://images.unsplash.com/photo-1470920456752-d50214d7ed59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80',
                title: '自行車',
                subtitle: 'Bike',
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
    computed: {
        filtedProducts() {
            let vm= this;
            return vm.products.filter(function (item) {
                return item.is_enabled && item.title.toLowerCase().indexOf(vm.keyWord.toLowerCase()) !== -1
            })
        }
    },
    watch: {
        $route: function() {
            this.keyWord= this.$route.params.key_word;
        }
    },
    created() {
        this.keyWord= this.$route.params.key_word;
        this.getProducts();
        this.submitBannerOptions();
    },
    components: {
        ProductCard,
        Pagination,
    }
}
</script>