
<template>
  <div class="sidenav-wrap">
    <h3 class="sidenav-title">公共筛选</h3>
    <!-- 时间筛选 -->
    <div class ="sidenav-filter-wrap"  >
      <el-radio 
          v-for="(value, index) in timeRange"
          :key="index"
          v-model="time" 
          :label="value.type" 
          @change="timeRangeChange(value)"
          class = "sidenav-filter-item"> 
          <span class="iconfont iconshijian-tianchong"></span>
          {{value.type}}
      </el-radio>
    </div>
     <!-- <div  class="jump" @click="jumpEarly"><span>产销预测</span> <i class="el-icon-arrow-right el-icon--right"></i></div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}
@Component({})

export default class SceneSideNav extends Vue {
  // // prop
  // @Prop({
  //   required: false,
  //   default: () => []
  // }) carType!: Array<any>;
  // @Prop({
  //   required: false,
  //   default: () => []
  // }) area?: Array<any>;
 @Prop({
    required: false,
    default: 101,
  })
  brandId!: any;
  @Prop({
    required: false,
    default: () => []
  }) timeRange!: Array<any>;

  // @Prop({
  //   required: false,
  //   default: () => {}
  // }) filterTime!: TIMERANGE;

  // @Prop({
  //   required: false,
  //   default: '名爵'
  // }) filterBrandName!: string;
   
  // @Prop({
  //   required: true,
  //   default: {
  //     all: 'all'
  //   }
  // })
  // currentArea!: object;

  // @Prop({
  //   required: false,
  //   default: () => []
  // }) checkedArea!: string[];
  
  time: string = '当月';

 

  
  created() {
    
  }
// jumpEarly() {
//     if (this.brandId === '101') {
//       window.open('https://finereport-pv.saicmotor.com/WebReport/decision/view/form?viewlet=%25E4%25BA%25A7%25E9%2594%2580%25E9%25A2%2584%25E6%25B5%258B%25E9%25A1%25B9%25E7%259B%25AE%252F%25E4%25BA%25A7%25E9%2594%2580%25E6%2599%25BA%25E8%2583%25BD%25E5%2586%25B3%25E7%25AD%2596%25E7%259C%258B%25E6%259D%25BF.frm&ref_t=design&ref_c=05933197-9328-491a-b908-fb4a84584e77&loginName=baf56627478ec76a');
//     } else if (this.brandId === '121') {
//       window.open(' https://finereport-pv.saicmotor.com/WebReport/decision/view/form?viewlet=%25E4%25BA%25A7%25E9%2594%2580%25E9%25A2%2584%25E6%25B5%258B%25E9%25A1%25B9%25E7%259B%25AE%252F%25E4%25BA%25A7%25E9%2594%2580%25E6%2599%25BA%25E8%2583%25BD%25E5%2586%25B3%25E7%25AD%2596%25E7%259C%258B%25E6%259D%25BF.frm&ref_t=design&ref_c=05933197-9328-491a-b908-fb4a84584e77&loginName=e4aaf9573aa5dff9');
//     }
    
//   }
  mounted() {
    //
  }
}
</script>

<style lang="scss">
.sidenav-wrap{
  width: 480px;
  font-family: 'PingFangSC-Medium';
  height: 100%;
  border-radius:16px;
  background-color: $box-bg-primary;
.sidenav-title{
  font-size: 36px /* 36/100 */;
  padding: 30px /* 20/100 */ 40px /* 36/100 */ 20px;
  color: #fff;
  border-bottom: 2px solid #1E2237;
  margin-bottom: 17px /* 17/100 */;
}
.checked-area{
  padding: 0 38px;
  display: flex;
  flex-wrap: wrap;
  span{
    color:rgba(255,255,255,0.4);
    font-size: 24px;
    padding: 0 12px;
    margin-right: 12px;
    margin-bottom: 12px;
    background:rgba(18,22,38,1);
    border-radius:8px;
    border:2px solid rgba(58,66,99,1);
  }
}
.el-popover{
  padding: 0;
  top: 804px !important;
  left: 535px !important;
  border: 0;
  box-shadow:0px 8px 24px 0px rgba(0,0,0,0.5);
  border-radius:16px;
  background: $box-bg-primary;
  .popper__arrow{
    display: none;
  }
}
.el-popover,.car-line-popover{
  top: 504px !important;
}
.area-btn:focus, .car-series-btn{
  outline: none;
}
.area-btn, .car-series-btn{
  font-size: 28px;
  color:rgba(255,255,255,0.4);
  margin-bottom: 40px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  i{
    font-size: 40px;
  }
  .iconzhongguoditu,.iconche{
    margin: 0 26px 0 36px;
  }
  .el-icon-caret-right{
    margin-left: 185px;
  }
  .car-right{
    margin-left: 243px;
  }
}
.active{
  color: #236BB4 !important;
  border: 0;
}
.sidenav-filter-wrap{
  display: flex;
  flex-direction: column;
}
.sidenav-filter-item {
  height:40px /* 40/100 */;
  line-height: 40px !important/* 40/100 */;
  margin: 34px 0 34px -10px;
  .el-radio{
    font-weight: 100;
  }
  .el-radio__label {
    font-weight: 100;
    color: rgba(255,255,255,0.6);
    font-size: 28px /* 28/100 */
  }
  .el-radio__inner {
    width: 24px /* 24/100 */;
    height:24px /* 24/100 */;
    border: 2px /* 2/100 */ solid rgba(255,255,255,0.6);
    background-color:rgba(43,52,88,1);
  }
.el-radio__inner::after {
    width: 12px /* 24/100 */;
    height: 12px /* 24/100 */;
    background-color: $color-font-primary;
}
  .el-radio__input.is-checked+.el-radio__label {
    color: $color-font-primary;
}
  .el-radio__input.is-checked .el-radio__inner {
    border-color: $color-font-primary;
    background: #0A263C;
}
  .iconfont{
    font-size: 40px /* 28/100 */;
    margin-right: 20px /* 20/100 */;
  }
}
.sidenav-filter-item {
  .el-radio__input{
  position: relative;
  left: 410px /* 380/100 */;

}
}
.sidenav-filter-boundary{
  height: 2px /* 2/100 */;
  background-color: #1E2237;
  border: none;
  margin: 17px /* 34/100 */ 40px /* 40/100 */;

}
.jump{
  width: 100%;
  height: 40px;
  margin: 34px 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 28px;
  font-weight: 100;
  padding-left: 36px;
  cursor:pointer;
    span{
      margin-right: 240px;
    }
}
}



</style>

