<template>
  <div
    class="noPermission-wrap"
  >
    <Container :options="{ width: 4096, height: 2160 }">
      <div class="noPermission-inside">
        <div class="iconClose" @click="logout">
          <div class="iconfont iconzhuxiaodenglu"></div>
        </div>  
        <div class="spreadNav-tcr box-bg-border permission">
          <span class="border border-top-left"></span>
          <span class="border border-top-right"></span>
          <span class="border border-bottom-left"></span>
          <span class="border border-bottom-right"></span>
          <div class="permissionimg">
            <img src="../../assets/img/permisson@2x.png" alt="" />
          </div>
          <div class="permissionMiddle">
            <span>提示</span>
          </div>
          <div class="permissionbottom">
            <p>
              您无查看
              <strong>[营销闭环度量看板]</strong>
              的权限，请联系<strong>「系统管理员」</strong>为您配置权限
            </p>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Container } from '@/components';

@Component({
  components: {
    Container,
  }
})

export default class NoPermission extends Vue {
  mounted() {
    //
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
.noPermission-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  overflow: auto;
  margin: 0;
  background: #000000;
  .iconClose {
    border-radius: 16px;
    width: 100px;
    height: 100px;
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
  .noPermission-inside {
    background: url(../../assets/img/bg-img@2x.png) no-repeat;
    background-size: cover;
    height: 100%;
  }
  .permission {
    width: 1398px;
    height: 620px;
    position: fixed;
    top: 25%;
    left: 30%;
    background: rgba(18, 22, 38, 1);
    box-shadow: 0px 2px 50px 16px rgba(31, 34, 45, 1);
    border-radius: 24px;
    border: 4px solid rgba(58, 66, 99, 1);
    .permissionimg {
      display: flex;
      justify-content: center;
      width: 100%;
      padding-top: 80px;
    }
  }
  .permissionMiddle {
    color: #ffffff;
    font-size: 48px;
    margin-top: 40px;
    background: url('../../assets/img/title-left@2x.png') no-repeat,
      url('../../assets/img/title-right@2x.png') no-repeat;
    background-position: 468px 25px, 778px 25px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .permissionbottom {
    width: 100%;
    height: 44px;
    font-size: 32px;
    margin-top: 75px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    display: flex;
    justify-content: center;
  }
}
</style>
