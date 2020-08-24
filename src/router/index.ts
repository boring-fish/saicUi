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
  SettingIndex,
  Setting,
  AimSetting,
  UserRoleSetting,
  EarlyWarnSetting,
  NoPermission,
  SceneIndex,
  SceneSelect,
  SceneDetail
} from '@/page';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { 
    path: '/setting', 
    name: 'setting',
    component: SettingIndex,
    redirect: '/setting/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: Setting,
      },
      {
        path: 'aimSetting',
        name: 'aimSetting',
        component: AimSetting,
      },
      {
        path: 'userRoleSetting',
        name: 'userRoleSetting',
        component: UserRoleSetting,
      },
      {
        path: 'earlyWarnSetting',
        name: 'earlyWarnSetting',
        component: EarlyWarnSetting,
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
        meta: {
          isDashboard: true
        }
      },
      {
        path: 'spread',
        name: 'spread',
        component: SpreadNav,
        meta: {
          isDashboard: true
        },
      },
      {
        path: 'visitors',
        name: 'visitors',
        component: GetGuest,
        meta: {
          isDashboard: true
        },
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
            meta: {
              isDashboard: true
            },
          },
          {
            path: 'turnoverdefeate',
            name: 'TurnoverDefeate',
            component: TurnoverDefeate,
            meta: {
              isDashboard: true
            },
          }
        ]
      }
    ]
  },
  {
    path: '/nopermission',
    name: 'NoPermission',
    component: NoPermission,
  },
  {
      path: '/sceneIndex',
      name: 'sceneIndex',
      component: SceneIndex,
      redirect: '/sceneDetail',
      children: [
        {
          path: '/sceneSelect',
          name: 'sceneSelect',
          component: SceneSelect,
          meta: {
            isDashboard: true
          }
        },
        {
          path: '/sceneDetail',
          name: 'sceneDetail',
          component: SceneDetail,
          meta: {
            isDashboard: true
          }
        }
      ]
    },
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
