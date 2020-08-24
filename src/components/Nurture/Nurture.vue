<template>
   <div class="nurturecpt">
     <el-dialog 
        title="培育池用户详情" 
        :visible.sync="visible"
        @open="nurtureOpen"
        width="3084px"
        :show="show"
        @close="$emit('update:show', false)"
        :modal-append-to-body='false'
           >
           <div class="ntmodalContent">
             <div class="ntmodalDistributed">
                <div class="cycle box-bg-border">
                    <span class="border border-top-left"></span>
                    <span class="border border-top-right"></span>
                    <span class="border border-bottom-left"></span>
                    <span class="border border-bottom-right"></span>
                    <div class="cycleTitle">
                      培育用户群阶段分布
                    </div>
                    <div class="ntmodalEcharts" ref="ntmodalEcharts"></div>
                </div>
                <div class="distributed box-bg-border">
                  <span class="border border-top-left"></span>
                  <span class="border border-top-right"></span>
                  <span class="border border-bottom-left"></span>
                  <span class="border border-bottom-right"></span>
                  <div class="distributedTitle">培育池线索按意向等级分群</div>
                  <div class="distributedEcharts">
                     <img src="../../assets/img/expect.png"/>
                  </div>
                </div>
             </div>

             <div class=ntmodalPortrait>
                <div class="redeem box-bg-border">
                  <span class="border border-top-left"></span>
                  <span class="border border-top-right"></span>
                  <span class="border border-bottom-left"></span>
                  <span class="border border-bottom-right"></span>
                  <div class="redeemText">
                      <span class="redeemTextLeft">战败挽回</span>
                      <div class="redeemTime">
                        截止
                        <span class="color">{{time}}</span>，
                        成交了
                        <span class="color">{{dealData.value}}{{dealData.unit}}</span>
                      </div>
                  </div>
                  <div id="redeemContent" style="width: 1502px;height: 814px;"></div>
                </div>
                <div class="reason box-bg-border">
                  <span class="border border-top-left"></span>
                  <span class="border border-top-right"></span>
                  <span class="border border-bottom-left"></span>
                  <span class="border border-bottom-right"></span>
                  <div class="reasonText">
                    <span class="reasonTextLeft">战败归因</span>
                    <div class="provinceSelect">
                      <!-- <div class="province">省份</div> -->
                      <div class="provinceSwitch">
                          <el-switch
                           style="display: block"
                           :width="60"
                           v-model="switchValue"
                           active-color="#dcdfe6"
                           inactive-color="#236BB4"
                           active-text="线索来源"
                           inactive-text="省份"
                           @change="getchangeValue"
                           >
                         </el-switch>
                      </div>
                      <!-- <div class="source">线索来源</div> -->
                      <div class="selectList">
                           <el-select v-model="province" placeholder="请选择" class="selectStyle" @change="changeselectValue"  :appendToBody="false" :popper-append-to-body="false">
                                <el-option
                                   v-for="item in options"
                                    :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                                   >
                                </el-option>
                           </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="reasonDel">
                    <div class="reasonDelleft">
                      <div class="reasonRanking">
                        <div class="rankingTitle">公共战败原因TOP3</div>
                        <ul>
                          <li v-for="(item, index) in liList" :key="index">
                            <div class="topIndex">{{index + 1}}</div>
                            <div class="topContent">{{item}}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  <div id="wordcloud"></div>
                  </div>

                </div>
             </div>
           </div>
           </el-dialog>
     </div>
</template>

<script lang="ts">
import 'echarts-wordcloud/dist/echarts-wordcloud';
import 'echarts-wordcloud/dist/echarts-wordcloud.min';
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { renderItem } from '@/utils/funnel';
import { numberFormat } from '@/utils/utils.ts';
import { funnelConfig } from './config';
import _ from 'lodash';


@Component({})


export default class Nurture extends Vue {

  @Prop({
    required: false,
    default: false
  }) show!: boolean;


  visible = this.show;
  time = '2020年7月20日';
  funnelData = {};
  dealData: any = {};
  switchValue: boolean = false;
  province: string = '';
  options = [];

  testData: any = [];
  liList = ['不买车' , '已购名爵' , '同级意向竞品'];

  @Watch('show')
  onShowChange() {
      if (this.show) {
    this.displayEcharts();
    this.getSelectData();
    this.initBaiduChart();
      } else {
        this.province = '';
        this.switchValue = false;
      }
    this.visible = this.show;
  }
  nurtureOpen() {

  }

