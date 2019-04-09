<template>
<div>
  <Navbar/>
  <Alert/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '@/components/admin-navbar';
import Sidebar from '@/components/admin-sidebar';
import Alert from '@/components/alert';

export default {
  name: "adminPage",
  data() {
    return {};
  },
  
  components: {
    Sidebar,
    Navbar,
    Alert,
  }
};
</script>
<style scoped>
</style>