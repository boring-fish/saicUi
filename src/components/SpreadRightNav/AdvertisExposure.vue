<template>
  <div>
    <div class="advitiseTitle">
      广告投放曝光量
      <div class="adboost-pv" @click="jump">
        费用盘点
      </div>
    </div>
    <div class="advitise">
      <div class="advitise-l">
        <div class="goalNumber">
          <h6>曝光量</h6>
          <p class="advitiseTotal">
            <span>{{ advitiseData.exposeData }}</span>
            {{ advitiseData.exposeDataUnit }}
          </p>
          <p class="tbys">
            同比
            <span class="iconfont iconxiajiang" v-if="this.tbzt===1" :class="tbcolor === 1 ? 'red' : tbcolor === 2 ? 'yellow' : tbcolor === 3 ? 'green' : 'white'"></span>
            <span class="iconfont iconshangsheng" v-else-if="this.tbzt===0" :class="tbcolor === 1 ? 'red' : tbcolor === 2 ? 'yellow' : tbcolor === 3 ? 'green' : 'white'"></span>

            <span class ="textsize" :class="tbcolor === 1 ? 'red' : tbcolor === 2 ? 'yellow' : tbcolor === 3 ? 'green' : 'white'">{{ advitiseData.tbData }}</span
            >
          </p>
          <p class="tbys">
            环比
            <span class="iconfont iconxiajiang" v-if="this.hbzt===1" :class="hbcolor === 1 ? 'red' : hbcolor === 2 ? 'yellow' : hbcolor === 3 ? 'green' : 'white'"></span>
            <span class="iconfont iconshangsheng" v-else-if="this.hbzt===0" :class="hbcolor === 1 ? 'red' : hbcolor === 2 ? 'yellow' : hbcolor === 3 ? 'green' : 'white'"></span>
            <span class ="textsize" :class="hbcolor === 1 ? 'red' : hbcolor === 2 ? 'yellow' : hbcolor === 3 ? 'green' : 'white'" >{{ advitiseData.hbData }}</span
            >
          </p>
        </div>
        <div class="goalNumber">
          <h6>目标曝光量</h6>
          <p class="advitiseTotal">
            <span
              >{{ advitiseData.goalExposeData
              }}</span>{{ advitiseData.goalExposeDataUnit }}
          </p>
          <p class="tbys">
            完成率
             <span class ="textsize whites" v-if="advitiseData.finishData==='—'" >{{ advitiseData.finishData }}</span
            >
             <span class ="textsize" v-else :class="fztcolor === 1 ? 'red' : fztcolor === 2 ? 'yellow' : fztcolor === 3 ? 'green' : 'white'" >{{ advitiseData.finishData }}</span
            >
          </p>
        </div>
      </div>
      <div id="advitiser"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { calculation, numberFormat, finishingRate, decideColor } from '@/utils/utils.ts';
interface TIMERANGE {
  key: string;
  type: string;
}