  mounted() {
  }

  displayEcharts() {
    this.$nextTick(() => {
      this.test();
      // this.initBaiduChart();
      this.renderFunnel();
    });
  }
 async test() {
    let hours = ['线索导入', '电话邀约', '注册APP', '访问官网', '进店', '预约试驾', '试乘试驾',
        '参加活动', '下订单', '交车'];
    let days = ['低线中坚', '成熟中产', '小镇青年',
        '奋斗青年'];

    // let dataList = await $api.DashboardApi.getClue();
    // console.log(dataList , '人群数据');
    let dataList = await $api.DashboardApi.nurtureUsers();
    console.log(dataList , '人群数据');
    let data =  this.dealwithUsers(dataList);
    this.testData = data;
    
    // let data = [[0, 0, 1000], [1, 0, 12000], [2, 0, 140000], [3, 0, 600000], [0, 1, 6], [1, 1, 16], [2, 1, 28], [3, 1, 30], [0, 2, 7], [1, 2, 10], [2, 2, 12], [3, 2, 10], [0, 3, 10], [1, 3, 12], [2, 3, 14], [3, 3, 16] ];
    let test = (this as any).$echarts.init(this.$refs.ntmodalEcharts);
    console.log(test , '元素');
    test.setOption({
    grid: {
        left: 60,
        bottom: 40,
        right: 62,
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: hours,
        boundaryGap: false,
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
          fontSize: 28,
          color: 'rgba(255,255,255,0.6)'
        }
    },
        tooltip: {
        position: 'top',
        padding: [30, 20],
        backgroundColor: '#ffffff',
        textStyle: {
            fontSize: 32,
        },
        formatter: function (params: any) {
            //  console.log(params);
            // return `${params.name}：${params.value[2]}`;
            return `<div style="color:#000000;margin-top:10px;margin-left:20px;padding-right:20px"><span style="display: block;margin-bottom:10px">${days[params.value[1]]}</span><span style="display:inline-block;margin-right:20px;width:30px;height:30px;background-color:${params.color}"></span><span style="display:inline-block;margin-right:20px">${params.name}</span>${params.value[2]}</div> `;

        }
    },
    yAxis: {
        type: 'category',
        data: [
          {value: '低线中坚', textStyle: {padding: [0, 20, 0, 0]}},
          {value: '成熟中产', textStyle: {padding: [0, 20, 0, 0]}},
          {value: '小镇青年', textStyle: {padding: [0, 20, 0, 0]}},
          {value: '奋斗青年', textStyle: {padding: [0, 20, 0, 0]}}
        ],
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#121626',
                shadowOffsetY: -55,
                shadowColor : '#3A4263',
                shadowBlur : 2,
                opacity: 1
            }
        },
        axisLabel: {
          fontSize: 28,
          color: 'rgba(255,255,255,0.6)',
          margin: 20
        }
    },
    series: [{
        name: 'Punch Card',
        type: 'scatter',
        symbolSize: function (val: any) {
          if (val[2].toString().length === 2 || val[2].toString().length === 1) {
            return val[2] * 0.3;
          } else if (val[2].toString().length === 3) {
            return val[2] * 0.018;
          } else if (val[2].toString().length === 4) {
            if (val[2] > 5000) {
              return val[2] * 0.01;
            } else if (val[2] < 2000) {
            return val[2] * 0.017;
            } else {
            return val[2] * 0.018;
            }
          } else if (val[2].toString().length === 5) {
            if (val[2] > 60000) {
            return val[2] * 0.003;
            } else {
            return val[2] * 0.004;
            }
          } else if (val[2].toString().length === 6) {
            return val[2] * 0.0005;
          } else {
            return val[2] * 0.00001;
          }
        },
        itemStyle: {
            color: function(e: any) {
                if (e.data[1] === 0) {
                   return '#236BB4';
                } else if (e.data[1] === 1) {
                    return '#89E388';
                } else if (e.data[1] === 2) {
                    return '#EBCD52';
                } else {
                    return '#4EDFD1';
                }
                // window.console.log(e);
 
            }
        },
        data: data,
        animationDelay: function (idx: any) {
            // console.log(idx);

            return idx * 5;
        }
    }]
    });
}
  async renderFunnel() {
      let data = await $api.DashboardApi.delfunnel();
      // console.log(data , '战败');
      this.funnelData = data;
      this.time = data.deadline;
      this.dealData = numberFormat(data.orderNum);
      
     const echarts = (this as any).$echarts.init(document.getElementById('redeemContent'));
     const option: object = {
        title: {
            show: false,
            text: '漏斗'
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
              data: funnelConfig.block.map(( item: any ) => { return item.label; }),
          },
          yAxis: {
            show: false,
          },
          series: [{
              name: '漏斗',
              type: 'custom',
              renderItem: renderItem(
                funnelConfig, this.funnelData, {x: 496, y: 64}, [510, 454, 402, 350, 290]),
              data: funnelConfig.block.map(( item: any ) => { return item.label; })
          }]
      };
      (echarts as any).clear();
      (echarts as any).setOption(option);

  }

