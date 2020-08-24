/**
  * @description: 侧边栏-公共筛选
  * @author: qian.wan
  * @date: 
  */
<template>
  <div class="sidenav-wrap">
    <h3 class="sidenav-title">营销漏斗总览</h3>

    <!-- 品牌筛选 -->
    <el-radio-group  
      v-model="brand"  
      fill="$color-font-primary"
      class ="sidenav-filter-wrap"
      v-show="$route.name !== 'dashboard'"
    >
      <template
        v-for="(value, index) in carType"
      >
        <el-radio 
            v-if="value.admission"
            :key="index"
            :label="value.brandName" 
            @change="handleChange(value)"
            :disabled="value.brandName === 'R标'"
            class = "sidenav-filter-item"> 
            <span class="iconfont iconche"></span>
            <span>{{value.brandName}}</span>
        </el-radio>
      </template>

    </el-radio-group>
    <el-popover
      placement="right"
      width="480"
      trigger="click"
      :append-to-body="false"
      @show="onCarPanelShow"
      @hide="onCarPanelHide"
      class="car-line-popover"
       v-if="$route.name === 'dashboard'"
    >
      <div class="car-series-filter">
         <CarSeries
          @onBrandChange="onBrandChange"
          @onSeriesChange="onSeriesChange"
          :brandName="brand"
         ></CarSeries>
      </div>
      <div slot="reference" class="car-series-btn" :class="carPanelShow ? 'active': ''">
        <i class="iconfont iconche"></i>
        <span>品牌</span>
        <i class="el-icon-caret-right car-right"></i>
      </div>
    </el-popover>
    <!-- 分界线 -->
    <hr  class ="sidenav-filter-boundary" />

    <el-popover
      placement="right"
      width="540"
      trigger="click"
      :append-to-body="false"
      @show="onAreaPanelShow"
      @hide="onAreaPanelHide"
    >
      <div class="area-filter">
        <area-filter
          :currentAreaInIndex='currentArea'
          :checkedAreaInIndex='checkedArea'
          :area='area'
          @onAreaChange="onAreaChange" 
          @onAreaRadioChange="onAreaRadioChange"
        ></area-filter>
      </div>
      <div slot="reference" class="area-btn" :class="areaPanelShow ? 'active': ''">
        <i class="iconfont iconzhongguoditu"></i>
        <span>选择地区</span>
        <i class="el-icon-caret-right"></i>
      </div>
    </el-popover>
<!-- 
    <div class="checked-area">
      <span 
        v-for="(value, index) in checkedAreaCode"
        :key="index"
      >
        {{ value }}
      </span>
    </div> -->

    <hr  class ="sidenav-filter-boundary" v-show="$route.fullPath.indexOf('conversion') === -1" />
    <!-- 时间筛选 -->
    <div class ="sidenav-filter-wrap" v-show="$route.fullPath.indexOf('conversion') === -1" >
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
    <div v-show="$route.name === 'dashboard'" class="jump" @click="jump"><h3>当日实时</h3> <i class="el-icon-arrow-right el-icon--right"></i></div>
    <div v-show="$route.name === 'dashboard'" class="jump" @click="jumpEarly"><h3>产销分析洞察</h3> <i class="el-icon-arrow-right el-icon--right"></i></div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import AreaFilter from '../AreaFilter/AreaFilter.vue'; // 组件
import CarSeries from '../CarSeries/CarSeries.vue'; 
interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}
@Component({
  components: {
    AreaFilter,
    CarSeries
  }
})

export default class SideNav extends Vue {
  // prop
  @Prop({
    required: false,
    default: () => []
  }) carType!: Array<any>;
  @Prop({
    required: false,
    default: () => []
  }) area?: Array<any>;

  @Prop({
    required: false,
    default: () => []
  }) timeRange!: Array<any>;

  @Prop({
    required: false,
    default: () => {}
  }) filterTime!: TIMERANGE;

  @Prop({
    required: false,
    default: '名爵'
  }) filterBrandName!: string;
   
  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  @Prop({
    required: false,
    default: () => []
  }) checkedArea!: string[];
  
  areaPanelShow: boolean = false;
  carPanelShow: boolean = false;
  brand: any = $permission.getDefaultBrandName();
  time: string = '当月';
  checkedAreaCode: string[] = [];
  popperOptions = {
    boundariesElement: 'body',
    gpuAcceleration: true,
    positionFixed: true,
    preventOverflow: true
  };

  @Watch('filterTime')
  onFilterTimeChange() {
    this.time = this.filterTime.type;
  }
  
