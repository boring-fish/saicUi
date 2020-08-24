<template>
  <div class="earlywarn-wrap">
    <el-dialog
      title="预警和报警"
      :visible.sync="dialogVisible"
      width="2400px"
      height="1350px"
      top="404px"
      :modal-append-to-body="false"
      :appendToBody="false"
      :before-close="handleClose"
    >
      <div class="warning">
        <div class="warnSelect">
          <div class="warnr">
            <div
              class="warnbutton"
              v-for="(item,index) in warnbutton1"
              :key="index"
              :class="index === warnClassIndex ? 'warnbutton2' : ''"
              @click="warnTab(item,index)"
            >{{item}}</div>
          </div>
          <div class="warnr warnrt">
            <!-- <div
              class="warnbutton"
              v-for="(item,index) in warnbutton2"
              :key="item"
             
              :class="index === warnClassIndex2 ? 'warnbutton2' : ''"
              @click="warnTabBrand(item, index)"
            >{{item}}</div> -->
              <div
              class="warnbutton"
              :class="!isRAdmin?'warnbutton3':warnClassIndex2 === 0 ? 'warnbutton2' : ''"
              @click="warnTabBrand(0)"
            >R标</div>
              <div
              class="warnbutton"
              :class="!isRWAdmin?'warnbutton3':warnClassIndex2 === 1  ? 'warnbutton2' : ''"
              @click="warnTabBrand(1)"
            >荣威</div>
              <div
              class="warnbutton"
              :class="!isMGAdmin?'warnbutton3':warnClassIndex2 === 2 ? 'warnbutton2' : ''"
              @click="warnTabBrand(2)"
            >名爵</div>
          </div>
          <div class="block">
            <el-date-picker
              v-model="time"
              ref="datePickers"
              type="daterange"
              :appendToBody="false"
              @focus="handleShowDatePanel"
              @blur="handleCloseDatePanel"
              @change="getchangeData"
              range-separator="—"
              prefix-icon="sd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
            <span v-if="datePanel" class="iconfont iconsanjiaojiantou-shang"></span>
            <span v-else class="iconfont iconsanjiaojiantou-xia"></span>
          </div>
          <div class="selectdiv">
            <el-select
              v-model="areacheck"
              placeholder="请选择"
              @focus="handleShowDatePanel"
              @blur="handleCloseDatePanel"
              @change="getchangeData"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in areaoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span v-if="selectPanel" class="iconfont iconsanjiaojiantou-shang"></span>
            <span v-else class="iconfont iconsanjiaojiantou-xia"></span>
          </div>

          <span class="iconfont iconxiazai" @click="getExcelData()"></span>
        </div>

        <div class="warnSelectContent">
          <div class="warnSelectContentOption" v-for="(item,index) in warnData" :key="index">
            <span class="iconfont iconyujing" :class="item.warningType==='0'?'right':'error'"></span>
            <div class="warnSelectwz">
              <p>{{item.createTime}}</p>
              <p>{{item.emailDesc}}</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';

@Component({})
export default class EarlyWarn extends Vue {
  public warnbutton1: any = ['全部', '预警', '报警'];
  public warningType: any = '';
  // public warnbutton2: any = ['R标', '荣威', '名爵'];
  brandid: any = '101';
  public warnData: Array<any> = [];
  dialogVisible: boolean = false;
  time: any = '';
  public areaoptions: Array<any> = [
    {
      value: '',
      label: '全国'
    }
  ];
  public areacheck: any = '';
  warnClassIndex: number = 0;
  warnClassIndex2: number = 0;
  isMGAdmin: any = '';
  isRWAdmin: any = '';
  isRAdmin: any = '';
  datePanel: boolean = false;
  selectPanel: boolean = false;
  @Prop({ default: true }) private changeDefeatedModal!: boolean;
  mounted() {
    //  this.getRoles();
    //  this.openClose(); 
    //  this.getWarnData();
     this.getAreaData();
  }

