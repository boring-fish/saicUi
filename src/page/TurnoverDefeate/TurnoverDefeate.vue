/**
  * @description: 成交战败详情
  * @author: qian.wan
  * @date: 
  */
<template>
  <div class="turnoverdefeate-wrap">
    <div class="turnoverdefeate-header box-bg-border">
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
      <!-- 成交和战败选择 -->
      <div class="filter-wrap">
        <div 
        v-for="item in overviewTheme" 
         class="filter-button"
        :class="{'filter-button-active': item.name === activeTheme}"
        @click="hanndleThemeChange(item)"
        :key="item.name"> 
        <h3 class="overview-theme-name">{{item.name}}</h3>
        <div><span class="overview-theme-number">{{item.value? item.value : '——'}}</span>{{item.unit}}</div>
        <div>
          同比
            <span v-if="item.tb && item.name === '成交'" :class="(item.tb).startsWith('-') ? 'overview-theme-chain' : 'overview-theme-year'"> 
             <span class="iconfont iconxiajiang" v-if="(item.tb).startsWith('-')"></span>
             <span class="iconfont iconshangsheng" v-else></span>
             {{item.tb | negative}}
             </span>
            <span v-else-if="item.tb && item.name === '战败'" class="white"> 
             <span class="iconfont iconxiajiang" v-if="(item.tb).startsWith('-')"></span>
             <span class="iconfont iconshangsheng" v-else></span>
             {{item.tb | negative}}
             </span>
             <span class="margin" v-else>—</span>
          环比
            <span v-if="item.hb && item.name === '成交'" :class="(item.hb).startsWith('-') ? 'overview-theme-chain' : 'overview-theme-year'"> 
             <span class="iconfont iconxiajiang" v-if="(item.hb).startsWith('-')"></span>
             <span class="iconfont iconshangsheng" v-else></span>
             {{item.hb | negative}}
             </span>
              <span v-else-if="item.hb && item.name === '战败'" class="white"> 
             <span class="iconfont iconxiajiang" v-if="(item.hb).startsWith('-')"></span>
             <span class="iconfont iconshangsheng" v-else></span>
             {{item.hb | negative}}
             </span>
             <span class="margin" v-else>—</span>
        </div>
        <!-- <div><span v-if="item.finished">目标完成率</span><span class="overview-theme-rate">{{item.finished}}</span></div> -->
      </div>
     <!-- 其他概览 -->
      </div>
       <div v-for="item in overViewOther" :key="item.name" class="overview-other">
        <h5 class="overview-other-name">{{item.name}}</h5>
        <div v-if="item.cycle"><span class="overview-other-cycle">{{item.cycle}}</span>天</div>
        <div v-else class="overview-other-cycle">——</div>
        <div>同期比 
          <!-- <span class="overview-other-rate">{{item.rate? item.rate : '—'}}</span> -->
        <span v-if="item.rate" class="margin" :class="(item.rate).startsWith('-') ? 'overview-theme-year' : 'overview-theme-chain'"> 
             <span class="iconfont iconxiajiang" v-if="(item.rate).startsWith('-')"></span>
             <span class="iconfont iconshangsheng" v-else></span>
             {{item.rate | negative}}
             </span>
             <span class="margin" v-else>—</span>
          </div>
      </div>

      <!-- 月份选择器 -->
      <DatePicker
      @handleChangeDatePanel="handleChangeDatePanel"
      ></DatePicker>
    </div>
    <!-- 各地经销商列表量 -->
    <div class="turnoverdefeate-content">
      <div class="turnoverdefeate-list-wrap box-bg-border">
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
        <h3 class="block-title">各{{location}}所在地{{activeTheme}}量</h3>
        <ol class="list-ol">
          <li v-for="(item, index) in list" :key="index" class="list-li">
            <span class="list-order">{{index+1}}</span>
            <img src="../../assets/img/portrait.jpg"  class="list-portrait"/>
            <div>
              <h4 class="list-agency">{{item.rfsName}}</h4>
              <span class="list-volume">{{activeTheme === '成交' ? item.num : item.defeat}}</span>
              <!-- <span >目标完成率</span>
              <span 
                class="list-rate" 
                :class="{'list-rate-below': parseFloat(item.turnoverRate) < 80}">
                —
              </span> -->
            </div>
            
             </li>
        </ol>
        <!-- 升序和降序 -->
         <FilterButton 
         :filterArr="filterListArr" 
         :filterLabel="filterListLabel" 
         :buttonStyle="{width:'120px', height:'60px',}"
         class="list-filter-button"
         @on-filter-change = "onFilterChange"
         >
         </FilterButton>
      </div>
      <!-- 各获客渠道量 -->
      <div class="turnoverdefeate-channel-wrap box-bg-border">
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
        <h3 class="block-title">各获客渠道{{activeTheme}}量</h3>
       
        <FilterButton 
          :filterArr="filterChannelArr" 
          :filterLabel="filterChannelLabel"
          @on-filter-change = "onChannelFilterChange"
          class="channel-filter-button">
          </FilterButton>
         <ChannelBar 
            :data="channelData"
            :theme="activeTheme"
            :label="filterChannelLabel"
            id="channel-bar" 
            v-show="changeShowEcharts"
            >

            </ChannelBar>
      </div>
      <!-- 每日量 -->
      <div class="turnoverdefeate-daily-wrap box-bg-border">
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
        <h3 class="block-title" v-if="showdaysecharts">每日{{activeTheme}}量分布</h3>
         <DailyBar 
            id="daily-bar"
            :type="activeTheme"
            :dayArr="daysData"
            v-if="showdaysecharts"
             >
          </DailyBar>
          <img src="../../assets/img/expect.png" alt="" v-if="showdaysImg">
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue , Emit, Prop, Watch} from 'vue-property-decorator';
import { ChannelBar, DailyBar } from './index'; // 组件
import { FilterButton, DatePicker } from '@/components/index'; // 组件
import { calculation , numberFormat } from '@/utils/utils.ts';
import moment from 'moment';
import _ from 'lodash';



