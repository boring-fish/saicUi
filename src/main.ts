import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style/font/iconfont.css';
import './assets/style/iconfont/iconfont.css';
import './assets/style/scss/common.scss';
import { ApiService } from '@/api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { CommonData } from '@/utils/CommonData';
import { areadataToMap, seriesdataToMap } from '@/utils/utils';
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
const global: any = window;
Vue.config.productionTip = false;
let apiService = new ApiService();
let commonData = new CommonData();
global.$api = apiService;
global.$commonData = commonData;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if ( from.path === '/' ) {
    let params = {
      brandId: '121'
    };
    $api.DashboardApi.areaData(params).then((data) => {
      commonData.areaData.setAreaList(data);
      commonData.areaData.setAreaMap(areadataToMap(data));
      $api.DashboardApi.seriesIds({}).then((res) => {
        commonData.seriesData.setSeriesMap(seriesdataToMap(res));
        next();
      }).catch(() => {
        next();
      });
    }).catch((err) => {
      commonData.areaData.setAreaList([]);
      commonData.areaData.setAreaMap([]);
      $api.DashboardApi.seriesIds({}).then((res) => {
        commonData.seriesData.setSeriesMap(seriesdataToMap(res));
        next();
      }).catch(() => {
        next();
      });
    });
  } else {
    next();
  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
