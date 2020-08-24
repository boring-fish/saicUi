<template>
  <div class="setting-wrap">
    <template
      v-for="(item, index) in MenuList"
    >
      <div class="box-bg-border"
        :key="index"
        @click="handleGoRoute(item.route)"
        v-if="item.admission"
      >
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
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class Setting extends Vue {

  effectiveRole = $permission.getEffectiveRole();
  MenuList: any[] = [{
      name: '目标值配置',
      route: 'aimSetting',
      admission: false
    }, {
      name: '预警/报警值配置',
      route: 'earlyWarnSetting',
      admission: false
    }, {
      name: '菜单权限配置',
      route: 'userRoleSetting',
      admission: false
    }, {
      name: '营销闭环看板',
      route: '/dashboard',
      admission: false
    }
  ];

  handleGoRoute(route: string) {
    if (!route) {
      return;
    }
    this.$router.push(route);
  }

  created() {
    this.getRoleinRoute();
  }

  getRoleinRoute() {
    let roles = $permission.getRoles();
    if ( roles['isKpiAdmin'] ) {
      this.MenuList[0]['admission'] = true;
      this.MenuList[1]['admission'] = true;
    }
    if ( this.effectiveRole ) {
      if ( this.effectiveRole === 'admin' ) {
        this.MenuList.forEach((item) => {
          item['admission'] = true;
        });
        return;
      }

      this.MenuList[3]['admission'] = true;
      return;
    }
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
