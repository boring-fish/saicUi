<template>
  <div class="areafilter-wrap">
    <div v-show="$route.name === 'dashboard'">
      <el-checkbox
        :indeterminate="indeterminateTotal" 
        v-model="checkAll" 
        @change="handleCheckTotalChange"
        class="allcheck-checkboxbox"
      >
        <span class="iconfont iconzhongguoditu"></span>
        <span class="label">全国</span>
      </el-checkbox>
      <el-checkbox-group v-model="checkedArea" class="checkbox-group" @change="handleCheckAreaChange">
        <el-checkbox v-for="item in area" :label="item.rfsCode" :key="item.rfsCode">
          <span class="iconfont iconzhongguoditu"></span>
          <span class="label">{{item.rfsName}}</span>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div v-show="$route.name !== 'dashboard'">
      <div class="all-area">
        <i class="el-icon-caret-right none"></i>
        <el-radio 
          v-model="currentArea" 
          label="all"
          @change="checked=>onRadioChange(checked, 'all')"
        >
          <span class="iconfont iconzhongguoditu"></span>
          <span class="label">全国</span>
        </el-radio>
      </div>
      <div class="radio-group"
        v-for="rfs in area" 
        :key="rfs.rfsCode"
      >
        <i 
          class="drop-btn"
          :class="currentRfsCode === rfs.rfsCode ? 'el-icon-caret-bottom': 'el-icon-caret-right'" 
          v-if="rfs.children.length > 0" 
          @click="onDropBtnclick(rfs.rfsCode)"
        ></i>
        <el-radio 
          v-model="currentArea" 
          :label="rfs.rfsCode"
          @change="checked=>onRadioChange(checked, 'rfsCode')"
        >
          <span class="iconfont iconzhongguoditu"></span>
          <span class="label">{{rfs.rfsName}}</span>
        </el-radio>
        <div 
          class="mac-list"
          :class="currentRfsCode === rfs.rfsCode ? 'show' : ''"
        >
          <el-radio
            v-for="mac in rfs.children"
            v-model="currentArea" 
            :label="mac.macCode"
            :key="mac.macCode"
            @change="checked=>onRadioChange(checked, 'macCode')"
          >
            <span class="label">{{mac.macName}}</span>
          </el-radio>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import bus from 'vue-bus';
Vue.use(bus);

@Component({})
export default class AreaFilter extends Vue {
  // prop
  @Prop({
    required: true,
    default: []
  }) area!: object[];

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentAreaInIndex!: any;

  @Prop({
    required: false,
    default: () => []
  }) checkedAreaInIndex!: string[];
  
  // 多选data
  checkAll: boolean = true;
  areaShow: string = '';
  checkedArea: string[] = [];
  checkedItem: any[] = [];
  indeterminateTotal: boolean = false;

  // 单选data
  currentArea: string = 'all';
  currentRfsCode: string = '';

  @Watch('area')
  changeAreaStyle() {
    let checkedItem: any = [];
    this.area.forEach((item: any) => {
      checkedItem.push(item['rfsCode']);
    });
    this.checkedArea = checkedItem;
    this.currentArea = 'all';
  }

  @Watch('$route')
  routechange(to: any, from: any) {
    if (!(to.name === 'TurnoverDefeate' && from.name === 'ChannelConversion' || to.name === 'ChannelConversion' && from.name === 'TurnoverDefeate')) {
      this.currentArea = 'all';
    }
    let checkedItem: any = [];
    this.area.forEach((item: any) => {
      checkedItem.push(item['rfsCode']);
    });
    this.checkedArea = checkedItem;
    this.checkAll = true;
    this.currentRfsCode = '';
    this.indeterminateTotal = false;
  }

  handleCheckTotalChange(flag: boolean): void {
    this.indeterminateTotal = false;

    const checkAll = this.area;
    let checkedItem: any[] = [];
    if ( flag ) {
      checkAll.forEach((item: any) => {
        checkedItem.push(item['rfsCode']);
      });
      this.checkedArea = checkedItem;
    } else {
      this.checkedArea = [];
    }
    this.$emit('onAreaChange', 'area', this.checkedArea);
  }
  
  handleCheckAreaChange(val: any[]): void {
    this.checkedArea = val;
    let checkedCount = val.length;
    console.log(checkedCount, this.area.length);
    this.checkAll = checkedCount === this.area.length;
    this.indeterminateTotal = checkedCount > 0 && checkedCount < this.area.length;
    this.$emit('onAreaChange', 'area', val);
  }

  onDropBtnclick(code: string) {
    if (this.currentRfsCode === code) {
      this.currentRfsCode = '';
      return;
    }
    this.currentRfsCode = code;
  }

  onRadioChange(checked: string, type: string) {
    this.$emit('onAreaRadioChange', {
      [type]: checked
    });
    if (checked === 'all') {
      this.$bus.emit('zqevent', checked);
    }
  }

  created() {
    if ( this.checkAll ) {
      let checkedItem: any = [];
      this.area.forEach((item: any) => {
        checkedItem.push(item['rfsCode']);
      });
      this.checkedArea = checkedItem;
    }
  }

  mounted() {
    //
  }

}
</script>

<style lang="scss">
.areafilter-wrap{
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
    left: 465px;
  }
  .allcheck-checkboxbox,.el-radio__label{
    font-size: 28px;
    .label{
      font-size: 28px;
    }
    .el-checkbox__input{
      font-size: 28px;
    }
  }
  .el-radio__input{
    line-height: 40px;
    position: relative;
    left: 426px;
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
    margin-right: 24px;
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
    .mac-list{
      background-color: #121626;
      width: 90%;
      margin: 0 auto;
      display: none;
      .el-radio__label{
        color: #fff;
      }
      .el-radio{
        margin: 0;
        .el-radio__input{
          left: 426px;
        }
        .el-radio__input.is-checked+.el-radio__label {
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