  @Watch('filterBrandName')
  onFilterBrandNameChange() {
    this.brand = this.filterBrandName;
    // console.log(this.brand);
    
  }

  onAreaChange(type: string, value: any[]) {
    // console.log(type, value);
    this.checkedAreaCode = value;
    this.$emit('onRuleChange', type, value);
  }

  onBrandChange(value: any) {
    // console.log(value, 'value');
    this.brand = value.brandName;
    this.$emit('onRuleChange', 'brand', value);
  }

  onSeriesChange(val: any, car: any) {
    this.$emit('onRuleChange', 'series', val, car);
  }

  handleChange(value: string): void {
    // this.$emit('onRuleChange', 'brand', value);
    if ( this.brand !== 'R标' ) {
       this.$emit('onRuleChange', 'brand', value);  
    }
  }

  timeRangeChange(value: string): void {
    this.$emit('onRuleChange', 'time', value);
  }
  
  onAreaRadioChange(value: any) {
    this.$emit('onAreaRadioChange', value);
  }

  onAreaPanelShow() {
    this.areaPanelShow = true;
  }

  onAreaPanelHide() {
    this.areaPanelShow = false;
  }

  onCarPanelShow() {
    this.carPanelShow = true;
  }

  onCarPanelHide() {
    this.carPanelShow = false;
  }
  jump() {
    if (this.brand === '名爵') {
      window.open('https://finereport-pv.saicmotor.com/WebReport/decision/view/form?viewlet=%25E6%25BD%259C%25E5%25AE%25A2%25E7%25AE%25A1%25E7%2590%2586%252F%25E4%25BB%258A%25E6%2597%25A5%25E5%2590%2584%25E5%25A4%25A7%25E5%258C%25BA%25E8%25B7%259F%25E8%25BF%259B%25E6%2598%258E%25E7%25BB%2586_MG.frm&ref_t=design&ref_c=a5064e32-b124-4dbb-a55e-a24529dff576');
    } else if (this.brand === '荣威') {
      window.open('https://finereport-pv.saicmotor.com/WebReport/decision/view/form?viewlet=%25E6%25BD%259C%25E5%25AE%25A2%25E7%25AE%25A1%25E7%2590%2586%252F%25E4%25BB%258A%25E6%2597%25A5%25E5%2590%2584%25E5%25A4%25A7%25E5%258C%25BA%25E8%25B7%259F%25E8%25BF%259B%25E6%2598%258E%25E7%25BB%2586_%25E8%258D%25A3%25E5%25A8%2581.frm&ref_t=design&ref_c=a5064e32-b124-4dbb-a55e-a24529dff576');
    }
    
  }
  jumpEarly() {
    if (this.brand === '荣威') {
      window.open('https://finereport-pv.saicmotor.com/WebReport/decision/view/form?viewlet=%25E4%25BA%25A7%25E9%2594%2580%25E9%25A2%2584%25E6%25B5%258B%25E9%25A1%25B9%25E7%259B%25AE%252F%25E4%25BA%25A7%25E9%2594%2580%25E6%2599%25BA%25E8%2583%25BD%25E5%2586%25B3%25E7%25AD%2596%25E7%259C%258B%25E6%259D%25BF.frm&ref_t=design&ref_c=05933197-9328-491a-b908-fb4a84584e77&loginName=baf56627478ec76a');
    } else if (this.brand === '名爵') {
      window.open(' https://finereport-pv.saicmotor.com/WebReport/decision/view/form?viewlet=%25E4%25BA%25A7%25E9%2594%2580%25E9%25A2%2584%25E6%25B5%258B%25E9%25A1%25B9%25E7%259B%25AE%252F%25E4%25BA%25A7%25E9%2594%2580%25E6%2599%25BA%25E8%2583%25BD%25E5%2586%25B3%25E7%25AD%2596%25E7%259C%258B%25E6%259D%25BF.frm&ref_t=design&ref_c=05933197-9328-491a-b908-fb4a84584e77&loginName=e4aaf9573aa5dff9');
    }
    
  }
  created() {
    
  }

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
  margin: 34px 0 /* 34/100 */;
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
  // color: rgba(255, 255, 255, 0.6);
  color: #fff !important;
  font-size: 36px !important;
  // font-weight: 100;
  padding-left: 36px;
  padding-right: 52px;
  cursor:pointer;
  h3{
    //  margin-right: 240px;
     font-size: 36px;
     color: #fff;
     display: inline-block;
  }
    // span{
    //   margin-right: 240px;
    // }
    .el-icon--right {
    margin-left: -42px;
    float: right;
}
}
}



</style>

