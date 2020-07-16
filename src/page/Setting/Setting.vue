<template>
  <div class="setting-wrap">
       <div class="box-bg-border" 
       v-for="item in MenuList"
       :key="item.route"
       @click="handleGoRoute(item.route)">
            <span class="border border-top-left"></span>
            <span class="border border-top-right"></span>
            <span class="border border-bottom-left"></span>
            <span class="border border-bottom-right"></span>
            <div class="gradient"></div>
            <div class="diamond"></div>
            <div class="menu-name">{{item.name}}</div>
            <div class="diamond"></div>
            <div class="gradient-reverse"></div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class Setting extends Vue {

  MenuList = [{
      name: '目标值配置',
      route: 'aimSetting',
    }, {
      name: '预警/报警值配置',
      route: '',
    }, {
      name: '菜单权限配置',
      route: '',
    }, {
      name: '营销闭环看板',
      route: 'dashboard',
    }
  ];

  handleGoRoute(route: string) {
    if (!route) {
      return;
    }
    this.$router.push(route);
  }

}
</script>

<style lang="scss">

.setting-wrap{
  // background-color: $box-bg-primary;
  background: url('../../assets/img/bg-img@2x.png') no-repeat;
  padding: 280px 996px 280px 1038px;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  .box-bg-border{
    width: 988px;
    height: 620px;
    margin: 0 42px 40px 0;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
  }
  .gradient{
    width: 120px;
    height: 2px;
    background-image: linear-gradient(to right, transparent , #236BB4);
  }
  .gradient-reverse{
    width: 120px;
    height: 2px;
    background-image: linear-gradient(to right , #236BB4, transparent);
  }
  .menu-name {
    margin: 0 48px;
  }
  .diamond {
        width: 13px;
        height: 13px;
        transform: rotateZ(-45deg);
        background: #236BB4;
  }
  .box-bg-border:hover {
    background-color: #1E2441;
    box-shadow: none;
  }
}

</style>
