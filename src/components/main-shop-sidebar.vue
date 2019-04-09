<template>
<nav class="col-md-2 d-none d-md-block bg-light ml-3">
    <div>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>商品</span>
            <router-link class="d-flex align-items-center text-muted" to="/shop">
            <span data-feather="plus-circle"></span>
            </router-link>
        </h6>
        <ul class="nav flex-column mb-2">
            <li class="nav-item">
                <router-link class="nav-link"
                to="/shop/touring">
                    <span data-feather="file-text"></span>
                    旅行車
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link"
                to="/shop/road">
                    <span data-feather="file-text"></span>
                    公路車
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" href="#"
                to="/shop/pista">
                    <span data-feather="file-text"></span>
                    單速車
                </router-link>
            </li>
        </ul>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>特價區</span>
            <router-link class="d-flex align-items-center text-muted" to="shop/sales">
            <span data-feather="plus-circle"></span>
            </router-link>
        </h6>
        <ul class="nav flex-column mb-2">
            <li class="nav-item">
                <router-link class="nav-link"
                to="/shop/sales">
                    <span data-feather="file-text"></span>
                    單車
                </router-link>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>

</script>

<style scoped>
@media (min-width: 768px) {
    .col-md-2 {
        max-width: 150px
    }
}

</style>