<template>
  <div class="sceneTarget-warp box-bg-border">
    <span class="border border-top-left"></span>
    <span class="border border-top-right"></span>
    <span class="border border-bottom-left"></span>
    <span class="border border-bottom-right"></span>
    <div class="sceneTarget1"></div>
    
    <!-- <SceneHeader :title="title"></SceneHeader>
    <div class="scenetargetd">
      <div class="scenetargetdtop">
        <div class="scenetargetdtopbq" v-for="(item,index) in targetList" :key="index">
          <p class="targetsum">{{item.sumwz}}</p>
          <p>
            <span class="targetsumzb">{{item.sum}}</span>
            <span class="targetsumz">/</span>
            <span class="targetsumz">{{item.totalsum}}</span>
          </p>
          <p class="targetmake">
            {{item.make}}
            <span
              :class="item.zt>0?'targetmakeszRed':'targetmakeszGreen'"
            >{{item.rate}}</span>
          </p>
        </div>
      </div>
      <div id="SceneTarget"></div>
    </div>
    <div class="sceneTargetValue">
      <h6>核心业务指标的指标值</h6>
      <div class="sceneTargetValueContent">
        <div class="sceneTargettiao" v-for="(argettiaoitem,index) in targettiaoList" :key="index">
          <div class="xuhao">{{index+1}}</div>
          <span class="targetname">{{argettiaoitem.name}}</span>
          <span class="targetsum">{{argettiaoitem.sum}}</span>
          <span
            :class="argettiaoitem.zt>0?'targetsumRateRed':'targetsumRateGreen'"
          >{{argettiaoitem.rate}}%</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SceneHeader from './SceneHeader.vue';

