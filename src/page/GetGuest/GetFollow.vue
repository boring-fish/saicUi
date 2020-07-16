<template>
  <div class="getfollow">
    <!-- <p>线索跟进情况</p>
    <div class="hr"></div>
    <div class="track">
      <div class="liuziLegend" v-if="liuziLegendShow">
        <p>
          <span style="width: 40px; height: 40px; background: #4EDFD1"></span>
          <span
            style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
            >及时跟进数</span
          >
        </p>
        <p>
          <span style="width: 40px; height: 40px; background: #236BB4"></span>
          <span
            style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
            >去重线索量</span>
        </p>
      </div>
      <div class="followLegend" v-if="followLegendShow">
        <p>
          <span style="width: 40px; height: 40px; background: #4EDFD1"></span>
          <span
          style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
          >R网及时跟进数</span>
        </p>
        <p>
          <span style="width: 40px; height: 40px; background: #EBCD52"></span>
          <span
          style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
          >非R网及时跟进数</span>
        </p>
        <p>
          <span style="width: 40px; height: 40px; background: #236BB4"></span>
          <span
            style="height: 44px; lineHeight: 44px; fontSize: 32px; marginLeft: 40px; color: rgba(255, 255, 255, 0.4)"
            >去重线索量</span>
        </p>
      </div>
      <div ref="ColumnChart" class="ColumnOfTrack"></div>
    </div>  -->
    <img src="../../assets/img/expect.png" alt="">

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

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
    default: () => []
  }) series!: any[];

  @Prop({
    required: false,
    default: () => {},
  })
  time!: TIMERANGE;

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  private trackEchart: any = null;
  public $echarts: any;
  public showMount: any;                 //展示数量
  public areaCode: any = '';             //选择大区时的rfsCode
  public classCode: any = 'rfsCode';            //切换时要显示的区code类别

  // echarts的状态
  // R标
  public followLegend: any = ['R网及时跟进数', '非R网及时跟进数', '去重获客量'];
  public followLegendColor: any = ['#12B5C0', '#1464C8', '#B39933'];
  public followXaxisData: any = ['华北区', '华南区', '华中区', '西北区'];
  public followSeriesData: any = [
    {
      name: 'R网及时跟进数',
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
      name: '非R网及时跟进数',
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
  public liuziLegendShow: any = true;              //切换留资跟进echarts的legend状态
  public followLegendShow: any = false;              //切换留资跟进echarts的legend状态
  public liuziLegend: any = ['及时跟进数', '去重线索量'];
  public liuziLegendColor: any = ['#4EDFD1', '#236BB4'];

  public liuziXaxisData: any = [];        //x轴坐标信息

  public liuziFollowData: any = []; //echarts跟进数据
  public liuziData: any = []; //echarts留资数据

  public areaList: any = []; //全国大区数据
  public area: any = [];
  public allRfsCode: any = []; //获取rfsCode
  public followList: any = []; //获取跟进数据
  public liuziList: any = []; //获取留资数据
  public liuziSeriesData: any = [
    {
      name: '及时跟进数',
      type: 'bar',
      stack: '广告',
      itemStyle: {
        itemWidth: 70,
      },
      barCategoryGap: '50%',
      data: this.liuziFollowData,
      showBackground: true,
      showBackgroundStyle: {
        color: '#021722',
      },
    },
    {
      name: '去重线索量',
      type: 'bar',
      itemStyle: {
        itemWidth: 70,
      },
      barCategoryGap: '50%',
      data: this.liuziData,
      showBackground: true,
      showBackgroundStyle: {
        color: '#021722',
      },
    },
  ];

  // @Watch('time.key')
  // brandTimeKeyChange() {
  //   this.onFollowRuleChange();
  // }

  // @Watch('brandName')
  // brandNameChange() {
  //   this.onFollowRuleChange();
  //   if (this.brandName === 'R标') {
  //     this.handleBrandChange();
  //   }
  // }
  
  // @Watch('currentArea')
  // followAreaChange() {
  //   // 点击全国重置
  //   if (Object.keys(this.currentArea)[0] === 'all') {
  //     this.reload();
  //   }
  //   // 点击大区切换
  //   if (Object.keys(this.currentArea)[0] === 'rfsCode') {
  //     this.areaCode = Object.values(this.currentArea)[0];
  //     this.difAreaChange();
  //   }
  //   // 点击小区   //暂无数据
  //   if (Object.keys(this.currentArea)[0] === 'macCode') {
  //     // console.log(Object.keys(this.currentArea)[0]);
  //     // console.log(Object.values(this.currentArea)[0]);
  //     let params = {};
  //     params = Object.assign(params, this.currentArea);
  //     $api.DashboardApi.dealersData(params).then( (res: any) => {
  //       // console.log(res);
  //       let xArr: any = [];
  //       let codeArr: any = [];
  //       xArr = res.map( (item: any) => {
  //         return item.dealerShortname;
  //       });
  //       codeArr = res.map( (item: any) => {
  //         return item.dealerCode;
  //       });
  //       this.liuziXaxisData = xArr;
  //       this.allRfsCode = codeArr;
  //       // console.log(xArr, codeArr);
  //       this.dealFormat();
  //       this.getLizuziData();
  //       this.getFollowData();
  //     });
  //   }
  // }
  // @Watch('currentArea')
  // currenChange() {
  //   // console.log('cur', Object.keys(this.currentArea)[0]);
  //   switch ( Object.keys(this.currentArea)[0] ) {
  //     case 'all':
  //       this.classCode = 'rfsCode'; break;
  //     case 'rfsCode':
  //       this.classCode = 'macCode'; break;
  //     case 'macCode':
  //       this.classCode = 'dealerCode'; break;
  //   }
  //   // console.log('cla', this.classCode);
  // }

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
      this.liuziData.push(0);
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
    let areaChild: any = [];            //获取小区数组            Code&Name
    let areaChildName: any = [];        //获取小区名字数组        Name
    let areaChildRfsName: any = [];     //获取小区macCode数组     Code
    // console.log(this.areaCode);      //当前macCode
    // console.log(this.area);          //所有小区
    this.area.forEach( (item: any) => {
      // console.log(item);
      if (item.rfsCode === this.areaCode) {
        areaChild = item.children;
      }
    });
    areaChild.forEach( (item: any) => {
      areaChildName.push(item.macCode);
    });
    areaChild.forEach( (item: any) => {
      areaChildRfsName.push(item.macName);
    });
    this.liuziXaxisData = areaChildRfsName;
    this.allRfsCode = areaChildName;
    // console.log(areaChild, areaChildName, areaChildRfsName);
    this.dealFormat();
    this.getLizuziData();
    this.getFollowData();
  }


  // 跟进数据
  getLizuziData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.liuzi(params).then((res: any) => {
      // console.log(res);
      this.liuziList = res.now;
      // console.log(this.liuziList, this.allRfsCode);
      for (let i = 0; i < this.allRfsCode.length; i++) {
        for (let k = 0; k < this.liuziList.length; k++) {
          if (this.allRfsCode[i] === this.liuziList[k][this.classCode]) {
            this.liuziData[i] = this.liuziList[k].liuziNumber;
          }
        }
      }
      this.winGuestFollowEchartInit();
    });
  }
  // 留资数据
  getFollowData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    // console.log(this.allRfsCode, this.areaCode);
    $api.DashboardApi.follow(params).then((res: any) => {
      // console.log(res);
      this.followList = res.now;
      // console.log(this.allRfsCode, this.followList);
      for (let i = 0; i < this.allRfsCode.length; i++) {
        for (let j = 0; j < this.followList.length; j++) {
          if (this.allRfsCode[i] === this.followList[j][this.classCode]) {
            // console.log(i);
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
    $api.DashboardApi.areaData(params).then( (res: any) => {
      // console.log(res);
      // 大区去重console.log
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
      // console.log(this.liuziXaxisData, this.allRfsCode);
      this.getBigArea();
    });
  }

  // 上树后初始化Echart
  private mounted() {
    // this.onFollowRuleChange();
    // window.onresize = () => {
    //   this.trackEchart.resize();
    // };
  }

  // Echart初始化执行函数
  public winGuestFollowEchartInit() {
    this.trackEchart = this.$echarts.init(this.$refs.ColumnChart);
    this.followBarEchart();
  }
  // Echart初始化
  public followBarEchart() {
    this.trackEchart.clear();
    let options: any = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#F9F9F9',
        padding: [30, 20],
        formatter: (params: any, ticket: string): string => {
          let str: string = `<div style="width: 480px; height: 40px;"><span style="color:#666666; line-height:34px; ">${params[0].name}</span><span style="margin-left: 30px; color:#666666; line-height:34px;">${this.time.type}</span></div>`;
          params.forEach((item: any) => {
            str += `<br/><div style="width: 480px; height: 40px; display: flex; align-item: center;"><span style="display:inline-block;margin-right:20px;width:40px;height:40px;background-color:${item.color}; "></span style=" font-size: 28px;">${item.seriesName} : <span style="display:inline-block; width: 40px; height: 40px; font-size: 28px; margin-left: 70px;">${item.value}</span></div>`;
          });
          str += `<br/>跟进率：${params[1].value ? (100 * params[0].value / params[1].value).toFixed(2) + '%' : 0}`;
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
      dataZoom: [
        {
          start: 0,
          end: this.showMount = this.allRfsCode.length <= 4 ? 100 : Math.round(4 / this.allRfsCode.length * 100),
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          handleSize: 0,    //滑动条的 左右2个滑动条的大小
          height: 10,   //组件高度
          borderColor: '#000',
          fillerColor: '#269cdb',
          borderRadius: 10,
          backgroundColor: '#33384b',     //两边未选中的滑动条区域的颜色
          showDataShadow: false,    //是否显示数据阴影 默认auto
          // realtime: false,  //是否实时更新
          // filterMode: 'none',
          // zoomLock: true,
          // animation: true,
          // throttle: 50,

        },
        {
          type: 'inside',
          show: true,
          xAxisIndex: [0],
          start: 0, //默认为1
          end: 50, //默认为100
        },
      ],
      xAxis: [
        {
          offset: 70,
          position: 'top',
          type: 'category',
          axisLabel: {
            interval: 0,
            formatter: (params: any) => {
              // console.log(params);
              let arr: any = params.split('-');
              // console.log(arr);
              let area: string = arr[0];
              let name: string = arr[1] || '';
              let str = '{a|' + area + '}\n\n{b|' + name + '}';
              return str;
            },
            rich: {
              a: {
                color: '#FFF',
                fontSize: 32
              },
              b: {
                color: '#666',
                fontSize: 28
              }
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
          data: this.liuziXaxisData,
            // this.brandId.toString() === '100'
            //   ? this.followXaxisData
            //   : this.liuziXaxisData,
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
          : this.liuziSeriesData,
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
      bottom: 3%;
      width: 700px;
      height: 50px;
      // background-color: rgba($color: #fff, $alpha: 0.5);
      left: 1100px;
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
      p:nth-Child(2) {
        left: 400px;
      }
      p:nth-Child(3) {
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
  img{
    position: absolute;
    display: block;
    top: 0;left: 0;bottom: 0;right: 0;
    margin: auto;
  }
}

</style>
