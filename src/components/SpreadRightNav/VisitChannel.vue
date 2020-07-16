<template>
  <div class="visitt-wrap">
    <div class="visitt">
      <p>各渠道兴趣量</p>
      <div class="visitr">
        <div
          class="visitbutton"
          v-for="(item,index) in visitbutton"
          :key="index"
          :class="index === activeClassIndex ? 'visitbutton2' : ''"
          @click="visitTab(index)"
        >{{item}}</div>
      </div>
    </div>
    <div id="visit"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { calculation, numberFormat } from '@/utils/utils.ts';

interface TIMERANGE {
  key: string;
  type: string;
}
declare function require(imgurl: string): string;
@Component({})
export default class VisitChannel extends Vue {
  @Prop({
    required: false,
    default: ''
  })
  brandName!: string;

  @Prop({
    required: false,
    default: 101
  })
  brandId!: number;

  @Prop({
    required: false,
    default: {}
  })
  time!: TIMERANGE;

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  @Watch('brandName')
  brandNameChange() {
    this.getspreadChannelData();
    this.activeClassIndex = 0;
  }
  @Watch('time.key')
  brandTimeKeyChange() {
    this.getspreadChannelData();
    this.activeClassIndex = 0;
  }
  @Watch('currentArea')
  areaChange() {
    this.getspreadChannelData();
    this.activeClassIndex = 0;
  }

  visitPlanDataset: object = {};
  visitTbDataset: object = {};
  visitHbDataset: object = {};
  // seriesChannel:Array<any>=[];
  activeClassIndex: number = 0;
  public visitbutton: any = ['同比', '环比'];
  public $echarts: any;
  private mounted() {
    this.getspreadChannelData();
  }

