import Vue from 'vue';
import moment from 'moment';
import formatDuration from 'format-duration';
import router from './router';
import App from './App.vue';

Vue.config.devtools = true;
Vue.config.productionTip = false;

Vue.filter('duration', (value) => formatDuration(Number(value) * 1000));

Vue.filter('datetime', (value) => {
  if (!value) return '';
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
