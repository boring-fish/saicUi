<template>
  <div class="getguest-wrap">
    <div class="loopContent">
      <!-- 地图和趋势 -->
      <div class="contentAbove contentAll">

        <div class="location box-bg-border">
          <span class="border border-top-left"></span>
          <span class="border border-top-right"></span>
          <span class="border border-bottom-left"></span>
          <span class="border border-bottom-right"></span>
          <GetMap
          :brandId="brandId"
          :brandName="brandName"
          :time="time"
          :currentArea="currentArea"
          />
        </div>

        <div class="trend box-bg-border">
          <span class="border border-top-left"></span>
          <span class="border border-top-right"></span>
          <span class="border border-bottom-left"></span>
          <span class="border border-bottom-right"></span>
          <GetTrend
          :brandId="brandId"
          :brandName="brandName"
          :time="time"
          :currentArea="currentArea"
          />
        </div>

      </div>
      <!-- 跟进情况和渠道获客量 -->
      <div class="contentBottom contentAll">

        <div class="followUp box-bg-border">
          <span class="border border-top-left"></span>
          <span class="border border-top-right"></span>
          <span class="border border-bottom-left"></span>
          <span class="border border-bottom-right"></span>
          <GetFollow
          :brandId="brandId"
          :brandName="brandName"
          :time="time"
          :currentArea="currentArea"
          />
        </div>

        <div class="channel box-bg-border">
          <span class="border border-top-left"></span>
          <span class="border border-top-right"></span>
          <span class="border border-bottom-left"></span>
          <span class="border border-bottom-right"></span>
          <GetChannel
          :brandId="brandId"
          :brandName="brandName"
          :time="time"
          :currentArea="currentArea"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GetMap from './GetMap.vue';
import GetFollow from './GetFollow.vue';
import GetTrend from './GetTrend.vue';
import GetChannel from './GetChannel.vue';
interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}

@Component({
  components: {
    GetMap,
    GetTrend,
    GetFollow,
    GetChannel
  }
})
export default class GetGuest extends Vue {
  @Prop({
    required: false,
    default: ''
  }) brandName!: string;

  @Prop({
    required: false,
    default: 101
  }) brandId!: number;

  @Prop({
    required: false,
    default: {}
  }) time!: TIMERANGE;

  @Prop({
    required: false,
    default: () => []
  }) series!: any[];

  @Prop({
    required: false,
    default: ''
  }) areaCode!: string;

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  mounted() {
    
  }

  // @Watch('areaCode')
  // seriesChange() {
  //   console.log(this.areaCode);
  // }

  onRuleChange() {}
}
</script>

<style lang="scss" scoped>
.getguest-wrap {
  flex: 1;
  padding:0 40px 0 40px;
  .loopContent {
    width: 100%;
    height: 100%;
    color: #fff;
    position: relative;
    .contentAll > div {
      background: $box-bg-primary;
      height: 100%;
    }
    .contentAbove {
      width: 100%;
      height: 820px;
      display: flex;
      .location {
        width: 1320px;
      }
      .trend {
        width: 2156px;
        margin-left: 20px;
      }
    }
    .contentBottom {
      width: 100%;
      height: 832px;
      display: flex;
      margin-top: 20px;
      .followUp {
        width: 1738px;
      }
      .channel {
        width: 1738px;
        margin-left: 20px;
      }
    }
  }
}
</style>