  public visitchartinit(res: any): void {
    const visit = document.getElementById('visit');
    const visitchart: any = this.$echarts.init(visit);
    let that = this;
    res.xdata.forEach((item: any, index: any) => {
      let total = res.visitSeries[0].data[index];
      res.xdata[index] = item;
      res.xdata[index] +=
        'k' +
        total +
        'k' +
        res.tablename +
        'k' +
        res.xdatarate[index] +
        'k' +
        res.xdatasj[index];
    });
    setTimeout(() => {
      let options: any = {
        color: ['#12B5C0', '#1464C8'],
        barCategoryGap: '35%',
        legend: {
          data: res.visitLegend,
          bottom: '13%',
          icon: 'roundRect',
          itemHeight: 40,
          itemWidth: 40,
          itemGap: 40,
          formatter: function(name: any): any {
            return '  ' + name;
          },
          textStyle: {
            fontSize: 32,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)'
          }
        },
        dataZoom: [
          {
            type: 'slider',
            realtime: false,
            show: true,
            xAxisIndex: [0],
            moveOnMouseMove: true,
            handleSize: 8,
            left: '4%',
            right: '4%',
            bottom: -5,
            start: 0,
            end: res.jl
          },
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 1,
            end: 40
          }
        ],
        xAxis: {
          type: 'category',
          data: res.xdata,
          minInterval: 10,
          axisTick: 'false',
          axisLine: {
            lineStyle: {
              opacity: 0
            }
          },
          position: 'top',
          axisLabel: {
            color: '#FFFFFF',
            interval: 0,
            formatter: function(params: any): any {
              let paramsarr: any = params.split('k');
              let paramsarrunit = numberFormat(paramsarr[1]).unit;
              paramsarr[1] = numberFormat(paramsarr[1]).value;
              let str =
                '{a|' +
                paramsarr[0] +
                '}\n\n\n{b|' +
                paramsarr[1] +
                '}{c|' +
                paramsarrunit +
                '}\n\n\n{d|' +
                paramsarr[2] +
                '}';
              if (paramsarr[3] !== '——') {
                if (paramsarr[4] === '1') {
                  str +=
                    '  {picture|}    {per|' +
                    paramsarr[3] +
                    '}\n\n{f|' +
                    '' +
                    '}';
                } else if (paramsarr[4] === '0') {
                  str +=
                    '  {picture1|}   {per1|' +
                    paramsarr[3] +
                    '}\n\n{f|' +
                    '' +
                    '}';
                } else {
                  str += '   {per2|' + '——' + '}\n\n{f|' + '' + '}';
                }
              } else {
                str += '   {per2|' + paramsarr[3] + '}\n\n{f|' + '' + '}';
              }

              return str;
            },
            rich: {
              a: {
                color: 'rgba(248,249,249,1)',
                fontSize: 32,
                align: 'left',
                fontWeight: '400'
              },
              b: {
                color: 'rgba(255,255,255,1)',
                fontSize: 68,
                fontWeight: 'bold',
                align: 'left'
              },
              c: {
                color: 'rgba(255,255,255,1)',
                fontWeight: '400',
                fontSize: 32,
                align: 'left'
              },
              d: {
                color: 'rgba(255,255,255,0.4)',
                fontSize: 32,
                fontWeight: '400',
                align: 'left'
              },
              f: {
                align: 'left',
                width: 200
              },
              picture: {
                backgroundColor: {
                  image: require('../../assets/img/xj.png')
                },
                height: 20,
                align: 'left'
              },
              per: {
                color: 'rgba(255,113,118,1)',
                fontWeight: '400',
                fontSize: 24,
                align: 'left'
              },
              picture1: {
                backgroundColor: {
                  image: require('../../assets/img/ss.png')
                },
                height: 20,
                align: 'left'
              },
              per1: {
                color: 'rgba(86,216,132,1)',
                fontWeight: '400',

                fontSize: 24,
                align: 'left'
              },
              per2: {
                color: '#ffffff',
                fontSize: 24,
                align: 'left'
              }
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        grid: {
          x: '1%',
          x2: '1%',
          y: '40%',
          y2: '10%',
          height: 218
        },
        series: res.visitSeries
      };
      visitchart.clear();
      visitchart.setOption(options, true);
      window.onresize = () => {
        visitchart.resize();
      };
    }, 100);
  }
  private destroyed() {
    window.onresize = null;
  }
  public visitTab(index: number) {
    this.activeClassIndex = index;
    switch (index) {
      // case 0:
      //   this.visitchartinit(this.visitPlanDataset);
      //   break;
      case 0:
        this.visitchartinit(this.visitTbDataset);
        break;
      case 1:
        this.visitchartinit(this.visitHbDataset);
        break;
    }
  }
  //各渠道访客量数据
  getspreadChannelData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      channel: true
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.spreadData2(params)
      .then((res: any) => {
        let tbchannel: Array<any> = [],
          planchannel: Array<any> = [],
          hbchannel: Array<any> = [],
          // planexposure:Array<any> = [],
          exposure: Array<any> = [],
          // planexposure:Array<any> = [],
          lastExposure: Array<any> = [],
          lastyearExposure: Array<any> = [],
          xplanrate: Array<any> = [],
          xhbrate: Array<any> = [],
          xtbrate: Array<any> = [],
          xplansj: Array<any> = [],
          xhbsj: Array<any> = [],
          xtbsj: Array<any> = [],
          jl: any = 100;
        if (res.now.length !== 0) {
          if (6 < res.now.length && res.now.length <= 8) {
            jl = 65;
          }
          if (8 < res.now.length && res.now.length <= 13) {
            jl = 45;
          }
          if (13 < res.now.length && res.now.length <= 19) {
            jl = 30;
          }
          if (19 < res.now.length && res.now.length <= 30) {
            jl = 20;
          }
          if (30 < res.now.length && res.now.length <= 40) {
            jl = 10;
          }
          res.now.sort(function(a: any, b: any) {
            return b.exposure - a.exposure;
          });
          res.now.forEach((item: any, index: any) => {
            tbchannel.push(item.channel);
            planchannel.push(item.channel);
            hbchannel.push(item.channel);
            let totalClient = item.newVisitors + item.oldVisitors;
            exposure.push(totalClient);
            lastyearExposure.push(0);
            lastExposure.push(0);
            xtbrate.push('——');
            xhbrate.push('——');
            xhbsj.push('——');
            xtbsj.push('——');
          });
        }
        //同比
        if (res.now.length !== 0) {
          for (let j = 0; j < res.now.length; j++) {
            for (let i = 0; i < res.lsatYear.length; i++) {
              let tb = '';
              if (res.lsatYear[i].channel === res.now[j].channel) {
                lastyearExposure[j] = res.lsatYear[i].exposure;
                tb = calculation(res.now[j].exposure, res.lsatYear[i].exposure);
                if (tb === '') {
                  xtbsj[j] = '——';
                } else if (tb.startsWith('-')) {
                  xtbsj[j] = '1'; //0正1负
                } else {
                  xtbsj[j] = '0';
                }
                xtbrate[j] = this.negative(tb);
              }
              xplanrate.push('——');
            }
          }
        }
        //环比
        if (res.now.length !== 0) {
          for (let j = 0; j < res.now.length; j++) {
            for (let i = 0; i < res.last.length; i++) {
              let hb = '';
              if (res.last[i].channel === res.now[j].channel) {
                lastExposure[j] = res.last[i].exposure;
                hb = calculation(res.now[j].exposure, res.last[i].exposure);
                if (hb === '') {
                  xhbsj[j] = '——';
                } else if (hb.startsWith('-')) {
                  xhbsj[j] = '1'; //0正1负
                } else {
                  xhbsj[j] = '0';
                }
                xhbrate[j] = this.negative(hb);
              }
              xplanrate.push('——');
            }
          }
        }
        // //计划值
        // this.visitPlanDataset = {
        //   visitLegend: ['实际兴趣量', '计划兴趣量'],
        //   tablename: '完成率',
        //   xdata: planchannel,
        //   xdatarate: xplanrate,
        //   xdatasj: xplansj,
        //   jl: jl,
        //   visitSeries: [
        //     {
        //       data: exposure,
        //       name: '实际兴趣量',
        //       type: 'bar',
        //       showBackground: true,
        //       barGap: 0.13,
        //       backgroundStyle: {
        //         color: '#090C15'
        //       }
        //     },
        //     {
        //       data: lastExposure,
        //       name: '计划兴趣量',
        //       type: 'bar',
        //       showBackground: true,
        //       barGap: 0.13,
        //       backgroundStyle: {
        //         color: '#090C15'
        //       }
        //     }
        //   ]
        // };
        //同比
        this.visitTbDataset = {
          visitLegend: ['实际兴趣量', '同比兴趣量'],
          tablename: '同比',
          xdata: tbchannel,
          xdatarate: xtbrate,
          xdatasj: xtbsj,
          jl: jl,
          visitSeries: [
            {
              data: exposure,
              name: '实际兴趣量',
              type: 'bar',
              showBackground: true,
              barGap: 0.13,
              backgroundStyle: {
                color: '#090C15'
              }
            },
            {
              data: lastyearExposure,
              name: '同比兴趣量',
              type: 'bar',
              showBackground: true,
              barGap: 0.13,
              backgroundStyle: {
                color: '#090C15'
              }
            }
          ]
        };
        //环比
        this.visitHbDataset = {
          visitLegend: ['实际兴趣量', '环比兴趣量'],
          tablename: '环比',
          xdata: hbchannel,
          xdatarate: xhbrate,
          xdatasj: xhbsj,
          jl: jl,
          visitSeries: [
            {
              data: exposure,
              name: '实际兴趣量',
              type: 'bar',
              showBackground: true,
              barGap: 0.13,
              backgroundStyle: {
                color: '#090C15'
              }
            },
            {
              data: lastExposure,
              name: '环比兴趣量',
              type: 'bar',
              showBackground: true,
              barGap: 0.13,
              backgroundStyle: {
                color: '#090C15'
              }
            }
          ]
        };
        this.visitchartinit(this.visitTbDataset);
      })
      .catch(e => {
        // console.log(e);
      });
  }
  //负号的处理
  negative(value: any) {
    if (value === '——') {
      return value;
    } else if (value.startsWith('-')) {
      return value.split('-')[1];
    } else {
      return value;
    }
  }
}
</script>

