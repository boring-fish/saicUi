<template>
  <div class="sceneTab-warp box-bg-border">
    <span class="border border-top-left"></span>
    <span class="border border-top-right"></span>
    <span class="border border-bottom-left"></span>
    <span class="border border-bottom-right"></span>
    <SceneHeader :title="title"></SceneHeader>
    <div class="sceneTabd">
      <div class="sceneTabdtitle">
        一共覆盖了<span class="usercolor">{{total.users}}</span>用户，产生了<span class="usercolor">{{total.label}}</span>个标签
      </div>
     <div class="sceneTabdleftTop">
       <ul>
         <li v-for="(item,index) in carPreferData" :key="index">
           <span class="sceneText"> {{item.text}}</span><span class="sceneValue">{{item.value}}</span>
         </li>
       </ul>
     </div>
     <div class="sceneTabdrightTop">
         <ul>
         <li v-for="(item,index) in userTripData" :key="index">
           <span class="sceneText"> {{item.text}}</span><span class="sceneValue">{{item.value}}</span>
         </li>
       </ul>
     </div>
     <div class="sceneTabdleftDown">
         <ul>
         <li v-for="(item,index) in buyCarData" :key="index">
           <span class="sceneText"> {{item.text}}</span><span class="sceneValue">{{item.value}}</span>
         </li>
       </ul>
     </div>
     <div class="sceneTabdrightDown">
         <ul>
         <li v-for="(item,index) in userInfoData" :key="index">
           <span class="sceneText"> {{item.text}}</span><span class="sceneValue">{{item.value}}</span>
         </li>
       </ul>
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
export default class SceneTab extends Vue {
  title: String = '用户画像标签';
  total: Object = {};
  carPreferData: Array<any> = [
    {
      text: '配置偏好',
      name: 'configurationPreference',
      value: '0%'

    },
       {
      text: '关注车系',
      name: 'modelsIsNotNull',
      value: '0%'

    },
       {
      text: '贷款概率',
      name: 'loan',
      value: '0%'

    },
       {
      text: '购车预算',
      name: 'budget',
      value: '0%'

    },
       {
      text: '换车增购',
      name: 'priorityChangeCarAndBuy',
      value: '0%'

    },
       {
      text: '关注竞品数量',
      name: 'modelNums',
      value: '0%'

    },
  ];
  userTripData: Array<any> = [
    {
      text: '最近试驾时间',
      name: 'lastTrailTime',
      value: '0%'

    },
       {
      text: '关注预定试驾总数',
      name: 'trailBookTll',
      value: '0%'

    },
       {
      text: '未成交',
      name: 'dealFlag',
      value: '0%'

    },
       {
      text: '试驾次数',
      name: 'trailAttendTtl',
      value: '0%'

    },
       {
      text: '到店次数',
      name: 'visitCount',
      value: '0%'

    },
       {
      text: '是否外呼',
      name: 'lastSis',
      value: '0%'
    },
  ];
  buyCarData: Array<any> = [
    {
      text: '高意向度',
      name: 'buyA',
      value: '0%'
    },
       {
      text: '中意向度',
      name: 'buyB',
      value: '0%'

    },
       {
      text: '低意向度',
      name: 'buyC',
      value: '0%'

    }
  ];
  userInfoData: Array<any> = [
    {
      text: '手机号',
      name: 'tel',
      value: '100%'

    },
       {
      text: '性别',
      name: 'sex',
      value: '0%'

    },
       {
      text: '城市',
      name: 'city',
      value: '0%'

    },
       {
      text: '年龄',
      name: 'age',
      value: '0%'

    },
       {
      text: '关注车型',
      name: 'models',
      value: '0%'

    },
       {
      text: '是否有车',
      name: 'haveCar',
      value: '0%'

    },
     {
      text: '是否到店',
      name: 'visit',
      value: '0%'

    }
  ];

  mounted() {
    this.getClue();
    
  }
  
 updatedData(data1: any, data2: any) {
    data1.forEach((items: any, indexs: any) => {
     Object.keys(data2).forEach((item: any, index: any) => {
            if (item === items.name) {
              items.value = Math.floor(data2[item] * 100) === Number(data2[item] * 100) ? data2[item] * 100 + '%' : (data2[item] * 100).toFixed(2) + '%';
            }
      });
      });
 }
  getClue() {
    $api.DashboardApi.getClue().then((res: any) => {
      this.total = {
        users: res.users,
        label: res.label
      };
      this.updatedData(this.carPreferData, res);
      this.updatedData(this.userTripData, res);
      this.updatedData(this.buyCarData, res);
      this.updatedData(this.userInfoData, res);
    });
  }
}
</script>

<style lang="scss" scoped>
.sceneTab-warp {
  width: 100%;
  height: 700px;
  .sceneTabd {
    padding: 40px 0 40px 60px;
    display: flex;
    background: url('../../assets/img/scrm-xsfq-scatter.png') no-repeat;
    background-size: 804px 486px;
    background-position: 636px 55px;
    width:100%;
    height:600px;
    position: relative;
    .sceneTabdtitle{
    color: #fff;
    font-size: 32px;
    width: 100%;
    height: 50px;
    text-align: center;
    margin-top: -30px;
    .usercolor{
      color:#3B9CFF;
    }
    }
    .sceneTabdleftTop{
      position: absolute;
      left: 240px;
      top: 60px;
      .sceneText{
           width: 165px;
        }
    }
    .sceneTabdrightTop{
      position: absolute;
      left: 1500px;
      top: 60px;
       
    }
    .sceneTabdleftDown{
      position: absolute;
      left: 285px;
      top: 400px;
       .sceneText{
           width: 110px;
        }
    }
    .sceneTabdrightDown{
      position: absolute;
      left: 1500px;
      top: 300px;
      .sceneText{
           width: 110px;
        }
    }
    ul{
      li::before{
        content: '';
        vertical-align: middle;
        margin-top: -15px;
        margin-right: 10px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255,255,255,0.4);
        display: inline-block;
      }
      li{
        .sceneText{
           color: white;
           font-size: 26px;
           margin-left: 10px;
           width: 210px;
           display: inline-block;
        }
         .sceneValue{
           color:rgba(255,255,255,1);
           font-size:26px;
           margin-left:50px;
        }
      }
    }
  }
}
</style>
