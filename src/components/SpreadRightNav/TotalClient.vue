<template>
  <div class="totalClient-wrap">
    <p>总兴趣</p>
    <div class="totalClientnumber">
      <span>{{totalNum}}</span>
      <span>{{totalUnit}}</span>
    </div>
    <div id="totalClient"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { numberFormat } from '@/utils/utils.ts';

interface TIMERANGE {
  key: string;
  type: string;
}

@Component({})
export default class TotalClient extends Vue {
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

  public totalClientSeries: Array<Object> = [];
  public totalClientLegend: any = ['新访客', '老访客'];
  totalNum: any = 0;
  totalUnit: any = '';

  public $echarts: any;

  @Watch('brandName')
  brandNameChange() {
    this.getspreadClientData();
  }
  @Watch('time.key')
  brandTimeKeyChange() {
    this.getspreadClientData();
  }
  @Watch('currentArea')
  areaChange() {
    this.getspreadClientData();
  }

  private mounted() {
    this.getspreadClientData();
  }
  public totalClientEchartsinit() {
    const totalClient = document.getElementById('totalClient');
    const totalClientchart: any = this.$echarts.init(totalClient);
    let options: any = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        textStyle: {
          fontSize: 36
        }
      },
      color: ['#1464C8', '#B39933'],
      series: [
        {
          type: 'pie',
          radius: ['55%', '65%'],
          // minAngle: 20,
          top: 20,
          avoidLabelOverlap: true,
          label: {
            interval: 0,
            fontSize: 24,
            color: '#FFFFFF',
            formatter: (val: any): any => {
              let param = numberFormat(val.data.value);
              let str: String =
                '{a| ' +
                val.name +
                '}\n{b|' +
                param.value +
                param.unit +
                '}{b|' +
                '  ' +
                val.percent +
                '%}';
              return str;
            },
            rich: {
              a: {
                fontSize: 28,
                fontFamily: 'PingFangSC-Regular,PingFang SC',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.6)',
                width: 56,
                height: 40,
                lineHeight: 40
              },
              b: {
                fontSize: 28,
                fontFamily: 'PingFangSC-Regular,PingFang SC',
                fontWeight: 500,
                color: 'rgba(255,255,255,1)',
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
            length: 50,
            lineStyle: {
              width: 3
            }
          },
          data: this.totalClientSeries
        }
      ]
    };
    setTimeout(() => {
      totalClientchart.setOption(options);
    }, 100);
    window.onresize = () => {
      totalClientchart.resize();
    };
  }
  private destroyed() {
    window.onresize = null;
  }
  //传播访客数据
  getspreadClientData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.spreadData2(params)
      .then((res: any) => {
        this.totalClientSeries = [
          { name: '新访客', value: res.now[0].newVisitors },
          { name: '老访客', value: res.now[0].oldVisitors }
        ];
        let totalvalue: any = 0;
        let that = this;
        this.totalClientSeries.forEach(function(v: any, i: any) {
            totalvalue += Number(v.value);
        });
          that.totalNum = numberFormat(totalvalue).value;
          that.totalUnit = numberFormat(totalvalue).unit;
        this.totalClientEchartsinit();
      })
      .catch(e => {
        this.totalClientSeries = [
          { name: '新访客', value: '' },
          { name: '老访客', value: '' }
        ];
         this.totalNum = '——';
          this.totalUnit = '';
        this.totalClientEchartsinit();
      });
  }
}
</script>

<style lang="scss">
.totalClient-wrap {
  height: 100%;
  
  position: relative;
  .totalClientnumber {
   width: 44%;
    height: 55%;
    position: absolute;
    left: 28%;
    top: 30%;
    display: flex;
    justify-content: center;
    align-items: center;


    span:nth-child(1) {
      color: rgba(255, 255, 255, 1);
      font-family: "Helvetica-Bold,Helvetica";
      font-size: 72px;
      font-weight: bold;
    }
    span:nth-child(2) {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin: 10px 0 0 15px;
    }
  }
  p {
    font-size: 36px;
    color: rgba(255, 255, 255, 1);
    border-bottom: 2px solid #002f3b;
    padding: 30px 40px 20px !important;
  }
  #totalClient {
    width: 100%;
    height: 700px;
  }
}
</style>

