import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/bootstrap.min.css';
import './assets/select-component.less';
import './editor/index';


Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
