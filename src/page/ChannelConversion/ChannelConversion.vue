/**
  * @description: 渠道转化详情
  * @author: qian.wan
  * @date: 
  */
<template>
  <div class="channelconversion-wrap box-bg-border">
    <!-- 渠道筛选 -->
      <div class="channel-filter-wrap"> 
      
        <FilterButton 
         :filterArr="tabsArr" 
         :filterLabel="filterLabel" 
         @on-filter-change = "hanldeChangeTabs"
         :wrapStyle="{top:0,left:0,width:'1094px'}"
        >
        </FilterButton>
      </div>
       
    <!-- 月份筛选 -->
      <DatePicker @handleChangeDatePanel="handleChangeDatePanel"></DatePicker>

      <div class="channel-content flex-wrap">
        <div class="flex-left">
          <!-- 跟进转化漏斗 -->
          <div class="funnel-wrap box-bg-border">
            <span class="border border-top-left"></span>
            <span class="border border-top-right"></span>
            <span class="border border-bottom-left"></span>
            <span class="border border-bottom-right"></span>
            <h3 class="block-title funnel-title">跟进转化漏斗 </h3>
            <div class="funnel-content">
              <ChannelFunnel id="funnel" :data="conversion" :isR="isR" v-if="isRender"></ChannelFunnel>
            </div>
            </div>
          <!-- 环形图 -->
          <div class="flex-wrap status-wrap  box-bg-border">
            <span class="border border-top-left"></span>
            <span class="border border-top-right"></span>
            <span class="border border-bottom-left"></span>
            <span class="border border-bottom-right"></span>
            <div
            v-for="(item, index) in status"
            class="status-item-wrap"
            :key="index">
            <h3 class="block-title status-title">{{statusName[index]}}</h3>
                <ChannelPie 
                :data="item"
                :id="`pie${index}`" 
                >

                </ChannelPie>
            </div>

          </div>
        </div>
        <!-- 柱状图 -->
        <div class="flex-right">
           
           <div
            v-for="(item, index) in details"
            class="details-wrap   box-bg-border"
            :key="item.name">
            <span class="border border-top-left"></span>
            <span class="border border-top-right"></span>
            <span class="border border-bottom-left"></span>
            <span class="border border-bottom-right"></span>
                <h3 class="block-title details-title">{{detailsName[index]}}</h3>
                <ChannelBar 
                :data="item"
                :color= "color[index]"
                :dataKey = 'dataKey[index]'
                :isR="isR"
                :id="`bar${index}`"
                :currentArea="currentArea" >
                </ChannelBar>
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ChannelPie, ChannelBar, ChannelFunnel} from './index'; 
import { FilterButton, DatePicker } from '@/components/index'; // 组件
import { divideArr, divideArrToObj, combineArr } from '@/utils/utils'; // 组件
import moment from 'moment';

let details: any[] = []; //柱形图表所有渠道数据
let status: any[] = []; //潜客状态（环形图）所有渠道数据



@Component({
  components: {
    ChannelPie,
    ChannelBar,
    ChannelFunnel,
    FilterButton,
    DatePicker,
  }
})
export default class ChannelConversion extends Vue {
   @Prop({
    required: false,
    default: ''
  }) brandName!: string;

