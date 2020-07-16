<template>
  <div class="Login-warp">
    <div class="loginPage">
      <div class="loginTitle">
        <img src="../../assets/img/logo@2x.png" alt="">
        <p>营销闭环度量看板</p>
      </div>
      <div class="loginFrom">
        <div class="username">
           <span class="iconfont icontouxiang "></span>
          <input type="text" placeholder="用户名" v-model="loginFrom.username">
        </div>
        <div class="password">
           <span class="iconfont iconsuo"></span>
          <input type="password" placeholder="密码" v-model="loginFrom.password">
        </div>
        <div class="captcha">
           <span class="iconfont iconsuo"></span>
        <input type="text" placeholder="验证码" v-model.number="loginFrom.captcha">
       </div>
       <div class="loginBtn">
         <button>登陆</button>
       </div>
       
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import {  } from '@/components' // 组件
@Component({})
export default class Login extends Vue {
    loginFrom = {
      username: '',
      password: '',
      captcha: ''
    };
}
</script>

<style lang="scss">
.Login-warp{
  width: 100%;
  height: 100%;
  position: relative;
  background: url('../../assets/img/login-bgimg@2x.jpg') no-repeat;
  background-size: cover;

.loginPage{
  width: 930px;
  // height:8.11px;
  background:rgba(231,250,254,1);
  border-radius: 13px;
  position: absolute;
  top: 50%;
  // bottom: 0;
  left: 50%;
  margin: auto;
  padding: 102px 145px;
  transform: translate(-50% , -50%);

.loginTitle{
  width: 100%;  
  height: 73px;
  display: flex;

  img{
  width: 73px;      
  height: 73px;
  margin-left: 98px;
    }
  
  p{
  font-size: 47px;
  font-weight:600;
  color:rgba(0,8,20,1);
  margin-left: 13px;
        }

      }  

.loginFrom{
  width: 100%;
  margin-top: 60px;
  color:rgba(0,0,0,0.25);

.username{
  margin-bottom: 55px;
  display: flex;
  width: 100%;
  background:rgba(249,254,254,1);
  border-radius: 13px;
  height: 73px;
  border:1px solid rgba(0,0,0,0.15);
}

.password{
   margin-bottom: 55px;
  display: flex;
  width: 100%;
  background:rgba(249,254,254,1);
  border-radius: 13px;
  height: 73px;
  border: 1px solid rgba(0,0,0,0.15);
}

.captcha{
  // margin-bottom: .64px;
  display: flex;
  width: 100%;
  background:rgba(249,254,254,1);
  border-radius: 13px;
  height: 73px;
  border:1px solid rgba(0,0,0,0.15);

}

.loginBtn{

  button{
  width:100%;
  height: 81px;
  background:rgba(13,109,125,1);
  border-radius: 13px;
  border:1px solid rgba(0,0,0,0.15);
  color: #ffffff;
}
}

span{
  display: block;
  width: 30px;
  height: 30px;
  margin-left: 19px;
  margin-top: 21px;
  margin-right: 15px;
}

input{
  width: 100%;
  background:rgba(249,254,254,1);
  border-radius: 13px;
  height: 73px;
  padding-bottom: 1px;
  // border:1px solid rgba(0,0,0,0.15);
  // border-left: none;
  border: 0;
  outline: none; 
  background-color: rgba(0, 0, 0, 0);
  }

input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {  
  -webkit-text-fill-color: #000000 !important;  
  -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;  
  background-color:transparent;  
  background-image: none;  
  transition: background-color 50000s ease-in-out 0s; 
  //背景色透明  生效时长  过渡效果  启用时延迟的时间  
}  


}

  }


}
</style>

