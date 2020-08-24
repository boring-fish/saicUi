<template>
  <div class="sceneDetail-wrap">
    <SceneSideNav  :timeRange="timeRange" :brandId="brandId"></SceneSideNav>
    <div class="Sceneleft">
      <SceneMake></SceneMake>
      <SceneAchieve></SceneAchieve>
    </div>
    <div class="sceneMiddle">
      <SceneTab></SceneTab>
      <div class="sceneMiddleDown box-bg-border">
       
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
        <SceneAlgorithmModel></SceneAlgorithmModel>
        <SceneAnalysisModel></SceneAnalysisModel>
      </div>
    </div>
    <div class="sceneRight">
      <SceneTarget></SceneTarget>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

import {
  SideNav,
  SceneMake,
  SceneAchieve,
  SceneTab,
  SceneAlgorithmModel,
  SceneAnalysisModel,
  SceneTarget,
  SceneSideNav
} from '@/components/index';
interface TIMERANGE {
  key: string;
  type: string;
}
@Component({
  components: {
    SideNav,
    SceneMake,
    SceneAchieve,
    SceneTab,
    SceneAlgorithmModel,
    SceneAnalysisModel,
    SceneTarget,
    SceneSideNav
  }
})
export default class SceneDetail extends Vue {
  // selectArea: any = true;
  brandId: any = this.$route.query.brandId;
   timeRange: TIMERANGE[] = [
    {
      key: 'year',
      type: '当年',
    },
    {
      key: 'threemonth',
      type: '近3个月',
    },
    {
      key: 'month',
      type: '当月',
    },
    {
      key: 'last_month',
      type: '上个月',
    },
    {
      key: 'week',
      type: '当周',
    },
    {
      key: 'day',
      type: '昨日',
    },
    {
      key: 'all',
      type: '历史累计',
    },
  ];
  
}
</script>

<style lang="scss" scoped>
.sceneDetail-wrap {
  width: 100%;
  display: flex;
  .Sceneleft {
    // width: 660px;
    width: 622px;
    margin-left: 20px
  }
  .sceneMiddle {
    // width: 2080px;
    width: 2035px;
    margin-left: 20px;
    .sceneMiddleDown {
      height: 1204px;
      margin-top: 20px;
      display: flex;
    }
  }
  .sceneRight {
    // width: 896px;
    width: 850px;

    margin-left: 20px;
  }
}
</style>
