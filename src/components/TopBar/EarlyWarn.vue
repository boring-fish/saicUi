<template>
  <div class="earlywarn-wrap">
    <el-dialog
      title="预警和报警1"
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
              @click="warnTab($event,index)"
            >{{item}}</div>
          </div>
          <div class="warnr warnrt">
            <div
              class="warnbutton"
              v-for="(item,index) in warnbutton2"
              :key="index"
              :class="index === warnClassIndex2 ? 'warnbutton2' : ''"
              @click="warnTabBrand($event,index)"
            >{{item}}</div>
          </div>
          <div class="block">
            <el-date-picker
              v-model="value2"
              ref="datePickers"
              type="datetimerange"
              :appendToBody="false"
              @focus="handleShowDatePanel"
              @blur="handleCloseDatePanel"
              range-separator="—"
              prefix-icon="sd"
              format="yyyy年MM月dd日 hh:mm:ss"
              :default-time="['12:00:00', '08:00:00']"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <span v-if="datePanel" class="iconfont iconsanjiaojiantou-shang"></span>
            <span v-else class="iconfont iconsanjiaojiantou-xia" @click="handleClickDatePicker"></span>
          </div>
          <div class="selectdiv">
            <el-select
              v-model="areacheck"
              placeholder="请选择"
              @focus="handleShowDatePanel"
              @blur="handleCloseDatePanel"
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
            <span v-else class="iconfont iconsanjiaojiantou-xia" @click="handleClickDatePicker"></span>
          </div>

          <span class="iconfont iconxiazai"></span>
        </div>

        <div class="warnSelectContent">
          <div class="warnSelectContentOption" v-for="(item,index) in warnOption" :key="index">
            <span class="iconfont iconyujing" :class="item.zt>0?'right':'error'"></span>
            <div class="warnSelectwz">
              <p>{{item.time}}</p>
              <p>{{item.total}}</p>
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
  public warnbutton2: any = ['R标', '荣威', '名爵'];
  public warnOption: any = [
    {
      zt: 1, //1表示正常，0表示异常
      time: '2020/03/01 08:00:00',
      total: '西北地区上月建卡目标完成率为68%'
    },
    {
      zt: 0,
      time: '2020/03/01 08:00:00',
      total: '西北地区上月建卡目标完成率为68%'
    }
  ];

  dialogVisible: boolean = false;
  begaintime: any = new Date();
  endtime: any = new Date(this.begaintime).setDate(
    

    this.begaintime.getDate() + 30
  );
  
  value2: any = [this.begaintime, this.endtime];
  public areaoptions: any = [
    {
      value: '1',
      label: '上海'
    },
    {
      value: '2',
      label: '北京'
    },
    {
      value: '3',
      label: '南京'
    },
    {
      value: '4',
      label: '苏州'
    },
    {
      value: '5',
      label: '兰州'
    },
    {
      value: '6',
      label: '全国'
    }
  ];
  public areacheck: any = '全国';
  warnClassIndex: number = 0;
  warnClassIndex2: number = 0;
  datePanel: boolean = false;
  selectPanel: boolean = false;
  @Prop({ default: true }) private changeDefeatedModal!: boolean;
  mounted() {
    this.openClose();
  }

  public openClose() {
    this.dialogVisible = this.changeDefeatedModal;
  }
  public handleClose(done: any) {
    this.$emit('closeyj', false);
  }
  public warnTab($event: any, index: number) {
    this.warnClassIndex = index;
  }
  public warnTabBrand($event: any, index: number) {
    this.warnClassIndex2 = index;
  }
  handleShowDatePanel(param: any): void {
    if (param.type === 'datetimerange') {
      this.datePanel = true;
    } else {
      this.selectPanel = true;
    }

  }
  handleCloseDatePanel(param: any): void {
    if (param.type === 'datetimerange') {
      this.datePanel = false;
    } else {
      this.selectPanel = false;
    }
  }
  handleClickDatePicker(): void {
    (this as any).$refs.datePickers.$refs.reference.focus();
  }
  @Watch('changeDefeatedModal')
  getchangeDefeatedModal(newval: any, oldval: any) {
    this.openClose();
    this.warnClassIndex = 0;
    this.warnClassIndex2 = 0;
  }
}
</script>

