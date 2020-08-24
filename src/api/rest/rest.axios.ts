import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import Vue from 'vue';
let getCodeApi = async() => {
  let resp = await $api.PermissionApi.getRedirectUri({});
  window.location.replace(resp.redirectUri);
};
let loadingCount: number = 0;
// TODO Loading...
axios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    Vue.prototype.$loading({
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    loadingCount++;
    if (!config.params.rfsCodes) {
      delete config.params.rfsCodes;
    }
    if (!config.params.seriesIds) {
      delete config.params.seriesIds;
    }
    if (localStorage.getItem('token')) {
     let useInfo: any = localStorage.getItem('userInfo');
         useInfo = JSON.parse(useInfo);
         config.headers.token = useInfo.accessToken;
    }
    return config;
  },
  function (error: AxiosError) {
    loadingCount--;
    if ( loadingCount === 0 ) {
      Vue.prototype.$loading().close();
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (resp: AxiosResponse) {
    loadingCount--;
    if ( loadingCount === 0 ) {
      Vue.prototype.$loading().close();
    }
    return resp;
  },
  function (error: AxiosError) {
    loadingCount--;
    if ( loadingCount === 0 ) {
      Vue.prototype.$loading().close();
    }
    let STATUS_CODE = error.response?.status;
    if (STATUS_CODE === 403) {
      $api.DashboardApi.logout().then((res: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        console.log(res, '退出');
        window.location.replace(res.remoteLogoutUri);
        // return;
      });
    }
    return Promise.reject(error.response);
  }
);

export default axios;
