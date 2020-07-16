import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import {
  Login,
  GetGuest,
  DashBoard,
  Conversion,
  ChannelConversion,
  TurnoverDefeate,
  Index,
  SpreadNav,
  // SceneIndex,
  // SceneSelect,
  // SceneDetail
  SettingIndex,
  Setting,
  AimSetting
} from '@/page';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { 
    path: '/settingindex', 
    name: 'settingindex',
    component: SettingIndex,
    redirect: '/settingindex/setting',
    children: [
      {
        path: 'setting',
        name: 'setting',
        component: Setting,
      },
      {
        path: 'aimSetting',
        name: 'aimSetting',
        component: AimSetting,
      },
    ]
  },
  { 
    path: '/', 
    name: 'home',
    component: Index,
    redirect: '/dashboard',
    children: [
    
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashBoard,
      },
      {
        path: 'spread',
        name: 'spread',
        component: SpreadNav,
      },
      {
        path: 'visitors',
        name: 'visitors',
        component: GetGuest,
      },
      {
        path: 'conversion',
        name: 'conversion',
        component: Conversion,
        redirect: 'conversion/channelconversion',
        children: [
          {
            path: 'channelconversion',
            name: 'ChannelConversion',
            component: ChannelConversion,
          },
          {
            path: 'turnoverdefeate',
            name: 'TurnoverDefeate',
            component: TurnoverDefeate,
          }
        ]
      }
    ]

  },
  // {
  //   path: '/sceneIndex',
  //   name: 'sceneIndex',
  //   component: SceneIndex,
  //   redirect: '/sceneDetail',
  //   children: [
  //     {
  //       path: '/sceneSelect',
  //       name: 'sceneSelect',
  //       component: SceneSelect,
  //     },
  //     {
  //       path: '/sceneDetail',
  //       name: 'sceneDetail',
  //       component: SceneDetail,
  //     }
  //   ]
  // },
  
  // {
  //   path: 'conversion',
  //   name: 'conversion',
  //   component: Conversion,
  //   redirect: 'channelconversion',
  //   children: [
  //     {
  //       path: 'channelconversion',
  //       name: 'ChannelConversion',
  //       component: ChannelConversion,
  //     },
  //     {
  //       path: 'turnoverdefeate',
  //       name: 'TurnoverDefeate',
  //       component: TurnoverDefeate,
  //     }
  //   ]
  // }
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
