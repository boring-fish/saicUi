/**
  * @description: 渠道转化详情漏斗图
  * @author: qian.wan
  * @date: 
  */
<template>
  <div class="channelbar-wrap" :id="id" style="width: 1000px;height: 908px;">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { toTenThousandStr, numberFormat } from '@/utils/utils';
// import {  } from '@/components'; // 组件

let echarts: object = {};

@Component({})
export default class ChannelFunnel extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  }) id!: string;
  @Prop({
    required: false,
    default: []
  }) data!: any[];
  @Prop({
    required: false,
    default: false,
  }) isR!: boolean;

  @Watch('data')
  dataChange() {
    echarts = (this as any).$echarts.init(document.getElementById(this.id));
    this.setOption(echarts);
  }

  renderItem(params: object, api: object): object {

 
    let pathes: any[] = [];
    let textPosition: object[] = [];
    let labelPosition: object[] = [];

    let start_coord = this.isR ? {x: 286, y: 118} : {x: 286, y: 48}; //起始坐标
    const PART_WIDTH = [430, 374, 322, 270, 214, 172] ; //漏斗每部分的长边宽度
    const PART_HEIGHT = 92; //漏斗每部分高度
    const ARC_HEIGHT = 20;
    const SURPLUS = 24; //长边突出短边宽度
    const colors = [
      {
        arc: '#44296C',
        body: '#2C1E52',
        border: 'rgba(85, 42, 150, 0.4)'
      },
      {
        arc: '#5F2828',
        body: '#3E1720',
        border: 'rgba(131, 26, 26, 0.4)'
      },
      {
        arc: '#55342C',
        body: '#482322',
        border: 'rgba(156, 56, 29, 0.4)'
      },
      {
        arc: '#154C24',
        body: '#0D3322',
        border: 'rgba(7, 96, 31, 0.4)'
      },
      {
        arc: '#1D4A51',
        body: '#123744',
        border: 'rgba(21, 104, 116, 0.4)'
      },
      {
        arc: '#1E4266',
        body: '#143052',
        border: 'rgba(25, 88, 149, 0.4)'
      },
    ];

    const data = this.data;
    const dataIndex = (params as any).dataIndex;
    let text = `${(data[dataIndex] as any).name}\n${numberFormat((data[dataIndex] as any).achieve).value}${numberFormat((data[dataIndex] as any).achieve).unit}`;
    text = text.replace('undefined', '');
    const label = (() => {
      return dataIndex < data.length - 1 ? 'R网专员跟进 \n 率30%' : '';
    })();

    for ( let i = 0; i < data.length; i++) {

      let percent = 1 - (data[i] as any).achieve / (data[i] as any).target; //目标完成率
      let bottom_width =  PART_WIDTH[i] - SURPLUS * 2; //下边（短边）宽度
      // let width_tint  = PART_WIDTH[i] * percent / 2; //浅色部分宽度
      
      let top = `M${start_coord.x},${start_coord.y} a${PART_WIDTH[i] / 2},${ARC_HEIGHT} 0 0 1 ${PART_WIDTH[i]},0 z`; //顶部即圆弧部分
      let body = `M${start_coord.x},${start_coord.y} l${PART_WIDTH[i]},0 -${SURPLUS} ${PART_HEIGHT} -${bottom_width},0 z`; //主体部分
      // let left = `M${start_coord.x},${start_coord.y} l${width_tint},0  ${SURPLUS} ${PART_HEIGHT} -${width_tint},0 z`; //左边浅色部分
      // let right = `M${start_coord.x + PART_WIDTH[i] - width_tint},${start_coord.y} l${width_tint},0 -${SURPLUS} ${PART_HEIGHT} -${width_tint},0  z`; //右边浅色部分
      
      // pathes.push([top, body, left, right]);
      pathes.push([top, body]);

      //主体文本块坐标
      textPosition.push({
        x: start_coord.x + PART_WIDTH[i] / 2,
        y: start_coord.y + 20,
      });
      
      //两侧文本块坐标
      labelPosition.push({
        left: {
          x: start_coord.x - 75,
          y: start_coord.y + PART_HEIGHT,
        },
        right: {
          x: start_coord.x + PART_WIDTH[i] + 82,
          y: start_coord.y + PART_HEIGHT,
        }
        
      });

      start_coord.x += 28;
      start_coord.y += 144;
    }
 
    
    let render = {
        type: 'group',
        children: [{
            type: 'path',
        shape: {
                pathData: pathes[dataIndex][0],
              },
        style: {
            fill: colors[dataIndex].arc,
            stroke: colors[dataIndex].border,
        }
        },
        {
            type: 'path',
        shape: {
                pathData: pathes[dataIndex][1],
                },
        style: {
            fill: colors[dataIndex].body,
            stroke: colors[dataIndex].border,
            lineWidth: 2,
                }
        },
        //   {
        //     type: 'path',
        // shape: {
        //         pathData:  pathes[dataIndex][2],
        //         },
        // style: {
        //     fill: 'rgba(255,255,255,0.2)',
        //     stroke: colors[dataIndex][1],
        //         }
        // },
        // {
        //     type: 'path',
        // shape: {
        //         pathData: pathes[dataIndex][3],
        //         },
        // style: {
        //     fill: 'rgba(255,255,255,0.2)',
        //     stroke: colors[dataIndex][1],
        //         }
        // },
        {
            type: 'text',
            
            style: {
                text,
                x: (textPosition[dataIndex] as any).x,
                y: (textPosition[dataIndex] as any).y,
                font: '28px/32px PingFangSC-Regular',
                fill: '#fff',
                textAlign: 'center',
            }
        },
        ]};

        if ( this.isR ) {
          render.children.push({
            type: 'text',
            
            style: {
                text: label,
                x: (labelPosition[dataIndex] as any).left.x,
                y: (labelPosition[dataIndex] as any).left.y,
                font: '28px/32px PingFangSC-Regular',
                fill: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
            }
        },

        {
            type: 'text',
            
            style: {
                text: label,
                x: (labelPosition[dataIndex] as any).right.x,
                y: (labelPosition[dataIndex] as any).right.y,
                font: '28px/32px PingFangSC-Regular',
                fill: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
            }
        }
        );
        }
    return render;
        
  }
  setOption(echarts: any) {
      const option: object = {
        title: {
            show: false,
            text: '跟进转化漏斗'
          },
          grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
          tooltip: {
            padding: [30, 30],
            borderRadius: 12,
            textStyle: {
              color: '#fff',
              fontSize: 28,
              width: 578,
              height: 304,
              fontFamily: 'PingFangSC-Regular,PingFang SC',
            }
          },
          xAxis: {
            show: false,
              data: this.data.map(item => { return (item as any).name; }),
          },
          yAxis: {
            show: false,
          },
          series: [{
              name: '跟进转化漏斗',
              type: 'custom',
              renderItem: this.renderItem,
              data: [this.data[0].achieve, this.data[1].achieve, this.data[2].achieve, this.data[3].achieve, this.data[4].achieve, this.data[5].achieve]
          }]
      };
      (echarts as any).setOption(option);
  }
  initEcharts() {

    //text: echarts.format.formatTime('dd', api.value(0)),

    echarts = (this as any).$echarts.init(document.getElementById(this.id));
    
    this.setOption(echarts);
      
    
  }

  created() {
  }

  mounted() {
    this.initEcharts();
  }
  // activated(){
  //    this.setOption();
  // }

}
</script>

<style lang="scss">

</style>

