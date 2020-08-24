<template>
  <el-dialog
    title="设置报警/预警提醒"
    :visible.sync="visible"
    width="1400px"
    top="360px"
    :modal-append-to-body="false"
    :before-close="addModalClose"
    class="confirm-add"
  >
    <div class="character">
      <div class="characterText">
        <span class="target-modal-title-icon"></span>
        选择监控的指标
      </div>
      <div class="addSelect">
        <el-select
          class="scroll-opacity"
          v-model="addWarn.type"
          multiple
          placeholder="请选择"
          :appendToBody="false"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in moduleoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float:left; color: #fffff">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="character">
      <div class="characterText">
        <span class="target-modal-title-icon"></span>
        预警设置
      </div>
      <div class="addSelect warnset">
        按
        <el-select
          v-model="addWarn.warnset.time"
          placeholder="请选择"
          multiple
          :appendToBody="false"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in timeTypeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
        >计算指标
        <div class="warnNum" v-for="(item, index) in earlyNum" :key="index">
          <div>
            <span class="warnNumIcon"></span>
            <span>{{ item.text }}</span>
          </div>

          <div class="warnNumComSet">
            <div class="earlyNum">
              <span class="earlyNumTitle">预警阈值</span>
              <el-input
                v-model="item.earlyNumStart"
                auto-complete=""
                placeholder="请输入"
              ></el-input
              ><span class="percent">%</span>
              <span class="middleWord">至</span>
              <el-input
                v-model="item.earlyNumEnd"
                placeholder="请输入"
              ></el-input
              ><span class="percent">%</span>
            </div>
            <div class="earlyNum callNum">
              <span>报警阈值</span>
              <el-select
                v-model="item.callSelectNum"
                placeholder="请选择"
                placement='bottom-end'
                :appendToBody="false"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in mathoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                v-model="item.callNumEnd"
                placeholder="请输入"
              ></el-input
              ><span class="percent">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="character">
      <div class="characterText">
        <span class="target-modal-title-icon"></span>
        发件人邮箱
      </div>
      <div class="addSelect emailSelect">
         <span>名爵管理层</span>
           <!-- @focus="blurSearchFor()"  -->
          <!-- @blur="blurSearchForClose()"  -->
        <el-input
          v-model="addWarn.mjemail"
          
          placeholder = '多个请用 ";" 分隔'
        ></el-input>
      </div>
        <div class="addSelect emailSelect">
         <span>荣威管理层</span>
        <el-input
          v-model="addWarn.rwemail"
         placeholder = '多个请用 ";" 分隔'
      
        ></el-input>
      </div>
        <div class="addSelect emailSelect">
         <span>R标管理层</span>
        <el-input
          v-model="addWarn.remail"
         placeholder = '多个请用 ";" 分隔'
     
        ></el-input>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addModalClose" class="button-cancel">取 消</el-button>
      <el-button type="primary" @click="addConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件
import { dateFormat } from '@/utils/utils.ts';

@Component({})
export default class WarnSettingRemind extends Vue {
  earlyNum: any = {
    goal: {
      text: '目标',
      earlyNumStart: '',
      earlyNumEnd: '',
      callSelectNum: '',
      callNumEnd: '',
    },
    tb: {
      text: '同比',
      earlyNumStart: '',
      earlyNumEnd: '',
      callSelectNum: '',
      callNumEnd: '',
    },
    hb: {
      text: '环比',
      earlyNumStart: '',
      earlyNumEnd: '',
      callSelectNum: '',
      callNumEnd: '',
    },
  };
  placeholder: any = '多个请用 "," 分隔';
  mathoptions: any = [];
  timeTypeoptions: any = [];
  moduleoptions: any = [];
  emailoptions = [];
  addWarn: any = {
    type: '',
    warnset: {
      time: '',
      warnNum: this.earlyNum,
    },
    mjemail: '',
    rwemail: '',
    remail: '',

  };
  WarnSetoptions = [];
  character: any = [];
  WarnSet: any = '';
  @Prop({
    required: false,
    default: false,
  })
  visible!: boolean;

  @Prop({
    required: false,
    default: null,
  })
  row!: any;
  @Prop({
    required: false,
    default: {},
  })
  editRow!: any;