@Component({
  components: {
    ChannelBar,
    DailyBar,
    FilterButton,
    DatePicker,
  },
    filters: {
    negative: (value: any) => {
      if (value.startsWith('-')) {

      return value.split('-')[1];
      } else {
        return value;
      }
      
    }
  }
})
export default class TurnoverDefeate extends Vue {
  @Prop({
    required: false,
    default: ''
  }) brandName!: string;

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  @Prop({
    required: false,
    default: 101
  }) brandId!: number;

  showdaysecharts: boolean = true;
  showdaysImg: boolean = false; 
  activeTheme: string = '成交';
  location: string = '';
  activeType: string = 'delivery';
  activeOrder: string = 'up';
  timeMonth: string = moment().format( 'YYYYMM' );
  // timeMonth: string = '201405';
  changeShowEcharts: boolean = true;
  //每日数据
  daysData: any[] = [];
  overviewTheme: any[] = [{
    name: '成交',
    type: 'delivery',
    value: '',
    unit: '',
    tb: '',
    hb: ''
  }, {
    name: '战败',
    type: 'defeat',
    value: '',
    unit: '',
    tb: '',
    hb: ''
  }];
  overViewOther: object[] = [{
    name: '线上成交平均转化周期',
    cycle: '',
    rate: '',
  }, {
    name: '线下成交平均转化周期',
    cycle: '',
    rate: '',
  }];
  // list: object[] = [{
  //   img: '../../assets/img/portrait.jpg',
  //   area: '华中区',
  //   agency: '范景旺',
  //   turnover: 284700,
  //   turnoverRate: '109.17%'
  // }, {
  //   img: '../../assets/img/portrait.jpg',
  //   area: '华中区',
  //   agency: '范景旺',
  //   turnover: 284700,
  //   turnoverRate: '109.17%'
  // }, {
  //   img: '../../assets/img/portrait.jpg',
  //   area: '华中区',
  //   agency: '范景旺',
  //   turnover: 284700,
  //   turnoverRate: '109.17%'
  // }, {
  //   img: '../../assets/img/portrait.jpg',
  //   area: '华中区',
  //   agency: '范景旺',
  //   turnover: 284700,
  //   turnoverRate: '79.21%'
  // }, {
  //   img: '../../assets/img/portrait.jpg',
  //   area: '华中区',
  //   agency: '范景旺',
  //   turnover: 284700,
  //   turnoverRate: '79.17%'
  // }, {
  //   img: '../../assets/img/portrait.jpg',
  //   area: '华中区',
  //   agency: '范景旺',
  //   turnover: 284700,
  //   turnoverRate: '75.17%'
  // }, {
  //   img:  '../../assets/img/portrait.jpg',
  //   area: '华中区',
  //   agency: '范景旺',
  //   turnover: 284700,
  //   turnoverRate: '71.17%'
  // }, {
  //   img: '../../assets/img/portrait.jpg',
  //   area: '华中区',
  //   agency: '范景旺',
  //   turnover: 284700,
  //   turnoverRate: '69.17%'
  // }, ];
  list: any[] = [];
  filterListArr: string[] = ['升序', '降序'];
  filterListLabel: string = '升序';
  filterChannelArr: string[] = ['同比', '环比'];
  filterChannelLabel: string = '同比';
  channelData: object = {};

