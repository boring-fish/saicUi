<template>
  <div class="scenemake-warp box-bg-border">
    <span class="border border-top-left"></span>
    <span class="border border-top-right"></span>
    <span class="border border-bottom-left"></span>
    <span class="border border-bottom-right"></span>
    <SceneHeader :title="title"></SceneHeader>
    <div class="scenemaked">
      <div class="scenemakedtiao" v-for="(item,index) in makeList" :key="index">
        <div class="xuhao">{{index+1}}</div>
        <span class="makename">{{item.name}}</span>
        <span class="makesum">{{item.sum}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { SideNav, TopBar, Container, EarlyWarn } from '@/components/index';
import SceneHeader from './SceneHeader.vue';

@Component({
  components: {
    SceneHeader
  }
})
export default class SceneMake extends Vue {
  title: String = '场景使用';
  makeList: Array<object> = [
    {
      name: '一方直播平台',
      sum: '201'
    },
    {
      name: '一方直播平台',
      sum: '201'
    },
    {
      name: '在线整车全款支付',
      sum: '201'
    },
    {
      name: '一方直播平台',
      sum: '201'
    },
    {
      name: '一方直播平台',
      sum: '201'
    },
    {
      name: '一方直播平台',
      sum: '201'
    },
    {
      name: '一方直播平台',
      sum: '201'
    }
  ];
}
</script>

<style lang="scss" scoped>
.scenemake-warp {
  width: 100%;
  height: 960px;
  // background: #00263e;
  .scenetital {
    font-size: 36px;
    padding: 30px 40px 20px;
    color: #fff;
    border-bottom: 2px solid #002f3b;
    margin-bottom: 17px;
  }
  .scenemaked {
    padding:0 55px;
    .scenemakedtiao {
      width: 100%;
      height: 115px;
      // background: red;
      color: #ffffff;
      font-size: 28px;
      display: flex;
      align-items: center;
      .xuhao {
        width: 52px;
        height: 42px;
        background: rgba(35, 107, 180, 1);
        // border:2px dashed #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .makename {
        margin-left: 60px;
        width: 296px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
      .makesum {
        font-size: 48px;
        font-family: Helvetica-Bold, Helvetica;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-left: 100px;
      }
    }
  }
}
</style>