  @Prop({
    required: false,
    default: 101
  }) brandId!: number;

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  isRender: boolean = false;
public bigArea: any = [];       //大区的code和名字
public smallArea: any = [];     //小区的code和名字
public dealerArea: any = [];    //经销商的code和名字
public useCode: any = [];       //要用的Code
public curCode: any = 'rfsCode';  
// public smallArea: any = [];
timeMonth: string = moment().format( 'YYYYMM' );
isR: boolean = false;
filterLabel: string = '全部';
tabsArr: string[] = ['全部', '垂媒', '厂方分配', '自然获客', '外拓获客'];
// tabsArr: string[] = ['全部', '垂媒', '厂方分配', '展厅自然客流', '展厅主动开拓'];
detailsName: string[] = [ '建卡情况', '到店情况', '试乘试驾情况', '交车情况'];
Rcolor: any[] = [];
nonRcolor: string[] = ['#236BB4', '#EBCD52', '#4EDFD1', '#65A7EA'];
conversion: object[] = [
    {
      name: '获客',
      target: 0,
      achieve: 0,
    },
    {
      name: '建卡',
      target: 0,
      achieve: 0,
    },
    {
      name: '到店',
      target: 0,
      achieve: 0,
    },
    {
      name: '试乘试驾',
      target: 0,
      achieve: 0,
    },
    {
      name: '订单',
      target: 0,
      achieve: 0,
    },
    {
      name: '成交',
      target: 0,
      achieve: 0,
    },
  ];
details: any[] = [
  [],
  [],
  [],
  []
];
  status: object[] = [
    {
      name: '潜客状态分析',
      turnover: 500, //成交
      following: 2000, //跟进中
      total: 2600, //总数
      defeated: 100, //战败
    }, 
    // {
    //   name: '潜客状态分析-非R网',
    //   turnover: 500, //成交
    //   following: 2000, //跟进中
    //   total: 2600, //总数
    //   defeated: 100, //战败
    // },
  ];

  get color(): any[] {
    return this.isR ? this.Rcolor : this.nonRcolor;
  }
  get dataKey(): string[] {
  return this.isR ? [] : ['monthCardsCnt', 'num', 'num', 'num'];
  // monthCardsCnt
}
  get statusName(): string[] {
  return this.isR ? [] : ['潜客状态分析'];
}
  init() {
    this.getStatusData();     //获取潜客数据
    this.getDetailsData();    //获取柱状图数据
    this.getFunnelData(); 
  }

  getFunnelData() {
    let params: any = {
      brandId: this.brandId,
      time: this.timeMonth
    };
    if (this.filterLabel && this.filterLabel !== '全部') {
      let label = this.filterLabel;
      if (this.filterLabel === '垂媒') {
        label = '网销';
      }
      if (this.filterLabel === '自然获客') {
        label = '展厅自然客流';
      }
      if (this.filterLabel === '外拓获客') {
        label = '展厅主动开拓';
      }
      params['businessTypeCode'] = label;
    }
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.funnel(params).then((res) => {
      this.conversion = [
        {
          name: '获客',
          target: 0,
          achieve: res.monthLeadsCnt,
        },
        {
          name: '建卡',
          target: 0,
          achieve: res.monthCardsCnt,
        },
        {
          name: '到店',
          target: 0,
          achieve: res.monthArriveCnt,
        },
        {
          name: '试乘试驾',
          target: 0,
          achieve: res.monthTestRideCnt,
        },
        {
          name: '订单',
          target: 0,
          achieve: res.monthOrderCnt,
        },
        {
          name: '成交',
          target: 0,
          achieve: res.monthDeliverCnt,
        },
      ];
      this.isRender = true;
    }).catch((err) => {
      this.resetConversionData();
      this.isRender = true;
    });
  }

  resetConversionData() {
    this.conversion = [
      {
        name: '获客',
        target: 0,
        achieve: 0,
      },
      {
        name: '建卡',
        target: 0,
        achieve: 0,
      },
      {
        name: '到店',
        target: 0,
        achieve: 0,
      },
      {
        name: '试乘试驾',
        target: 0,
        achieve: 0,
      },
      {
        name: '订单',
        target: 0,
        achieve: 0,
      },
      {
        name: '成交',
        target: 0,
        achieve: 0,
      },
    ];
  }

  //切换渠道
  hanldeChangeTabs(label: string): void {
    this.filterLabel = label;
    this.detailsFilter();
    this.statusFilter();
    this.getFunnelData();
  }
  //切换日期
  handleChangeDatePanel(date: string) {
    this.timeMonth = date;
    // this.init();
    this.requestCurrentArea();
    this.$emit('onMonthChange', date);
  }

