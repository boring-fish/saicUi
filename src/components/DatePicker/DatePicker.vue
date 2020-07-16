/**
  * @description: 月份选择器
  * @author: qian.wan
  * @date: 
  */

<template>
  <div class="datepicker-wrap">
    <el-date-picker
        v-model="selectedData"
        ref="datePicker"
        type="month"
        @focus="handleShowDatePanel"
        @blur="handleCloseDatePanel"
        @change="handleChangeDatePanel"
        :picker-options="pickerOptions"
        format="yyyy-MM"
        :appendToBody='false'  
        class="data-picker-content"
        placeholder="请选择日期">
      </el-date-picker>
      <span v-if="datePanel" class="iconfont iconsanjiaojiantou-shang" ></span>
      <span v-else class="iconfont iconsanjiaojiantou-xia" @click="handleClickDatePicker"></span>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import moment from 'moment';
// import {  } from '@/components'; // 组件

@Component({})
export default class DatePicker extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  }) name!: string;

//   @Emit()
// private handleChangeDatePanel(value: string) {
//     this.selectedData = value;
//     value = moment(value).format('YYYYMM');
//     console.log(value);
//     return value;
//   }

  currentYear: string = moment().format( 'YYYY-MM' );
  selectedData: string = this.currentYear;
  datePanel: boolean = false;
  pickerOptions = {
              disabledDate(time: any) {
                // console.log(time)
            return time.getTime() > Date.now();   

          }
  };
  handleChangeDatePanel(value: string) {
    this.selectedData = value;
    value = moment(value).format('YYYYMM');
    // console.log(value);
    this.$emit('handleChangeDatePanel', value);
  }


  handleShowDatePanel(): void {
    this.datePanel = true;
  }
  handleCloseDatePanel(): void {
    this.datePanel = false;
  }
  handleClickDatePicker(): void {
    (this as any).$refs.datePicker.$refs.reference.focus();
  }



  created() {
    //
  }

  mounted() {
   
  }

}
</script>

<style lang="scss">
.el-picker-panel{
    background-color: rgba(9,12,21,1);
    border: none;
    width: 500px;
  
    .el-date-picker__header{
      margin: 0 28px;
      box-sizing: content-box;
      .el-picker-panel__icon-btn{
        margin-top: 0;
        line-height: 80px;
        color: rgba(255,255,255,0.6);
        font-size: 28px;
      }
      .el-date-picker__header-label{
        line-height: 80px;
        font-size: 28px;
        color: #fff;
      }
    }
    .el-date-picker__header--bordered{
      border-bottom: 2px solid #002F3B;
      padding-bottom: 0;
    }
    .el-picker-panel__content{
      width: 500px;
      margin: 0;
    }
    .el-month-table td {
      padding: 24px 0;
      .cell{
      width: 88px;
      color: #fff;
      font-size: 28px;
      
      }
      .cell:hover{
      border-bottom: 4px solid rgba(255,255,255,0.4);
      border-radius: 0;
      }
    }
    .el-month-table td.disabled .cell {
      background-color: #121626;
    }
    
  
    .el-month-table td.current:not(.disabled) .cell{
      color:rgba(255,255,255,0.4);
    }
    .popper__arrow{
      display: none;
    }
  }
  .datepicker-wrap{
      position: absolute;
      top: 40px;
      right: 40px;
      width: 360px;

      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
      }
      .iconsanjiaojiantou-xia,.iconsanjiaojiantou-shang{
        position: absolute;
        top: 0;
        right: 24px;
        color: rgba(255,255,255,0.4);
        line-height: 60px;
        font-size: 32px;

        cursor: pointer;
      }
      .iconsanjiaojiantou-shang{
        color: rgba(255,255,255,0.4);
      }
      .el-input__inner{
        color: #fff;
        border-radius: 30px;
        border:2px solid rgba(58,66,99,1);
        height: 60px;
        padding: 10px 20px;
        background:rgba(9,12,21,1);
        // border: none;
        font-size: 28px;
        cursor: pointer;
      }
      .el-input__prefix{
        display: none;
      }
      .el-input__suffix{
        display: none;
      }
     
    }

</style>

