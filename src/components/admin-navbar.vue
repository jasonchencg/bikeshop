<template>
<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="main">Company name</router-link>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" @click.prevent="logout">Sign out</a>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
    methods: {
    logout() {
      const vm = this;
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    }
  },
}
</script>