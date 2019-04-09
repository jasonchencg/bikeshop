<template>
<div class="container-fluid">
    <div class="row">
        <swiper :options="swiperOption">
            <swiper-slide><img src="https://images.unsplash.com/photo-1486413161838-08358ba654df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"></swiper-slide>
            <swiper-slide><img src="https://images.unsplash.com/photo-1518050227004-c4cb7104d79a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></swiper-slide>
            <swiper-slide><img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
    <div class="row mt-5">
        <div class="col">
            <Window :options="touringOptions"/>
        </div>
        <div class="col">
            <Window :options="pistaOptions"/>
        </div>
    </div>
    <div class="row mt-3 mb-5">
        <div class="col">
            <Window :options="salesOptions"/>
        </div>
    </div>
</div>
</template>

<script>
import Window from '@/components/window';

export default {
    data() {
        return {
            swiperOption: {
                autoplay: true,
                speed: 3000,
                loop: true,
                autoplayDisableOnInteraction: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                 pagination: {
                    el: '.swiper-pagination',
                    clickable :true
                },
            },
            touringOptions: {
                title: '旅行車',
                subtitle: 'Touring Bike',
                direction: '/shop/touring',
                styles: {
                    backgroundImage: "url('https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')",
                    color: 'white',
                }
            },
            pistaOptions: {
                title: '單速車',
                subtitle: 'Pista Bike',
                direction: '/shop/pista',
                styles: {
                    backgroundImage: "url('https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')",
                }
            },
            salesOptions: {
                title: '特價區',
                subtitle: 'Sales',
                direction: '/shop/sales',
                styles: {
                    backgroundImage: "url('https://images.unsplash.com/photo-1544011343-494fe72e6bab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')",
                    color: 'white',
                }
            },
        }
    },
    components: {
        Window,
    },
}
</script>

<style acoped>
</style>
