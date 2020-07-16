<template>
  <div class="settingindex-wrap">
     <Container :options="{ width: 4096, height: 2160 }">
        <header class="hearder">
          <el-button type="primary" @click="handleBack">
            <span class="iconfont iconzuojiantou"></span>
            <span class="button-text">返回</span>
          </el-button>
        </header>
        <main class="main">
          <router-view></router-view>
        </main>
     </Container>
    
 
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Container } from '@/components'; // 组件

@Component({
  components: {
    Container,
  }
})
export default class SettingIndex extends Vue {
  handleBack() {
    this.$router.go(-1);
  }

}
</script>

<style lang="scss">
.settingindex-wrap{
  background-color: #090E1D;
  height: 100%;
  .hearder{
    height: 160px;
    padding: 40px 0 40px 60px;
    background-color: $box-bg-primary;
    .el-button--primary{
      width: 190px;
      height: 80px;
      font-size: 28px;
      border-radius: 16px;
      .iconfont{
        font-size: 28px;
        font-weight: 900;
      }

    }
    .el-button>span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .main {
    // padding: 40px;
    height: 100%;
   
  }
}

</style>
