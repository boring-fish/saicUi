<template>
  <div class="getfollow">
    <p>线索跟进情况</p>
    <div class="hr"></div>
    <div class="track">
      <div class="liuziLegend" v-if="liuziLegendShow">
          <p>
          <span style="width: 40px; height: 40px; background: #236BB4"></span>
          <span
            style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
            >目标值</span
          >
        </p>
        <p>
          <span style="width: 40px; height: 40px; background: #4EDFD1"></span>
          <span
            style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
            >跟进数</span
          >
        </p>
      </div>
      <div class="followLegend" v-if="followLegendShow">
        <p>
          <span style="width: 40px; height: 40px; background: #4EDFD1"></span>
          <span
            style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
            >R网跟进数</span
          >
        </p>
        <p>
          <span style="width: 40px; height: 40px; background: #EBCD52"></span>
          <span
            style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
            >非R网跟进数</span
          >
        </p>
        <p>
          <span style="width: 40px; height: 40px; background: #236BB4"></span>
          <span
            style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
            >目标值</span
          >
        </p>
      </div>
      <div ref="ColumnChart" class="ColumnOfTrack"></div>
    </div>
    <!-- <img src="../../assets/img/expect.png" alt=""> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { numberFormat } from '@/utils/utils.ts';

interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}

