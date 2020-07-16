<template>
  <Container :options="{ width: 4096, height: 2160 }">
    <div class="scene-warp">
      <div>
        <SceneTop></SceneTop>
      </div>
      <div class="sceneTopContent">
        <!-- 
        <SceneDetail></SceneDetail> -->
        <router-view /> 
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { SceneSelect } from '@/page/index';
// import SceneSelect from './SceneSelect.vue';
// import SceneDetail from './SceneDetail.vue';
import { Container } from '@/components/index';
import { SceneTop } from '@/components/index';

@Component({
  components: {
    Container,
    SceneTop,
    // SceneSelect,
    // // SideNav,
    // SceneDetail
  }
})
export default class SceneIndex extends Vue {}
</script>

<style lang="scss" scoped>
.scene-warp {
  width: 4096px;
  height: 2160px;
  background: #000;
  .sceneTopContent {
    width: 100%;
    padding: 18px 40px 40px;
    display: flex;
  }
}
</style>