@Component({
  components: {
    SceneHeader
  }
})
export default class SceneTarget extends Vue {
  title: String = '指标';
  targetList: Array<object> = [
    {
      sumwz: '标签使用总数',
      sum: '297',
      totalsum: '379',
      make: '标签使用率',
      rate: '91.19',
      zt: 0
    },
    {
      sumwz: '使用人数',
      sum: '297',
      totalsum: '379',
      make: '用户使用率',
      rate: '91.19',
      zt: 1
    }
  ];
  targettiaoList: Array<object> = [
    {
      name: '好友数',
      sum: '201',
      rate: '132.38',
      zt: 0
    },
    {
      name: '好友数',
      sum: '201',
      rate: '132.38',
      zt: 1
    },
    {
      name: '任务执行数',
      sum: '201',
      rate: '132.38',
      zt: 0
    },
    {
      name: '好友数',
      sum: '201',
      rate: '132.38',
      zt: 1
    },
    {
      name: '好友数',
      sum: '201',
      rate: '132.38',
      zt: 0
    }
  ];
  seriesDataRate: Array<number> = [];
  seriesDataRateZt: Array<number> = [0, 1, 1];
  seriesData: Array<number> = [65, 36, 64];
  seriesDataSum: Array<number> = [86, 39, 140];
  xdata: Array<string> = ['关键客户指标', '核心功能指标', '客户画像'];
  public $echarts: any;
  public options: any = {
    color: ['#236BB4'],
    barCategoryGap: '35%',
    xAxis: {
      type: 'category',
      data: this.xdata,
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
          let str =
            '{b|' + paramsarr[1] + '} {a|' + '/' + paramsarr[2] + '}\n\n';
          if (paramsarr[4] === '1') {
            str += '{per|' + paramsarr[3] + '%}\n\n\n';
          } else {
            str += '{per1|' + paramsarr[3] + '%}\n\n\n';
          }

          return str;
        },
        rich: {
          a: {
            fontWeight: 400,
            color: 'rgba(255,255,255,0.59)',
            fontSize: 24,
            align: 'left'
          },
          b: {
            fontWeight: 'bold',
            color: 'rgba(255,255,255,1)',
            fontSize: 56,
            align: 'left'
          },
          per: {
            fontWeight: 400,
            color: 'rgba(255,113,118,1)',
            fontSize: 24,
            align: 'left'
          },
          per1: {
            fontWeight: 400,
            color: 'rgba(86,216,132,1)',
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
      y: '35%',
      x: '1%',
      x2: '1%',
      height: 270
    },
    series: {
      data: this.seriesDataRate,
      type: 'bar',
      barWidth: '120',
      barHeight: '262',

      label: {
        show: true,
        position: 'bottom',
        distance: 20,
        align: 'center',
        formatter: function(params: any): any {
          let paramsarr: any = params.name.split('k');

          let str =
            '{b|' +
            `${paramsarr[0].slice(0, 6)}\n${paramsarr[0].slice(6)}` +
            '}';
          return str;
        },
        fontSize: 24,
        rich: {
          b: {
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 28
          }
        }
      },
      showBackground: true,
      barGap: 0.13,
      backgroundStyle: {
        color: 'rgba(9,12,21,1)'
      }
    }
  };
  private mounted() {
    // this.setdata();
    // this.scenechartinit();
  }
  public setdata() {
    let that = this;
    this.seriesData.forEach(function(item: any, index: number) {
      that.seriesDataRate[index] = Number(
        ((that.seriesData[index] / that.seriesDataSum[index]) * 100).toFixed(2)
      );
      that.xdata[index] +=
        'k' +
        that.seriesData[index] +
        'k' +
        that.seriesDataSum[index] +
        'k' +
        that.seriesDataRate[index] +
        'k' +
        that.seriesDataRateZt[index];
    });
  }
  public scenechartinit(): void {
    const SceneTarget = document.getElementById('SceneTarget');
    const SceneTargetchart: any = this.$echarts.init(SceneTarget);
    setTimeout(() => {
      console.log(this.options);
      SceneTargetchart.clear();
      SceneTargetchart.setOption(this.options);
      window.onresize = () => {
        SceneTargetchart.resize();
      };
    }, 100);
  }
  private destroyed() {
    window.onresize = null;
  }
}
</script>

<style lang="scss" scoped>
.sceneTarget-warp {
  width: 100%;
  height: 100%;
   
    .sceneTarget1{
      width: 100%;
      height: 100%;
      background: url('../../assets/img/expect.png') no-repeat;
      background-position: 55px 45px;
      background-size: 100% 60%;
    }
  .scenetargetd {
    padding: 40px 0 40px 60px;
    border-bottom: 2px solid rgba(58,66,99,1);
    height: 835px;
    .scenetargetdtop {
      color: #ffffff;
      font-size: 28px;
      margin-top: 40px;
      display: flex;
      padding: 0 20px 40px 100px;

      .scenetargetdtopbq {
        width: 50%;
        .targetsumzb {
          color: #0ac9cd;
          font-size: 68px;
        }
        .targetmakeszGreen {
          font-weight: 400;
          color: rgba(255, 113, 118, 1);
          font-size: 24px;
          margin-left: 20px;
        }
        .targetmakeszRed {
          font-weight: 400;
          color: rgba(255, 113, 118, 1);
          font-size: 24px;
          margin-left: 20px;
        }
        .targetmake {
          font-size: 24px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
        }
        .targetsumz {
          font-size: 32px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          margin-left: 5px;
        }
        .tabsumtype {
          margin-top: 70px;
        }
      }
    }
    #SceneTarget {
      width: 100%;
      height: 550px;
      margin-left: 20px;
    }
  }
  .sceneTargetValue {
    padding: 70px 80px;
    h6 {
      color: #ffffff;
      font-size: 32px;
      margin-left: 235px;
    }
    .sceneTargetValueContent {
      width: 100%;
      height: 100%;
      .sceneTargettiao {
        width: 100%;
        height: 155px;
        color: #ffffff;
        font-size: 28px;
        display: flex;
        align-items: center;
        .xuhao {
          width: 52px;
          height: 42px;
          background: rgba(35, 107, 180, 1);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .targetname {
          width: 410px;
          margin-left: 60px;
        }
        .targetsum {
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          font-size: 32px;
        }
        .targetsumRateGreen {
          margin-left: 65px;
          color: #35e967;
          font-size: 24px;
        }
        .targetsumRateRed {
          margin-left: 65px;
          color: #e80404;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
