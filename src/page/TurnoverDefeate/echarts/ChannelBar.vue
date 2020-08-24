/**
  * @description: 成交战败详情-各获客渠道量
  * @author: qian.wan
  * @date: 
  */
  <template>
  <div class="channelbar-wrap" :id="id" style="width: 1676px;height: 1110px;">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { calculation, numberFormat , decideColor} from '@/utils/utils.ts';
// import {  } from '@/components'; // 组件

let chart: object = { };
interface ItemType {
  sourceType: string;
}
interface DataType {
  now: ItemType[];
  lsatYear: any[];
  last: any[];
}
const getArr2 = (( arr: any[], xAxisLabel: number[], key: string) => {
      const newArr = [];
      const map = new Map();
      for ( let i = 0; i < arr.length; i++) {
        map.set( arr[i].sourceType, arr[i]);
      }
      for (let j = 0; j < xAxisLabel.length; j++) {
        const item = map.get(xAxisLabel[j]);
        newArr.push( item ? item[key] : 0);
      }
      return newArr;
      
    });

@Component({})
export default class ChannelBar extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  }) id!: string;
  @Prop({
    required: true,
    default: {
      now: [],
      lsatYear: [],
      last: [],
    }
  }) data!: any;
  @Prop({
    required: true,
    default: '成交'
  }) theme!: string;
   @Prop({
    required: true,
    default: '同比'
  }) label!: string;

  @Prop({
    required: true,
    default: () => {}
  }) dealValue!: any;




  setOption() {
    if ( !this.data.now ) {
      return;
    }
    const data: any = this.data;
    const dataKey = this.theme === '成交' ? 'num' : 'defeat';
    const nowData = this.data.now.sort( ( a: any, b: any ) => {
        return b[dataKey] - a[dataKey];
      });
    const label: string = this.label;
    const xAxisLabel = nowData.map(  (item: any)  => { return item.sourceType; } );
    const YoYArr = getArr2( data.lsatYear, xAxisLabel, dataKey);
    const chainArr = getArr2( data.last, xAxisLabel, dataKey);
    const dataArr2 = label === '同比' ? YoYArr : chainArr;


    //设置option
    let option: object = {
          legend: {
            show: true,
            bottom: 46,
            icon: 'rect',
            itemWidth: 44,
            itemHeight: 44,
            itemGap: 80,
            textStyle: {
              color: '#fff',
              fontSize: 32,
            }
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#fff',
            padding: [30, 20],
            // formatter: (params: any, ticket: string): string => {
            //   let str: string = `${params[0].name}`;
            //   params.forEach(( item: any ) => {
            //     str += `<br />${item.seriesName} : ${item.value}`;
            //   });
            //   str += '<br />建卡率: 25%';
            //   return  str;
            // },
            textStyle: {
              color: '#9DA8B1',
              fontSize: 28,
              width: 318,
              height: 304
            }
          },
          grid: {
            top: 236,
            left: 0,
            right: 0,
            bottom: 160,
          },
          xAxis: {
            show: true,
            type: 'category',
            fontSize: 24,
            color: '#fff',
            data: xAxisLabel,
            axisLabel: {
              interval: 0,
              color: 'rgba(255,255,255,0.6)',
              fontSize: 36,
              margin: 28,
              align: 'center',
              formatter: (value: any, index: number) => { 
                const percent = label === '同比' ?
                                calculation(nowData[index][dataKey], YoYArr[index]) :
                                calculation(nowData[index][dataKey], chainArr[index]) 
                                ;
                const numberObj = numberFormat(nowData[index][dataKey]);
                let percentRender: string;
                let colorValue: number = 0;
                if (!percent) {
                percentRender = '';
                } else {
                  // console.log(this.dealValue , '11111');
                  if (this.theme === '成交') {
                  // console.log(percent);
                  if (label === '同比') {
                    if (this.dealValue) {
                     colorValue = decideColor(percent , this.dealValue.lastAlarmCycle , this.dealValue.lastEarlyWarCycle, this.dealValue.lastAlarmCycleSymbol);
                    }
                   
                  } else {
                    if (this.dealValue) {
                      colorValue = decideColor(percent , this.dealValue.ringAlarmCycle , this.dealValue.ringEarlyWarCycle, this.dealValue.ringAlarmCycleSymbol);
                    }
                  } 
                  if (colorValue === 1) {
                    percentRender = percent.indexOf('-') === 0 ?  '{e|↘ ' + `${percent.split('-')[1]}}` : '{e|↗ ' + `${percent}}`;
                  } else if (colorValue === 2) {
                    percentRender = percent.indexOf('-') === 0 ?  '{g|↘ ' + `${percent.split('-')[1]}}` : '{g|↗ ' + `${percent}}`;
                  } else if (colorValue === 3) {
                    percentRender = percent.indexOf('-') === 0 ?  '{f|↘ ' + `${percent.split('-')[1]}}` : '{f|↗ ' + `${percent}}`;

                  } else {
                    percentRender = percent.indexOf('-') === 0 ?  '{h|↘ ' + `${percent.split('-')[1]}}` : '{h|↗ ' + `${percent}}`;
                  }
                  
                  } else {
                   percentRender = percent.indexOf('-') === 0 ?  '{h|↘ ' + `${percent.split('-')[1]}}` : '{h|↗ ' + `${percent}}`;
                  }

                }
                return `{a|${value}}\n {b|${numberObj.value}}{c|${numberObj.unit}}\n{d|${label}}${percentRender}`;
                // [
                //               `{a|${value}}`,
                //               '{b|38.05}{c|万}',
                //               '{c|同比}{d|↗ 10.28%}'
                      
                //           ].join('\n')
              },

              rich: {
                  a: {
                      color: '#fff',
                      fontSize: 32,
                      lineHeight: 44,
      
                  },
                  b: {
                      fontSize: 60,
                      color: '#fff',
                      fontWeight: 'bold',
                      lineHeight: 84,
                  },
                  c: {
                    color: '#fff',
                    fontSize: 24,
                    padding: [0, 20],
                  },
                   d: {
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: 24,
                    
                  },
                  
                  e: {
                      color: '#FF7176',
                      fontSize: 24,
                      padding: [0, 20],
                      lineHeight: 34,
                      // backgroundColor: {
                      //     image: '../../../assets/img/portrait.jpg'
                      // },
                  },
                   f: {
                      color: '#56D884',
                      fontSize: 24,
                      padding: [0, 20],
                      lineHeight: 34,
                      // backgroundColor: {
                      //     image: '../../../assets/img/portrait.jpg'
                      // },
                  },
                  g: {
                      color: '#FFC72F',
                      fontSize: 24,
                      padding: [0, 20],
                      lineHeight: 34,
                      // backgroundColor: {
                      //     image: '../../../assets/img/portrait.jpg'
                      // },
                  },
                  h: {
                      color: '#ffffff',
                      fontSize: 24,
                      padding: [0, 20],
                      lineHeight: 34,
                      // backgroundColor: {
                      //     image: '../../../assets/img/portrait.jpg'
                      // },
                  },
            
              },
            },
        
            position: 'top',
          },
          yAxis: {
          show: false,
          type: 'value',
          // max: 1000,
         },
         series: [
          {
            name: `实际${this.theme}量`,
            type: 'bar',
            stack: '实际',
            data: nowData.map((item: any) => {return item[dataKey]; }),
            showBackground: true,
            backgroundStyle: {
              color: '#090C15',
            },
            barGap: '10%',
            barCategoryGap: '50%',
            itemStyle: {
              normal: { color: '#4EDFD1' }
            },
            // label: {
            //   show: true,
            //   positionn: top,
            // }
          },
        
          {
            name: `${label}${this.theme}量`,
            type: 'bar',
            // barWidth: '100%',
            data: dataArr2,
            showBackground: true,
             backgroundStyle: {
              color: '#090C15',
            },
            itemStyle: {
              normal: { color: '#236BB4' }
            }
          }
        ]
      };
    (chart as any).setOption(option);
    // console.log(data, 'data')
    // console.log(option, 'option')
  }
  created() {
    //
  }

  mounted() {
     chart = (this as any).$echarts.init(document.getElementById((this as any).id));
  }

  @Watch('data')
    dataChange(newVal: string) {
      this.setOption();
  
      
    }
  @Watch('label')
    labelChange(label: string) {

      this.setOption();
    }
  @Watch('theme')
    themeChange(theme: string) {
    this.setOption();
  }

}
</script>

<style lang="scss">
</style>