  public openClose() {
    this.dialogVisible = this.changeDefeatedModal;
  }
  public handleClose(done: any) {
    this.$emit('closeyj', false);
  }
  public warnTab(item: any, index: number) {
    this.warnClassIndex = index;
    this.warningType = item === '预警' ? '0' : item === '报警' ? '1' : '';
    this.getWarnData();
    
  }
getRoles() {
let roles: any = $permission.getRoles();
Object.keys(roles).forEach((item: any) => {
  if (item === 'isMGAdmin') {
    this.isMGAdmin = roles[item];
    if (this.isMGAdmin) {
     this.warnClassIndex2 = 2;
    }
  }
  if (item === 'isRWAdmin') {
    this.isRWAdmin = roles[item];
     if (this.isRWAdmin) {
     this.warnClassIndex2 = 1;
    }
  }
  if (item === 'isRAdmin') {
    this.isRAdmin = roles[item];
 if (this.isRAdmin) {
     this.warnClassIndex2 = 0;
    }
  }
   if (item === 'isAdministrator') {
    if (roles[item]) {
      this.isRAdmin = true;
     this.isRWAdmin = true;
     this.isMGAdmin = true;
     this.warnClassIndex2 = 0;
    }
  }
});
}
   public warnTabBrand(index: number) {
    this.warnClassIndex2 = index;
    this.brandid = index === 1 ? '101' : index === 2 ? '121' : '100';
   this.getWarnData();
  }
  handleShowDatePanel(param: any): void {
    if (param.type === 'daterange') {
      this.datePanel = true;
    } else {
      this.selectPanel = true;
    }
  }
  handleCloseDatePanel(param: any): void {
     this.getWarnData();
    if (param.type === 'daterange') {
      this.datePanel = false;
    } else {
      this.selectPanel = false;
    }
  }
  getchangeData() {
    this.getWarnData();
  }
  @Watch('changeDefeatedModal')
  getchangeDefeatedModal(newval: any, oldval: any) {
    this.warnClassIndex = 0;
    this.getRoles();
    this.warningType = '';
    this.brandid =  this.warnClassIndex2 === 0 ? '100' : this.warnClassIndex2 === 1 ? 101 : 121;
    this.openClose();
    this. getWarnData();
  }
  getWarnData() {
    let params = {
      brandId: this.brandid,
      logTimeE: this.time[1],
      logTimeS: this.time[0],
      pageNo: '1',
      pageSize: '50',
      rfsCode: this.areacheck,
      warningType: this.warningType
    };
    $api.WarnSettingApi.getWarnList(params).then((res: any) => {
      if (res.datas) {
        this.warnData = [];
         res.datas.forEach((item: any) => {
          this.warnData.push({
            createTime: item.createTime.replace(/-/g, '/'),
            emailDesc: item.emailDesc,
            warningType: item.warningType
          });
        });
      } else {
         this.warnData = [];
      }
      });
  }
  getExcelData() {
    let params = {
        brandId: this.brandid,
        logTimeE: this.time[1],
        logTimeS: this.time[0],
        rfsCode: this.areacheck,
        warningType: this.warningType
    };
     $api.WarnSettingApi.getWarnExcel(params).then((res: any) => {
          const blob = new Blob([res], { type: 'application/xlsx' });
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement('a');
          link.href = url;
          link.style.display = 'none';
          link.setAttribute('download', '预警报警详情.xlsx');
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
          });
  }
  getAreaData() {
     $api.DashboardApi.getrfsBaseData({}).then((res: any) => {
        res.forEach((item: any) => {
          this.areaoptions.push({
            value: item.rfsCode,
            label: item.rfsName
          });
        });
      });
  }
}
</script>

