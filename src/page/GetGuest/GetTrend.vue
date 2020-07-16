<template>
  <div class="getTrend">
    <p>线索趋势</p>
    <div class="hr"></div>
    <div class="getTable">
      <ul class="changeData" ref="HomocycleRatio">
        <li
          v-for="(data, index) in tableMenu"
          :key="index"
          @click="handleClick(index)"
          :class="index === activeClassIndex ? 'active' : ''"
        >
          {{ data }}
        </li>
      </ul>
    </div>

    <div class="lineoftrend">
      <div ref="echartLineOfTrend" class="trendLine"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import moment from 'moment';

interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}

@Component({
  components: {},
})
export default class GetTrend extends Vue {
  @Prop({
    required: false,
    default: '',
  })
  brandName!: string;

  @Prop({
    required: false,
    default: 101,
  })
  brandId!: number;

  @Prop({
    required: false,
    default: {},
  })
  time!: TIMERANGE;

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  // 监测品牌名改变
  @Watch('brandName')
  brandNameChange() {
    this.getDiffBrand();
  }
  // 监测日期改变
  @Watch('time.key')
  brandTimeKeyChange() {
    this.getDiffTime();
  }
  // 检测大区改变
  @Watch('currentArea')
  currentAreaChange() {
    this.getTrendData();
  }

  getDiffBrand() {
    this.getTrendData();
  }

  getDiffTime() {
    this.getTrendData();
  }

  public nowList: any = [];
  public tbList: any = [];
  public hbList: any = [];
  // public planList: any = [];

  public nowArr: any = [];
  public lastArr: any = [];
  public lyArr: any = [];
  public x: any = [];

  assignment() {
    this.winGuestTrendData.tbNum = this.tbList;
    this.winGuestTrendData.nowlNum = this.nowList;
    this.winGuestTrendData.hbNum = this.hbList;
    this.winGuestTrendData.anyNum = this.tbList;
  }

