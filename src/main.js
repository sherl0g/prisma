import Vue from 'vue';
import moment from 'moment';
import formatDuration from 'format-duration';
import router from './router';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const { NODE_ENV } = process.env;

Vue.config.devtools = NODE_ENV !== 'production';
Vue.config.productionTip = NODE_ENV !== 'production';

Vue.filter('duration', (value) => formatDuration(Number(value) * 1000));

Vue.filter('datetime', (value) => {
  if (!value) return '';
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