<style lang="scss">
.visitt {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #002f3b;
  p {
    font-size: 36px;
    color: rgba(255, 255, 255, 1);
    border-bottom: 2px solid #1e2237;
    padding: 30px 40px 20px !important;
  }
  .visitr {
    display: flex;
    align-items: center;
    background: rgba(9, 12, 21, 1);
    border-radius: 30px;
    border: 2px solid rgba(58, 66, 99, 1);
    overflow: hidden;
    color: rgba(255, 255, 255, 0.4);
    margin-left: 1400px /* 1466/100 */;
    .visitbutton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 218px /* 218/100 */;
      height: 60px /* 60/100 */;
      color: rgba(255, 255, 255, 0.4);
      font-size: 28px /* 28/100 */;
      cursor: pointer;
    }
    .visitbutton:nth-child(2) {
      border-left: 2px solid rgba(58, 66, 99, 1);
      border-right: 2px solid rgba(58, 66, 99, 1);
    }
    .visitbutton2 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 218px /* 218/100 */;
      height: 60px /* 60/100 */;
      background: #236bb4;
      border: 2px solid #3a4263;
      color: #ffffff;
      font-size: 28px /* 28/100 */;
    }
  }
}
#visit {
  width: 100%;
  height: 700px /* 820/100 */;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

