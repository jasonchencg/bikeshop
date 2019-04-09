// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import VeeValidate from 'vee-validate';
import ZhTWValadate from 'vee-validate/dist/locale/zh_Tw';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import App from './App';
import Router from './router';

import CurrencyFilter from './components/filters/currency';
import MomentFilter from './components/filters/moment';
import DateFilter from './components/filters/date';

import './bus';

Vue.use(VueAxios, Axios);
Vue.use(VeeValidate, {
  events: 'input|blur',
});
Vue.use(VueAwesomeSwiper);

VeeValidate.Validator.localize('zh_TW', ZhTWValadate);
Vue.config.productionTip = false;
Axios.defaults.withCredentials = true;

Vue.component('Loading', Loading);

Vue.filter('currencyFilter', CurrencyFilter);
Vue.filter('momentFilter', MomentFilter);
Vue.filter('dateFilter', DateFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router:Router,
  template: '<App/>'
})
