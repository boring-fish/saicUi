<template>
  <div class="sceneAlgorithmModel-wrap">
    <SceneHeader :title="title"></SceneHeader>
    <div class="sceneAlgorithmModelClient">
       <div class="prefers">
         <span class="sceneTextTitle">用户偏好top3</span>
           <ul class="sceneTextTitlePrefers">
            <li v-for="(item,index) in prefers" :key="index">
              <span class="sceneText"> {{item.text}}</span><span class="sceneValue">{{item.value}}</span>
            </li>
           </ul>
       </div>
       <div class="advice">
         <span class="sceneTextTitle">购车意向</span>
          <ul class="sceneTextTitlePrefers">
            <li >
              <span class=" sceneTextCar">意向车型:</span><span class="sceneValue">{{adviceData.carType}}</span>
            </li>
             <li >
              <span class=" sceneTextCar">意向等级:</span>
              <span>
                <span class="sceneTextCar">高:</span><span class="sceneValue">{{adviceData.rank.top}}</span>
                <span class="sceneTextCar">中:</span><span class="sceneValue">{{adviceData.rank.middle}}</span>
              </span>
              <p class="adviceRand">
                <span class="sceneTextCar">低:</span><span class="sceneValue">{{adviceData.rank.down}}</span>
                <!-- <span class="sceneText">极低:</span><span class="sceneValue">{{adviceData.rank.relDown}}</span> -->
              </p>
            </li>
           </ul>
       </div>
       <div class="status">
          <span class="sceneTextTitle">购车阶段</span>
           <ul class="sceneTextTitlePrefers">
            <li v-for="(item,index) in statusData" :key="index">
              <span class="sceneText sceneStatus"> {{item.text}}</span><span class="sceneValue">{{item.value}}</span>
            </li>
           </ul>
       </div>


    </div>
    <div class="sceneAlgorithmModelTab"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import SceneHeader from './SceneHeader.vue';

@Component({
  components: {
    SceneHeader
  }
})
export default class SceneAlgorithmModel extends Vue {
 title: String = '用户画像聚类';
 prefers: any = [];
 adviceData: any = {
   carType: '',
   rank: {}
 };
 statusData: any = [];
  mounted() {
    this.getlabelData();
  }

  getlabelData() {
    $api.DashboardApi.getlabelData().then((res: any) => {
      let Preference: any = [];
      let intentionTop: any = [];
      let intentionBottom: any = [];
      let status: any = [];
      res.forEach((item: any) => {
          if (item.falg === 1) {
            Preference.push({
              text: item.name,
              value: (item.valueRate * 100).toFixed(2) + '%'
            });
            
          } else if (item.falg === 2) {
              intentionTop.push(item.name);
          } else if (item.falg === 3) {
              intentionBottom.push({
              text: item.name,
              value: (item.valueRate * 100).toFixed(2) + '%'
            });
          } else if (item.falg === 4) {
             status.push({
              text:  item.name ,
              value: item.valueRate
            });
          }
      });
      let buyA = '', buyB = 0, buyC = '';
         status.forEach((statusitem: any) => {
                 if (statusitem.text === '10') {
              buyA = (statusitem.value * 100).toFixed(2) + '%';
            } else if (statusitem.text === '90') {
               buyC = (statusitem.value * 100).toFixed(2) + '%';
            } else {
              buyB += Number(statusitem.value); 
            }
            });
          this.statusData = [
              {
                text: '三个月以上购车',
                value: buyA
              },
               {
                text: '一至三个月内购车',
                value: (buyB * 100).toFixed(2) + '%'
              },
               {
                text: '一个月以内购车',
                value: buyC
              }
            ];
             Preference.sort(function(a: any, b: any) {
            return Number(b.value.replace('%', '')) - Number(a.value.replace('%', ''));
          });
          this.prefers = Preference;
          this.adviceData.carType = intentionTop.toString();
           intentionBottom.forEach((item: any, index: any) => {
             item.text === '高' ? this.adviceData.rank.top = item.value : item.text === '中' ? this.adviceData.rank.middle = item.value : item.text === '低' ? this.adviceData.rank.down = item.value : this.adviceData.rank.relDown = item.value;
           });
    });
  }
}
</script>

<style lang="scss">
.sceneAlgorithmModel-wrap {
  width: 1048px;
  height: 100%;
  border-right: 2px solid rgba(58,66,99,1);

  .sceneAlgorithmModelClient {
    width: 100%;
    height: 550px;
    padding: 20px 0;
    background: url('../../assets/img/users@2x.png') no-repeat;
    background-position: 55px 45px;
    border-bottom: 2px solid rgba(58,66,99,1);
    position: relative;
    .sceneTextTitle{
     color: white;
    font-size: 28px;
    margin-left: 46px;
    margin-top: -20px;
    display: inline-block;

    }
     .sceneTextTitlePrefers{
        margin: 10px 0 0 55px;
    }
    .prefers{
      position: absolute;
      left:10px;
      top:20px;
    }
    .advice{
        position: absolute;
        left:10px;
        top:356px;
    .adviceRand{
          margin-left:130px;
     }
    }
    .status{
       position: absolute;
       left: 640px;
       top: 160px;
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
        color: rgba(255,255,255,0.4);
        font-size: 24px;
        .sceneText{
          margin-left: 5px;
          // width:90px;
          // display: inline-block;
        }
        .sceneTextCar{
             margin-left: 5px;
          // width:90px;
          // display: inline-block;
        }
        .sceneStatus{
           width:194px;
          display: inline-block;
        }
         .sceneValue{
           margin-left:5px;
        }
      }
    }
  }
  .sceneAlgorithmModelTab {
    width: 100%;
    height: 550px;
    padding: 40px 0;
    background: url('../../assets/img/expect.png') no-repeat;
    background-position: 55px 45px;
    background-size: 85% 450px;
  }
}
</style>

