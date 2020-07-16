<template>
  <div class="sceneAchieve-warp box-bg-border">
    <span class="border border-top-left"></span>
    <span class="border border-top-right"></span>
    <span class="border border-bottom-left"></span>
    <span class="border border-bottom-right"></span>
    <SceneHeader :title="title" @jx="jx" @sx="sx"></SceneHeader>
    <div class="sceneAchieved">
      <div class="sceneAchievedtiao" v-for="(achieveItem,index) in achieveList" :key="index">
        <div class="xuhao">{{index+1}}</div>
        <span class="achievename">
          <img :src="achieveItem.img" alt />
          <div class="achievenamer">
            <h6>{{achieveItem.name}}</h6>
            <span>{{achieveItem.zc}}</span>
          </div>
        </span>
        <span :class="achieveItem.zt>0?'achievesumRed':'achievesumGreen'">{{achieveItem.sum}}%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SceneHeader from './SceneHeader.vue';

@Component({
  components: {
    SceneHeader
  }
})
export default class SceneAchieve extends Vue {
  title: String = '指标达成';
  sumList: Array<number> = [];
  achieveList: Array<object> = [
    {
      name: '范景旺',
      zc: 'SCFM产品经理',
      img: require('../../assets/img/portrait.jpg'),
      sum: '126',
      zt: 1, //1代表下降 0 代表上升
      pm: 1
    },
    {
      name: '范景旺',
      zc: 'SCFM产品经理',
      img: require('@/assets/img/uesrs.png'),
      sum: '120',
      zt: 0, //1代表下降 0 代表上升
      pm: 2
    },
    {
      name: '范景旺',
      zc: 'SCFM产品经理',
      img: require('@/assets/img/uesrs.png'),
      sum: '16',
      zt: 1, //1代表下降 0 代表上升
      pm: 3
    },
    {
      name: '范景旺',
      zc: '上门轿车触点经理',
      img: require('@/assets/img/uesrs.png'),
      sum: '26',
      zt: 0, //1代表下降 0 代表上升
      pm: 4
    },
    {
      name: '范景旺',
      zc: 'SCFM产品经理',
      img: require('@/assets/img/uesrs.png'),
      sum: '100',
      zt: 1, //1代表下降 0 代表上升
      pm: 5
    }
  ];
  mounted() {
    this.jx();
  }
  jx() {
    this.achieveList.sort(function(a: any, b: any) {
      return b.sum - a.sum;
    });
  }
  sx() {
    this.achieveList.sort(function(a: any, b: any) {
      return a.sum - b.sum;
    });
  }
}
</script>

<style lang="scss" scoped>
.sceneAchieve-warp {
  width: 100%;
  height: 944px;
  // background: #00263e;
  margin-top: 20px;
  .sceneAchievetital {
    font-size: 36px;
    padding: 30px 40px 20px;
    color: #fff;
    border-bottom: 2px solid #002f3b;
    margin-bottom: 17px;
  }
  .sceneAchieved {
    padding: 55px;
    .sceneAchievedtiao {
      width: 100%;
      height: 150px;
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
      .achievename {
        margin-left: 40px;
        display: flex;
        width: 380px;
        img {
          width: 88px;
          height: 88px;
          border-radius: 100%;
        }
        .achievenamer {
          margin-left: 20px;
          width: 200px;
          h6 {
            height: 40px;
            font-size: 28px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            line-height: 40px;
          }
          span {
            height: 34px;
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.6);
            line-height: 34px;
          }
        }
      }
      .achievesumGreen {
        color: rgba(86, 216, 132, 1);
        font-size: 40px;
      }
      .achievesumRed {
        color: rgba(255, 113, 118, 1);
        font-size: 40px;
      }
    }
  }
}
</style>
