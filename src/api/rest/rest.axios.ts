import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import Vue from 'vue';

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
    return Promise.reject(error.response);
  }
);

export default axios;
