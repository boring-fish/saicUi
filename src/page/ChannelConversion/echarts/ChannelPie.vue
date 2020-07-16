/**
  * @description: 渠道转化详情饼图
  * @author: qian.wan
  * @date: 
  */
<template>
  <div class="channnelpie-wrap" :id="id" style="width: 500px;height: 340px;">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class ChannnelPie extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  }) id!: string;
   @Prop({
    required: false,
    default: {}
  }) data!: object;

  initOption() {
    const propData: any = this.data;
    let all: any = propData.isCjkh + propData.isQzkh + propData.isZbkh;
    let data = [{
                  name: '成交',
                  value: propData.isCjkh,
                  itemStyle: {
                    color: '#89E388',
                  },
                  label: {
                    rotate: false,
                  }
              }, {
                  name: '跟进中',
                  value: propData.isQzkh,
                  itemStyle: {
                    color: '#4EDFD1',
                  }
              }, {
                  name: '战败',
                  value: propData.isZbkh,
                  itemStyle: {
                    color: '#EBCD52',
                  }
              },
            ];

    const option: object = {
                title: {
                  // text: `${propData.isCjkh + propData.isQzkh + propData.isZbkh}`,
                  text: `${this.numberFormat(all).value}${this.numberFormat(all).unit}`,
                  top: 'center',
                  left: 'center',
                  textStyle: {
                    color: '#fff',
                    fontSize: 40,
                  }
                },
                // label: {
                //   formatter: '{b}: {c}',
                //   fontSize: 24,
                // },
                series: [{
                    type: 'pie',
                    radius: ['42%', '60%'],
                    center: ['50%', '50%'],
                    data: data,
                    animation: false,
                    startAngle: 90,
                    label: {
                        position: 'outer',
                        alignTo: 'none',
                        margin: 0,
                        formatter: (val: any): any => {
                          let params = this.numberFormat(val.data.value);
                          let str: String = '{a| ' + val.data.name + '}\n\n{b|' + params.value + params.unit + '}';
                          return str;
                        },
                rich: {
                      a: {
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: 24,
                      },
                      b: {
                        color: '#fff',
                        fontSize: 24,
                        align: 'center'
                      },
                      
                    }
                },
                labelLine: {
                  show: true,
                  
                },
              },
              ]
            };
            return option;
  }
  initEcharts() {
      let chat: object = (this as any).$echarts.init(document.getElementById((this as any).id));
      const option = this.initOption();
      (chat as any).setOption(option);
  }
  created() {
    //
  }

  mounted() {
    this.initEcharts();
  }

  //换算数据单位
  numberFormat(value: any) {
    let param: any = {};
    let k = 10000,
      sizes = ['', '万', '亿', '万亿'],
      i;
    if (value < k) {
      param.value = value;
      param.unit = '';
    } else {
      i = Math.floor(Math.log(value) / Math.log(k));

      param.value = (value / Math.pow(k, i)).toFixed(2);
      param.unit = sizes[i];
    }
    return param;
  }

  @Watch('data')
    dataChange(newVal: string) {
      
    this.initEcharts();
  
      
    }


}
</script>

<style lang="scss">

</style>