@Component({})
export default class AdvertisExposure extends Vue {
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
      all: 'all',
    },
  })
  currentArea!: object;

  @Watch('brandName')
  brandNameChange() {
    this.getAdvitiserData();
  }
  @Watch('time.key')
  brandTimeKeyChange() {
    this.getAdvitiserData();
  }

  @Watch('currentArea')
  areaChange() {
    this.getAdvitiserData();
  }
  advitiserseries: Array<object> = [];

  tbzt: number = 0;
  tbcolor: any = 0;
  hbzt: number = 0;
  hbcolor: any = 0;
  fzt: number = 0;
  fztcolor: any = 0;
  advitiseData: any = {};
  public $echarts: any;
  actualData: any = {};
  private mounted() {
    this.getKthData();
    this.getAdvitiserData();
  }
  public advitiserEchartsinit(res: any) {
    const advitiser = document.getElementById('advitiser');
    const advitiserchart: any = this.$echarts.init(advitiser);
    let options: any = {
      color: [
        '#1464C8',
        '#B39933',
        '#12B5C0',
        '#04A063',
        '#EBCD52',
        '#4EDFD1',
        '#89E388',
        '#236BB4',
        '#F27A7A',
        '#6BC7E6',
        '#65A7EA',
        '#E63504',
        '#FCCE00',
        '#00ECFF',
        '#236BB4',
      ],
      series: [
        {
          type: 'pie',
          radius: ['45%', '60%'],
          top: 20,
          avoidLabelOverlap: true,
          label: {
            interval: 0,
            fontSize: 24,
            color: '#FFFFFF',
            formatter: (val: any): any => {
              let str: String = '';
              if (val.data.index <= 10) {
                str = '{a| ' + val.name + '}   {b|' + val.percent + '%}';
              } else {
                str = '{a| ' + val.name + '}';
              }
              return str;
            },
            rich: {
              a: {
                fontSize: 28,
                fontFamily: 'PingFangSC-Regular,PingFang SC',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.6)',
                height: 40,
                lineHeight: 40,
              },
              b: {
                fontSize: 28,
                fontFamily: 'PingFangSC-Regular,PingFang SC',
                fontWeight: 500,
                color: 'rgba(255,255,255,1)',
                width: 92,
                height: 40,
                lineHeight: 40,
              },
            },
          },

          emphasis: {
            label: {
              show: true,
              color: '#FFFFFF',
              fontSize: 36,
            },
          },
          labelLine: {
            show: true,
            length: 80,
            lineStyle: {
              width: 3,
            },
          },
          data: res,
        },
      ],
    };
    setTimeout(() => {
      advitiserchart.setOption(options);
    }, 100);
    window.onresize = () => {
      advitiserchart.resize();
    };
  }
   //获取目标，同比，环比阈值
  getKthData() {
    let params = {
      module: '曝光'
    };
    $api.DashboardApi.configuration(params).then((res: any) => {
      this.actualData = res.datas[0];
    });
  }
  //广告投放曝光量数据
  getAdvitiserData() {
     //初始化色值
    this.tbcolor = 0;
    this.hbcolor = 0;
    this.fztcolor = 0;
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      channel: true,
    };
    let paramsTarget: any = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    if (Object.keys(this.currentArea)[0] === 'rfsCode') {
        paramsTarget.rfsCodes = Object.values(this.currentArea)[0];
    } else if (Object.keys(this.currentArea)[0] === 'macCode') {
      paramsTarget.macCodes = Object.values(this.currentArea)[0];
    }
    let goalImpData: any = 0,
      finishData: any = '—';
      //获取目标数据
    $api.DashboardApi.spreadKpi(paramsTarget).then((res: any) => {
      if (res.now.length !== 0 && res.now[0] !== null) {
        res.now.forEach((item: any, index: any) => {
          goalImpData = goalImpData + item.imp;
        });
      } else {
        goalImpData = 0;
      }
    });
    $api.DashboardApi.spreadData2(params)
      .then((res: any) => {
        let exposeData: Number = 0,
          implastData: Number = 0,
          impData: any = 0,
          implastYearData: Number = 0,
          tbrate: any = '',
          hbrate: any = '',
          advitiserseries: Array<any> = [];
        if (res.now.length !== 0) {
          res.now.sort(function(a: any, b: any) {
            return b.imp - a.imp;
          });
          res.now.forEach((item: any, index: any) => {
            if (index < 10) {
              advitiserseries[index] = {
                value: item.imp,
                name: item.channel,
                index: index,
              };
            }
            impData = impData + item.imp;
          });
        } else {
          impData = 0;
        }
        //同比
        if (res.lsatYear.length !== 0) {
          res.lsatYear.forEach((item: any, index: any) => {
            implastYearData = implastYearData + res.lsatYear[index].imp;
          });
          let tb = calculation(impData, implastYearData);
           if (this.actualData) {
                 this.tbcolor = decideColor(tb, this.actualData.lastAlarmCycle, this.actualData.lastEarlyWarCycle, this.actualData.lastAlarmCycleSymbol);
                } else {
                this.tbcolor = 0;
                }
         
           if (tb === '') {
            this.tbzt = 2;
            tbrate = '—';
          } else if (tb.startsWith('-')) {
            this.tbzt = 1; //0正1负
             tbrate = this.negative(tb);
          } else {
            this.tbzt = 0;
             tbrate = this.negative(tb);
          }
         
        } else {
          tbrate = '—';
          this.tbzt = 2;
        }
        //环比
        if (res.last.length !== 0) {
          res.last.forEach((item: any, index: any) => {
            implastData = implastData + res.last[index].imp;
          });
          let hb = calculation(impData, implastData);
            if (this.actualData) {
                this.hbcolor = decideColor(hb, this.actualData.ringAlarmCycle, this.actualData.ringEarlyWarCycle, this.actualData.ringAlarmCycleSymbol);
                } else {
                this.hbcolor = 0;
                }
          if (hb.startsWith('-')) {
            this.hbzt = 1; //0正1负
          } else {
            this.hbzt = 0;
          }
          hbrate = this.negative(hb);
        } else {
          hbrate = '—';
          this.hbzt = 2;
        }
          if (this.actualData) {
                this.fztcolor = decideColor(finishingRate(impData, goalImpData), this.actualData.kpiAlarmCycle, this.actualData.kpiEarlyWarCycle, this.actualData.kpiAlarmCycleSymbol);
                } else {
                this.fztcolor = 0; 
                }
        this.advitiseData = {
          exposeData: numberFormat(impData).value,
          exposeDataUnit: numberFormat(impData).unit,
          goalExposeData: numberFormat(goalImpData).value,
          goalExposeDataUnit: numberFormat(goalImpData).unit,
          tbData: tbrate,
          hbData: hbrate,
          finishData: goalImpData ? finishingRate(impData, goalImpData) : '—',
        };
        this.advitiserEchartsinit(advitiserseries);
      })
      .catch((e) => {
        // console.log(e);
      });
  }
  //负号的处理
  negative(value: any) {
    if (value.startsWith('-')) {
      return value.split('-')[1];
    } else {
      return value;
    }
  }

  jump() {
    window.open('https://adboost-pv.saicmotor.com/kanban/digitalDeliveryCost');
  }
}
</script>

