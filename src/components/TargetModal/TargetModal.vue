/**
  * @description: 指标说明弹窗
  * @author: qian.wan
  * @date: 2020-05-25
  */
<template>
  <!-- <div class="targetmodal-wrap" v-show="visible"> -->
    <el-dialog
      :title="title"
      :visible="showFlag"
      width="2660px"
      top="328px"
      class="targetmodal-wrap"
      :modal-append-to-body="false"
      :before-close="handleClose">
      <ul class="target-modal-block">
        <li class="target-modal-half target-modal-margin">
          <h3> 
            <span class="target-modal-title-icon"></span>
            数据来源
          </h3>
          <p class="target-modal-half-content">看板中的所有数据都来源于B端数仓，其中传播层的数据源来自DMP业务库，获客层和转化层的数据源来自DLM业务库。</p>
        </li>
        <li class="target-modal-half">
          <h3>
            <span class="target-modal-title-icon"></span>
            数据更新时间
          </h3>
          <p class="target-modal-half-content">看板中的所有数据更新频率为“T+1”，因各个平台数据同步时间需要，可能会有一定的时间延迟情况发生。</p>
        </li>
        <li class="target-modal-illustrate">
          <h3>
            <span class="target-modal-title-icon"></span>
            指标说明
          </h3>
          <dl class="target-modal-illustrate-content">
            <div class="dashbord">一、首页</div>
            <div class="target-modal-illustrate-left">
              <template v-for="(item) in listLeft">
                <dt :key="item.name+'dt'" >{{item.name}}</dt>
                <dd :key="item.name" >{{item.definition}}</dd>
              </template>
            </div>
            <div class="target-modal-illustrate-right">
              <template v-for="(item) in listRight">
                <dt :key="item.name+'dt'" >{{item.name}}</dt>
                <dd :key="item.name" >{{item.definition}}</dd>
              </template>
            </div>
          </dl>
        </li>
        <li class="otherPage">
            <div class="page box-bg-border">
                <span class="border border-top-left"></span>
                <span class="border border-top-right"></span>
                <span class="border border-bottom-left"></span>
                <span class="border border-bottom-right"></span>
               <div class="dashbord">二、传播页</div>
               <div class="pageContent">
                 <div class="publiclist" v-for="(item) in spreadPage">
                   <div class="publiclistLeft">{{item.name}}</div>
                   <div class="publiclistRight">{{item.definition}}</div>
                 </div>
               </div>

            </div>
            <div class="page box-bg-border">
                <span class="border border-top-left"></span>
                <span class="border border-top-right"></span>
                <span class="border border-bottom-left"></span>
                <span class="border border-bottom-right"></span>
                <div class="dashbord">三、获客页</div>
                <div class="pageContent">
                 <div class="publiclist" v-for="(item) in customersPage">
                   <div class="publiclistLeft">{{item.name}}</div>
                   <div class="publiclistRight">{{item.definition}}</div>
                 </div>
               </div>

            </div>
            <div class="page box-bg-border">
                 <span class="border border-top-left"></span>
                <span class="border border-top-right"></span>
                <span class="border border-bottom-left"></span>
                <span class="border border-bottom-right"></span>
                <div class="dashbord">四、转化页</div>
                <div class="pageContent">
                 <div class="publiclist" v-for="(item) in transformPage">
                   <div class="publiclistLeft">{{item.name}}</div>
                   <div class="publiclistRight">{{item.definition}}</div>
                 </div>
               </div>

            </div>
        </li>
      </ul>
    </el-dialog>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class TargetModal extends Vue {
  // prop
  @Prop({
    required: true,
    default: false
  }) visible!: boolean;

  @Watch('visible')
  onVisiblechange(newval: any, oldval: any) {
    this.showFlag = this.visible;
  }

  showFlag: boolean = false;

  title: string = '指标说明';
  listLeft: object[] = [
    {
      name: '传播',
      definition: 'SEM投放和广告投放的用户兴趣行为数量(目前为用户点击次数)',
    },
    {
      name: '社会化裂变',
      definition: '社交裂变的授权小程序用户数',
    },
    {
      name: '厂方分配',
      definition: '来源于厂方分配下发的线索产生的意向数量',
    },
    {
      name: '垂媒',
      definition: '汽车类合作的垂直媒体平台导入的线索产生的意向数量',
    },
    {
      name: '外拓获客',
      definition: '由经销商人员主动发起的获客行为获得的线索产生的意向数量',
    },
    {
      name: '自然获客',
      definition: '通过线下自然进店的用户获得的线索产生的意向数量',
    },
     {
      name: '成交线下平均转化周期',
      definition: '线下渠道来源的用户从建卡到成交的平均转化周期',
    }
    // {
    //   name: '电商',
    //   definition: '来源于厂方自营的天猫和京东导入的线索总数',
    // },
    // {
    //   name: '去重线索占比',
    //   definition: '按手机号对全渠道线索进行去重后/该渠道获得的总线索数',
    // },
    // {
    //   name: '意向',
    //   definition: '所有渠道获得的意向总数',
    // }
   
  ];

  listRight: object[] = [
    //  {
    //   name: '建卡',
    //   definition: '实际建卡用户总数',
    // }, {
    //   name: '建卡线上平均转化周期',
    //   definition: '用户从线上渠道留资到建卡的平均转化周期',
    // }, 
    {
      name: '意向',
      definition: '所有渠道获得的线索产生的意向总数',
    },
    {
      name: '战败池',
      definition: '建卡后战败用户总数',
    }, {
      name: '到店',
      definition: '意向到店用户总数',
    }, {
      name: '订单',
      definition: '消费者下的定金订单和交现车订单数量，不考虑退订的情况',
    }, 
    // {
    //   name: '到店线下平均转化周期',
    //   definition: '线下渠道来源的用户从建卡到到店的平均转化周期',
    // },
     {
      name: '总成交量(总交车量)',
      definition: '交车不退车的总交车车辆数',
    }, {
      name: '成交线上平均转化周期',
      definition: '线上渠道来源的用户从建卡到成交的平均转化周期',
    }
  ];
  spreadPage: object[] = [
    {
      name: '曝光',
      definition: 'SEM投放和广告投放的曝光量',
    },
     {
      name: '兴趣',
      definition: 'SEM投放和广告投放的用户兴趣行为数量（目前为用户点击次数）',
    }
  ];
  customersPage: object[] = [
    {
      name: '线索',
      definition: '下发给经销商的线索数量',
    },
     {
      name: '跟进数',
      definition: '销售顾问跟进的线索数量',
    }
  ];
    transformPage: object[] = [
    {
      name: '建卡',
      definition: '销售顾问对线索跟进后为用户在该经销商建一张卡',
    },
     {
      name: '到店',
      definition: '线下4S店的用户进店数量',
    },
     {
      name: '试乘试驾',
      definition: '在线下4S店试乘试驾的用户数量',
    }
  ];
    handleClose() {
      this.showFlag = false;
      this.$emit('onSpecificationClose');
    }

  created() {
    //

  }

  mounted() {
  }

}
</script>