    @Watch('editRow')
    editRowChange() {
      if (JSON.stringify(this.editRow) !== '{}') {
        this.earlyNum = {
    goal: {
      text: '目标',
      earlyNumStart: this.getDataoption(this.editRow.kpiEarlyWarCycle.split(',')[0]),
      earlyNumEnd: this.getDataoption(this.editRow.kpiEarlyWarCycle.split(',')[1]),
      callSelectNum: this.editRow.kpiAlarmCycleSymbol,
      callNumEnd: this.getDataoption(this.editRow.kpiAlarmCycle),
    },
    tb: {
      text: '同比',
      earlyNumStart: this.getDataoption(this.editRow.lastEarlyWarCycle.split(',')[0]),
      earlyNumEnd: this.getDataoption(this.editRow.lastEarlyWarCycle.split(',')[1]),
      callSelectNum: this.editRow.lastAlarmCycleSymbol,
      callNumEnd: this.getDataoption(this.editRow.lastAlarmCycle),
    },
    hb: {
      text: '环比',
      earlyNumStart: this.getDataoption(this.editRow.ringEarlyWarCycle.split(',')[0]),
      earlyNumEnd: this.getDataoption(this.editRow.ringEarlyWarCycle.split(',')[1]),
      callSelectNum: this.editRow.ringAlarmCycleSymbol,
      callNumEnd: this.getDataoption(this.editRow.ringAlarmCycle),
    },
  };
    this.addWarn = {
    type: this.editRow.module.split(','),
    warnset: {
      time: this.editRow.timeType.split(','),
      warnNum: this.earlyNum,
    },
    // email: this.editRow.email,
    mjemail: this.editRow.email.split(',')[0].split(':')[0] === '名爵' ? this.editRow.email.split(',')[0].split(':')[1] : '',
    rwemail: this.editRow.email.split(',')[0].split(':')[0] === '荣威' ? this.editRow.email.split(',')[0].split(':')[1] : this.editRow.email.split(',')[1].split(':')[1],
    remail: this.editRow.email.split(',')[2] ? this.editRow.email.split(',')[2].split(':')[1] : '',
    // remail:this.editRow.email.split(',')[0].split(':')[0]==='R标'?this.editRow.email.split(',')[0].split(':')[1]:this.editRow.email.split(',')[1].split(':')[0]==='R标'?this.editRow.email.split(',')[1].split(':')[1]:this.editRow.email.split(',')[2].split(':')[1],
    
    
  };
      } else {
       this.earlyNum = {
    goal: {
      text: '目标',
      earlyNumStart: '',
      earlyNumEnd: '',
      callSelectNum: '',
      callNumEnd: '',
    },
    tb: {
      text: '同比',
      earlyNumStart: '',
      earlyNumEnd: '',
      callSelectNum: '',
      callNumEnd: '',
    },
    hb: {
      text: '环比',
      earlyNumStart: '',
      earlyNumEnd: '',
      callSelectNum: '',
      callNumEnd: '',
    },
  };
    this.addWarn = {
      type: '',
    warnset: {
      time: '',
      warnNum: 'this.earlyNum',
    },
    mjemail: '',
    rwemail: '',
    remail: '',

        };
      }
      
    }
  mounted() {
    this.selectOptions();
  }
  // blurSearchFor() {
  //   this.placeholder = '';
  // }
  // blurSearchForClose() {
  //   this.placeholder = '多个请用 "," 分隔';
  // }
  addModalClose() {
    this.$emit('warnClose', false);
  }
  getDataoption(data: any) {
   data = data ? Math.floor(data * 100) === Number(data * 100) ? data * 100 : (data * 100).toFixed(2) : '';
   return data;
  }
  selectOptions() {
    $api.WarnSettingApi.getTimeType({ dictType: 'MATH_SYMBOL' }).then(
      (res: any) => {
        if (res.length !== 0) {
          res.forEach((item: any, index: any) => {
            this.mathoptions.push({
              value: item.dictName,
              label: item.dictName,
            });
          });
        }
      }
    );
    //指标
    $api.WarnSettingApi.getTimeType({ dictType: 'MODULE' }).then((res) => {
      if (res.length !== 0) {
        res.forEach((item: any, index: any) => {
          this.moduleoptions.push({
            value: item.dictName,
            label: item.dictName,
          });
        });
      }
    });
    //指标计算周期
    $api.WarnSettingApi.getTimeType({ dictType: 'TIME_TYPE' }).then((res) => {
      if (res.length !== 0) {
        res.forEach((item: any, index: any) => {
          this.timeTypeoptions.push({
            value: item.dictName,
            label: item.dictName,
          });
        });
      }
    });
  }
  addConfirm() {
    this.$emit('warnClose', false);
    let email = '';
    if (this.addWarn.mjemail) {
      email += '名爵:' + this.addWarn.mjemail + ',';
    }
     if (this.addWarn.rwemail) {
      email += '荣威:' + this.addWarn.rwemail + ',';
    } 
    if (this.addWarn.remail) {
      email += 'R标:' + this.addWarn.remail;
    }
    let params: any = {
      createTime: dateFormat(new Date()),
      kpiAlarmCycle: this.earlyNum.goal.callNumEnd !== '' ? this.earlyNum.goal.callNumEnd / 100 : '',
      kpiEarlyWarCycle: this.earlyNum.goal.earlyNumStart !== '' ? this.earlyNum.goal.earlyNumStart / 100 + ',' + this.earlyNum.goal.earlyNumEnd / 100 : '',
      kpiAlarmCycleSymbol: this.earlyNum.goal.callSelectNum !== '' ? this.earlyNum.goal.callSelectNum : '',
      lastAlarmCycle: this.earlyNum.tb.callNumEnd !== '' ? this.earlyNum.tb.callNumEnd / 100 : '',
      lastEarlyWarCycle: this.earlyNum.tb.earlyNumStart !== '' ? this.earlyNum.tb.earlyNumStart / 100 + ',' + this.earlyNum.tb.earlyNumEnd / 100 : '',
      lastAlarmCycleSymbol: this.earlyNum.tb.callSelectNum !== '' ? this.earlyNum.tb.callSelectNum : '',
      ringAlarmCycle: this.earlyNum.hb.callNumEnd !== '' ? this.earlyNum.hb.callNumEnd / 100 : '',
      ringEarlyWarCycle: this.earlyNum.hb.earlyNumStart !== '' ? this.earlyNum.hb.earlyNumStart / 100 + ',' + this.earlyNum.hb.earlyNumEnd / 100 : '',
      ringAlarmCycleSymbol: this.earlyNum.hb.callSelectNum !== '' ? this.earlyNum.hb.callSelectNum : '',
      timeType: this.addWarn.warnset.time !== '' ? this.addWarn.warnset.time.join(',') : '',
      module: this.addWarn.type.join(','),
      email: email,

    };
    if (JSON.stringify(this.editRow) !== '{}') {
        params.id = this.editRow.id;
    }
    $api.WarnSettingApi.addWarn({}, params).then((res) => {
        if (res.code === '00') {
          this.$emit('addWarnSuss', true);
      } else {
         this.$message.error(res.msg);

      }
    }).catch((rep) => {
      this.$message.error('添加失败，请完善数据');
    });
  }
}
</script>

