<template>
<div>
  <Navbar :cart="cart"/>
  <Alert/>
  <router-view class="main"></router-view>
</div>
</template>

<script>
import Navbar from '@/components/main-navbar';
import Alert from '@/components/alert';

export default {
  name: "adminPage",
  data() {
    return {
      cart: {},
      cartLen: 0,
    }
  },
  methods: {
    getCart() {
        const vm= this;
        const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        this.$http.get(api).then((response) => {
          vm.cart= response.data.data;
          vm.cartLen= vm.cart.carts.length;
        })
    },
  },
  created() {
    this.getCart();
  },
  components: {
    Navbar,
    Alert,
  },
}
</script>

<style scoped>
.main {
  margin-top: 48px;
}
@media (min-width: 768px) {
    .main {
        margin-top: 80px;
    }
}
</style>