async  initBaiduChart() {
    let params = {};
    if (this.switchValue) {
        params = Object.assign(params, {clue: this.province});
    } else {
        params = Object.assign(params, {province: this.province});

    }
    let newData = await $api.DashboardApi.getcloudData(params);
    console.log(newData);
    let data: any = [];
    if (newData.length !== 0) {
        newData.forEach((item: any) => {
            data.push({
              value: item.num,
              name: item.defeatName
            });
        });
    }
    let chart = (this as any).$echarts.init(document.getElementById('wordcloud'));
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


  //获取switch的值
   getchangeValue(value: any) {
     console.log(value);
    //  this.switchValue = value;
     this.getSelectData();
     
}

//切换select的值
changeselectValue() {
      this.initBaiduChart();
}
  getSelectData() {
    let params = {
      type: this.switchValue ? 'clue' : 'province'
    };

    $api.DashboardApi.inquireSelect(params).then((res: any) => {
      // console.log(res , 'select数据');
      let data: any = [];
      res.forEach((item: any) => {
        data.push({
          value: item,
          label: item
        });
      });
      this.options = data;
      
    });
  }
  //处理用户分布函数
  dealwithUsers(data: any) {
    let newdata: any = [];
    if (data.length === 0) {
      return newdata;
    } else {
      data.forEach((item: any) => {
        if (item.youngtype === '低线中坚') {
          Object.keys(item).forEach((info => {
            // console.log(item[info] , '2222');
            switch (info) {
              case 'leadin':
                newdata.push([0, 0, item[info]]);
                break;
              case 'phoneinvitation':
                newdata.push([1, 0, item[info]]);
                break;
              case 'registerApp':
                newdata.push([2, 0, item[info]]);
                break;
              case 'visitsite':
                newdata.push([3, 0, item[info]]);
                break;
              case 'enterstore':
                newdata.push([4, 0, item[info]]);
                break;
              case 'bookdrive':
                newdata.push([5, 0, item[info]]);
                break;
              case 'testdrive':
                newdata.push([6, 0, item[info]]);
                break;
              case 'participateactivity':
                newdata.push([7, 0, item[info]]);
                break;
              case 'placeorder':
                newdata.push([8, 0, item[info]]);
                break;
              case 'delivery':
                newdata.push([9, 0, item[info]]);
                break;
                default:
                break;
            }
            
          }));
        } else if (item.youngtype === '成熟中产') {
            Object.keys(item).forEach((info => {
            // console.log(item[info] , '2222');
                       switch (info) {
                         case 'leadin':
                           newdata.push([0, 1, item[info]]);
                           break;
                         case 'phoneinvitation':
                           newdata.push([1, 1, item[info]]);
                           break;
                         case 'registerApp':
                           newdata.push([2, 1, item[info]]);
                           break;
                         case 'visitsite':
                           newdata.push([3, 1, item[info]]);
                           break;
                         case 'enterstore':
                           newdata.push([4, 1, item[info]]);
                           break;
                         case 'bookdrive':
                           newdata.push([5, 1, item[info]]);
                           break;
                         case 'testdrive':
                           newdata.push([6, 1, item[info]]);
                           break;
                         case 'participateactivity':
                           newdata.push([7, 1, item[info]]);
                           break;
                         case 'placeorder':
                           newdata.push([8, 1, item[info]]);
                           break;
                         case 'delivery':
                           newdata.push([9, 1, item[info]]);
                           break;
                           default:
                           break;
                       }
            
               }));

        } else if (item.youngtype === '小镇青年')  {
            Object.keys(item).forEach((info => {
            // console.log(item[info] , '2222');
                       switch (info) {
                         case 'leadin':
                           newdata.push([0, 2, item[info]]);
                           break;
                         case 'phoneinvitation':
                           newdata.push([1, 2, item[info]]);
                           break;
                         case 'registerApp':
                           newdata.push([2, 2, item[info]]);
                           break;
                         case 'visitsite':
                           newdata.push([3, 2, item[info]]);
                           break;
                         case 'enterstore':
                           newdata.push([4, 2, item[info]]);
                           break;
                         case 'bookdrive':
                           newdata.push([5, 2, item[info]]);
                           break;
                         case 'testdrive':
                           newdata.push([6, 2, item[info]]);
                           break;
                         case 'participateactivity':
                           newdata.push([7, 2, item[info]]);
                           break;
                         case 'placeorder':
                           newdata.push([8, 2, item[info]]);
                           break;
                         case 'delivery':
                           newdata.push([9, 2, item[info]]);
                           break;
                           default:
                           break;
                       }
            
               }));
        } else if (item.youngtype === '奋斗青年') {
            Object.keys(item).forEach((info => {
            // console.log(item[info] , '2222');
                       switch (info) {
                         case 'leadin':
                           newdata.push([0, 3, item[info]]);
                           break;
                         case 'phoneinvitation':
                           newdata.push([1, 3, item[info]]);
                           break;
                         case 'registerApp':
                           newdata.push([2, 3, item[info]]);
                           break;
                         case 'visitsite':
                           newdata.push([3, 3, item[info]]);
                           break;
                         case 'enterstore':
                           newdata.push([4, 3, item[info]]);
                           break;
                         case 'bookdrive':
                           newdata.push([5, 3, item[info]]);
                           break;
                         case 'testdrive':
                           newdata.push([6, 3, item[info]]);
                           break;
                         case 'participateactivity':
                           newdata.push([7, 3, item[info]]);
                           break;
                         case 'placeorder':
                           newdata.push([8, 3, item[info]]);
                           break;
                         case 'delivery':
                           newdata.push([9, 3, item[info]]);
                           break;
                           default:
                           break;
                       }
            
               }));
        } else {

        }
      });

        // console.log(newdata , '数组');
        _.remove(newdata , (item: any , index: any) => {
            if (!item[2]) {
              return item;
            }
        });
        return newdata;
        
    }
  }
}
</script>