<style lang="scss">
.confirm-add {
  .el-dialog {
    background: rgba(18, 22, 38, 1);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 24px;
    .el-dialog__body {
      font-size: 28px;
      padding: 0 80px;
      height: 1120px;
      border-bottom: 2px solid #0b4d5e;
    }
    .el-dialog__footer {
      padding: 25px 42px;
      .button-cancel {
        background: transparent;
        border: none;
        color: #fff;
      }
      .el-button {
        width: 132px;
        height: 60px;
        font-size: 28px;
      }
    }
  }
  .el-icon-warning {
    margin-right: 40px;
    color: #e80404;
  }
  .enter {
    margin-top: 64px;
    margin-bottom: 24px;
  }
  .prompt {
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 24px;
    margin-left: 52px;
  }
  .idTextarea {
    width: 1128px;
    margin-left: 52px;
  }
  .el-textarea__inner {
    background-color: #090c15;
    color: #fff;
    font-size: 28px;
    border-radius: 16px;
    border: 2px solid rgba(58, 66, 99, 1);
  }
  .character {
    display: block;
    margin-top: 55px;
    margin-right: 24px;
    height: auto;
    .characterText {
      width: 300px;
      margin-right: 24px;
    }
    .warnset {
      .el-input__inner {
        width: 830px;
        color: #fff;
        font-size: 28px;
      }
      input::-webkit-input-placeholder {
    color: rgba(255,255,255,0.4);
  }
      .el-select-dropdown__wrap {
        width: 831px !important;
      }
    }
    .addSelect {
      position: relative;
      margin: 10px 0 0 60px;
      .el-select__tags {
        flex-wrap: nowrap;
        margin-left: 20px;
      }
      .el-tag--info {
        padding: 20px 16px;
        line-height: 0px;
      }
      .el-scrollbar__bar,
      .is-horizontal {
        display: none;
      }
      .el-input__suffix {
        right: 30px;
      }
      .el-select-dropdown {
        height: 315px;
        max-height: 330px;
        left: 15px !important;
        position: absolute;
        .el-select-dropdown__wrap {
          height: 330px;
          max-height: 330px;
          width: 976px;
          .el-select-dropdown__item {
            height: 64px;
            font-size: 28px;
            line-height: 64px;
          }
        }
      }
    }
  }

  .el-input__inner {
    width: 992px;
    background-color: #090c15;
    font-size: 28px;
    border: 2px solid rgba(58, 66, 99, 1);
    border-radius: 36px;
    padding: 24px;
    color:rgba(255,255,255,0.4);
    font-size: 28px;
  }
   input::-webkit-input-placeholder {
    color: rgba(255,255,255,0.4);
  }
  .el-tag.el-tag--info {
    background-color: #1e2441;
    border-color: #1e2441;
    color: #fff;
    font-size: 22px;
  }
  .el-select .el-tag__close.el-icon-close {
    font-size: 22px;
    background-color: #090c15;
    color: #fff;
  }
  .employee {
    margin-top: 100px;
  }
  .target-modal-title-icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: #236bb4;
    border: 2px solid #236bb4;
    border-radius: 50%;
    vertical-align: middle;
    margin: 0 24px 10px 10px;
  }
  .target-modal-title-icon:before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 28px;
    border: 2px dashed #236bb4;
    border-radius: 50%;
    position: relative;
    top: -10px;
    left: -10px;
  }

  .el-select .el-input .el-select__caret {
    font-size: 22px;
  }
}
.el-select-dropdown {
  background-color: #1e2441;
  color: #fff;
  border: none;
}
.el-popper[x-placement^='bottom'] .popper__arrow {
  border-bottom-color: #1e2441;
}
.el-popper[x-placement^='bottom'] .popper__arrow::after {
  border-bottom-color: #1e2441;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #236bb4;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
  background-color: #1e2441;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background-color: #1e2441;
}
.el-select-dropdown__item {
  color: #fff;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  font-size: 28px;
}
.user-role-setting-wrap .el-input__icon {
  line-height: 100% !important;
}
.emailSelect{
  display: flex;
  margin-top:20px !important;
  span{
    width: 200px;
  }
   .el-input__inner {
        width: 820px;
        color: #fff;
        // color:rgba(255,255,255,0.4);
        font-size: 28px;
        // margin-left:50px;
      }
  .el-select-dropdown {
  position: absolute !important;
  left: 0 !important;
  top: 37px !important;
}
} 
.warnNum {
  margin-top: 40px;
  display: flex;
  .warnNumIcon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: rgba(58, 66, 99, 1);
    border-radius: 50%;
    vertical-align: middle;
    margin: 0 24px 10px 10px;
  }
  .warnNumComSet {
    margin-left: 80px;
    .earlyNum {
      display: flex;
      .earlyNumTitle {
        width: 150px;
      }
    }
    input{
    font-size: 24px;
    padding: 10px;
    color: #fff;
    text-shadow: 0px 0px 0px #fff;
    -webkit-text-fill-color: transparent;
}
input::-webkit-input-placeholder{
    color:white;
    text-shadow: none;
    -webkit-text-fill-color: initial;
}
    .callNum {
      margin-top: 30px;
      .el-select {
        width: 365px;
        .el-select-dropdown {
          position: absolute !important;
          height: auto;
          .el-select-dropdown__wrap {
            width: 340px !important;
             height: auto !important;
          }
        }
        .el-input__inner {
          width: 300px;
          margin-left: 40px;
        }
        .el-input__suffix {
          left: 285px;
        }
      }
    }
    .el-input {
      width: 211px;
      .el-input__inner {
        width: 200px;
      }
    }
    .percent {
      font-size: 30px;
      color: rgba(255, 255, 255, 0.4);
      line-height: 53px;
    }
    .middleWord {
      margin: 0 30px 0 30px;
      color: rgba(255, 255, 255, 1);
      line-height: 53px;
    }
  }
}
</style>
