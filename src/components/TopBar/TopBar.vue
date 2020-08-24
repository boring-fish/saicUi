<template>
  <div class="topbar-wrap">
    <div class="topbar-box">
      <!-- 看板部分ml -->
      <div class="return-btn" @click="returnTosetting" v-if="hideFlag">
        <i class="el-icon-arrow-left"></i>返回
      </div>
      <div class="specification" @click="onSpecificationOpen">
        <i class="iconfont iconshuoming1"></i>指标说明
      </div>
      <div class="pointer" :class=" isActive?'activeoverview':'overview' " @click="handleOverViewActive">
        <div class="overViewLogo">
          <img src="@/assets/img/logo@2x.png" alt="logo" />
        </div>
        <p class="overViewTitle">
          <span class="overViewTitlename">营销闭环度量看板</span>
          <!-- <img src="@/assets/img/Saic Sales Dashboard@2x.png" alt=""> -->
           <span class="sysParam"
            ><span class="systimetitle">系统时间:</span
            ><span class="systime">{{sysTimeParam.sysTime}}</span></span
          >
          <span class="sysParam"
            ><span class="systimetitle">数据更新时间:</span
            ><span class="systime">{{sysTimeParam.dataUpdateTime}}</span></span
          >
        </p>
      </div>
      <!-- 传播，获客，转化ml -->
      <ul class="topNav">
        <li
          @click="handleSpreadClick"
          class="spread pointer"
          :class="isSpreadActive?'spreadActive':''"
        >
          <div class="title">
            <div>传播</div>
            <span class="iconfont iconfangdajing magnifier" :class="isSpreadActive?'changeColor':'defaultColor'"></span>
          </div>
          <div class="content">
            <div class="contentLeft ContentAll">
              <ul>
                <li>
                  <p>曝光</p>
                </li>
                <li>
                  <p style="  margin-left: 114px;">
                    {{dataList.spread.spreadImpModel.value ? dataList.spread.spreadImpModel.value : '——'}}
                    <b>{{dataList.spread.spreadImpModel.unit}}</b>
                  </p>
                </li>
                <!-- :class="up?'iconshangsheng':'iconxiajiang'" -->
                <li>
                  <p>
                    同比
                    <span class="margin-left"
                     v-if="dataList.spread.spreadImpModel.tb"
                      :class="classString(dataList.spread.spreadImpModel.tb.startsWith('-'), dataList.spread.spreadImpModel.tbColor)"
                    >{{dataList.spread.spreadImpModel.tb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>  
                  <p>
                    环比
                    <span class="margin-left"
                      v-if="dataList.spread.spreadImpModel.hb"
                      :class="classString(dataList.spread.spreadImpModel.hb.startsWith('-'), dataList.spread.spreadImpModel.hbColor)"
                    >{{dataList.spread.spreadImpModel.hb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    目标值
                    <span class="margin-left">
                      {{dataList.spread.spreadImpModel.aims ? dataList.spread.spreadImpModel.aims : '——'}}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    完成率
                    <span class="margin-left"
                      v-if="dataList.spread.spreadImpModel.finished"
                      :class="classString(dataList.spread.spreadImpModel.finished.startsWith('-'), dataList.spread.spreadImpModel.aimColor, true)"
                    >{{dataList.spread.spreadImpModel.finished}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="contentRight ContentAll">
              <ul>
                <li>
                  <p>兴趣</p>
                </li>
                <li>
                  <p style="margin-left: 114px;">
                    {{dataList.spread.spreadExposureModel.value ? dataList.spread.spreadExposureModel.value : '——'}}
                    <b>{{dataList.spread.spreadExposureModel.unit}}</b>
                  </p>
                </li>
                <!-- :class="up?'iconshangsheng':'iconxiajiang'" -->
                <li>
                  <p>
                    同比
                    <span class="margin-left"
                      v-if="dataList.spread.spreadExposureModel.tb"
                      :class="classString(dataList.spread.spreadExposureModel.tb.startsWith('-'), dataList.spread.spreadExposureModel.tbColor)"
                    >{{dataList.spread.spreadExposureModel.tb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    环比
                    <span class="margin-left"
                      v-if="dataList.spread.spreadExposureModel.hb"
                      :class="classString(dataList.spread.spreadExposureModel.hb.startsWith('-'), dataList.spread.spreadExposureModel.hbColor)"
                    >{{dataList.spread.spreadExposureModel.hb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    目标值
                    <span  class="margin-left">
                      {{dataList.spread.spreadExposureModel.aims ? dataList.spread.spreadExposureModel.aims : '——'}}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    完成率
                    <span class="margin-left"
                      v-if="dataList.spread.spreadExposureModel.finished"
                      :class="classString(dataList.spread.spreadExposureModel.finished.startsWith('-'), dataList.spread.spreadExposureModel.aimColor, true)"
                    >{{dataList.spread.spreadExposureModel.finished}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li
          @click="handleClickGetVisitors"
          class="getVisitors pointer"
          :class="{
            'getVisitorsActive': isGetVisitorsActive,
            'conversionActivegetVisitors': isConversionActive || overviewActive,
            'spreadActivegetVisitors': isSpreadActive
          }"
        >
          <div class="title">
            <div>获客</div>
            <span class="iconfont iconfangdajing magnifier customersPosition" :class="isGetVisitorsActive?'changeColor':'defaultColor'"></span>
          </div>
          <div class="content">
            <div class="contentLeft ContentAll">
              <ul>
                <li>
                  <p>线索</p>
                </li>
                <li>
                  <p style="margin-left: 112px;">
                    {{dataList.winguest.Retention.value ? dataList.winguest.Retention.value : '——'}}
                    <b>{{dataList.winguest.Retention.unit}}</b>
                  </p>
                </li>
                <!-- :class="up?'iconshangsheng':'iconxiajiang'" -->
                <li>
                  <p>
                    同比
                    <span class="margin-left"
                      v-if="dataList.winguest.Retention.tb"
                      :class="classString(dataList.winguest.Retention.tb.startsWith('-'), dataList.winguest.Retention.tbColor)"
                    >{{dataList.winguest.Retention.tb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    环比
                    <span class="margin-left"
                      v-if="dataList.winguest.Retention.hb"
                      :class="classString(dataList.winguest.Retention.hb.startsWith('-'), dataList.winguest.Retention.hbColor)"
                    >{{dataList.winguest.Retention.hb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    目标值
                    <span class="margin-left">
                      {{dataList.winguest.Retention.aims ? dataList.winguest.Retention.aims : '——'}}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    完成率
                    <span class="margin-left"
                      v-if="dataList.winguest.Retention.finished"
                      :class="classString(dataList.winguest.Retention.finished.startsWith('-'), dataList.winguest.Retention.aimColor, true)"
                    >{{dataList.winguest.Retention.finished}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="contentRight ContentAll">
              <ul>
                <li>
                  <p>意向</p>
                </li>
                <li>
                  <p style="margin-left: 112px;">
                    {{dataList.winguest.intention.value ? dataList.winguest.intention.value : '——'}}
                    <b>{{dataList.winguest.intention.unit}}</b>
                  </p>
                </li>
                <!-- :class="up?'iconshangsheng':'iconxiajiang'" -->
                <li>
                  <p>
                    同比
                    <span class="margin-left"
                      v-if="dataList.winguest.intention.tb"
                      :class="classString(dataList.winguest.intention.tb.startsWith('-'), dataList.winguest.intention.tbColor)"
                    >{{dataList.winguest.intention.tb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    环比
                    <span class="margin-left"
                      v-if="dataList.winguest.intention.hb"
                      :class="classString(dataList.winguest.intention.hb.startsWith('-'), dataList.winguest.intention.hbColor)"
                    >{{dataList.winguest.intention.hb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    目标值
                    <span class="margin-left">
                      {{dataList.winguest.intention.aims ? dataList.winguest.intention.aims : '——'}}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    完成率
                    <span class="margin-left"
                      v-if="dataList.winguest.intention.finished"
                      :class="classString(dataList.winguest.intention.finished.startsWith('-'), dataList.winguest.intention.aimColor, true)"
                    >{{dataList.winguest.intention.finished}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li
          @click="handleClickConversion"
          class="conversion pointer"
          :class="{
            'getVisitorsActiveConversion': isGetVisitorsActive,
            'conversionActive': isConversionActive
          }"
        >
          <div class="title">
            <div>转化</div>
            <span class="iconfont iconfangdajing magnifier transformPosition" :class="isConversionActive?'changeColor':'defaultColor'"></span>
          </div>
          <div class="content">
            <div class="contentLeft ContentAll">
              <ul>
                <li>
                  <p>到店</p>
                </li>
                <li>
                  <p style="margin-left: 115px;">
                    {{dataList.conversion.createcard.value ? dataList.conversion.createcard.value : '——'}}
                    <b>{{dataList.conversion.createcard.unit}}</b>
                  </p>
                </li>
                <!-- :class="up?'iconshangsheng':'iconxiajiang'" -->
                <li>
                  <p>
                    同比
                    <span class="margin-left"
                      v-if="dataList.conversion.createcard.tb"
                      :class="classString(dataList.conversion.createcard.tb.startsWith('-'), dataList.conversion.createcard.tbColor)"
                    >{{dataList.conversion.createcard.tb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    环比
                    <span class="margin-left"
                      v-if="dataList.conversion.createcard.hb"
                      :class="classString(dataList.conversion.createcard.hb.startsWith('-'), dataList.conversion.createcard.hbColor)"
                    >{{dataList.conversion.createcard.hb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    目标值
                    <span class="margin-left">
                      {{dataList.conversion.createcard.aims ? dataList.conversion.createcard.aims : '——'}}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    完成率
                    <span class="margin-left"
                      v-if="dataList.conversion.createcard.finished"
                      :class="classString(dataList.conversion.createcard.finished.startsWith('-'), dataList.conversion.createcard.aimColor, true)"
                    >{{dataList.conversion.createcard.finished}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="contentRight ContentAll">
              <ul>
                <li>
                  <p>成交</p>
                </li>
                <li>
                  <p style="margin-left: 112px;">
                    {{dataList.conversion.deal.value ? dataList.conversion.deal.value : '——'}}
                    <b>{{dataList.conversion.deal.unit}}</b>
                  </p>
                </li>
                <!-- :class="up?'iconshangsheng':'iconxiajiang'" -->
                <li>
                  <p>
                    同比
                    <span class="margin-left"
                      v-if="dataList.conversion.deal.tb"
                      :class="classString(dataList.conversion.deal.tb.startsWith('-'), dataList.conversion.deal.tbColor)"
                    >{{dataList.conversion.deal.tb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    环比
                    <span class="margin-left"
                      v-if="dataList.conversion.deal.hb"
                      :class="classString(dataList.conversion.deal.hb.startsWith('-'), dataList.conversion.deal.hbColor)"
                    >{{dataList.conversion.deal.hb | negative}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
                <li>
                  <p>
                    目标值
                    <span class="margin-left">
                      {{dataList.conversion.deal.aims ? dataList.conversion.deal.aims : '——'}}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    完成率
                    <span class="margin-left"
                      v-if="dataList.conversion.deal.finished"
                      :class="classString(dataList.conversion.deal.finished.startsWith('-'), dataList.conversion.deal.aimColor, true)"
                    >{{dataList.conversion.deal.finished}}</span>
                    <span v-else>——</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <!-- 预警ml -->
      <div class="waring">
        <div class="alert" @click="earlyWarn()">
          <img :src="warningType==='0'?warningTypeImg.yellow:warningType==='1'?warningTypeImg.error:warningTypeImg.security" alt="预警" />
        </div>
        <div class="link">
          <div class="iconRight" @click="scenePage">
            <!-- <div class="iconfont icondanjiantou-you"></div> -->
            <el-button type="primary" icon="el-icon-arrow-right" circle class="right-button" ></el-button>
          </div>
          <div class="iconClose" @click="logout">
            <div class="iconfont iconzhuxiaodenglu"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空余空间 -->
    <div class="otherSpace"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';
@Component({
  components: {
  },
  filters: {
    negative: (value: any) => {
      if (value.startsWith('-')) {
        return value.split('-')[1];
      } else {
        return value;
      }
    }
  }
})
export default class TopBar extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  })
  name!: string;
@Prop({
    required: false,
    default: 101
  }) brandId!: any;
  @Prop({
    required: false,
    default: {
      spread: {
        spreadImpModel: {
          value: '',
          unit: '',
          tb: '',
          hb: '',
          aims: '',
          finished: ''
        },
        spreadExposureModel: {
          value: '',
          unit: '',
          tb: '',
          hb: '',
          aims: '',
          finished: ''
        }
      },
      conversion: {
        createcard: {
          value: '',          //98.38
          unit: '',
          tb: '',              //6.00
          hb: '',               //6.00
          aims: '',          //1200000
          finished: ''       //92.85
        },
        deal: {
          value: '',      //36.29
          unit: '',
          tb: '',            //6.56
          hb: '',           //-1.07
          aims: '',         //500000
          finished: ''      //88.38
        }
      },
      winguest: {
        Retention: {
          value: '',
          unit: '',
          tb: '',
          hb: '',
          aims: '',
          finished: ''
        },
        intention: {
          value: '',
          unit: '',
          tb: '',
          hb: '',
          aims: '',
          finished: ''
        }
      }
    }
  })
  dataList!: object;
  hideFlag: boolean = false;
  // 声明四个状态，是否点击
  private isActive: boolean = true;
  private isSpreadActive: boolean = false;
  private isGetVisitorsActive: boolean = false;
  private isConversionActive: boolean = false;
  warningTypeImg: any = {
    security: require('@/assets/img/security@2x.png'),
    yellow: require('@/assets/img/yellow@2x.png'),
    error: require('@/assets/img/warning@2x.png')
    };
    warningType: String = '';
 //系统时间
  sysTimeParam: Object = {};
  classString(isMinus: boolean, colorStatus: number, isKpi: boolean = false) {
    let classString = '';
    if (!isKpi) {
      if (isMinus) {
        classString += 'iconfont iconxiajiang';
      } else {
        classString += 'iconfont iconshangsheng';
      }
    }

    switch (colorStatus) {
      case 0:
        classString += ' white';
        break;
      case 1:
        classString += ' red';
        break;
      case 2:
        classString += ' yellow';
        break;
      case 3:
        classString += ' green';
        break;
      default:
        break;
    }
    return classString;
  }
  onSpecificationOpen() {
    this.$emit('onSpecificationOpen', true);
  }


  // 看板的点击
  public handleOverViewActive(): void {
    this.overviewActive();
    this.$emit('onTopNavChange', 'dashboard');
  }
  overviewActive() {
    this.isActive = true;
    this.isSpreadActive = false;
    this.isGetVisitorsActive = false;
    this.isConversionActive = false;
  }
  // 传播的点击
  public handleSpreadClick(): void {
    this.spreadActive();
    this.$emit('onTopNavChange', 'spread');
  }
  spreadActive() {
    this.isSpreadActive = true;
    this.isActive = false;
    this.isGetVisitorsActive = false;
    this.isConversionActive = false;
  }
  // 获客的点击
  public handleClickGetVisitors(): void {
    this.visitorActive();
    this.$emit('onTopNavChange', 'visitors');
  }
  visitorActive() {
    this.isSpreadActive = false;
    this.isActive = false;
    this.isGetVisitorsActive = true;
    this.isConversionActive = false;
  }
  // 转化的点击
  public handleClickConversion(): void {
    this.conversionActive();
    this.$emit('onTopNavChange', 'conversion');
  }
  conversionActive() {
    this.isSpreadActive = false;
    this.isActive = false;
    this.isGetVisitorsActive = false;
    this.isConversionActive = true;
  }
  //场景
  public sceneTab() {
    // this.$route.push('scene');
    // this.$route.scene;
    this.$router.push({path: 'scene'});  

  }
  public earlyWarn() {
    this.$emit('openyj', 'true');
  }
  mounted() {
   this.getWarnData();
  }
  created() {
    this.getRole();
    this.updateTime();
    
    switch (this.$route.name) {
      case 'dashboard':
        this.overviewActive();
        break;
      case 'spread':
        this.spreadActive();
        break;
      case 'visitors':
        this.visitorActive();
        break;
      case 'ChannelConversion':
        this.conversionActive();
        break;
      case 'TurnoverDefeate':
        this.conversionActive();
        break;
      default:
        break;
    }
  }
  logout() {
    $api.DashboardApi.logout().then((res: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      window.location.replace(res.remoteLogoutUri);
    });
  }
  scenePage() {
     this.$router.push({path: '/sceneIndex', query: { brandId: this.brandId }}); 
  }
  //是否有报警预警数据
  getWarnData() {
    $api.WarnSettingApi.getwarningType({}).then((res: any) => {
       this.warningType = res.warningType;
      });
  }
   //获取系统时间
  updateTime() {
    $api.DashboardApi.getTime().then((res: any) => {
      this.sysTimeParam = res;
    });
  }

  returnTosetting() {
    this.$router.push('/setting');
  }

  getRole() {
    let roles = $permission.getRoles();
    let effectiveRole = $permission.getEffectiveRole();
    if ( roles['isKpiAdmin'] ) {
      this.hideFlag = true;
    }
    if ( effectiveRole && effectiveRole === 'admin' ) {
      this.hideFlag = true;
    }
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
      if (param.value > 1000) {
        param.value = param.value / 10000;
        param.unit = sizes[i + 1];
      }
    }
    return param;
  }
}
</script>

<style lang="scss">
.topbar-wrap {
  width: 100%;
  height: 430px;
  // background: $box-bg-primary;
  flex-wrap: wrap;
  position: relative;
  .pointer{
    cursor: pointer;
  }
  .return-btn {
    position: absolute;
    top: 38px;
    left: 52px;
    width: 100px;
    height:40px;
    font-size:28px; 
    color: #fff;
    cursor: pointer;   
  }
  .specification{
    position: absolute;
    top: 40px;
    left: 587px;
    width:194px;
    height:40px;
    font-size:28px;
    color: #fff;
    cursor: pointer;
    .iconshuoming1{
      font-size: 32px;
      margin-right: 8px;
    }
  }
  .topbar-box {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .otherSpace {
    width: 100%;
    height: 40px;
    margin-top: -6px;
    position: relative;
    z-index: 2;
    background-color: $box-bg-primary;
  }
  .activeoverview {
    width: 808px;
    height: 390px;
    background: url('../../assets/img/tabs-bg-kb-checked@2x.png');
  }
  .overview {
    width: 800px;
    height: 368px;
    background: $box-bg-primary;
    // background-color: #000;
  }
  .overViewLogo {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 70px;
    top: 128px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .overViewTitle {
    font-size: 60px;
    width: 480px;
    height: 140px;
    position: absolute;
    left: 236px;
    top: 130px;
    span{
      color: rgba(255, 255, 255, 1);
      font-family: 'PingFangSC-Semibold';
    }
    .overViewTitlename{
     display: block;
    }
    .sysParam {
      display: block;
      width: 570px;
      height: 40px;
      font-size: 28px;
      font-weight: 500;

      line-height: 60px;
      .systimetitle {
        width: 197px;
        display: inline-block;
        color: rgba(255, 255, 255, 0.4);
      }
      .systime {
        width: 298px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .topNav {
    box-sizing: border-box;
    height: 390px;
    width: 2800px;
    display: flex;
    padding-left: 20px;
    .spread,
    .getVisitors,
    .conversion {
      position: relative;
      height: 390px;
      background-repeat: no-repeat;
      color: #fff;
      position: relative;
      .title {
        height: 64px;
        width: 100%;
        position: relative;
        div {
          width: 78px;
          height: 56px;
          font-size: 40px;
          color: rgba(255, 255, 255, 1);
          line-height: 56px;
          letter-spacing: -2px;
          margin: 0 auto;
          margin-top: 8px;
        }
      }
      .content {
        width: 100%;
        height: 282px;
        display: flex;
        
        .ContentAll {
          width: 50%;
          height: 100%;
          ul {
            width: 100%;
            height: 100%;
            li {
              height: 45px;
              font-size: 24px;
              p {
                width: 100%;
                height: 100%;
                text-align: left;
                margin-left: 117px;
                span{
                  color: #fff;
                  margin-left: 20px;
                }
                b{
                  font-size: 24px;
                }
                .margin-left{
                  color: #fff;
                  margin-left: 20px;
                }
                 .green{
                       color:#56D884;
                     }
                     .red{
                       color: #FF7176;
                     }
                     .yellow {
                       color: #FFC72F;
                     }
                .white {
                  color: #fff;
                }
              }
            }
            li:nth-child(1) {
              p {
                font-size: 32px;
                color: #fff;
              }
            }
            li:nth-child(2) {
              height: 66px;
              line-height: 66px;
              p {
                font-size: 56px;
                width: 100%;
                margin-left: 100px;
                span {
                  font-size: 24px;
                  color: #ffffff;
                }
              }
            }
            li:nth-child(3) {
              p {
                color: $color-white-opacity;
                
                font-size: 24px;
                // width: 100%;
                .iconfont {
                  font-size: 24px;
                }
              }
            }
            li:nth-child(4) {
              p {
                font-size: 24px;
                color: $color-white-opacity;
                .iconfont {
                  font-size: 24px;
                }
              }
            }
            li:nth-child(5), li:nth-child(6){
              p{
                color: $color-white-opacity;
              }
            }
          }
        }
      }
    }
    .getVisitors,
    .conversion {
      .content {
        .contentLeft {
          margin-left: 120px;
        }
      }
    }
    .spread {
      width: 972px;
      // background-size: 9.72rem 3.68rem;
      background-size: contain;
      background-image: url("../../assets/img/tabs-bg-chb@2x.png");
    }
    .spreadActive {
      width: 994px;
      margin-left: -7px;
      background-size: contain;
      background-image: url("../../assets/img/tabs-bg-chb-checked@2x.png");
    }
    .getVisitors {
      margin-left: -98px;
      width: 1042px;
      // background-size: 10.28rem 3.68rem;
      background-size: contain;
      background-image: url("../../assets/img/tabs-bg-hk@2x.png");
    }
    .getVisitorsActive {
      margin-left: -88px;
      width: 1042px;
      // background-size: 10.28rem 3.9rem;
      background-size: contain;
      background-image: url("../../assets/img/tabs-bg-hk-checked@2x.png");
    }
    .conversion {
      margin-left: -118px;
      width: 972px;
      // background-size: 9.72rem 3.68rem;
      background-size: contain;
      background-image: url("../../assets/img/tabs-bg-zhh@2x.png");
    }
    .conversionActive {
      margin-left: -113px;
      width: 980px;
      // background-size: 9.72rem 3.9rem;
      background-size: contain;
      background-image: url("../../assets/img/tabs-bg-zhh-checked@2x.png");
    }
    .getVisitorsActiveConversion{
      margin-left: -131px;
    }
    // 处理margin
    .conversionActivegetVisitors{
      margin-left: -95px;
    }
    .spreadActivegetVisitors{
      margin-left: -115px;
    }

    .magnifier{
      position: absolute;
      top: 13px;
      right: 170px;
      font-size: 40px;
    }
    .customersPosition{
      top: 13px;
      right: 180px;
    }
    .transformPosition{
      top: 13px;
      right: 70px;
    }
    .defaultColor{
    color: rgba(58,66,99,1);
    }
    .changeColor{
      color: rgba(255,255,255,0.6);
    }
  }
  .waring {
    width: 512px;
    height: 388px;
    // background-color: #000;
    display: flex;
    justify-content: flex-end;
    .alert {
      width: 316px;
      height: 368px;
      // margin: 0 0.20rem;
      margin-right: 20px;
      border-radius: 0px 0px 16px 16px;
      background: $box-bg-primary;
      cursor: pointer;
      img {
        width: 172px;
        height: 172px;
        margin: 98px 72px;
      }
    }
    .link {
      width: 160px;
      height: 368px;
      // background-color: #fff;
      div {
        width: 100%;
        height: 174px;
        background: $box-bg-primary;
        position: relative;
      }
      .iconRight {
        margin-bottom: 20px;
        border-radius:0px 0px 0px 16px;
        i{
          font-weight: 1000;
        }
        .right-button{
          width: 76px;
          height: 76px;
          font-size: 34px;
          position: absolute;
          top: 0;right: 0;bottom: 0;left: 0;  
          margin: auto;
        }
      }
      .iconClose {
        border-radius:16px 0px 0px 16px;
        .iconfont {
          width: 50px;
          height: 52px;
          color: #99a2a6;
          font-size: 52px;
          position: absolute;
          top: 0;right: 0;bottom: 0;left: 0;
          margin: auto;
        }
      }
    }
  }
}
</style>

