<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top flex-md-nowrap p-0">
        <router-link class="navbar-brand ml-3 px-2" to="/main">BIKE</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/">Home <span class="sr-only">(direct to home)</span></router-link>
                </li>
                <li class="nav-item dropdown">
                    <router-link class="nav-link dropdown-toggle" to="/shop" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    商品
                    </router-link>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link class="dropdown-item" to="/shop/touring">旅行車</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link class="dropdown-item" to="/shop/road">公路車</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link class="dropdown-item" to="/shop/pista">單速車</router-link>
                    </div>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link active" to="/shop/sales">特價區</router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0" @submit="search(keyWord)">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="keyWord">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        <router-link to="/cart"><Cart class="cart"/></router-link>
        
    </nav>
</div>
</template>

<script>
import Cart from '@/components/cart';

export default {
    data() {
        return {
            keyWord: '',
        }
    },
    methods: {
        search(keyWord) {
            this.$router.push(`/shop/search/${keyWord}`)
        }
    },
    components: {
        Cart,
    }
}
</script>

<style scoped>
.cart {
    margin: 8px 40px 0 20px;
}
.dropdown-menu {
    top: 140%
}
@media (min-width: 768px) {
    .navbar {
        height: 80px
    }
}
</style>