<style lang="scss">
  .el-dialog {
    background-color:rgba(18,22,38,1);
    color: #ffffff;
    font-size: 36px;
    .el-dialog__header {
      padding: 32px 0px 22px 44px;
      color: #ffffff;
       border-bottom: 1px solid rgba(58,66,99,1);;

      .el-dialog__title {
        font-size: 36px;
        color: #ffffff;
      }

      .el-dialog__headerbtn .el-dialog__close {
        color: #ffffff;
        font-size: 34px;
        margin-top: 20px;
      }
    }

    .el-dialog__body {
      color: #ffffff;
    }
    .warning {
      width: 100%;
      height: 100%;
      padding: 30px 0;
      .warnSelect {
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0 60px;
        .warnrt {
          margin-left: 40px;
        }
         .warnr {
          display: flex;
          align-items: center;
          background: rgba(9, 12, 21, 1);
          border-radius: 30px;
          border: 1px solid rgba(58, 66, 99, 1);
          color: rgba(255, 255, 255, 0.4);
          .warnbutton {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 176px;
            height: 60px;
            color: rgba(255, 255, 255, 0.4);
            font-size: 28px /* 28/100 */;
            cursor: pointer;
            background:rgba(9,12,21,1);
          }
          .warnbutton:nth-child(1) {
            border-top-left-radius: 40px;
            border-bottom-left-radius: 40px;
            
          }
          .warnbutton:nth-child(2) {
            border-left: 2px solid rgba(58, 66, 99, 1);
            border-right: 2px solid rgba(58, 66, 99, 1);
          }
          .warnbutton:nth-child(3) {
            border-top-right-radius: 40px;
            border-bottom-right-radius: 40px;

          }
          .warnbutton2 {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 176px;
            height: 60px;
            background: #236bb4;
            border: 2px solid #3a4263;
            color: #ffffff;
            font-size: 28px;
          }
          .warnbutton3 {
            display: flex;
            align-items: center;
            pointer-events: none;
            cursor: default;
            opacity: 0.1;
            justify-content: center;
            width: 176px;
            height: 60px;
            // background: #236bb4;
            // border: 1px solid #3a4263;
            color: #ffffff;
            font-size: 28px /* 28/100 */;
          }
        }
        .block {
          width: 780px;
          background: #021722;
          margin-left: 40px;
          display: flex;
          position: relative;
          background: rgba(9,12,21,1);
          border-radius: 30px;
          border: 1px solid rgba(58,66,99,1);
          .iconsanjiaojiantou-xia,
          .iconsanjiaojiantou-shang {
            position: absolute;
            top: 0;
            right: 10px;
            color: #ffffff;
            line-height: 60px;
            font-size: 32px;
            cursor: pointer;
          }
          .iconsanjiaojiantou-shang {
            color:rgba(35,107,180,1);
          }
          .el-popper[x-placement^="bottom"] {
            position: absolute !important;
            top: 75px !important;
            left: 0 !important;
            width: 1000px;
            border: none;
            background: rgba(30,36,65,1);
          }
          .el-input__inner {
            -webkit-appearance: none;
            box-sizing: border-box;
            color: #ffffff;
            background:rgba(9,12,21,1);
            border-radius:15px;
            border:1px solid rgba(58,66,99,1);
          }
          .el-icon-arrow-right:before {
            color: #ffffff;
          }
          .el-date-table td.start-date span {
            width: 45px;
            height: 24px;
            border-radius: 100%;
            background-color: rgba(35,107,180,1);
            color: #ffffff;
            z-index: 100;
          }
          .el-date-table td.end-date span {
            width: 45px;
            height: 24px;
            border-radius: 100%;
            background-color: rgba(35,107,180,1);
            color: #ffffff;
            z-index: 100;
          }
          .el-date-table {
            font-size: 12px;
            color: #ffffff;
          }
          .el-date-table td.in-range div,
          .el-date-table td.in-range div:hover,
          .el-date-table.is-week-mode .el-date-table__row.current div,
          .el-date-table.is-week-mode .el-date-table__row:hover div {
            background:rgba(35,107,180,0.2);

            color: #ffffff;
          }

          .el-date-range-picker__time-header {
            border:1px solid rgba(58,66,99,1);
           
          }
           .el-picker-panel__icon-btn {
             color: white;
            }
          .el-date-range-picker__header div {
            color: #ffffff;
          }
          .el-date-table th {
            color: #ffffff;
            border:1px solid rgba(58,66,99,1);
          }
          .el-date-range-picker__content.is-left {
            border-right:1px solid rgba(58,66,99,1);
          }
          .el-picker-panel__footer {
            border-top:1px solid rgba(58,66,99,1);
            background-color: #021722;
          }
          .el-button--text {
            color: #ffffff;
          }
          .el-button {
            background: none;
            border: none;
            color: #ffffff;
          }
          .el-button.is-plain:focus,
          .el-button.is-plain:hover {
            background: rgba(10, 174, 179, 0.3);
            border: none;
            color: #ffffff;
          }
          .el-time-panel {
            background:rgba(30,36,65,1);
            box-shadow:0px 4px 12px 0px rgba(0,0,0,0.5);
            border-radius:8px;
            border: none;
          }
          .el-time-spinner {
            background:rgba(30,36,65,0.3);
          }

          .el-time-panel__btn {
            font-size: 14px;
            color: #ffffff;
          }
          .el-time-panel__btn.confirm {
            font-weight: 800;
            color: #ffffff;
          }
          .el-time-spinner__item {
            color: #ffffff;
          }
          .el-range-editor.el-input__inner {
            width: 95%;
            height: 60px;
            background:rgba(9,12,21,1);
            border: none;
          }
          .el-range-editor.el-input__inner:nth-child(1) {
            width: 95%;
            height: 60px;
            background:rgba(9,12,21,1);
            border-radius: 30px;
            border-left: 1px solid #3a4263
          }
          .el-date-editor .el-range-input {
            width: 100%;
            color: #ffffff;
            font-size: 28px;
            background:rgba(9,12,21,1);
          }
          .el-date-editor .el-range__close-icon {
            font-size: 32px;
            color: #021722;
            overflow: hidden;
          }
          .el-date-editor .el-range-separator {
            width: 100px;
            color: #ffffff;
            margin-top: 18px;
          }
          .el-icon--right {
            font-size: 30px;
            margin-top: 15px;
          }
        }
        .selectdiv {
          position: relative;
          .iconsanjiaojiantou-xia,
          .iconsanjiaojiantou-shang {
            position: absolute;
            top: 0;
            right: 5px;
            color: #ffffff;
            line-height: 60px;
            font-size: 32px;
            cursor: pointer;
          }
          .iconsanjiaojiantou-shang {
            color: rgba(35,107,180,1);
          }
          .el-select {
            display: block;
            position: relative;
            color: #ffffff;

            margin-left: 40px;
            .el-input--suffix .el-input__inner {
              color: #fff;
              width: 218px;
              height: 60px;
              font-size: 28px;
              background:rgba(9,12,21,1);
              border-radius:15px;
              border:1px solid rgba(58,66,99,1);
              .el-input__icon {
                margin-left: 40px;
              }
            }
            .el-scrollbar__wrap {
              width: 250px;
              color: #ffffff;
              padding: 20px 20px 20px 10px;
              font-size: 28px;
              background:rgba(30,36,65,1);
              box-shadow:0px 4px 12px 0px rgba(0,0,0,0.5);
              border-radius:8px;
            }
            .el-select-dropdown__item.hover,
            .el-select-dropdown__item:hover {
              background:rgba(35,107,180,0.2);
            }
            .el-select-dropdown__item.hover,
            .el-select-dropdown__item.selected {
              color: rgba(35,107,180,1);
            }
            .el-select-dropdown__item {
              font-size: 28px;
              color: #ffffff;
              height: 42px;
            }
            .el-popper[x-placement^="bottom"] {
              border: none;
              background: #021722;
            }
            .el-popper[x-placement^="bottom"] .popper__arrow::after {
              border-bottom-color: #021722;
            }
            .el-popper[x-placement^="bottom"] .popper__arrow {
              border-bottom-color: #021722;
            }
          }
        }

        .iconxiazai {
          font-size: 40px;
          margin-left: 135px;
        }
      }
      .warnSelectContent {
        width: 101%;
        height: 1200px;
        background: rgba(18,22,38,1);
        margin-top: 10px;
        font-size: 32px;
        color: #ffffff;
        padding: 0 0 0 60px;
         overflow-y: scroll;
        .warnSelectContentOption {
          width: 100%;
          height: 150px;
          border-bottom:1px solid rgba(58,66,99,1);;
          display: flex;
          .iconyujing {
            color: #e83604;
            font-size: 50px;
            padding: 50px 0px 0 15px;
          }
          .right {
            color: #fcce00;
          }
          .error {
            color: #e83604;
          }
          .warnSelectwz {
            padding: 38px 50px;
          }
           .warnSelectwz p:nth-child(1){
            color:rgba(255,255,255,0.6);
          }
        }
      }
    }
  }
  
</style>