  // 数据时间排序
  // 单位为month
  computedYear(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.month - b.month;
    });
  }
  // 单位为day
  computedDay(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.day - b.day;
    });
  }
  // 单位为dayWeek
  computedDayWeek(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.dayWeek - b.dayWeek;
    });
  }
  // 单位为hour
  computedHour(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.hour - b.hour;
    });
  }
  // 单位为year
  computedAll(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.year - b.year;
    });
  }

  // 处理合并数组
  arrangement(a: any, b: any) {
    b.length = 0;
    a.forEach((item: any) => {
      b.push(item.leadsNum);
    });
    // console.log(b);
    return b;
  }

  // 处理合并日期
  // 日期为month
  arrangeYear(a: any, b: any) {
    b.length = 0;
    a.forEach((item: any) => {
      b.push(item.month);
    });
    // console.log(b);
    return b;
  }
  // 日期为day
  arrangeDay(a: any, b: any) {
    b.length = 0;
    a.forEach((item: any) => {
      b.push(item.day);
    });
    // console.log(b);
    return b;
  }
  // 日期为dayWeek
  arrangeDayWeek(a: any, b: any) {
    b.length = 0;
    // console.log(a);
    a.forEach((item: any) => {
      b.push(item.dayWeek);
    });
    // console.log(b);
    return b;
  }
  // 日期为hour
  arrangeHour(a: any, b: any) {
    b.length = 0;
    a.forEach((item: any) => {
      b.push(item.hour);
    });
    // console.log(b);
    return b;
  }
  // 日期为year
  arrangeAll(a: any, b: any) {
    b.length = 0;
    a.forEach((item: any) => {
      // console.log(item);
      if (item.year !== null) {
        b.push(item.year);
      }
    });
    // console.log(b);
    return b;
  }

  // 执行合并数组
  mergeLeads() {
    this.arrangement(this.nowArr, this.nowList);
    this.arrangement(this.lastArr, this.hbList);
    this.arrangement(this.lyArr, this.tbList);
  }
  // 执行合并排序
  mergeSortmonth(res: any) {
    this.nowArr = this.computedYear(res.now);
    this.lastArr = this.computedYear(res.last);
    this.lyArr = this.computedYear(res.last);
  }
  mergeSortDay(res: any) {
    this.nowArr = this.computedDay(res.now);
    this.lastArr = this.computedDay(res.last);
    this.lyArr = this.computedDay(res.lsatYear);
  }
  mergeSortDayWeek(res: any) {
    this.nowArr = this.computedDayWeek(res.now);
    this.lastArr = this.computedDayWeek(res.last);
    this.lyArr = this.computedDayWeek(res.lsatYear);
  }
  mergeSortHour(res: any) {
    this.nowArr = this.computedHour(res.now);
    this.lastArr = this.computedHour(res.last);
    this.lyArr = this.computedHour(res.lsatYear);
  }
  mergeSortAll(res: any) {
    this.nowArr = this.computedAll(res.now);
    this.lastArr = this.computedAll(res.last);
    this.lyArr = this.computedAll(res.lsatYear);
  }
  // 判断平闰年
  isRunYear(fullyear: any) {
     return (fullyear % 4 === 0 && (fullyear % 100 !== 0 || fullyear % 400 === 0));
  }
  // 返回天数
  getThisMonthDays(days: any) {
    let arr = [];
    for (let i = 1; i <= days; i++) {
      arr.push(i);
    }
    return arr;
  }

  getTrendData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.leadstrend(params).then((res: any) => {
      // console.log(res);
      // year
      if (this.time.key === 'year') {
        this.handleClick(0);            //每次切换时间置回同比
        // 获取数据现根据时间排序
        this.mergeSortmonth(res);
        // console.log(this.nowArr, this.lyArr, this.lastArr);
        // 排完序获取now，tb，hb数组
        this.mergeLeads();
        // console.log(this.nowList, this.tbList, this.hbList);
        // this.tbList = [5000, 7000, 8000, 4000, 3000, 1000];
        // 获取x轴数组
        // if (res.now.length > 0) {
        //   this.arrangeYear(res.now, this.x);
        //   // console.log(this.x);
        // } else if (res.lsatYear > 0) {
        //   this.arrangeYear(res.lsatYear, this.x);
        //   // console.log(this.x);
        // } else if (res.last.length > 0) {
        //   this.arrangeYear(res.last, this.x);
        //   // console.log(this.x);
        // }
        let arr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        this.x = arr;
        this.winGuestTrendData.trendXaxisData = this.x;
        this.assignment();
      }
      // threemonth
      if (this.time.key === 'threemonth') {
        this.handleClick(0);
        this.mergeSortmonth(res);
        this.mergeLeads();
        // if (res.now.length > 0) {
        //   this.arrangeYear(res.now, this.x);
        //   // console.log(this.x);
        // } else if (res.lsatYear > 0) {
        //   this.arrangeYear(res.lsatYear, this.x);
        //   // console.log(this.x);
        // } else if (res.last.length > 0) {
        //   this.arrangeYear(res.last, this.x);
        //   // console.log(this.x);
        // }
        // 获取当月
        // let num = (this.x.slice(-1) / 1) + 1;
        // 加到前两个月
        // this.x.push(num);
        // let arr = this.x.map( (item: any) => {
        //   let mynumber = item.toString().substring(4);
        //   return Number(mynumber) + '月';
        // } );
        // console.log(arr);
        // this.x = arr;

        let arr: any = [];
        if (moment().get('month') === 0) {
          arr = ['11月', '12月', '1月'];
          this.winGuestTrendData.trendXaxisData = arr;
        }
        if (moment().get('month') === 1) {
          arr = ['12月', '1月', '2月'];
          this.winGuestTrendData.trendXaxisData = arr;
        }
        if (moment().get('month') > 1) {
          for (let i = -1; i < 2; i++) {
            arr.push(moment().get('month') + i + '月');
          }
          this.winGuestTrendData.trendXaxisData = arr;
        }
        this.assignment();
      }
      // month
      if (this.time.key === 'month') {
        this.handleClick(0);
        this.mergeSortDay(res);
        this.mergeLeads();
        // if (res.now.length > 0) {
        //   this.arrangeDay(res.now, this.x);
        //   console.log(this.x);
        // } else if (res.lsatYear > 0) {
        //   this.arrangeDay(res.lsatYear, this.x);
        //   console.log(this.x);
        // } else if (res.last.length > 0) {
        //   this.arrangeDay(res.last, this.x);
        //   console.log(this.x);
        // }
        // 获取日期函数
        let d = new Date();
        let y = d.getFullYear();
        let m = d.getMonth();
        let Month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let thisMonthDay = [];
        if (this.isRunYear(y) && m === 1) {
          thisMonthDay = this.getThisMonthDays(Month[m] + 1);
        } else {
          thisMonthDay = this.getThisMonthDays(Month[m]);
        }
        // console.log(thisMonthDay);

        this.x = thisMonthDay.map( (item) => {
          return (item + '天');
        } );
        this.winGuestTrendData.trendXaxisData = this.x;
        this.assignment();
      }
      //last_month
      if (this.time.key === 'last_month') {
        this.handleClick(0);
        this.mergeSortDay(res);
        this.mergeLeads();
        // 获取日期函数
        let d = new Date();
        let y = d.getFullYear();
        let m = (d.getMonth() - 1) >= 0 ? (d.getMonth() - 1) : 11;
        let Month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let thisMonthDay = [];
        if (this.isRunYear(y) && m === 1) {
          thisMonthDay = this.getThisMonthDays(Month[m] + 1);
        } else {
          thisMonthDay = this.getThisMonthDays(Month[m]);
        }
        // console.log(thisMonthDay);
        this.x = thisMonthDay.map( (item) => {
          return (item + '天');
        } );
        this.winGuestTrendData.trendXaxisData = this.x;
        this.assignment();
      }
      // dayweek
      if (this.time.key === 'week') {
        this.handleClick(0);
        // console.log(res.last.length);
        this.mergeSortDayWeek(res);
        // console.log(this.nowArr, this.lyArr, this.lastArr);
        this.mergeLeads();
        // console.log(this.nowList, this.tbList, this.hbList);
        // if (res.now.length > 0) {
        //   this.arrangeDayWeek(res.now, this.x);
        //   console.log(this.x);
        // } else if (res.lsatYear.length > 0) {
        //   this.arrangeDayWeek(res.lsatYear, this.x);
        //   console.log(this.x);
        // } else if (res.last.length > 0) {
        //   this.arrangeDayWeek(res.last, this.x);
        //   console.log(this.x);
        // }
        // let num = (this.x.slice(-1)/1) + 1;
        // this.x.push(num);
        // console.log(this.x);
        // let arr = this.x.map( (item: any) => {
        //   return '周' + item;
        // } );
        let arr = ['周一', '周二', '周三', '周四', '周五', '周六' , '周日'];
        this.x = arr;
        this.winGuestTrendData.trendXaxisData = this.x;
        this.assignment();
      }
      // hour
      if (this.time.key === 'day') {
        this.handleClick(0);
        this.mergeSortHour(res);
        this.mergeLeads();
        // console.log(res.last.length);
        // console.log(this.nowList, this.tbList, this.hbList);
        // console.log(this.nowList, this.tbList, this.hbList);
        // if (res.now.length > 0) {
        //   this.arrangeHour(res.now, this.x);
        //   console.log(this.x);
        // } else if (res.lsatYear.length > 0) {
        //   this.arrangeHour(res.lsatYear, this.x);
        //   console.log(this.x);
        // } else if (res.last.length > 0) {
        //   this.arrangeHour(res.last, this.x);
        //   console.log(this.x);
        // }
        // let arr = ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时', '24时'];
        let arr = ['0时', '', '2时', '', '4时', '', '6时', '', '8时', '', '10时', '', '12时', '', '14时', '', '16时', '', '18时', '', '20时', '', '22时', '', '24时'];
        this.x = arr;
        this.winGuestTrendData.trendXaxisData = this.x;
        this.assignment();
      }
      // all
      if (this.time.key === 'all') {
        this.handleClick(0);
        this.mergeSortAll(res);
        this.mergeLeads();
        if (res.now.length > 0) {
          this.arrangeAll(res.now, this.x);
        } else if (res.lsatYear.length > 0) {
          this.arrangeAll(res.lsatYear, this.x);
        } else if (res.last.length > 0) {
          this.arrangeAll(res.last, this.x);
        }
        this.winGuestTrendData.trendXaxisData = this.x;
        this.assignment();
      } 
    });
  }

  // echart状态
  winGuestTrendData: any = {
    trendLegend: ['实际线索量', '同比线索量'],
    trendLegendColor: ['#12B5C0', '#1464C8'],
    trendXaxisData: [],
    nowlNum: [],
    anyNum: [],
    planNum: [],
    tbNum: [],
    hbNum: [],
  };

  // 右上方nav的遍历
  public tableMenu: any = ['同比', '环比'];
  public trendStr: any = ['tbNum', 'hbNum'];
  public defaultStr: any = 'tbNum';
  activeClassIndex: number = 0;
  public handleClick(index: number): void {
    this.activeClassIndex = index;
    // console.log(this.activeClassIndex);
    this.defaultStr = this.trendStr[index];
    // console.log(this.defaultStr);
    // console.log(this.winGuestTrendData[this.defaultStr]);
    this.winGuestTrendData.anyNum = this.winGuestTrendData[this.defaultStr];
    // this.winGuestTrendData.trendLegend[1] = `${this.tableMenu[index]}获客量`;
    this.winGuestTrendData.trendLegend = [
      '实际获客量',
      `${this.tableMenu[index]}获客量`,
    ];
    // console.log(this.winGuestTrendData.trendLegend[1]);
  }

  // echart配置
  private trendEchart: any = null;
  public $echarts: any;

  private mounted() {
    this.getTrendData();
    window.onresize = () => {
      this.trendEchart.resize();
    };
  }
  // 监听状态
  @Watch('winGuestTrendData', { deep: true })
  changeWinGuestTrendData(newval: any, oldval: any) {
    // console.log('change');
    this.winGuestEchartInit();
  }
  // echart展现函数
  public winGuestEchartInit() {
    this.trendEchart = this.$echarts.init(this.$refs.echartLineOfTrend);
    this.trendLineEchart();
  }

  public trendLineEchart() {
    this.trendEchart.clear();
    let options: any = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          // console.log(params.data);
            return `<p style="font-size=24px"> ${ params.name + '的值：' + this.numberFormat(params.data).value + this.numberFormat(params.data).unit} </P>`;
        }
      },
      color: this.winGuestTrendData.trendLegendColor,
      legend: {
        selectedMode: false, //禁止选中
        itemHeight: 40,
        itemWidth: 40,
        itemGap: 100,
        bottom: '5%',
        type: 'scroll',
        icon: 'react',
        data: this.winGuestTrendData.trendLegend,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: 32,
        },
        formatter: function (name: any) {
            return `    ` + name;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '20%',
        containLabel: true, //两侧留白
        height: '70%',
      },
      xAxis: {
        offset: 20,
        boundaryGap: false, //x轴坐标向左对齐
        axisLabel: {
          // interval: 0,
          show: true,
          textStyle: {
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 28,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#01475A',
          },
        },
        axisTick: {
          show: false,
        },
        data: this.winGuestTrendData.trendXaxisData,
      },
      yAxis: {
        offset: 20,
        // max: 2000,
        type: 'value',
        splitNumber: 4,
        splitLine: {
          show: true,
          interval: 0,
          lineStyle: {
            color: '#1E2237',
          },
        },
        axisLine: {
          lineStyle: {
            opacity: 0,
          },
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 28,
          },
        },
      },
      series: [
        {
          // symbol: 'none',
          lineStyle: {
            width: 5
          },
          symbolSize: 10,
          name: '实际获客量',
          type: 'line',
          data: this.winGuestTrendData.nowlNum,
        },
        {
          // symbol: 'none',
          lineStyle: {
            width: 5
          },
          symbolSize: 10,
          name: `${this.tableMenu[this.activeClassIndex]}获客量`,
          type: 'line',
          data: this.winGuestTrendData.anyNum,
        },
      ],
    };

    this.trendEchart.setOption(options);
  }

  numberFormat(value: any) {
    let param: any = {};
    let k = 10000,
      sizes = ['', '万', '亿', '万亿'],
      i;
    if (value < k) {
      param.value = value;
      param.unit = '';
    } else {
      i = Math.floor(Math.log(value) / Math.log(k));
      param.value = (value / Math.pow(k, i)).toFixed(2);
      param.unit = sizes[i];
      if (param.value > 1000) {
        param.value = param.value / 10000;
        param.unit = sizes[i + 1];
      }
    }
    return param;
  }

  private destroyed() {
    window.onresize = null;
  }
}
</script>

