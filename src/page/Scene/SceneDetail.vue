<template>
  <div class="sceneDetail-wrap">
    <SideNav></SideNav>
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
import { Component, Vue } from 'vue-property-decorator';
// import { SceneTop, SideNav } from '@/components/index';

import {
  SideNav,
  SceneMake,
  SceneAchieve,
  SceneTab,
  SceneAlgorithmModel,
  SceneAnalysisModel,
  SceneTarget
} from '@/components/index';

@Component({
  components: {
    SideNav,
    SceneMake,
    SceneAchieve,
    SceneTab,
    SceneAlgorithmModel,
    SceneAnalysisModel,
    SceneTarget
  }
})
export default class SceneDetail extends Vue {}
</script>

<style lang="scss" scoped>
.sceneDetail-wrap {
  width: 100%;
  display: flex;
  .Sceneleft {
    width: 660px;
    // height: 960px;
  }
  .sceneMiddle {
    width: 2080px;
    // height: 960px;
    // background: #00263e;
    margin-left: 20px;
    .sceneMiddleDown {
      height: 1204px;
      // background: #00263e;
      margin-top: 20px;
      display: flex;
    }
  }
  .sceneRight {
    width: 896px;
    // height: 960px;
    // background: #00263e;
    margin-left: 20px;
  }
}
</style>