  @Watch('brandName')
  brandNameChange() {
      this.onRuleChange();
  }

  @Watch('currentArea') 
  currentAreaChange() {
    if (Object.keys(this.currentArea)[0] === 'all') {
        this.location = '大区';
    } else if (Object.keys(this.currentArea)[0] === 'rfsCode') {
        this.location = 'MAC';
    } else {
        this.location = '经销商';
    }
    this.onRuleChange();
    console.log(this.currentArea , 'code');
  }

  // @Watch('filterListLabel')
  // sortNameChange() {
  // }
 created() {
    // console.log(moment().format('YYYYMMDD')); //当前时间
    // console.log(moment().startOf('month').format('YYYYMMDD')); //当前月份的第一天
    // console.log(moment().subtract(1, 'months').format('YYYYMM')); // 当前月份的上一个月份
    if (moment().format('YYYYMMDD') === moment().startOf('month').format('YYYYMMDD')) {
      this.timeMonth = moment().subtract(1, 'months').format('YYYYMM');
    } else {
      this.timeMonth = moment().format( 'YYYYMM' );
    }
    this.$emit('onMonthChange', this.timeMonth);
  }
mounted() {
  // console.log(this.timeMonth);
  // console.log(this.brandId);
    if (Object.keys(this.currentArea)[0] === 'all') {
        this.location = '大区';
    } else if (Object.keys(this.currentArea)[0] === 'rfsCode') {
        this.location = 'MAC';
    } else {
        this.location = '经销商';
    }
  this.volumeData();
  this.getdefeatedData();
  this.getchannelData();
  this.getsalesData();
  this.geteverydayData();
  }
  //切换成交战败
  hanndleThemeChange(theme: any): void {
    this.activeTheme = theme.name;
    this.activeType = theme.type;
    if (this.activeType === 'delivery') {
        this.showdaysecharts = true;
        this.showdaysImg = false; 
    } else {
        this.showdaysecharts = false;
        this.showdaysImg = true; 
    }
    this.getchannelData();
    this.getsalesData();
    this.geteverydayData();
  }