  // 请求当前所有大区
  public bigarea: any = [];
  requestCurrentArea() {
    if (Object.keys(this.currentArea)[0] === 'all') {
      this.curCode = 'rfsCode';
    }
    if (Object.keys(this.currentArea)[0] === 'rfsCode') {
      this.curCode = 'macCode';
    }
    if (Object.keys(this.currentArea)[0] === 'macCode') {
      this.curCode = 'dealerCode';
    }
    // 大区的code和名字
    if (Object.values(this.currentArea)[0] === 'all' || Object.values(this.currentArea)[0] === 'rfsCode') {
      let params = {
      brandId: this.brandId,
      type: this.timeMonth,
      };
      $api.DashboardApi.areaData(params).then( (res: any) => {
        // console.log(res);
        let codeandName: any = [];
        let areaCode: any;
        res.forEach((item: any) => {
          codeandName.push(`${item.rfsCode}:` + item.rfsName);
        });
        let setcode = new Set(codeandName);
        let arrcode = Array.from(setcode);
        // console.log(arrcode);
        areaCode = arrcode.map( (item: any) => {
          return {
            rfsCode: item.split(':')[0],
            rfsName: item.split(':')[1],
            children: []
          };
        });
        res.forEach( (item: any) => {
          areaCode.forEach( (val: any) => {
            if (item.rfsCode === val.rfsCode) {
              val.children.push({
                macCode: item.macCode,
                macName: item.macName
              });
            }
          });
        });
        // console.log(areaCode);
        this.bigarea = areaCode;
        this.bigArea = areaCode;
        this.useCode = areaCode;
        areaCode.forEach( (item: any) => {
        if (item.rfsCode === Object.values(this.currentArea)[0]) {
            this.useCode = item.children;
          }
        });
        // console.log(this.useCode);
        this.init();
      });
    }
    if (Object.keys(this.currentArea)[0] === 'macCode') {
      let dealerparams = {};
      dealerparams = Object.assign(dealerparams, this.currentArea);
      $api.DashboardApi.dealersData(dealerparams).then( (res: any) => {
        // console.log(res);
        this.dealerArea = res.map( (item: any) => {
          return {
            dealerCode: item.dealerCode,
            dealerShortname: item.dealerShortname
          };
        });
        this.useCode = this.dealerArea;
        this.init();
      });
    }
  }
  //处理四个柱状图数据
  processDetails(res: any): void {
    let arrivalArr: any[] = []; //进店数数组
    let tryArr: any[] = []; //试乘试驾
    divideArr(res.adsDriveStores, 'sourceType').map( item => {
      if ( item.sourceType === '进店数') {
        arrivalArr = item.list;
      } else {
        tryArr = item.list;
      }
    }); 
    // console.log(this.useCode);
    this.rename(res.adsLeadsAndCards);
    this.rename(res.adsCustSalesDelivery);
    this.rename(arrivalArr);
    this.rename(tryArr);
    // console.log(res.adsLeadsAndCards);
    // console.log(res.adsCustSalesDelivery);
    // console.log(arrivalArr);
    // console.log(tryArr);

    const chartCard = divideArrToObj(res.adsLeadsAndCards, 'businessTypeCode', '全部'); //建卡情况
    const chartArrival = divideArrToObj(arrivalArr, 'businessTypeCode', '全部'); //到店情况
    const chartTry = divideArrToObj(tryArr, 'businessTypeCode', '全部'); //试乘试驾情况
    const chartResult = divideArrToObj(res.adsCustSalesDelivery, 'sourceType', '全部'); //交车情况
    const tabsArr = this.tabsArr.slice(1);

    details = [chartCard, chartArrival, chartTry, chartResult ];
    // console.log(this.curCode);
    details.forEach( ( item, index ) => {  
      let key = index > 2 ? 'sourceType' : 'businessTypeCode';     
      let list: any = [];
      item['全部'] && (list = item['全部'].filter( ( innerItem: any ) => {
        // 判断是否为垂媒、厂方、自然、外拓
       let flag = tabsArr.includes(innerItem[key]);
       innerItem[key] = '全部';
       return flag;
      }));
      item['全部'] = list.length ? 
                    combineArr(list, this.curCode, this.dataKey[index]) : []; 
      // console.log(item['全部']);
    });
    // console.log(details, 'details');
  }


