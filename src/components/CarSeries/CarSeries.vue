<template>
  <div class="carSeries-wrap">
    <template
      v-for="car in carType"     
    >
      <div class="radio-group"
        :key="car.brandId"
        v-if="car.admission"
      >
        <i 
          class="drop-btn"
          :class="currentCarSeries === car.brandName ? 'el-icon-caret-bottom': 'el-icon-caret-right'"
          v-if="car.children.length > 0"
          @click="onDropBtnclick(car.brandName)"
        ></i>
        <el-radio 
          v-model="currentBrandId" 
          :label="car.brandId"
          @change="onRadioChange(car)"
          :disabled="car.brandName === 'R标'"
        >
          <span class="iconfont iconche"></span>
          <span class="label">{{car.brandName}}</span>
        </el-radio>
        <div 
          class="car-line-list"
          :class="currentCarSeries === car.brandName ? 'show' : ''"
        >
          <el-checkbox-group v-model="checkedCarSeries" class="checkbox-group" @change="checked=>onCheckboxChange(checked, car)">
            <el-checkbox v-for="item in car.children" :label="item.seriesId" :key="item.seriesId">
              <span class="iconfont iconche"></span>
              <span class="label">{{item.seriesChineseName}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class CarSeries extends Vue {

  @Prop({
    required: true,
    default: '名爵'
  }) brandName!: string;

  carType: any[] = [
    {
      brandId: '100',
      brandName: 'R标',
      children: [],
      admission: false
    },
    {
      brandId: '101',
      brandName: '荣威',
      children: [],
      admission: false
    },
    {
      brandId: '121',
      brandName: '名爵',
      children: [],
      admission: false
    }
  ];
  seriesData = $commonData.seriesData.getSeriesMap();
  checkedCarSeries: string[] = [];
  // 单选data
  currentBrandId: string = $permission.getDefaultBrandId();
  currentCarSeries: string = '';

  @Watch('brandName')
  onBranchNameChange() {
    if ( this.brandName === '名爵' ) {
      this.currentBrandId = '121';
    } else if ( this.brandName === '荣威' ) {
      this.currentBrandId = '101';
    } else {
      this.currentBrandId = '100';
    }
  }

  onDropBtnclick(code: string) {
    if (this.currentCarSeries === code) {
      this.currentCarSeries = '';
      return;
    }
    this.checkedCarSeries = [];
    this.currentCarSeries = code;
  }


  onRadioChange(label: any) {
    this.currentCarSeries = 'NULLCARSERIES';
    this.$emit('onBrandChange', label);
  }

  onCheckboxChange(val: any[], car: any) {
    this.currentBrandId = car.brandId;
    this.$emit('onSeriesChange', val, car);
  }

  created() {
    let roles = $permission.getRoles();
    if ( roles.isAdministrator ) {
      this.carType.forEach((v) => {
        v['admission'] = true;
      });
    } else {
      this.carType[0]['admission'] = roles.isRAdmin ? true : false;
      this.carType[1]['admission'] = roles.isRWAdmin ? true : false;
      this.carType[2]['admission'] = roles.isMGAdmin ? true : false;
    }
    this.seriesData.forEach((car: any) => {
      if (car.brandId === 101) {
        this.carType[1].children = car.children;
      }
      if (car.brandId === 121) {
        this.carType[2].children = car.children;
      }
    });
    this.currentCarSeries = '';
  }

  mounted() {
    
  }

}
</script>

<style lang="scss">
.carSeries-wrap{
  background: #1E2441;
  font-size: 28px;
  color:rgba(255,255,255,0.4);
  max-height: 1200px;
  overflow-y: auto;
  padding: 12px 0;
  .el-checkbox,.el-radio{
    height: 80px;
    line-height: 80px;
    display: block;
  }
  .el-radio{
    margin-left: 56px;
  }
  .el-checkbox__label,.el-radio__label{
    font-size: 28px;
  }
  .el-checkbox__inner,.el-radio__inner{
    width: 24px;
    height: 24px;
  }
  .el-checkbox__inner:before{
    top: 10px !important;
  }
  .el-checkbox__inner:after{
    left: 10px;
    top: 6px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color: $color-font-primary;
    background: $color-font-primary;
  }
  .el-checkbox__input{
    line-height: 40px;
    position: relative;
    left: 372px;
  }
  .el-radio__input{
    line-height: 40px;
    position: relative;
    left: 360px;
  }
  .el-radio__inner::after {
    width: 12px /* 24/100 */;
    height: 12px /* 24/100 */;
    background-color: $color-font-primary;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: $color-font-primary;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #236BB4;
    background: #0A263C;
  }
  .iconfont {
    margin-right: 14px;
    font-size: 40px;
  }
  .none{
    display: none;
  }
  .radio-group{
    position: relative;
    .drop-btn{
      width: 16%;
      line-height: 74px;
      text-align: center;
      position: absolute;
    }
    .car-line-list{
      background-color: #121626;
      width: 90%;
      margin: 0 auto;
      display: none;
      .el-checkbox{
        line-height: 88px;
      }
      .el-checkbox__label{
        color: #fff;
      }
      .el-radio{
        margin: 0;
        .el-radio__input{
          left: 366px;
        }
        .el-checkbox__label.is-checked+.el-checkbox__label {
          color: $color-font-primary;
        }
      }
    }
    .show{
      display: block;
    }
  }
}
.areafilter-wrap::-webkit-scrollbar {
/*滚动条整体样式*/
  width : 12px;  /*高宽分别对应横竖滚动条的尺寸*/
}
.areafilter-wrap::-webkit-scrollbar-thumb {
/*滚动条里面小方块*/
  background-color: #121626;
  border-radius:6px;
}
.areafilter-wrap::-webkit-scrollbar-track {
/*滚动条里面轨道*/
  border-radius: 6px;
  background: #1E2441;
}
</style>

