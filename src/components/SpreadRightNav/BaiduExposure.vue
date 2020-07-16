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
            <span
              :class="
                this.tbzt > 0
                  ? this.tbzt != 2
                    ? 'iconfont iconxiajiang'
                    : 'none'
                  : 'iconfont iconshangsheng'
              "
            ></span>
            <span
              :class="
                this.tbzt > 0 ? (this.tbzt != 2 ? 'huan' : 'whites') : 'tong'
              "
              >{{ baiduexposureData.tbData }}</span
            >
          </p>
          <p class="tbys">
            环比
            <span
              :class="
                this.hbzt > 0
                  ? this.hbzt != 2
                    ? 'iconfont iconxiajiang'
                    : 'none'
                  : 'iconfont iconshangsheng'
              "
            ></span>
            <span
              :class="
                this.hbzt > 0 ? (this.hbzt != 2 ? 'huan' : 'whites') : 'tong'
              "
              >{{ baiduexposureData.hbData }}</span
            >
          </p>
        </div>
        <div class="goalNumber">
          <h6>目标曝光量</h6>
          <p>
            <span>{{ baiduexposureData.goalExposeData }}</span>
          </p>
          <p class="tbys">
            完成率
            <span
              :class="
                this.fzt > 0
                  ? this.fzt != 2
                    ? 'iconfont iconxiajiang'
                    : 'none'
                  : 'iconfont iconshangsheng'
              "
            ></span>
            <span
              :class="
                this.fzt > 0 ? (this.fzt != 2 ? 'huan' : 'whites') : 'tong'
              "
              >{{ baiduexposureData.finishData }}</span
            >
          </p>
        </div>
      </div>
      <div id="wordcloud"></div>
    </div>

    <!-- <img src="../../assets/img/expect.png" alt=""> -->
  </div>
</template>

<script lang="ts">
import 'echarts-wordcloud/dist/echarts-wordcloud';
import 'echarts-wordcloud/dist/echarts-wordcloud.min';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { calculation, numberFormat } from '@/utils/utils.ts';

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
  tbzt: any = 2;
  hbzt: any = 2;
  fzt: any = 2;
  baiduexposureData: object = {};
  mounted() {
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
  //广告投放曝光量数据
  getBaiduData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.spreadCloudData(params)
    
      .then((res: any) => {
        let exposeData: Number = 0,
          clicklastData: Number = 0,
          clickNum: Number = 0,
          clicklastYearData: Number = 0,
          tbrate: any = '',
          hbrate: any = '',
          baiduseries: Array<any> = [];
        if (res.now.length !== 0) {
          res.now.forEach((item: any, index: any) => {
            baiduseries[index] = {
              value: item.click,
              name: item.adslot,
            };
            clickNum = clickNum + item.click;
          });
        } else {
          clickNum = 0;
        }
        //同比
        if (res.lastYear.length !== 0) {
          res.lastYear.forEach((item: any, index: any) => {
            clicklastYearData = clicklastYearData + res.lastYear[index].click;
          });
          let tb = calculation(clickNum, clicklastYearData);
          if (tb.startsWith('-')) {
            this.tbzt = 1; //0正1负
            tbrate = this.negative(tb);
          } else if (tb === '') {
            tbrate = '——';
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
            clicklastData = clicklastData + res.last[index].click;
          });
          let hb = calculation(clickNum, clicklastData);
          if (hb.startsWith('-')) {
            this.hbzt = 1; //0正1负
            hbrate = this.negative(hb);
          } else if (hb === '') {
            hbrate = '——';
          } else {
            this.hbzt = 0;
            hbrate = this.negative(hb);
          }
        } else {
          hbrate = '—';
          this.hbzt = 2;
        }
        this.baiduexposureData = {
          exposeData: numberFormat(clickNum).value,
          exposeDataUnit: numberFormat(clickNum).unit,
          goalExposeData: '—',
          tbData: tbrate,
          hbData: hbrate,
          finishData: '—',
        };
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
      color: rgba(86, 216, 132, 1);
      font-size: 24px /* 24/100 */;
      margin-left: 5px;
    }
    .iconxiajiang {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 113, 118, 1);
      font-size: 24px;
      margin-left: 5px;
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
      font-size: 16px;
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
