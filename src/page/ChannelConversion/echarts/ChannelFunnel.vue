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
import { renderItem } from '@/utils/funnel';
import { funnelConfig } from './config';

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
    default: '全部'
  }) filterLabel!: string;
  @Prop({
    required: false,
    default: function() {
      return {};
    }
  }) data!: object;
  @Prop({
    required: false,
    default: false,
  }) isR!: boolean;

  get config() {
    return funnelConfig[this.filterLabel];
  }

  @Watch('data')
  dataChange() {
    echarts = (this as any).$echarts.init(document.getElementById(this.id));
    this.setOption(echarts);
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
            show: false,
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
              data: this.config.block.map(( item: any ) => { return item.label; }),
          },
          yAxis: {
            show: false,
          },
          series: [{
              name: '跟进转化漏斗',
              type: 'custom',
              renderItem: renderItem(this.config, this.data),
              data: this.config.block.map(( item: any ) => { return item.label; })
          }]
      };
      (echarts as any).clear();
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

