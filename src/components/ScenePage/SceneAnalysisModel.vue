<template>
  <div class="sceneAnalysisModel-warp">
    <span class="border border-top-left"></span>
    <span class="border border-top-right"></span>
    <span class="border border-bottom-left"></span>
    <span class="border border-bottom-right"></span>
    <SceneHeader :title="title"></SceneHeader>
    <div class="sceneAnalysisModelContent">
      <div class="typeModel" v-for="(item,index) in analysisModelList" :key="index">
        <p class="analysissum">{{item.sumwz}}</p>
        <p>
          <span class="analysissumzb">{{item.sum}}</span>
          <span class="analysissumz">/</span>
          <span class="analysissumz">{{item.totalsum}}</span>
        </p>
        <p class="analysismake">
          {{item.make}}
          <span
            :class="item.zt>0?'analysismakeszRed':'analysismakeszGreen'"
          >{{item.rate}}%</span>
        </p>
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
export default class SceneAnalysisModel extends Vue {
  title: String = '分析模型使用数';
  analysisModelList: Array<object> = [
    {
      sumwz: '点击分析模型',
      sum: '297',
      totalsum: '379',
      make: '用户使用率',
      rate: '91.19',
      zt: 0
    },
    {
      sumwz: '标签使用总数',
      sum: '297',
      totalsum: '379',
      make: '标签使用率',
      rate: '91.19',
      zt: 1
    },
    {
      sumwz: '标签使用总数',
      sum: '297',
      totalsum: '379',
      make: '标签使用率',
      rate: '91.19',
      zt: 0
    },
    {
      sumwz: '标签使用总数',
      sum: '297',
      totalsum: '379',
      make: '标签使用率',
      rate: '91.19',
      zt: 1
    },

    {
      sumwz: '标签使用总数',
      sum: '297',
      totalsum: '379',
      make: '标签使用率',
      rate: '91.19',
      zt: 1
    },
    {
      sumwz: '标签使用总数',
      sum: '297',
      totalsum: '379',
      make: '标签使用率',
      rate: '91.19',
      zt: 0
    },
    {
      sumwz: '标签使用总数',
      sum: '297',
      totalsum: '379',
      make: '标签使用率',
      rate: '91.19',
      zt: 0
    },
    {
      sumwz: '标签使用总数',
      sum: '297',
      totalsum: '379',
      make: '标签使用率',
      rate: '91.19',
      zt: 1
    }
  ];
}
</script>

<style lang="scss" scoped>
.sceneAnalysisModel-warp {
  width: 1048px;
  height: 100%;
  // background: #00263e;
  .sceneAnalysisModelContent {
    width: 100%;
    //  height:100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 60px;
    .typeModel {
      width: 50%;
      height: 200px;
      //  background:red;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      font-size: 28px;
      margin-top: 60px;
      padding: 0 20px 40px 100px;
      .analysissumzb {
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        font-size: 64px;
      }
      .analysismakeszRed {
        font-weight: 400;
        color: rgba(255, 113, 118, 1);
        font-size: 24px;
        margin-left: 20px;
      }
      .analysismakeszGreen {
        font-weight: 400;
        color: rgba(86, 216, 132, 1);
        font-size: 24px;
        margin-left: 20px;
      }
      .analysismake {
        font-size: 24px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);
      }
      .analysissumz {
        font-size: 32px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
        margin-left: 5px;
      }
    }
  }
}
</style>
