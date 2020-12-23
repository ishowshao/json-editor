import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
