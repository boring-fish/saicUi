<template>
  <div class="sceneTab-warp box-bg-border">
    <span class="border border-top-left"></span>
    <span class="border border-top-right"></span>
    <span class="border border-bottom-left"></span>
    <span class="border border-bottom-right"></span>
    <SceneHeader :title="title"></SceneHeader>
    <div class="sceneTabd">
      <div class="sceneTabdleft">
        <p class="tabsum">标签使用总数</p>
        <p>
          <span class="tabsumzb">{{tabTital.tabsumzb}}</span>
          <span class="tabsumz">/</span>
          <span class="tabsumz">{{tabTital.tabsumz}}</span>
        </p>
        <p class="tabmake">
          标签使用率
          <span class="tabmakesz">{{tabTital.tabmakeRate}}</span>
        </p>
        <p class="tabsumtype">标签总户数</p>
        <p class="tabsumz">
          <span class="tabsumzb">{{tabTital.tabmakeSumvalue}}</span>&nbsp;{{tabTital.tabmakeSumunit}}
        </p>
      </div>
      <div id="sceneTabdRight"></div>
      <!-- </div> -->
    </div>
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
export default class SceneTab extends Vue {
  title: String = '标签';
  tabTital: object = {
      tabsumzb: 295,
      tabsumz: 362,
      tabmakeRate: '97.32%',
       tabmakeSumvalue: 80,
       tabmakeSumunit: '万'
  };
  seriesDataRate: Array<number> = [];
  seriesDataRateZt: Array<number> = [0, 1, 1, 1, 0, 0, 1, 1];
  seriesData: Array<number> = [65, 36, 64, 93, 73, 42, 65, 65];
  seriesDataSum: Array<number> = [86, 39, 140, 143, 82, 65, 76, 238];
  xdata: any = [
    '用户购买意向程度',
    '用户购买意向偏好',
    '用户渠道形式偏好',
    '用户内容偏好',
    '用户权益偏好',
    '销售代表能力模型',
    '用户满意度评价',
    '其他'
  ];
  public $echarts: any;
  public options: any = {
    color: ['rgba(35,107,180,1)', '#1464C8'],
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
            str += '{per|' + paramsarr[3] + '%}\n';
          } else {
            str += '{per1|' + paramsarr[3] + '%}\n';
          }

          return str;
        },
        rich: {
          a: {
            fontweight: 400,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 24,
            align: 'left'
          },
          b: {
            fontSize: 56,
            align: 'left',
            fontWeight: 'bold',
            color: 'rgba(255,255,255,1)'
          },
          per: {
            fontWeight: 400,
            color: 'rgba(255,113,118,1)',
            fontSize: 24,
            align: 'left'
          },
          per1: {
            fontweight: 400,
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
      y: '27%',
      x: '2%',
      x2: '1%',
      height: 270
    },
    series: {
      data: this.seriesDataRate,
      type: 'bar',
      barWidth: '120',
      barHeight: '282',

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
            fontSize: 24,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)',
            // width: 120
          }
        }
      },
      showBackground: true,
      barGap: 0.13,
      backgroundStyle: {
        color: '#090C15'
      }
    }
  };
  private mounted() {
    this.setdata();
    this.scenechartinit();
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
    const sceneTabdRight = document.getElementById('sceneTabdRight');
    const sceneTabdRightchart: any = this.$echarts.init(sceneTabdRight);
    setTimeout(() => {
      sceneTabdRightchart.clear();
      sceneTabdRightchart.setOption(this.options);
      window.onresize = () => {
        sceneTabdRightchart.resize();
      };
    }, 100);
  }
  private destroyed() {
    window.onresize = null;
  }
}
</script>

<style lang="scss" scoped>
.sceneTab-warp {
  width: 100%;
  height: 700px;
  .sceneTabd {
    padding: 40px 0 40px 60px;
    display: flex;
    .sceneTabdleft {
      color: #ffffff;
      font-size: 28px;
      margin-top: 40px;
      width: 250px;
      .tabsumzb {
        color: rgba(255, 255, 255, 1);
        font-size: 68px;
      }
      .tabmakesz {
        color: rgba(255, 113, 118, 1);
        font-size: 24px;
        margin-left: 10px;
      }
      .tabmake {
        font-size: 24px;
      }
      .tabsumz {
        font-size: 32px;
        margin-left: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
      }
      .tabsumtype {
        margin-top: 70px;
      }
    }
    #sceneTabdRight {
      // background:chartreuse;
      width: 100%;
      height: 550px;
      // margin-left: 20px;
    }
  }
}
</style>