<style lang="scss">
.getTrend {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  p {
    position: absolute;
    top: 30px;
    left: 40px;
    height: 50px;
    font-size: 36px;
    line-height: 50px;
  }
  .hr {
    position: absolute;
    top: 100px;
    width: 100%;
    height: 2px;
    background: #1E2237;
  }
  .getTable {
    width: 654px;
    height: 60px;
    position: absolute;
    top: 20px;
    right: 48px;
    // background-color: #fff;
    box-sizing: border-box;
    // border-radius: 30px;
    // box-sizing: border-box;
    // background:rgba(9,12,21,1);
    // border-radius:30px;
    // border:2px solid rgba(58,66,99,1);
    // overflow: hidden;
    // color:rgba(255,255,255,0.4);
    .changeData {
      width: 426px;
      height: 100%;
      display: flex;
      position: absolute;
      li {
        width: 218px;
        height: 60px;
        font-size: 28px;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 60px;
        border: 2px solid rgba(58, 66, 99, 1);
        cursor: pointer;
        color: rgba(255, 255, 255, 0.4);
        background: rgba(9, 12, 21, 1);
      }
      li:first-child {
        border-radius: 30px 0px 0px 30px;
      }
      li:last-child {
        border-radius: 0px 30px 30px 0px;
        // color:rgba(255,255,255,0.4);
      }
      .active {
        font-size: 28px;
        width: 218px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        // color: #FFF;
        background-color: #236bb4;
        border: 2px solid rgba(58, 66, 99, 1);
        color: #fff;
        // background:rgba(35,107,180,1);
      }
    }
  }
  .lineoftrend {
    width: 100%;
    height: 740px;
    position: absolute;
    bottom: 0;
    .trendLine {
      height: 652px;
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
