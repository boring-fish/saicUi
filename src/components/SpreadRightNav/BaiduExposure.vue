<template>
  <div class="baiduexposure-warp">
    <p>百度曝光量</p>
    <div class="baiduexposure">
      <div class="baiduexposure-l">
        <div class="goalNumber">
          <h6>曝光量</h6>
          <p>
            <span>{{ baiduexposureData.exposeData }}</span>
            {{ baiduexposureData.exposeDataUnit }}
          </p>
          <p class="tbys">
            同比
            <span class="iconfont iconxiajiang" v-if="this.tbzt===1" :class="tbcolor === 1 ? 'red' : tbcolor === 2 ? 'yellow' : tbcolor === 3 ? 'green' : 'white'"></span>
            <span class="iconfont iconshangsheng" v-else-if="this.tbzt===0" :class="tbcolor === 1 ? 'red' : tbcolor === 2 ? 'yellow' : tbcolor === 3 ? 'green' : 'white'"></span>
            <span class ="textsize" :class="tbcolor === 1 ? 'red' : tbcolor === 2 ? 'yellow' : tbcolor === 3 ? 'green' : 'white'">{{ baiduexposureData.tbData }}</span
            >
          </p>
          <p class="tbys">
            环比
            <span class="iconfont iconxiajiang" v-if="this.hbzt===1" :class="hbcolor === 1 ? 'red' : hbcolor === 2 ? 'yellow' : hbcolor === 3 ? 'green' : 'white'"></span>
            <span class="iconfont iconshangsheng" v-else-if="this.hbzt===0" :class="hbcolor === 1 ? 'red' : hbcolor === 2 ? 'yellow' : hbcolor === 3 ? 'green' : 'white'"></span>
            <span class ="textsize" :class="hbcolor === 1 ? 'red' : hbcolor === 2 ? 'yellow' : hbcolor === 3 ? 'green' : 'white'" >{{ baiduexposureData.hbData }}</span
            >
          </p>
        </div>
        <div class="goalNumber">
          <h6>目标曝光量</h6>
          <p>
            <span>{{ baiduexposureData.goalExposeData }}</span>{{ baiduexposureData.goalExposeDataUnit }}
          </p>
          <p class="tbys">
            完成率
            <span class ="textsize whites" v-if="baiduexposureData.finishData==='—'" >{{ baiduexposureData.finishData }}</span
            >
             <span class ="textsize" v-else :class="fztcolor === 1 ? 'red' : fztcolor === 2 ? 'yellow' : fztcolor === 3 ? 'green' : 'white'" >{{ baiduexposureData.finishData }}</span
            >
          </p>
        </div>
      </div>
      <div id="wordcloud"></div>
    </div>

  </div>
</template>

<script lang="ts">
import 'echarts-wordcloud/dist/echarts-wordcloud';
import 'echarts-wordcloud/dist/echarts-wordcloud.min';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { calculation, numberFormat, finishingRate, decideColor} from '@/utils/utils.ts';

interface TIMERANGE {
  key: string;
  type: string;
}
// import {  } from '@/components'; // 组件