@Component({
  components: {},
})
export default class GetFollow extends Vue {
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
    default: () => [],
  })
  series!: any[];

  @Prop({
    required: false,
    default: () => {},
  })
  time!: TIMERANGE;

  @Prop({
    required: true,
    default: {
      all: 'all',
    },
  })
  currentArea!: any;

  private trackEchart: any = null;
  public $echarts: any;
  public showMount: any; //展示数量
  public areaCode: any = ''; //选择大区时的rfsCode
  public classCode: any = 'rfsCode'; //切换时要显示的区code类别

  // echarts的状态
  // R标
  public followLegend: any = ['R网跟进数', '非R网跟进数', '去重获客量'];
  public followLegendColor: any = ['#12B5C0', '#1464C8', '#B39933'];
  public followXaxisData: any = ['华北区', '华南区', '华中区', '西北区'];
  public followSeriesData: any = [
    {
      name: 'R网跟进数',
      type: 'bar',
      stack: '广告',
      barCategoryGap: '50%',
      data: [80, 112, 101, 54],
      showBackground: true,
      showBackgroundStyle: {
        color: '#021722',
      },
    },
    {
      name: '去重获客量',
      type: 'bar',
      barCategoryGap: '50%',
      data: [320, 332, 301, 300],
      showBackground: true,
      showBackgroundStyle: {
        color: '#021722',
      },
    },
    {
      name: '非R网跟进数',
      type: 'bar',
      stack: '广告',
      // barGap: 0.4,
      barCategoryGap: '50%',
      data: [100, 132, 101, 134],
      // showBackground: true,
      showBackgroundStyle: {
        color: '#021722',
      },
    },
  ];

  // 留资
  public liuziLegendShow: any = true; //切换留资跟进echarts的legend状态
  public followLegendShow: any = false; //切换留资跟进echarts的legend状态
  public liuziLegend: any = ['跟进数', '目标值'];
  public liuziLegendColor: any = ['#236BB4', '#4EDFD1'];
  public liuziXaxisData: any = []; //x轴坐标信息
  public liuziFollowData: any = []; //echarts跟进数据
  public liuziData: any = []; //echarts留资数据
  public areaList: any = []; //全国大区数据
  public area: any = [];
  public allRfsCode: any = []; //获取rfsCode
  public followList: any = []; //获取跟进数据
  public liuziList: any = []; //获取留资数据
  public liuziSeriesData: any = [
    {data: this.liuziData},
    {data: this.liuziFollowData},
  ];

  @Watch('time.key')
  brandTimeKeyChange() {
    this.onFollowRuleChange();
  }

  @Watch('brandName')
  brandNameChange() {
    this.onFollowRuleChange();
    if (this.brandName === 'R标') {
      this.handleBrandChange();
    }
  }

  @Watch('currentArea')
  followAreaChange() {
    // 点击全国重置
    if (Object.keys(this.currentArea)[0] === 'all') {
      this.reload();
    }
    // 点击大区切换
    if (Object.keys(this.currentArea)[0] === 'rfsCode') {
      this.areaCode = Object.values(this.currentArea)[0];
      this.difAreaChange();
    }
    // 点击小区   //暂无数据
    if (Object.keys(this.currentArea)[0] === 'macCode') {
      // console.log(Object.keys(this.currentArea)[0]);
      // console.log(Object.values(this.currentArea)[0]);
      let params = {};
      params = Object.assign(params, this.currentArea);
      $api.DashboardApi.dealersData(params).then((res: any) => {
        let xArr: any = [];
        let codeArr: any = [];
        xArr = res.map((item: any) => {
          return item.dealerShortname;
        });
        codeArr = res.map((item: any) => {
          return item.dealerCode;
        });
        this.liuziXaxisData = xArr;
        this.allRfsCode = codeArr;
        // console.log(xArr, codeArr);
        this.dealFormat();
        this.getLizuziData();
        this.getFollowData();
      });
    }
  }
  @Watch('currentArea')
  currenChange() {
    // console.log('cur', Object.keys(this.currentArea)[0]);
    switch (Object.keys(this.currentArea)[0]) {
      case 'all':
        this.classCode = 'rfsCode';
        break;
      case 'rfsCode':
        this.classCode = 'macCode';
        break;
      case 'macCode':
        this.classCode = 'dealerCode';
        break;
    }
    // console.log('cla', this.classCode);
  }

  // 测试点击R表改变
  handleBrandChange() {
    this.liuziLegendShow = !this.liuziLegendShow;
    this.followLegendShow = !this.followLegendShow;
  }

  private created() {}

  // 获取大区数据
  getBigArea() {
    this.area = $commonData.areaData.getAreaMap();
    // console.log(this.area);
    // 大区去重console.log
    // let codeandName: any = [];
    // this.areaList.forEach((item: any) => {
    //   codeandName.push(`${item.rfsCode}:` + item.rfsName);
    // });
    // let setcode = new Set(codeandName);
    // let arrcode = Array.from(setcode);
    // // 获取大区名称
    // this.liuziXaxisData = arrcode.map((item: any) => {
    //   return item.split(':')[1];
    // });
    // // 获取大区code
    // this.allRfsCode = arrcode.map((item: any) => {
    //   return item.split(':')[0];
    // });
    // console.log(this.liuziXaxisData, this.allRfsCode);
    this.dealFormat();
    this.getFollowData();
    this.getLizuziData();
  }

  dealFormat() {
    // 初始化让没有数据的大区也能显示
    this.liuziFollowData.length = 0;
    this.liuziData.length = 0;
    for (let i = 0; i < this.allRfsCode.length; i++) {
      this.liuziFollowData.push(0);
      this.liuziData.push('0');
    }
  }

  // 点击全国重置
  reload() {
    this.onFollowRuleChange();
    this.getFollowData(); //跟进
    this.getLizuziData(); //留资
  }

  // 点击大区出现小区数据
  difAreaChange() {
    let areaChild: any = []; //获取小区数组            Code&Name
    let areaChildName: any = []; //获取小区名字数组        Name
    let areaChildRfsName: any = []; //获取小区macCode数组     Code
             //所有小区
    this.area.forEach((item: any) => {
      if (item.rfsCode === this.areaCode) {
        areaChild = item.children;
      }
    });
    areaChild.forEach((item: any) => {
      areaChildName.push(item.macCode);
    });
    areaChild.forEach((item: any) => {
      areaChildRfsName.push(item.macName);
    });
    this.liuziXaxisData = areaChildRfsName;
    this.allRfsCode = areaChildName;
    this.dealFormat();
    this.getLizuziData();
    this.getFollowData();
  }

  // 目标数据
  getLizuziData() {
    let params: any = {
      brandId: this.brandId,
      timeType: this.time.key,
      type: '线索',
      groups: this.classCode
    };
   
     if (Object.keys(this.currentArea)[0] === 'rfsCode') {
        params.rfsCodes = Object.values(this.currentArea)[0];
    } else if (Object.keys(this.currentArea)[0] === 'macCode') {
      params.macCodes = Object.values(this.currentArea)[0];
    } else {
       params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.aimsData(params).then((res: any) => {
      this.liuziList = res.now;
      if (this.liuziList[0] !== 'null' && this.liuziList.length !== 0) {
        for (let i = 0; i < this.allRfsCode.length; i++) {
        for (let k = 0; k < this.liuziList.length; k++) {
          if (this.allRfsCode[i] === this.liuziList[k][this.classCode]) {
            this.liuziData[i] = this.liuziList[k].kpi; //todo
          }
        }
      }
      }
      
      this.winGuestFollowEchartInit();
    });
  }
  // 跟进数据
  getFollowData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.follow(params).then((res: any) => {
      this.followList = res.now;
      for (let i = 0; i < this.allRfsCode.length; i++) {
        for (let j = 0; j < this.followList.length; j++) {
          if (this.allRfsCode[i] === this.followList[j][this.classCode]) {
            this.liuziFollowData[i] = this.followList[j].followNumber;
          }
        }
      }
      this.winGuestFollowEchartInit();
    });
  }

  onFollowRuleChange() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.areaData(params).then((res: any) => {
      // 大区去重
      let codeandName: any = [];
      res.forEach((item: any) => {
        codeandName.push(`${item.rfsCode}:` + item.rfsName);
      });
      let setcode = new Set(codeandName);
      let arrcode = Array.from(setcode);
      // 获取大区名称
      this.liuziXaxisData = arrcode.map((item: any) => {
        return item.split(':')[1];
      });
      // 获取大区code
      this.allRfsCode = arrcode.map((item: any) => {
        return item.split(':')[0];
      });
      this.getBigArea();
    });
  }

  // 上树后初始化Echart
  private mounted() {
    this.onFollowRuleChange();
    window.onresize = () => {
      this.trackEchart.resize();
    };
  }

  // Echart初始化执行函数
  public winGuestFollowEchartInit() {
let columnChart = this.$refs.ColumnChart;
     if (!columnChart) {
      return false;
    }
    this.trackEchart = this.$echarts.init(columnChart);
    this.followBarEchart();
  }

  // Echart初始化
  public followBarEchart() {
    this.trackEchart.clear();
    let newGjRate: Array<any> = [];
    let sortliuziXaxisData: Array<any> = [],
      sortliuziSeriesGoalData: Array<any> = [],
      sortliuziSeriesFllowData: Array<any> = [],
       sortliuziSeriesFllowDatas: Array<any> = [];
    this.liuziSeriesData[0].data.forEach((item: any, index: any) => {
    if (item !== '0') {
       newGjRate[index] = {
        data: this.liuziSeriesData[1].data[index] / item, //目标完成率
        index: index,
      };
    } else {
       newGjRate[index] = {
        data: 0, //目标完成率
        index: index,
      };
    }
     
      sortliuziSeriesFllowDatas[index] = {
       data: this.liuziSeriesData[1].data[index],
       index: index,
      };
    });
 if (this.currentArea.all) {
      newGjRate.sort(function(a: any, b: any) {
        return b.data - a.data;
      });
       newGjRate.forEach((item: any, index: any) => {
      sortliuziXaxisData[index] = this.liuziXaxisData[item.index];
      sortliuziSeriesGoalData[index] = this.liuziSeriesData[0].data[item.index];
      sortliuziSeriesFllowData[index] = this.liuziSeriesData[1].data[item.index];
    });
    } else {
      sortliuziSeriesFllowDatas.sort(function(a: any, b: any) {
        return b.data - a.data;
      });
       sortliuziSeriesFllowDatas.forEach((item: any, index: any) => {
      sortliuziXaxisData[index] = this.liuziXaxisData[item.index];
      sortliuziSeriesGoalData[index] = this.liuziSeriesData[0].data[item.index];
       sortliuziSeriesFllowData[index] = this.liuziSeriesData[1].data[item.index];
    });
    }
    let sortliuziSeriesData = [
      {
      name: '目标值',
      type: 'bar',
      itemStyle: {
        itemWidth: 70,
      },
      barCategoryGap: '50%',
      // data: this.liuziData,
      data: sortliuziSeriesGoalData,
    },
    {
      name: '跟进数',
      type: 'bar',
      stack: '广告',
      itemStyle: {
        itemWidth: 70,
      },
      barCategoryGap: '50%',
      // data: this.liuziFollowData,
      data: sortliuziSeriesFllowData,
    },
    ]; 
     
    let options: any = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#F9F9F9',  
        padding: [30, 20],
        formatter: (params: any, ticket: string): string => {
          let str: string = `<div style="width: 480px; height: 40px;"><span style="color:#666666; line-height:34px; ">${params[0].name}</span><span style="margin-left: 20px; color:#666666; line-height:34px;">${this.time.type}</span></div>`;
         
          if (this.currentArea.all) {
             params.forEach((item: any) => {
            str += `<br/><div style="width: 480px; height: 40px; display: flex; align-item: center;">
            <span style="display:inline-block;margin-right:20px;width:40px;height:40px;background-color:${item.color}; "></span style=" font-size: 28px;">${item.seriesName} : <span style="display:inline-block; width: 40px; height: 40px; font-size: 28px; margin-left: 30px;">${numberFormat(item.value).value}${numberFormat(item.value).unit}</span></div>`;
          });
            str += `<br/>目标完成率：${
              params[1].value
                ? params[0].value === '0' ? '——' : ((100 * params[1].value) / params[0].value).toFixed(2) + '%'
                : 0
            }`;
          } else {
            //  params.forEach((item: any) => {
            str += `<br/><div style="width: 480px; height: 40px; display: flex; align-item: center;">
            <span style="display:inline-block;margin-right:20px;width:40px;height:40px;background-color:${params[0].color}; "></span style=" font-size: 28px;">${params[0].seriesName} : <span style="display:inline-block; width: 40px; height: 40px; font-size: 28px; margin-left: 30px;">——</span></div>`;
             str += `<br/><div style="width: 480px; height: 40px; display: flex; align-item: center;">
            <span style="display:inline-block;margin-right:20px;width:40px;height:40px;background-color:${params[1].color}; "></span style=" font-size: 28px;">${params[1].seriesName} : <span style="display:inline-block; width: 40px; height: 40px; font-size: 28px; margin-left: 30px;">${numberFormat(params[1].value).value}${numberFormat(params[1].value).unit}</span></div>`;
          // });
            str += `<br/>目标完成率：——`;
          }

          return str;
        },
        textStyle: {
          color: '#333333',
          fontSize: 28,
          width: 402,
          height: 296,
        },
      },
      color:
        this.brandId.toString() === '100'
          ? this.followLegendColor
          : this.liuziLegendColor,
      // legend: {
      //   show: false,
      //   type: 'scroll',
      //   selectedMode: true,
      //   data:
      //     this.brandId.toString() === '100'
      //       ? this.followLegend
      //       : this.liuziLegend,
      //   itemHeight: 40,
      //   itemWidth: 40,
      //   icon: 'react',
      //   itemGap: 100,
      //   textStyle: {
      //     color: '#FFF',
      //     fontSize: 32,
      //   },
      //   left: '5%',
      //   bottom: '3%',
      // },
      grid: {
        left: '1%',
        righr: '1%',
        bottom: '18%',
        containLabel: true,
        height: '70%',
        width: '95%',
      },
      dataZoom: {
        start: 0,
        end: this.showMount =
          this.allRfsCode.length <= 4
            ? 100
            : Math.round((4 / this.allRfsCode.length) * 100),
        type: 'slider',
        height: 30,
        fillerColor: '#48558B',
        borderColor: 'none',
        bottom: 10,
        endValue: 4,
        showDetail: false,
        handleStyle: {
          opacity: 0,
        },
        dataBackground: {
          lineStyle: {
            opacity: 0,
          },
          areaStyle: {
            opacity: 0,
          },
        },
      },
      xAxis: [
        {
          offset: 70,
          position: 'top',
          type: 'category',
          axisLabel: {
            interval: 0,
            formatter: (params: any) => {
              let arr: any = params.split('-');
              let area: string = arr[0];
              let name: string = arr[1] || '';
              let str = '{a|' + area + '}\n\n{b|' + name + '}';
              return str;
            },
            rich: {
              a: {
                color: '#FFF',
                fontSize: 32,
              },
              b: {
                color: '#666',
                fontSize: 28,
              },
            },
            align: 'center',
            textStyle: {
              color: '#FFF',
              fontSize: 32,
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
          // data: this.liuziXaxisData,
          data: 
          this.brandId.toString() === '100'
            ? this.followXaxisData
            : sortliuziXaxisData,
        },
      ],
      yAxis: [
        {
          show: false,
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
        },
      ],
      series:
        this.brandId.toString() === '100'
          ? this.followSeriesData
          : sortliuziSeriesData,
          // :this.liuziSeriesData,
    };

    this.trackEchart.setOption(options);
  }

  // 处理名字长度
  //   handleName(name: any) {
  //     return `${name.split('-')[0]}

  // ${name.split('-')[1]}`;
  //   }

  public destroyed() {
    window.onresize = null;
  }
}
</script>