  //处理潜客状态数据
  processStatus(res: object[]) {
    status = res;
    const tabsArr = this.tabsArr.slice(1);
    let statusTotal = {
      businessTypeName: '全部',
      isCjkh: 0,
      isZbkh: 0,
      isQzkh: 0,
    };
    statusTotal = status.reduce( (pre, cur) => {
      if ( tabsArr.includes(cur.businessTypeName)) {
        pre.isCjkh += cur.isCjkh;
        pre.isZbkh += cur.isZbkh;
        pre.isQzkh += cur.isQzkh;
      }
      return pre;
    }, statusTotal);
    status.push(statusTotal);
    // console.log(status, 'status')
  }
  //筛选当前渠道下的 四个柱状图数据
  detailsFilter() {
    this.details = details.map( item => {
      return item[this.filterLabel] ? item[this.filterLabel] : [];
    });
    // console.log(this.details);
  }

  //筛选当前渠道下的 潜客状态数据
  statusFilter() {
    this.status = status.filter( item => {
      return item.businessTypeName === this.filterLabel;
    });
  }

   //获取潜客状态api数据
  getStatusData() {
  let params = {
    time: this.timeMonth,
    brandId: this.brandId,
    };
  if (Object.keys(this.currentArea)[0] !== 'all') {
    params = Object.assign(params, this.currentArea);
  }
  $api.ChannelConversionApi.getStatus(params).then((res: any) => {
    // console.log(res);
    this.processStatus(res);      //处理潜客状态数据
    this.statusFilter();          //筛选渠道
  } )
  .catch(e => {

  });

  }

   //获取四个柱形图api数据
  getDetailsData() {
  let params = {
    time: this.timeMonth,
    brandId: this.brandId,
  };
  if (Object.keys(this.currentArea)[0] !== 'all') {
    params = Object.assign(params, this.currentArea);
  }
  // console.log(params);
  $api.ChannelConversionApi.getDetails(params).then((res: any) => {
    // console.log(res);
    // 建卡字段不统一
    this.changeName(res.adsLeadsAndCards);
    this.processDetails(res);      //处理柱状图数据
    this.detailsFilter(); 

    
  } )
  .catch(e => {

  });

  }

  created() {
        if (moment().format('YYYYMMDD') === moment().startOf('month').format('YYYYMMDD')) {
      this.timeMonth = moment().subtract(1, 'months').format('YYYYMM');
    } else {
      this.timeMonth = moment().format( 'YYYYMM' );
    }
    this.$emit('onMonthChange', this.timeMonth);
  }

  mounted() {
    this.requestCurrentArea();
    // this.init();
  }
  // 检测选择区域
  @Watch('currentArea')
  conversionBarChange() {
    
    if (Object.keys(this.currentArea)[0] === 'all') {
      this.curCode = 'rfsCode';
      this.useCode = this.bigArea;
      // console.log(this.useCode);
       this.init();
      // this.requestCurrentArea();
    }
    if (Object.keys(this.currentArea)[0] === 'rfsCode') {
      this.curCode = 'macCode';
      this.bigarea.forEach( (item: any) => {
        if (item.rfsCode === Object.values(this.currentArea)[0]) {
          this.smallArea = item.children;
        }
      });
      this.useCode = this.smallArea;
      // console.log(this.useCode);
      this.init();
    }
    if (Object.keys(this.currentArea)[0] === 'macCode') {
      this.curCode = 'dealerCode';
      let dealerparams = {};
      dealerparams = Object.assign(dealerparams, this.currentArea);
      $api.DashboardApi.dealersData(dealerparams).then( (res: any) => {
        // console.log(res);
        this.dealerArea = res.map( (item: any) => {
          return {
            dealerCode: item.dealerCode,
            dealerShortname: item.dealerShortname
          };
        });
        this.useCode = this.dealerArea;
        this.init();
      });
    }
  }
  // 检测选择品牌
  @Watch('brandId')
  conversionIdChange() {
      this.requestCurrentArea();
  }