@Component({})
export default class BaiduExposure extends Vue {
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
    this.getBaiduData();
  }
  @Watch('time.key')
  brandTimeKeyChange() {
    this.getBaiduData();
  }

  @Watch('currentArea')
  areaChange() {
    this.getBaiduData();
  }
  public $echarts: any;
  actualData: any = {};
  tbzt: any = 0;
  tbcolor: any = 0;
  hbzt: any = 0;
  hbcolor: any = 0;
  fzt: any = 0;
  fztcolor: any = 0;
  baiduexposureData: any = {};
  mounted() {
    this.getKthData();
    this.getBaiduData();
  }
  initBaiduChart(data: any) {
    let chart = this.$echarts.init(document.getElementById('wordcloud'));
    const option = {
      series: [
        {
          type: 'wordCloud',
          gridSize: 20,
          sizeRange: [24, 100],
          shape: 'diamond',
          rotationRange: [0, 0],
          // maskImage: maskImage,
          textStyle: {
            normal: {
              color: function() {
                return (
                  'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ')'
                );
              },
            },
          },
          left: 'center',
          top: 'center',
          // right: null,
          // bottom: null,
          width: '200%',
          height: '190%',
          data: data,
        },
      ],
    };
    chart.setOption(option);
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
  getBaiduData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      groups: 'channel',
      channel: '百度',
    };
    let cloundparams = {
      brandId: this.brandId,
      type: this.time.key,
    };
  
     let paramsTarget: any = {
      brandId: this.brandId,
      type: this.time.key,
      groups: 'channel',
      channel: '百度',
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
      cloundparams = Object.assign(cloundparams, this.currentArea);
    }
     if (Object.keys(this.currentArea)[0] === 'rfsCode') {
        paramsTarget.rfsCodes = Object.values(this.currentArea)[0];
    } else if (Object.keys(this.currentArea)[0] === 'macCode') {
      paramsTarget.macCodes = Object.values(this.currentArea)[0];
    }
     let  goalImpData: any = 0,
      finishData: any = '—';
      //获取目标曝光量
    $api.DashboardApi.spreadKpi(paramsTarget).then((res: any) => {
      if (res.now.length !== 0 && res.now[0] !== null) {
        res.now.forEach((item: any, index: any) => {
          goalImpData = goalImpData + item.imp;
        });
      } else {
        goalImpData = 0;
      }
    });
   //获取曝光量
    $api.DashboardApi.spreadData3(params)
      .then((res: any) => {
        //初始化色值
       this.tbcolor = 0;
       this.hbcolor = 0;
       this.fztcolor = 0;
       let implastData: Number = 0,
          impData: any = 0,
          implastYearData: Number = 0,
          tbrate: any = '',
          hbrate: any = '';
        if (res.now[0] !== null && res.now.length !== 0) {
          res.now.forEach((item: any, index: any) => {
            impData = impData + item.imp;
          });
        } else {
          impData = 0;
        }
        //同比
        if (res.lsatYear[0] !== null && res.lsatYear.length !== 0) {
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
        if (res.last[0] !== null && res.last.length !== 0) {
          res.last.forEach((item: any, index: any) => {
            implastData = implastData + res.last[index].imp;
          });
          let hb = calculation(impData, implastData);
             if (this.actualData) {
                this.hbcolor = decideColor(hb, this.actualData.ringAlarmCycle, this.actualData.ringEarlyWarCycle, this.actualData.ringAlarmCycleSymbol);
                } else {
                this.hbcolor = 0; 
                }
         
          if (hb === '') {
            this.hbzt = 2;
            hbrate = '—';
          } else if (hb.startsWith('-')) {
            this.hbzt = 1; //0正1负
            hbrate = this.negative(hb);
          } else {
            this.hbzt = 0;
            hbrate = this.negative(hb);
          }
        } else {
          hbrate = '—';
          this.hbzt = 2;
        }
         if (this.actualData) {
                this.fztcolor = decideColor(finishingRate(impData, goalImpData), this.actualData.kpiAlarmCycle, this.actualData.kpiEarlyWarCycle, this.actualData.kpiAlarmCycleSymbol);
                } else {
                this.fztcolor = 0; 
                }
        this.baiduexposureData = {
          exposeData: numberFormat(impData).value,
          exposeDataUnit: numberFormat(impData).unit,
          goalExposeData: numberFormat(goalImpData).value,
          goalExposeDataUnit: numberFormat(goalImpData).unit,
          tbData: tbrate,
          hbData: hbrate,
         finishData: goalImpData ? finishingRate(impData, goalImpData) : '—',

        };
        if (res.now[0] === null) {
          this.baiduexposureData.exposeData = '—';
        }
      })
      .catch((e) => {
        // console.log(e);
      });
    //获取词云数据
    $api.DashboardApi.spreadCloudData(cloundparams)
      .then((res: any) => {
        let baiduseries: Array<any> = [];
        if (res.now.length !== 0) {
          res.now.forEach((item: any, index: any) => {
            baiduseries[index] = {
              value: item.click,
              name: item.adslot,
            };
          });
        }

        this.initBaiduChart(baiduseries);
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
}
</script>

<style lang="scss">
.baiduexposure-warp {
  width: 100%;
  height: 100%;
  position: relative;
  p {
    font-size: 36px;
    color: rgba(255, 255, 255, 1);
    border-bottom: 2px solid #002f3b;
    padding: 30px 40px 20px !important;
  }
  .baiduexposure {
    width: 100%;
    height: 700px;
    display: flex;
    color: #ffffff;
    font-size: 24px;
    p {
      font-size: 32px;
      color: rgba(255, 255, 255, 1);
      border-bottom: none;
      padding: 0 !important;
    }
    .iconshangsheng {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
     
      font-size: 24px /* 24/100 */;
      margin-left: 5px;
    }
    .iconxiajiang {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      font-size: 24px;
      margin-left: 5px;
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
             color: #FFC72F  ;
           }

    .white {
             color: #ffffff;
           }
    .goalNumber {
      padding: 100px 0 20px 0;
      .tbys {
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.4);
        width: 266px;
      }
    }
    h6 {
      font-size: 32px;
      font-weight: 100;
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
    .none {
      display: none;
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
    .baiduexposure-l {
      width: 30%;
      height: 700px;
      padding-left: 200px;
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
  #wordcloud {
    width: 100%;
    height: 100%;
  }
}
</style>
