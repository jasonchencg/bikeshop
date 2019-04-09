import Vue from 'vue';
import Router from 'vue-router';
import Axios from 'axios';
import VueAxios from 'vue-axios';

import Main from '@/components/pages/main';
import Login from '@/components/pages/login';
import Admin from '@/components/pages/admin';
import MainCart from '@/components/main-cart';
import MainCheckout from '@/components/main-checkout';
import MainDisplaying from '@/components/main-displaying';
import MainShop from '@/components/main-shop';
import MainShopBike from '@/components/main-shop-bike';
import MainShopTouring from '@/components/main-shop-touring';
import MainShopRoad from '@/components/main-shop-road';
import MainShopPista from '@/components/main-shop-pista';
import MainShopSales from '@/components/main-shop-sales';
import MainShopSearch from '@/components/main-shop-search';
import MainShopProduct from '@/components/main-shop-product';
import AdminProduct from '@/components/admin-product';
import AdminOrder from '@/components/admin-order';
import AdminCoupon from '@/components/admin-coupon';

Vue.use(Router, Axios, VueAxios);

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/',
        },
        {
            name: '',
            path: '/',
            component: Main,
            children: [
                {
                    neme: 'Main',
                    path: '',
                    component: MainDisplaying,
                },
                {
                    name: 'Cart',
                    path: '/cart',
                    component: MainCart,
                },
                {
                    name: 'Checkout',
                    path: '/checkout/:order_id',
                    component: MainCheckout,
                },
                {
                    name: '',
                    path: 'shop',
                    component: MainShop,
                    children: [
                        {
                            neme: 'Bike',
                            path: '',
                            component: MainShopBike,
                        },
                        {
                            neme: 'TouringBike',
                            path: 'touring',
                            component: MainShopTouring,
                        },
                        {
                            neme: 'RoadBike',
                            path: 'road',
                            component: MainShopRoad,
                        },
                        {
                            neme: 'PistaBike',
                            path: 'pista',
                            component: MainShopPista,
                        },
                        {
                            neme: 'Sales',
                            path: 'sales',
                            component: MainShopSales,
                        },
                        {
                            neme: 'Search',
                            path: 'search/:key_word',
                            component: MainShopSearch,
                        },
                        {
                            neme: 'Product',
                            path: 'product/:product_id',
                            component: MainShopProduct,
                        },
                    ]
                }
            ]
        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
        },
        {
            name: '',
            path: '/admin',
            component: Admin,
            children:[
                {
                    name: 'Order',
                    path: '',
                    component: AdminOrder,
                },
                {
                    name: 'Product',
                    path: 'product',
                    component: AdminProduct,
                },
                {
                    name: 'Coupon',
                    path: 'coupon',
                    component: AdminCoupon,
                },
            ],
            beforeEnter: (to, from, next) =>{
                const vm= this;
                const api= `${process.env.APIPATH}/api/user/check`;
                Axios.post(api).then((response) => {
                    if(response.data.success){
                        next()
                    }else{
                        next({
                            path:'/login'
                        })
                    }
                })
            }
        },
    ]
})