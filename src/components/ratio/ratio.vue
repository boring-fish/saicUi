<template>
  <div class="ratio-wrap">
    <div class="ratioValue">
      <span class="value">{{ratioData.value? ratioData.value : '——' }}</span>
      <span>{{ratioData.unit}}</span>
    </div>
    <div class="ratioTb putlicStyle">
      <div class="publicMarginRight">同比</div>

      <div v-if="ratioData.tb" :class="tbValue === 1 ? 'red' : tbValue === 2 ? 'yellow' : tbValue === 3 ? 'green' : 'white'">
         <span class="iconfont iconxiajiang" v-if="(ratioData.tb).startsWith('-')"></span>
         <span class="iconfont iconshangsheng" v-else></span>
        <span class="publicMarginLeft">{{ratioData.tb | ratioNegative}}</span>
      </div>
      <div v-else>—</div>
    </div>

    <div class="ratioHb putlicStyle">
      <div class="publicMarginRight">环比</div>
      <div v-if="ratioData.hb" :class="hbValue === 1 ? 'red' : hbValue === 2 ? 'yellow' : hbValue === 3 ? 'green' : 'white'">
        <span class="iconfont iconxiajiang" v-if="(ratioData.hb).startsWith('-')"></span>
         <span class="iconfont iconshangsheng" v-else></span>
        <span class="publicMarginLeft">{{ratioData.hb | ratioNegative}}</span>
      </div>
      <div v-else>—</div>
    </div>

    <div class="ratioAims putlicStyle">
      <span class="publicMagrinStyle enlarge">进度目标值</span>
      <span class="enlarge">{{ratioData.aims? ratioData.aims : '—' }}</span>
    </div>

    <div class="ratioFinished putlicStyle">
      <span class="publicMagrinStyle enlarge">完成率</span>
      <span class="enlarge" :class="aimValue === 1 ? 'red' : aimValue === 2 ? 'yellow' : aimValue === 3 ? 'green' : 'white'">{{ratioData.finished ? ratioData.finished : '—' }}</span>
    </div>
    <div class="deduplication lastStyle" v-show="showProportion">
      <span class="publicMagrinStyle">去重线索占比</span>
      <span>{{ratioData.proportion ? ratioData.proportion : '—'}}</span>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({
    filters: {
    ratioNegative: (value: any) => {
      if (value.startsWith('-')) {

      return value.split('-')[1];
      } else {
        return value;
      }
      
    }
  }
})
export default class Ratio extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  }) name!: string;

  @Prop({
    required: false,
    default: () => {}
  }) ratioData!: Object;

  @Prop({
    required: false,
    default: true
  }) showProportion?: Boolean;

  @Prop({
    required: false,
    default: 0
  }) tbValue !: number;

    @Prop({
    required: false,
    default: 0
  }) hbValue !: number;

    @Prop({
    required: false,
    default: 0
  }) aimValue !: number;


  created() {
    //
  }

  mounted() {
    //
  }

}
</script>

<style lang="scss">
.ratio-wrap{
  font-size: 29px;
  .iconfont{
    font-size: 29px;
  }
  color:rgba(248,249,249,1);
    .putlicStyle {
     display: flex;
     height: 34px;
     line-height: 34px;
     margin-bottom: 4px;
    }
    .lastStyle{
    display: flex;
     height: 34px;
     line-height: 34px;
    }

    .publicMarginRight{
     margin-right: 16px;
      }

    .publicMarginLeft{
    margin-left: 4px;
     }

    .publicMagrinStyle{
      margin-right: 28px;
      color: $color-white-opacity;
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
  .ratioValue{
    font-size: 34px;
    .value{
        font-size: 58px;
        font-weight: 500;
        color: #fff;
        margin-right: 8px;
    }
  }

  .enlarge{
    font-size: 32px;
    font-weight: 700;
  }
}
</style>

