/**
  * @description: 渠道转化详情柱状图
  * @author: qian.wan
  * @date: 
  */
<template>
  <div class="channelbar-wrap" :id="id" style="width: 1114px;height: 640px;">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// 使用中央事件总线
import bus from 'vue-bus';
Vue.use(bus);
// import {  } from '@/components'; // 组件

let echarts: object = {};

const formatter = (params: any, ticket: string): string => {

          let str: string = `<div style="color:#666;margin-bottom:24px;font-size:24px;">${params[0].name}</div>`;

          params.forEach(( item: any ) => {
            str += `<div style="margin-bottom:24px;">
            <span style="display:inline-block;margin-right:24px;width:40px;height:40px;vertical-align:bottom;background-color:${item.color};"></span>
            <span style="display:inline-block;width:200px;">${item.seriesName}</span>
            <span style="display:inline-block;width:78px;text-align: right;">${item.value}</span>
            </div>`;
          });

          str += `<span style="display:inline-block;margin-right:20px">建卡率</span><span>25%</span>`;

          return  str;

      };

@Component({})
export default class ChannelBar extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  }) id!: string;
  @Prop({
    required: false,
    default: []
  }) data!: any [];
  @Prop({
    required: false,
    default: false
  }) isR!: boolean;
   @Prop({
    required: false,
    default: []
  }) color!: any[];
  @Prop({
    required: false,
    default: 'num'
  }) dataKey!: string;
  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  public nowCode: string = 'rfsCode';
  setOption() {
    
    const option: object = {
          // legend: {
          //     show: false,
          //     bottom: 46,
          //     icon: 'rect',
          //     itemWidth: 44,
          //     itemHeight: 44,
          //     itemGap: 80,
          //     textStyle: {
          //         color: '#fff',
          //         fontSize: 32,
          //     }
          // },
          // tooltip: {
          //   show: true,
          //   textStyle: {
          //     fontSize: 36
          //   }
          // },
         
          grid: {
              // top: 190,
              // left: 96,
              // right: 96,
              // bottom: 50,
              left: '1%',
              righr: '1%',
              bottom: '5%',
              containLabel: true,
              height: '90%',
              width: '95%',
          },
         
          xAxis: {
              show: true,
              offset: 0, 
              type: 'category',
              data: this.data.map( ( item, index) => {
                return this.isR ? item.rfsCode : `${item[this.nowCode]}-${item[this.dataKey]}`;
              }),
              axisLabel: {
                interval: 0,
                formatter: (params: any) => {
                  // console.log(params);
                  let arr: any = params.split('-');
                  // console.log(arr.length);
                  if (arr.length === 3) {
                    let area: string = arr[0];
                    let name: string = arr[1];
                    let num: string = arr[2] || '';
                    // console.log(arr);
                    let str = '{a|' + area + '}\n\n{b|' + name + '}\n\n{c|' + num + '}';
                    return str;
                  }
                  if (arr.length === 2) {
                    let a: string = arr[0];
                    let c: string = arr[1];
                    let str = '{a|' + a + '}\n\n\n\n{c|' + c + '}';
                    return str;
                  }
                },
                rich: {
                  a: {
                    color: '#FFF',
                    fontSize: 32
                  },
                  b: {
                    color: '#666',
                    fontSize: 28
                  },
                  c: {
                    color: '#FFF',
                    fontSize: 48
                  }
                },
                color: '#fff',
                fontSize: 32,
                margin: 40,
              },
              position: 'top',
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
          
          },
          yAxis: {
              show: false,
              type: 'value',
              // max: 100000,
          },
           dataZoom: {
             start: 0,
             end: this.data.length <= 3 ? 100 : Math.round(3 / this.data.length * 100),
            type: 'slider',
            height: 20,
            fillerColor: '#48558B' ,
            borderColor: 'none',
        
            bottom: 10,
            endValue: 4,
            showDetail: false,
            handleStyle: {
        
              opacity: 0,
            },
      
            dataBackground: {
              lineStyle: {
                opacity: 0,
              },
              areaStyle: {
                opacity: 0,
              }
            }
          },
         series: []
      };

        // {
          //   name: 'R网建卡数',
          //   type: 'bar',
          //   stack: '广告',
          //   data: [220, 200, 200, 200],
          //   showBackground: true,
          //   backgroundStyle: {
          //     color: '#090C15',
          //   },
          //   barCategoryGap: '40%',
          //   itemStyle: {
          //     normal: { color: '#EBCD52' }
          //   },
          //   // label: {
          //   //   show: true,
          //   //   positionn: top,
          //   // }
          // },
          // {
          //   name: '非R网建卡数',
          //   type: 'bar',
          //   stack: '广告',
          //   // barWidth: '100%',
          //   data: [150, 150, 150, 150],
          //   barGap: '10%',
          //   barCategoryGap: '40%',
          //   showBackground: true,
          //    backgroundStyle: {
          //     color: '#090C15',
          //   },
          //   itemStyle: {
          //     normal: { color: '#4EDFD1' }
          //   }
          // },
        const seriesItem = {
            name: '数量',
            type: 'bar',
            data: this.data.map( ( item, index ) => {  return item[this.dataKey]; }),
             barGap: '10%',
            barCategoryGap: '70%',
            showBackground: true,
             backgroundStyle: {
              color: '#090C15'
            },
            itemStyle: {
              normal: { color: this.isR ? 'color[index]' : this.color }
            }
        };

        if (this.isR) {
           (option as any).tooltip =  {
              trigger: 'axis',
              backgroundColor: '#fff',
              padding: [30, 40],
              borderRadius: 24,
            
              formatter,
              textStyle: {
                  color: '#333',
                  fontSize: 28,
                  linHeight: 40,
                  width: 318,
                  height: 304
              }, 
          };
        }

      (option as any).series.push(seriesItem);

      
      (echarts as any).setOption(option);
  }
  initEcharts() {
    echarts = (this as any).$echarts.init(document.getElementById(this.id));
    this.setOption();    
    
  }

  created() {
  
  }

  mounted() {
    this.initEcharts();
    // console.log(this.currentArea);
    // console.log('id', this.id);
    // console.log('data', this.data);
    // console.log('isR', this.isR);
    // console.log('color', this.color);
    // console.log('datakey', this.dataKey);
  }

  @Watch('data')
    dataChange(newVal: string) {
      // console.log(this.data);
    // this.setOption();
    // console.log(newVal, 'bar data')
    this.initEcharts();  
  }

  @Watch('currentArea')
  handleChangeCode() {
    // console.log(this.currentArea);
    // console.log(Object.keys(this.currentArea)[0]);
    if (Object.keys(this.currentArea)[0] === 'all') {
      this.nowCode = 'rfsCode';
    }
    if (Object.keys(this.currentArea)[0] === 'rfsCode') {
      this.nowCode = 'macCode';
    }
    if (Object.keys(this.currentArea)[0] === 'macCode') {
      this.nowCode = 'dealerCode';
    }
    this.initEcharts(); 
  }

}
</script>

<style lang="scss">

</style>