<style lang="scss">
.getfollow {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  p {
    height: 50px;
    font-size: 36px;
    line-height: 50px;
    position: absolute;
    top: 30px;
    left: 40px;
  }
  .hr {
    position: absolute;
    top: 100px;
    width: 100%;
    height: 2px;
    background: #1e2237;
  }
  .track {
    position: absolute;
    top: 140px;
    width: 100%;
    height: calc(100% - 140px);
    width: 100%;
    overflow: auto;
    overflow: overflow-x;
    overflow-y: hidden;
    .liuziLegend {
      position: fixed;
      top: 55%;
      width: 700px;
      height: 50px;
      left: 2923px;
      display: flex;
      justify-content: space-around;
      p {
        width: 300px;
        height: 44px;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
        }
      }
      p:last-child {
        left: 400px;
      }
    }
    .followLegend {
      position: fixed;
      left: 1000px;
      bottom: 3%;
      width: 100%;
      height: 50px;
      p {
        width: 400px;
        height: 44px;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
        }
      }
      p:nth-child(2) {
        left: 400px;
      }
      p:nth-child(3) {
        left: 800px;
      }
    }
    .ColumnOfTrack {
      // position: absolute;
      // z-index: 100;
      width: 100%;
      // width: 600%;
      height: 100%;
    }
  }
  img {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>