<style lang="scss">
.advitiseTitle {
  font-size: 36px;
  color: rgba(255, 255, 255, 1);
  border-bottom: 2px solid #1e2237;
  padding: 30px 40px 20px !important;
  position: relative;
  .adboost-pv {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    background: #236bb4;
    top: 21px;
    right: 69px;
    width: 202px;
    height: 60px;
    color: #fff;
    font-size: 28px;
    cursor: pointer;
    border: 2px solid rgba(58, 66, 99, 1);
  }
}
.advitise {
  width: 100%;
  height: 700px;
  display: flex;
  color: #ffffff;
  font-size: 24px;
  p {
    font-size: 32px /* 36/100 */;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border-bottom: none;
  }

  .iconshangsheng {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    font-size: 24px /* 24/100 */;
    margin-left: 5px /* 5/100 */;
  }
  .iconxiajiang {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    font-size: 24px /* 24/100 */;
    margin-left: 5px /* 5/100 */;
  }
 .textsize{
      font-size: 24px;
      margin-left: 5px;
    }
    .red{
      color: rgba(255, 113, 118, 1);
    }
    .green{
      color: rgba(86, 216, 132, 1);
    }
    .yellow {
             color: #FFC72F ;
           }

    .white {
             color: #ffffff;
           }
  .none {
    display: none;
  }

  .goalNumber {
    padding: 100px 0 20px 0;
    .tbys {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.4);
    }
  }
  h6 {
    font-size: 32px ;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(248, 249, 249, 1);
  }
  span {
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    font-size: 68px;
  }
  .whites {
    font-weight: 10;
    color: rgba(255, 255, 255, 1);
    font-size: 24px;
    margin-left: 10px;
  }
  .tong {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(86, 216, 132, 1);
    font-size: 24px /* 32/100 */;
    margin-left: 3px /* 5/100 */;
  }
  .huan {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 113, 118, 1);
    font-size: 24px /* 32/100 */;
    margin-left: 3px /* 5/100 */;
  }
  // .green {
  //   font-family: PingFangSC-Regular, PingFang SC;
  //   font-weight: 400;
  //   color: rgba(86, 216, 132, 1);
  //   .red {
  //     font-family: PingFangSC-Regular, PingFang SC;
  //     font-weight: 400;
  //     color: rgba(255, 113, 118, 1);
  //   }
  // }
  .advitise-l {
    width: 30%;
    height: 700px;
    padding-left: 200px;
  }
}
#advitiser {
  width: 60%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