  //切换车的类型
 onRuleChange() {
  //  console.log(1111);
  this.volumeData();
  this.getdefeatedData();
  this.getchannelData();
  this.getsalesData();
  this.geteverydayData();
 }
 //切换月份
  handleChangeDatePanel(value: any) {
    this.timeMonth = value;
    // console.log( this.timeMonth);
    this.volumeData();
    this.getdefeatedData();
    this.getchannelData();
    this.getsalesData();
    this.geteverydayData();
    this.$emit('onMonthChange', value);
  }

//升序,降序切换
onFilterChange(value: any) {
  // console.log(value);
  this.activeOrder = value === '升序' ? 'up' : 'down';
    this.getchannelData();
}

//同环比筛选
onChannelFilterChange(label: string) {
  this.filterChannelLabel = label;
}
  //成交api数据
  volumeData() {
    let params = {
      brandId: this.brandId,
      time: this.timeMonth
    };

    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
      $api.TurnoverDefeateApi.AlldealData(params).then((res: any) => {
          // console.log(res);
          let oldVolume = res.lsatYear[0];
          let nowVolume = res.now[0];
          let lastVolume = res.last[0];
      let publics = this.changeVolumeData(nowVolume , oldVolume , lastVolume);
        this.$set(this.overviewTheme , 0 , publics[0]);
        this.$set(this.overViewOther , 0 , publics[1]);
        this.$set(this.overViewOther , 1 , publics[2]);
      })
      .catch(e => {
           this.overviewTheme = [{
               name: '成交',
               type: 'delivery',
               value: '',
               unit: '',
               tb: '',
               hb: ''
             }, {
               name: '战败',
               type: 'defeat',
               value: '',
               unit: '',
               tb: '',
               hb: ''
            }];
          this.overViewOther = [{
              name: '线上成交平均转化周期',
              cycle: '',
              rate: '',
            }, {
              name: '线下成交平均转化周期',
              cycle: '',
              rate: '',
          }];
          
      });
  }

