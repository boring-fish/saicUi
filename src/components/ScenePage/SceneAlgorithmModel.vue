<template>
  <div class="sceneAlgorithmModel-wrap">
    <SceneHeader :title="title"></SceneHeader>
    <div id="sceneAlgorithmModelClient"></div>
    <div id="sceneAlgorithmModelTab"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import SceneHeader from './SceneHeader.vue';

@Component({
  components: {
    SceneHeader
  }
})
export default class SceneAlgorithmModel extends Vue {
  title: String = '算法模型';
  algorithClient: object = {
    xClientdata: ['用户推荐模型',
            '销售过程质检模型',
            '个性化内容推荐模型',
            '客户跟进节奏模型',
            '销售代表最优匹配模型',
            '销售过程话术质检模型',
            '销售话术推荐模型',
            '权益激励匹配模型'],
    clientseriesData: [120, 200, 150, 80, 70, 110, 130, 100]

  };
   algorithTab: object = {
    xTabdata: [
          '用户购买意向度',
          '用户购买意向偏好',
          '用户满意度评价',
          '用户内容偏好',
          '用户渠道形式偏好',
          '销售代表能力属性',
          '用户权益偏好'
        ],
    tabseriesData: [120, 200, 150, 80, 70, 110, 130]

  };
  public $echarts: any;
  mounted() {
    this.sceneClientinit(this.algorithClient);
    this.sceneTabinit(this.algorithTab);
  }
  public sceneClientinit(res: any): void {
    const sceneAlgorithmModelClient = document.getElementById(
      'sceneAlgorithmModelClient'
    );
    const sceneAlgorithmModelClientchart: any = this.$echarts.init(
      sceneAlgorithmModelClient
    );
    setTimeout(() => {
      let options: any = {
        color: ['rgba(78,223,209,1)'],
        title: {
          show: true,
          text: '算法模型触发的客户数',
          x: 'center',
          textStyle: {
            fontSize: 28,
            color: '#ffffff'
          }
        },
        xAxis: {
          show: true,
          offset: 20,
          type: 'category',
          // margin:'20',
          data: res.xClientdata,
          axisLine: {
            lineStyle: {
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)'
            }
          },
          axisLabel: {
            fontSize: 24,
            interval: 0,
            rotate: 20
          }
        },
        grid: {
          x: '10%',
          x2: '5%',
          y: '10%',
          y2: '1%',
          height: 315
        },
        yAxis: {
          show: true,
          type: 'value',
          axisLine: {
            lineStyle: {
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)'
            }
          },
          axisLabel: {
            fontSize: 24,
            formatter: '{value}万'
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            data: res.clientseriesData,
            type: 'bar',
            barWidth: '42'
          }
        ]
      };
      sceneAlgorithmModelClientchart.clear();
      sceneAlgorithmModelClientchart.setOption(options);
      window.onresize = () => {
        sceneAlgorithmModelClientchart.resize();
      };
    }, 100);
  }
  public sceneTabinit(res: any): void {
    const sceneAlgorithmModelTab = document.getElementById(
      'sceneAlgorithmModelTab'
    );
    const sceneAlgorithmModelTabchart: any = this.$echarts.init(
      sceneAlgorithmModelTab
    );
    let options: any = {
      color: ['rgba(137,227,136,1)'],
      // top:20,
      title: {
        show: true,
        text: '算法模型触发的标签更新数',
        x: 'center',
        textStyle: {
          fontSize: 28,
          color: '#ffffff'
        }
      },
      xAxis: {
        offset: 20,
        show: true,
        type: 'category',
        data: res.xTabdata,
        axisLine: {
          lineStyle: {
            fontWeight: 400,
              color: 'rgba(255,255,255,0.6)'
          }
        },
        axisLabel: {
          fontSize: 24,
          interval: 0,
          rotate: 20,
        }
      },
      grid: {
        x: '10%',
        x2: '5%',
        y: '10%',
        y2: '1%',
        height: 315
      },
      yAxis: {
        show: true,
        type: 'value',
        axisLine: {
          lineStyle: {
            fontWeight: 400,
              color: 'rgba(255,255,255,0.6)'
          }
        },
        // data: ['0', '500', '1000', '1500', '2000', '2500'],
        axisLabel: {
          fontSize: 24,
          formatter: function(value: number) {
            return value * 10;
          }
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          data: res.tabseriesData,
          type: 'bar',
          barWidth: '42'
        }
      ]
    };
    setTimeout(() => {
      sceneAlgorithmModelTabchart.clear();
      sceneAlgorithmModelTabchart.setOption(options);
      window.onresize = () => {
        sceneAlgorithmModelTabchart.resize();
      };
    }, 100);
  }
}
</script>

<style lang="scss">
.sceneAlgorithmModel-wrap {
  width: 1048px;
  height: 100%;
  border-right: 2px solid #024d61;

  #sceneAlgorithmModelClient {
    width: 100%;
    height: 550px;
    padding: 20px 0;
  }
  #sceneAlgorithmModelTab {
    width: 100%;
    height: 550px;
    padding: 40px 0;
  }
}
</style>