<style lang="scss">
.nurturecpt{
      .ntmodalContent{
        width: 100%;
        height: 1692px;

          .ntmodalDistributed{
            width: 100%;
            height: 676px;
            // background-color: pink;
            margin-top: 40px;
            display: flex;

             .cycle{
                width: 2050px;
                height: 100%;
                // background-color: #021722;
                margin-right: 20px;

                  .cycleTitle{
                     width: 100%;
                     height: 100px;
                     border-bottom: 2px solid #3A4263;
                     line-height: 100px;
                     color: #FFFFFF;
                     font-size: 36px;
                     padding-left: 40px;
                  }
              
                 .ntmodalEcharts{
                   width: 100%;
                   height: calc(100% - 100px);
                  //  background-color: #fff;
                 }
             }
             .distributed{
               flex: 1;
               height: 100%;
              //  background-color: #021722;

                  .distributedTitle{
                    width: 100%;
                    height: 100px;
                    border-bottom: 2px solid #3A4263;
                    line-height: 100px;
                     color: #FFFFFF;
                     font-size: 36px;
                     padding-left: 40px;
                  }

                  .distributedEcharts{
                    width: 100%;
                    height: calc(100% - 100px);
                    position: relative;

                    img{
                        width: 630px;
                        height: 452px;
                        position: absolute;
                        display: block;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                    }
                  }
             }
          }

          .ntmodalPortrait{
            width: 100%;
            height: 916px;
            // background-color: #021722;
            margin-top: 20px;
            display: flex;

            .redeem{
              width: 50%;
              height: 100%;
              margin-right: 20px;
               
               .redeemText{
                 width: 100%;
                 height: 100px;
                 border-bottom: 2px solid #3A4263;
                //  display: flex;
                 .redeemTextLeft{
                  height: 100px;
                  line-height: 100px;
                  font-size: 36px;
                  color: #FFFFFF;
                  margin-left: 40px;
                 }

                 .redeemTime{
                   float: right;
                   height: 100px;
                   line-height: 100px;
                   font-size: 28px;
                   margin-right: 40px;

                    .color{
                      color: #3B9CFF;
                    }
                 }
               }

               .redeemContent{
                 width: 100%;
                 height: calc(100% - 100px);
               }
            }
            .reason{
              width: 50%;
              height: 100%;
              
               .reasonText{
                 width: 100%;
                 height: 100px;
                 border-bottom: 2px solid #3A4263;
                //  display: flex;
                  .reasonTextLeft{
                      height: 100px;
                      line-height: 100px;
                      font-size: 36px;
                      margin-left: 40px;
                      color: #FFFFFF;
                  }

                  .provinceSelect{
                    float: right;
                    margin-right: 40px;
                    display: flex;
                    font-size: 28px;

                     .province{
                       height: 100px;
                       line-height: 100px;
                     }

                      .provinceSwitch{
                        margin-top: 32px;
                        margin-right: 40px;
                      }

                      .source{
                        height: 100px;
                        line-height: 100px;
                        margin-left: 16px;
                        color: rgba(255,255,255,0.39);
                        margin-right: 20px;
                      }

                      .selectList{
                        width: 360px;
                        height: 60px;
                        margin-top: 20px;
                        position: relative;
                             .el-select__tags{
                               flex-wrap: nowrap;
                               margin-left: 20px;
                             }
                             .el-tag--info{
                               padding: 20px 16px;
                               line-height: 0px
                             }
                             .el-scrollbar__bar,.is-horizontal{
                               display: none;
                             }
                             .el-select-dropdown{
                               height: 315px;
                               max-height: 330px;
                               left: 15px !important;
                               position: absolute;
                               .el-select-dropdown__wrap{
                                 height: 330px;
                                 max-height: 330px;
                                 .el-select-dropdown__item{
                                   height: 64px;
                                   font-size: 28px;
                                   line-height: 64px;
                                 }
                               }
                             }

                         .selectStyle{
                           width: 360px;
                           height: 60px;
                          //  background-color: #090C15;
                         }
                      }
                  }
               }

                .reasonDel{
                 width: 100%;
                 height: calc(100% - 100px);
                 display: flex;
 
                  .reasonDelleft{
                    width: 340px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-left: 72px;

                    .reasonRanking{

                       .rankingTitle{
                         font-size: 28px;
                         font-weight: 600;
                         color: #FFFFFF;
                         margin-bottom: 24px;
                       }

                       ul {
                          li {
                            height: 48px;
                            display: flex;
                            margin-bottom: 24px;

                            .topIndex{
                              width: 48px;
                              height: 48px;
                              background-color: #3B9CFF;
                              color: #ffffff;
                              border-radius: 50%;
                              text-align: center;
                              font-size: 28px;
                              padding-top: 10px;
                              
                            }

                            .topContent{
                              height: 48px;
                              line-height: 48px;
                              color: #ffffff;
                              font-size: 28px;
                              margin-left: 16px;
                            }
                          }
                       }

                    }
                  }
                  #wordcloud{
                //  width: 100%;
                  flex: 1;
                 height: 100%;
               }
                }

            }
          }
      }

      .el-switch__core {
        height: 30px;
        border-radius: 12px;
      }
      .el-switch__core:after {
        width: 25px;
        height: 25px;
      }

      .el-switch__label * {
        font-size: 28px;
      }
      .el-switch__label.is-active {
        color: #FFFFFF;
      }

      .el-switch__label{
        color: rgba(255,255,255,0.39);
      }

      .el-input__inner {
        background-color: #090C15;
        border: 1px solid #090c15;
        color: #FFFFFF;
        font-size: 28px;
        height: 50px;
        border-radius: 20px;
      }


}
   .el-popper[x-placement^=bottom] .popper__arrow{
       border-bottom-color: #1E2441;
   }
   .el-popper[x-placement^=bottom] .popper__arrow::after{
       border-bottom-color: #1E2441;
   }
     .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
      background-color: #236BB4;
    }
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover{
      background-color: #1E2441;
    }
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
      background-color: #1E2441;
    }
    .el-select-dropdown__item{
      color: #fff;
    }
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
      font-size: 28px;
    }
    .user-role-setting-wrap .el-input__icon{
    line-height: 100% !important;
  }
</style>