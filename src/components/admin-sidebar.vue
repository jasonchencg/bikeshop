<template>
<nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Admin</span>
            <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
            </a>
        </h6>
        <ul class="nav flex-column mb-2">
            <li class="nav-item">
                <router-link class="nav-link" href="#"
                to="/admin/product">
                    <span data-feather="file-text"></span>
                    Product
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" href="#"
                to="/admin">
                    <span data-feather="file-text"></span>
                    Order
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" href="#"
                to="/admin/coupon">
                    <span data-feather="file-text"></span>
                    Coupon
                </router-link>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>

</script>