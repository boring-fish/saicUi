<template>
  <div class="settingindex-wrap">
     <Container :options="{ width: 4096, height: 2160 }">
        <header class="hearder">
          <el-button type="primary" @click="handleBack">
            <span class="iconfont iconzuojiantou"></span>
            <span class="button-text">返回</span>
          </el-button>
          <div class="iconClose" @click="logout">
            <div class="iconfont iconzhuxiaodenglu"></div>
          </div>  
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

  logout() {
    $api.DashboardApi.logout().then((res: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      console.log(res, '退出');
      window.location.replace(res.remoteLogoutUri);
    });
  }
}
</script>

<style lang="scss">
.settingindex-wrap{
  background-color: #090E1D;
  height: 100%;
  .hearder{
    height: 160px;
    padding: 40px 40px 40px 60px;
    position: relative;
    background-color: $box-bg-primary;
    display: flex;
    .iconClose {
      border-radius: 16px;
      width: 50px;
      height: 52px;
      position: absolute;
      right: 77px;
      top: 50px;
      .iconfont {
        width: 50px;
        height: 52px;
        color: #99a2a6;
        font-size: 52px;
        position: absolute;
        top: 0;right: 0;bottom: 0;left: 0;
        margin: auto;
      }
    }
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
    height: calc(100% - 240px);
  }
}

</style>