<style lang="scss">
.earlywarn-wrap {
  .el-dialog {
    background-color: #0a263c;
    color: #ffffff;
    font-size: 36px;
    .el-dialog__header {
      padding: 32px 0px 22px 44px;
      color: #ffffff;
      border-bottom: 2px solid #0b4d5e;

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
      padding: 0 60px;
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
        .warnr {
          display: flex;
          align-items: center;
          .warnbutton {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 176px;
            height: 60px;
            background: #021722;
            color: #ffffff;
            font-size: 28px;
            margin-left: 5px;
          }
          .warnbutton2 {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 176px;
            height: 60px;
            background: #002f3b;
            border: 1px solid #0ac9cd;
            color: #ffffff;
            font-size: 28px;
            margin-left: 5px;
          }
        }
        .warnrt {
          margin-left: 40px;
        }
        .block {
          width: 780px;
          background: #021722;
          margin-left: 40px;
          display: flex;
          position: relative;
          .iconsanjiaojiantou-xia,
          .iconsanjiaojiantou-shang {
            position: absolute;
            top: 0;
            right: 15px;
            color: #ffffff;
            line-height: 60px;
            font-size: 32px;
            cursor: pointer;
          }
          .iconsanjiaojiantou-shang {
            color: #0ac9cd;
          }
          .el-popper[x-placement^="bottom"] {
            position: absolute !important;
            top: 75px !important;
            left: 0 !important;
            width: 1000px;
            border: none;
            background: #021722;
          }
          .el-input__inner {
            -webkit-appearance: none;
            background: rgba(2, 23, 34, 1);
            border-radius: 4px;
            border: 2px solid rgba(0, 47, 59, 1);
            box-sizing: border-box;
            color: #ffffff;
          }
          .el-icon-arrow-right:before {
            color: #ffffff;
          }
          .el-date-table td.start-date span {
            width: 45px;
            height: 24px;
            border-radius: 100%;
            background-color: #0ac9cd;
            color: #ffffff;
            z-index: 100;
          }
          .el-date-table td.end-date span {
            width: 45px;
            height: 24px;
            border-radius: 100%;
            background-color: #0ac9cd;
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
            background: rgba(10, 174, 179, 0.3);
            color: #ffffff;
          }

          .el-date-range-picker__time-header {
            border: 2px solid #002f3b;
          }
          .el-date-range-picker__header div {
            color: #ffffff;
          }
          .el-date-table th {
            color: #ffffff;
            border: 2px solid #002f3b;
          }
          .el-date-range-picker__content.is-left {
            border-right: 2px solid #002f3b;
          }
          .el-picker-panel__footer {
            border-top: 2px solid #01475a;

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
            background-color: #021722;
            border: none;
          }
          .el-time-spinner {
            background: rgba(10, 174, 179, 0.3);
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
            background: #021722;
            border: none;
          }
          .el-date-editor .el-range-input {
            width: 100%;
            color: #ffffff;
            font-size: 28px;
            background: #021722;
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
            color: #0ac9cd;
          }
          .el-select {
            display: block;
            position: relative;
            color: #ffffff;

            margin-left: 40px;
            .el-input--suffix .el-input__inner {
              color: #fff;
              background: #021722;
              width: 218px;
              height: 60px;
              font-size: 28px;
              border: none;
              .el-input__icon {
                margin-left: 40px;
              }
            }
            .el-scrollbar__wrap {
              width: 250px;
              background: #021722;
              color: #ffffff;
              padding: 20px 20px 20px 10px;
              font-size: 28px;
            }
            .el-select-dropdown__item.hover,
            .el-select-dropdown__item:hover {
              background: rgba(0, 47, 59, 1);
            }
            .el-select-dropdown__item.hover,
            .el-select-dropdown__item.selected {
              color: #0ac9cd;
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
        width: 100%;
        height: 1200px;
        background: #0a263c;
        margin-top: 10px;
        font-size: 32px;
        color: #ffffff;
        .warnSelectContentOption {
          width: 100%;
          height: 150px;
          border-bottom: 2px solid #0b4d5e;
          display: flex;
          .iconyujing {
            color: #e83604;
            font-size: 50px;
            padding: 50px 0px 0 15px;
          }
          .right {
            color: #e83604;
          }
          .error {
            color: #fcce00;
          }
          .warnSelectwz {
            padding: 30px 50px;
          }
        }
      }
    }
  }
  .warning {
    width: 100%;
    height: 100%;
    padding: 30px 0;
    .warnSelect {
      width: 100%;
      height: 100%;
      display: flex;
      .warnr {
        display: flex;
        align-items: center;
        .warnbutton {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 176px;
          height: 60px;
          background: #021722;
          color: #ffffff;
          font-size: 28px;
          margin-left: 5px;
        }
        .warnbutton2 {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 176px;
          height: 60px;
          background: #002f3b;
          border: 1px solid #0ac9cd;
          color: #ffffff;
          font-size: 28px;
          margin-left: 5px;
        }
      }
      .warnrt {
        margin-left: 40px;
      }
      .block {
        width: 780px;
        background: #021722;
        margin-left: 40px;
        display: flex;
        .el-range-editor.el-input__inner {
          width: 90%;
          height: 60px;
          background: #021722;
          border: none;
        }
        .el-date-editor .el-range-input {
          width: 45%;
          color: #ffffff;
          font-size: 28px;
          background: #021722;
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
      .el-select {
        display: block;
        position: relative;
        color: #ffffff;

        margin-left: 40px;
        .el-input--suffix .el-input__inner {
          color: #fff;
          background: #021722;
          width: 218px;
          height: 60px;
          font-size: 28px;
          border: none;
          .el-input__icon {
            margin-left: 40px;
          }
        }
      }
      .iconxiazai {
        font-size: 40px;
        margin-left: 135px;
      }
    }
    .warnSelectContent {
      width: 100%;
      height: 1200px;
      background: #0a263c;
      margin-top: 10px;
      font-size: 32px;
      color: #ffffff;
      .warnSelectContentOption {
        width: 100%;
        height: 150px;
        border-bottom: 2px solid #0b4d5e;
        display: flex;
        .iconyujing {
          color: #e83604;
          font-size: 50px;
          padding: 50px 0px 0 15px;
        }
        .right {
          color: #e83604;
        }
        .error {
          color: #fcce00;
        }
        .warnSelectwz {
          padding: 30px 50px;
        }
      }
    }
  }
}
</style>