  //战败api数据
  getdefeatedData() {
        let params = {
          brandId: this.brandId,
          time: this.timeMonth,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.TurnoverDefeateApi.defeated(params).then((res: any) => {
        // console.log(res);
        let oldDefeated = res.lsatYear[0];
        let nowDefeated = res.now[0];
        let lastDefeated = res.last[0];
        let publics = this.changDefeatedData(nowDefeated , oldDefeated , lastDefeated);
          this.$set(this.overviewTheme , 1, publics);

    })
    .catch(e => {
           this.overviewTheme = [{
               name: '成交',
               type: 'delivery',
               value: '',
               unit: '',
               tb: '',
               hb: ''
             }, {
               name: '战败',
               type: 'defeat',
               value: '',
               unit: '',
               tb: '',
               hb: ''
            }];
    });
  }


 
  //渠道api数据
  getsalesData() {
  let params = {
    brandId: this.brandId,
    time: this.timeMonth,
    type: this.activeType,
    order: this.activeOrder,
    group: 'sourcetype'
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
  this.changeShowEcharts = false;
  $api.TurnoverDefeateApi.channelData(params).then((res: any) => {
  this.changeShowEcharts = true;

    let newRes: any = {
      last: [],
      lsatYear: [],
      now: []
    };
    newRes.now =  _.remove(res.now , (item: any) => {
        return item.sourceType === '外拓获客' || item.sourceType === '自然获客' || item.sourceType === '垂媒' || item.sourceType === '厂方分配';
      });
    newRes.last = _.remove(res.last , (item: any) => {
        return item.sourceType === '外拓获客' || item.sourceType === '自然获客' || item.sourceType === '垂媒' || item.sourceType === '厂方分配';
      });
    newRes.lsatYear =  _.remove(res.lsatYear , (item: any) => {
        return item.sourceType === '外拓获客' || item.sourceType === '自然获客' || item.sourceType === '垂媒' || item.sourceType === '厂方分配';
      });
    console.log(newRes , 3333);
    this.channelData = newRes;
  } )
  .catch(e => {

      this.channelData = {};
  });

  }

 //各地经销api数据
  getchannelData() {
  let params = {
    brandId: this.brandId,
    time: this.timeMonth,
    type: this.activeType,
    order: this.activeOrder,
    group: 'rfscode'
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }

    // return new Promise((res , rej) => {
    //    $api.TurnoverDefeateApi.channelData(params).then((data) => {
    //      res(data);
    //    }).catch(() => {
    //      rej([]);
    //    })
    // })

  $api.TurnoverDefeateApi.channelData(params).then((res: any) => {
    // console.log(res.now , 22222 );
    console.log($commonData.areaData.getAreaList() , '名称');
    // console.log(Object.keys(this.currentArea)[0] , 22222);
     this.list = [];
    if (Object.keys(this.currentArea)[0] === 'all') {
    res.now.forEach((element: any) => {
       $commonData.areaData.getAreaList().forEach((item: any) => {
        if (element.rfsCode === item.rfsCode) {
            element.rfsName = item.rfsName;
            // console.log(11111);
        }
      });
    });
    this.list = res.now;
    } else if (Object.keys(this.currentArea)[0] === 'rfsCode') {
      // console.log('rfsCode');
      res.now.forEach((element: any) => {
       $commonData.areaData.getAreaList().forEach((item: any) => {
        if (element.macCode === item.macCode) {
            element.rfsName = item.macName;
        }
      });
    });
    this.list = res.now;
    } else {
      // console.log('macCode');
      let dealParams = {};
          dealParams = Object.assign(dealParams, this.currentArea);
      $api.DashboardApi.dealersData(dealParams).then((info: any) => {
        console.log(info , '经销商');
        // console.log(res.now);
       res.now.forEach((element: any) => {
       info.forEach((item: any) => {
        if (element.dealerCode === item.dealerCode) {
            element.rfsName = item.dealerName;
        }
      });
      });
    this.list = res.now;

    });
        // console.log(dealParams , 'lalala');
    }
  } )
  .catch(e => {

    this.list = [];

  });
  }

  //每日api数据
  geteverydayData() {
      let params = {
    brandId: this.brandId,
    time: this.timeMonth,
    type: 'delivery'
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.TurnoverDefeateApi.everydayData(params).then((res) => {
      // console.log(res, '每日');
      let newArr: any = [];
      if (res.length !== 0) {
           res.forEach((item: any) => {
             newArr.push({
               num: item.num,
               dayWeek: item.dayWeek
             });
           });
           this.daysData = newArr;
        console.log(this.daysData);
      } else {
        this.daysData = [];
      }
    })
    .catch(e => {
        
        this.daysData = [];
    });
  }

  //成交数据处理
    changeVolumeData(now: any , old: any , last: any) {
      let publics = [
        {
            name: '成交',
            type: 'delivery',
            value: '',
            unit: '',
            tb: '',
            hb: ''
            // average: '',
            // offlineAverage: ''
        },
        {
          name: '线上成交平均转化周期',
          cycle: '',
          rate: '',
        },
        {
            name: '线下成交平均转化周期',
            cycle: '',
            rate: '',
        }
      ];
    if (!now) {
      return publics;
    } else {
      let params = numberFormat(now.num);
      publics[0].value = params.value;
      publics[0].unit = params.unit;
      let average: any = now.onlineCycle / now.custNum;
          average = average.toFixed(2);
      let offlineAverage: any = now.offlineCycle / now.custNum;
          offlineAverage = offlineAverage.toFixed(2);
     publics[1].cycle = average;
     publics[2].cycle = offlineAverage;
    }

    if (!old) {
      publics[0].tb = '';
      publics[1].rate = '';
      publics[2].rate = '';
    } else {
      publics[0].tb = calculation(now.num, old.num);
      publics[1].rate = calculation(now.onlineCycle , old.onlineCycle);
      publics[2].rate = calculation(now.offlineCycle , old.offlineCycle);
    } 

    if (!last) {
       publics[0].hb = '';
    } else {
        publics[0].hb = calculation(now.num, last.num);
    }

    return publics;
  }

  //战败数据处理
  changDefeatedData (now: any , old: any , last: any) {
        let publics = {
        name: '战败',
        type: 'defeat',
        value: '',
        unit: '',
        tb: '',
        hb: ''
    };
    if (!now) {
      return publics;
    } else {
      let params = numberFormat(now.defeat);
      publics.value = params.value;
      publics.unit = params.unit;
    }

    if (!old) {
      publics.tb = '';
    } else {
      publics.tb = calculation(now.defeat, old.defeat);
    } 

    if (!last) {
       publics.hb = '';
    } else {
        publics.hb = calculation(now.defeat, last.defeat);
    }

    return publics;
  }

}
</script>

<style lang="scss">
.turnoverdefeate-wrap{
   width: 3356px;
   color: rgba(255,255,255,0.6);
   font-size: 24px;
   .iconfont{
   font-size: 24px;
   }
  .turnoverdefeate-header{
    position: relative;
    display: flex;
    width: 100%;
    height: 480px;
    padding: 100px 0 0 400px;
    margin-bottom:20px;
    line-height: 200%;
    background-color: $box-bg-primary;
    .overview-theme-name{
      font-size: 32px;
      font-weight: normal;
      color: #fff;
    }
    .overview-theme-number{
      display: inline-block;
      margin-right: 12px;
      color: #FFFFFF;
      font-weight:bold;
      font-size: 48px;
     
    }
    .overview-theme-year{
      display: inline-block;
      margin-right: 54px;
      color: #35E967;
    } 
    .overview-theme-chain{
      color: #CD080A;
    }
    .white{
      color: #fff;
    }
     .overview-theme-rate{
      display: inline-block;
      margin-left: 16px;
      color: #ffffff;
    } 
   
    .filter-wrap{
            border-radius: 200px;
            overflow: hidden;
            border:2px solid rgba(58,66,99,1);
            height: 300px;
            .filter-button{
              display:inline-block;
              width: 800px;
              height: 300px;
              padding: 54px 0 0 200px;
              font-size: 28px;
              font-weight: normal;
              background-color: rgba(9,12,21,1);
             
              cursor: pointer;
              .iconfont{
                font-size: 24px;
                margin: 0 12px 0 16px;
              }
            }
            .filter-button-active {
             background:rgba(30,36,65,1);
            }
            .filter-button-leftRadius {
             border-radius:200px 0px 0px 200px;
            }
            .filter-button-rightRadius {
             border-radius:0px 200px 200px 0px;
            }
          }
  }
  .overview-other{
    margin-left: 120px;
    padding-top: 56px;
    width: 326px;
    .overview-other-name{
      color: #FFFFFF;
      font-size: 32px;
      line-height: 56px;
      font-weight:400;
    }
    .overview-other-cycle{
      color: #FFFFFF;
      font-size: 68px;
      font-weight:bold;
      line-height: 108px;
      margin-right: 12px;
    }
    .overview-other-rate {
      display: inline-block;
      margin-left: 12px;
      color: #FFFFFF;
    }
  }
  .turnoverdefeate-content{
    display: flex;
    width: 100%;
    height: 1172px;
   .block-title{
      font-weight: normal;
      font-size: 36px;
      color: #fff;
      height: 90px;
      padding: 0 40px;
      line-height: 90px;
      border-bottom: 2px solid #1E2237;
    }
    .turnoverdefeate-list-wrap{
      position: relative;
      width:740px;
      height:100%;
      margin-right: 20px;
      background-color: $box-bg-primary;
      .list-filter-button{
        position: absolute;
        top: 16px;
        right: 40px;
      }
      .list-ol{
        padding: 0 40px 0 60px;
        height: 1062px;
        overflow: auto;
        .list-li{
          display: flex;
          align-items: center;
          margin: 40px 0;
        }
      }
      .list-order::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          background: rgba(35,107,180,1);
          transform: skewX(-9.23deg);
          }
      .list-order{
          width: 42px;
          height: 38px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          text-decoration: none;
          z-index: 998;
         
      }
      .list-portrait{
        display: inline-block;
        width: 88px;
        height: 88px;
        margin: 0 32px 0 40px;
        border-radius: 50%;
      }
      .list-agency{
        color: #fff;
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 14px;
      }
      .list-volume{
        display: inline-block;
        width: 168px;
      }
      .list-rate{
        display: inline-block;
        margin-left: 20px;
        color:#35E967;
      }
      .list-rate-below{
        color: #E80404;
      }
    }
     .turnoverdefeate-channel-wrap{
        position: relative;
        width:1676px;
        height:100%;
        margin-right: 20px;
        background-color: $box-bg-primary;
        .channel-filter-button{
          position: absolute;
          top: 16px;
          right: 48px;
        }
     }
     .turnoverdefeate-daily-wrap{
      width:900px;
      height:100%;
      background-color: $box-bg-primary;
      position: relative;

        img{
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
    }
  }
  .margin{
    margin-left: 16px;
    margin-right: 54px;
  }
}

::-webkit-scrollbar {
	  width: 15px;
} 
::-webkit-scrollbar-track {
      background-color: #090c15;
} /* 滚动条的滑轨背景颜色 */

::-webkit-scrollbar-thumb {
      background-color: #48558B; 
} /* 滑块颜色 */
</style>
