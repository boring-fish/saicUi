<template>
  <div class="sceneSelect-wrap">
    <div class="sceneTopContenTital  box-bg-border" v-for="(item,index) in scenebutton" :key="index">
     
       
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
      <span class="selectTitall"></span>
      <div class="selectTitalContent">
        <span>{{item.name}}</span>
      </div>
      
      <span class="selectTitalr"></span>
      <!-- <div> -->
        <img :src="item.img" alt="">
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { SideNav, TopBar, Container, EarlyWarn } from '@/components/index';

@Component({
  // components: {}
})
export default class SceneSelect extends Vue {
  scenebutton: any = [
    {
      name: '一方直播平台',
      img: require('../../assets/img/scene-yifangzbpt@2x.png')
    },
    {
      name: 'SCRM',
      img: require('../../assets/img/scene-scrm@2x.png')
    },
    {
      name: '社交裂变',
      img: require('../../assets/img/scene-shejiaolb@2x.png')
    },
    {
      name: '销售咨询',
      img: require('../../assets/img/scene-xiaoshouzx@2x.png')
    },
    {
      name: '试乘试驾',
      img: require('../../assets/img/scene-shichengsj@2x.png')
    },
    {
      name: '客户交互中心',
      img: require('../../assets/img/scene-kehujhzx@2x.png')
    },
    {
      name: '在线销售中心数字大屏',
      img: require('../../assets/img/scene-zaixianxszx@2x.png')
    },
    {
      name: '',
      // img:require('../../assets/img/scene-yifangzbpt@2x.png')
    },
    {
      name: ''
    },
    {
      name: ''
    },
    {
      name: ''
    },
    {
      name: ''
    }
  ];
}
</script>

<style lang="scss" scoped>
.sceneSelect-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  .sceneTopContenTital {
    width: 990px;
    height: 620px;
    background:rgba(18,22,38,1);
box-shadow:0px 2px 50px 16px rgba(31,34,45,1);
border-radius:24px;
border:4px solid rgba(58,66,99,1);
    margin-top: 10px;
   
    .selectTitalContent {
     color: #ffffff;
    font-size: 48px;
    height: 100px;
    margin-top: 120px;
    background:  url("../../assets/img/title-left@2x.png") no-repeat,url("../../assets/img/title-right@2x.png") no-repeat;
    background-position: 79px 25px, 756px 25px;
    width: 100%;
     display: flex;
    justify-content: center;
    }
    img{
     margin: 35px 350px;
    }
  }
}
</style>