  // 把rfsCode换成中文
  rename (arr: any) {
    // console.log(arr);
    // console.log(this.useCode);
    // 更改code到区名
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < this.useCode.length; j++) {
        if (this.useCode[j].rfsCode) {
          if (arr[i].rfsCode === this.useCode[j].rfsCode) {
            arr[i].rfsCode = this.useCode[j].rfsName;
          }
        }
        if (this.useCode[j].macCode) {
          if (arr[i].macCode === this.useCode[j].macCode) {
            arr[i].macCode = this.useCode[j].macName;
          }
        }
        if (this.useCode[j].dealerCode) {
          if (arr[i].dealerCode === this.useCode[j].dealerCode) {
            arr[i].dealerCode = this.useCode[j].dealerShortname;
          }
        }
      }
    }

  }

  // 统一字段
  changeName(arr: any) {
    // for (let i = 0; i < arr.length; i++) {
    //   if (arr[i].businessTypeCode === '展厅自然客流') {
    //     arr[i].businessTypeCode = '自然获客';
    //   }
    //   if (arr[i].businessTypeCode === '展厅主动开拓') {
    //     arr[i].businessTypeCode = '外拓获客';
    //   }
    // }
    arr.map( (item: any) => {
      if (item.businessTypeCode === '展厅自然客流') {
        item.businessTypeCode = '自然获客';
      }
      if (item.businessTypeCode === '展厅主动开拓') {
        item.businessTypeCode = '外拓获客';
      }
      if (item.businessTypeCode === '网销') {
        item.businessTypeCode = '垂媒';
      }
      return arr;
    });
  }

}
</script>

<style lang="scss">
  .el-popper[x-placement^=bottom]{
    position: absolute !important;
    top: 75px !important;
    right: 0 !important;
    left: auto !important;
  }
.channelconversion-wrap {
  width: 3356px;
  height: 1672px;
  overflow: hidden;
  position: relative;
  background-color: $box-bg-primary;
  padding: 40px;
  

    .channel-filter-wrap{
      margin-bottom: 40px;
      height: 60px /* 60/100 */;
    }
    .channel-content{
      height: calc(100% - 60px );
    }

  .block-title{
      font-weight: normal;
      font-size: 36px;
      color: #fff;
    }
    .flex-wrap{
      display: flex;
      justify-content: space-between;
      .flex-left{
        width: 1000px;
        .funnel-wrap{
          height: 1000px;
          // background-color: $block-bg-primary;
          .funnel-title{
             height: 90px;
              padding: 0 40px;
              line-height: 90px;
              border-bottom: 2px solid #1E2237;
          }
          .funnel-content{
            height: 908px;
            // background: url('../../assets/img/expect.png') no-repeat ;
            background-size: contain;
          }

        }
        .status-wrap{
          width: 100%;
          margin-top: 20px;
          height: 472px;
          // background-color: $block-bg-primary;
          margin-right: -2px;
          overflow: hidden;
          justify-content: center;
          .status-item-wrap:first-child {
            border-right: 2px solid #0B4D5E;
          }
          .status-item-wrap{
            width:50%;
            // padding: 0 36px 36px;
             .status-title{
            line-height: 100px;
            text-align: center;
            
           }
          }
         
        }
    
      }
      .flex-right{
        width: 2276px;
        overflow: hidden;
        .details-wrap{
        width: 1114px;
        height: 736px;
        margin-left: 20px;
        margin-bottom: 20px;
        // background-color: $block-bg-primary;
        float: left;
        .details-title{
          height: 90px;
          padding: 0 40px;
          line-height: 90px;
          border-bottom: 2px solid #1E2237;
        }
      }
      }
    }
    
  
}

</style>
