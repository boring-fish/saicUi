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
import { Permission } from '@/utils/permission';
import { 
  areadataToMap,
  seriesdataToMap,
  saveLocal,
  getLocal,
  saveSession,
  getSession
} from '@/utils/utils';
import echarts from 'echarts';

Vue.prototype.$echarts = echarts;
const global: any = window;
Vue.config.productionTip = false;
let apiService = new ApiService();
let commonData = new CommonData();
let Permissions = new Permission();
global.$api = apiService;
global.$commonData = commonData;
global.$permission = Permissions;
Vue.use(ElementUI);

let getCodeApi = async () => {  //获取code 
  let resp = await $api.PermissionApi.getRedirectUri({});
  window.location.replace(resp.redirectUri);
};

let getUrlKey = (name: string) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
};

let getPath = (permission: string, isKpiAdmin: boolean) => {
  if ( permission === 'admin' || isKpiAdmin) {
    return '/setting';
  } else {
    return '/dashboard';
  }
};

let permissionCheck = (to: any, from: any, permission: string, isKpiAdmin: boolean) => {
  console.log(to, permission, isKpiAdmin);
  return new Promise((resolve, reject) => {
    if ( !permission && !isKpiAdmin ) {
      if ( to.name === 'NoPermission' ) {
        resolve('next');
      } else {
        resolve('nopermission');
      }
    }
    if (to.path.indexOf('setting') > -1) {
      if ( permission === 'admin' || isKpiAdmin ) {
        resolve('next');
      }
      if ( permission ) {
        resolve('dashboard');
      }
    }
    if (to.meta.isDashboard) {
      if ( permission ) {
        resolve('next');
      }
      if ( isKpiAdmin ) {
        resolve('setting');
      }
    }
  });
};


let initAreaAndSeries = (params: object) => {
  return new Promise((resolve, reject) => {
    $api.DashboardApi.areaData(params).then((data) => {
      commonData.areaData.setAreaList(data);
      commonData.areaData.setAreaMap(areadataToMap(data));
      $api.DashboardApi.seriesIds({}).then((res) => {
        commonData.seriesData.setSeriesMap(seriesdataToMap(res));
        resolve('ok');
      }).catch(() => {
        resolve('ok');
      });
    }).catch((err) => {
      commonData.areaData.setAreaList([]);
      commonData.areaData.setAreaMap([]);
      $api.DashboardApi.seriesIds({}).then((res) => {
        commonData.seriesData.setSeriesMap(seriesdataToMap(res));
        resolve('ok');
      }).catch(() => {
        resolve('ok');
      });
    });
  });
};

router.beforeEach((to, from, next) => {
  if ( to.name === 'NoPermission' ) {
    next();
    return;
  }
  if ( !getLocal('token') ) {
    let code = getUrlKey('code');
    if ( code ) {
      let state = getUrlKey('state');
      let query = {
        code,
        state
      };
      $api.PermissionApi.permissionRole(query).then((res) => {
        if ( res.code === '00' ) {
          if ( !(res.roles && res.roles[0]) ) {
            next('/nopermission');
          }
          saveLocal('token', res.accessToken);
          saveLocal('userInfo', res);
          Permissions.setResp(res);
          let permission = Permissions.getEffectiveRole();
          let isKpiAdmin = Permissions.getRoles().isKpiAdmin;
          let params = {
            brandId: Permissions.getDefaultBrandId()
          };
          initAreaAndSeries(params).then((res) => {
            next(getPath(permission, isKpiAdmin));
          });
        }
        if ( res.code === '01') {
          next('/nopermission');
          console.log(res, 'code 01');
        }
      }).catch((err) => {
        console.log(err, '1234');
      });
    } else {
      // 登录跳转
      getCodeApi();
    }
  } else {
    let res = getLocal('userInfo');
    Permissions.setResp(res);
    let permission = Permissions.getEffectiveRole();
    let isKpiAdmin = Permissions.getRoles().isKpiAdmin;
    let params = {
      brandId: Permissions.getDefaultBrandId()
    };
    permissionCheck(to, from, permission, isKpiAdmin).then((res) => {
      initAreaAndSeries(params).then((resp) => {
        res === 'next' ? next() : next(`/${res}`);
      }).catch((params) => {
        res === 'next' ? next() : next(`/${res}`);
      });
    });      

  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
