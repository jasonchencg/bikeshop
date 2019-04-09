<template>
<div class="container-fluid">
    <div class="row">
        <Banner :options="bannerOptions"/>
    </div>
    <div  role="main" class="row">
        <SideBar/>
        <router-view @changeBanner="changeBanner"></router-view>
    </div>
</div>
</template>

<script>
import SideBar from '@/components/main-shop-sidebar';
import Banner from '@/components/banner';


export default {
    data() {
        return {
            bannerOptions: {},
        }
    },
    methods: {
        changeBanner(object) {
            this.bannerOptions= object;
            this.$set(this.bannerOptions, 'imageUrl', object.imageUrl);
        }
    },
    components: {
        SideBar,
        Banner,
    },
}

</script>