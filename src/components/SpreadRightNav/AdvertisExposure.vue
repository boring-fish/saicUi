<template>
  <div>
    <p class="advitiseTitle">广告投放曝光量</p>
    <div class="advitise">
      <div class="advitise-l">
        <div class="goalNumber">
          <h6>曝光量</h6>
          <p class="advitiseTotal">
            <span>{{advitiseData.exposeData}}</span>
            {{advitiseData.exposeDataUnit}}
          </p>
          <p class="tbys">
            同比
            <span
              :class="this.tbzt>0?this.tbzt!=2?'iconfont iconxiajiang':'none':'iconfont iconshangsheng'"
            ></span>
            <span :class="this.tbzt>0?this.tbzt!=2?'huan':'whites':'tong'">{{advitiseData.tbData}}</span>
          </p>
          <p class="tbys">
            环比
            <span
              :class="this.hbzt>0?this.hbzt!=2?'iconfont iconxiajiang':'none':'iconfont iconshangsheng'"
            ></span>
            <span :class="this.hbzt>0?this.hbzt!=2?'huan':'whites':'tong'">{{advitiseData.hbData}}</span>
          </p>
        </div>
        <div class="goalNumber">
          <h6>目标曝光量</h6>
          <p class="advitiseTotal">
            <span>{{advitiseData.goalExposeData}}</span>
          </p>
          <p class="tbys">
            完成率
            <span
              :class="this.fzt>0?this.fzt!=2?'iconfont iconxiajiang':'none':'iconfont iconshangsheng'"
            ></span>
            <span :class="this.fzt>0?this.fzt!=2?'huan':'whites':'tong'">{{advitiseData.finishData}}</span>
          </p>
        </div>
      </div>
      <div id="advitiser"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { calculation, numberFormat} from '@/utils/utils.ts';

interface TIMERANGE {
  key: string;
  type: string;
}

@Component({})
export default class AdvertisExposure extends Vue {
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
  hbzt: number = 1;
  fzt: number = 2;
  advitiseData: object = {};
  public $echarts: any;
  
  private mounted() {
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
      '#236BB4'
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
              lineHeight: 40
            },
            b: {
              fontSize: 28,
              fontFamily: 'PingFangSC-Regular,PingFang SC',
              fontWeight: 500,
              color: 'rgba(255,255,255,1)',
              width: 92,
              height: 40,
              lineHeight: 40
            }
          }
        },

        emphasis: {
          label: {
            show: true,
            color: '#FFFFFF',
            fontSize: 36
          }
        },
        labelLine: {
          show: true,
          length: 80,
          lineStyle: {
            width: 3
          }
        },
        data: res
      }
    ]
  };
    setTimeout(() => {
      advitiserchart.setOption(options);
    }, 100);
    window.onresize = () => {
      advitiserchart.resize();
    };
  }
  //广告投放曝光量数据
  getAdvitiserData() {
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
        let exposeData: Number = 0,
          implastData: Number = 0,
          impData: Number = 0,
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
                index: index
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
          if (tb.startsWith('-')) {
            this.tbzt = 1; //0正1负
          } else {
            this.tbzt = 0;
          }
          tbrate = this.negative(tb);
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
        this.advitiseData = {
          exposeData: numberFormat(impData).value,
          exposeDataUnit: numberFormat(impData).unit,
          goalExposeData: '—',
          tbData: tbrate,
          hbData: hbrate,
          finishData: '—'
        };
        this.advitiserEchartsinit(advitiserseries);
      })
      .catch(e => {
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
.advitiseTitle {
  font-size: 36px;
  color: rgba(255, 255, 255, 1);
  border-bottom: 2px solid #1e2237;
  padding: 30px 40px 20px !important;
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
    // padding: 0 !important;
  }

  .iconshangsheng {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(86, 216, 132, 1);
    font-size: 24px /* 24/100 */;
    margin-left: 5px /* 5/100 */;
  }
  .iconxiajiang {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 113, 118, 1);
    font-size: 24px /* 24/100 */;
    margin-left: 5px /* 5/100 */;
  }

  .none {
    display: none;
  }

  .goalNumber {
    padding: 100px /* 40/100 */ 0 20px /* 20/100 */ 0;
    // .advitiseTotal{
    //   margin-top:10px;
    // }
    .tbys {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.4);
    }
  }
  h6 {
    font-size: 032px /* 32/100 */;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(248, 249, 249, 1);
  }
  span {
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    font-size: 68px /* 32/100 */;
  }
  .whites {
    // color: #ffffff;
    font-weight: 10;
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
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