<style lang="scss">
.targetmodal-wrap{
  // font-family:PingFangSC-Regular,PingFang SC;
  background-color:rgba(0,0,0,0.6);
 .el-dialog{
    background-color: #121626;
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.59);
    border-radius: 24px;
    color: #fff;
    .el-dialog__header{
      padding: 0 56px 0 44px;
      border-bottom: 2px solid #3A4263;
      box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.59);
      height: 114px;
      line-height: 114px;
      .el-dialog__headerbtn{
        right: 56px;
      }
    }
    .el-dialog__body{
      height: 1500px;
      padding: 60px 80px 80px;
    }
 }
 .target-modal-block{
   display: flex;
   flex-wrap: wrap;
   font-size: 32px;
   color:rgba(255,255,255,0.6);
   h3{
     font-size: 36px;
     color: #fff;
   }
   .target-modal-title-icon{
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: #236BB4;
      border: 2px solid #236BB4;
      border-radius: 50%;
      vertical-align: middle;
      margin: 0 24px 10px 10px;
   }
   .target-modal-title-icon:before{
    content: '';
      display: inline-block;
      width: 28px;
      height: 28px;
      border: 2px dashed #236BB4;
      border-radius: 50%;
      position: relative;
      top: -12px;
      left: -10px;
  }
   .target-modal-half{
     width: 1072px;
     height: 222px;
     .target-modal-half-content{
       margin: 28px 0 48px 56px;
     }
   }
   .target-modal-margin{
     margin-right: 240px;
   }
  .target-modal-illustrate{
    width: 2660px;

    .target-modal-illustrate-content{
      position: relative;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      width: 100%;
      height: 670px;
      margin-top: 40px;
      padding: 116px 60px 32px;
      border: 4px solid #3A4263;
      box-shadow:inset 0px 2px 50px 16px rgba(31,34,45,1);
      border-radius: 30px;


      dt{
        color: #fff;
      }

      dt, dd{
        display: inline-block;
        margin-bottom: 28px;
      }
      .target-modal-illustrate-left{
        width: 1230px;
        height: 622px;
        overflow: hidden;
        border-right: 2px dashed #3A4263;
        dt{
          width: 328px;
        }
        dd{
          width: 900px;
        }
      }
      .target-modal-illustrate-right{
        width: 1098px;
        dt{
          width: 350px;
          margin-left: 44px;
        }
        dd{
          width: 704px;
        }
      }
   
    }
  }

  .target-modal-illustrate-left:before, 
  .target-modal-illustrate-left:after, 
  .target-modal-illustrate-right:before, 
  .target-modal-illustrate-right:after {
    content: '';
    width: 60px;
    height: 60px;
    position: absolute;
    
 }
 .target-modal-illustrate-left:before{
    border-top: 6px solid #5F6CA5;
    border-left: 6px solid #5F6CA5;
    border-top-left-radius: 50% ;
    top: -4px;
    left: -4px; 
 }
 .target-modal-illustrate-left:after{
    border-bottom: 6px solid #5F6CA5;
    border-left: 6px solid #5F6CA5;
    border-bottom-left-radius: 50%;
    bottom: -4px;
    left: -4px; 
 }
 .target-modal-illustrate-right:before{
    border-top: 6px solid #5F6CA5;
    border-right: 6px solid #5F6CA5;
    border-top-right-radius: 50% ;
    top: -4px;
    right: -4px; 
 }
 .target-modal-illustrate-right:after{
    border-bottom: 6px solid #5F6CA5;
    border-right: 6px solid #5F6CA5;
    border-bottom-right-radius: 50%;
    bottom: -4px;
    right: -4px; 
 }

 .otherPage{
   width: 100%;
  //  height: 200px;
  //  background-color: red;
   display: flex;
   margin-top: 20px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;

  .page{
    // background-color: green;
    width: 33%;
    // height: 200px;
    padding: 116px 40px 0 60px;

    .pageContent{
    width: 100%;
      .publiclist{
        display: flex;
        width: 100%;
        margin-bottom: 28px;
         .publiclistLeft{
           width: 196px;
           color: #fff;
         }
         .publiclistRight{
           flex: 1;
         }

      }
    }
  }
 }
    .dashbord{
        position: absolute;
        top: 0;
        left: 80px;
        width:208px;
        height:72px;
        background:rgba(30,36,65,1);
        border-radius:0px 0px 12px 12px;
        text-align: center;
        padding-top: 10px;
        color: #fff;
   }
 }

  
}

</style>

