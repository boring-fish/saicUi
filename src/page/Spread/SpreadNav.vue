<template>
  <div class="spreadNav-wrap">
    <div class="spreadNav-tc">
      <div class="spreadNav-tcf box-bg-border">
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
        <TotalClient 
          :brandId="brandId" 
          :brandName="brandName" 
          :time="time" 
          :currentArea="currentArea" 
        ></TotalClient>
      </div>
      <div class="spreadNav-tcr box-bg-border">
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
        <VisitChannel 
          :brandId="brandId" 
          :brandName="brandName" 
          :time="time" 
          :currentArea="currentArea"
        ></VisitChannel>
      </div>
    </div>
     <div class="spreadNav-bc">
      <div class="spreadNav-bcf box-bg-border">
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
        <BaiduExposure :brandId="brandId" 
          :brandName="brandName" 
          :time="time"  
          :currentArea="currentArea"></BaiduExposure>
      </div>
      <div class="spreadNav-bcr box-bg-border">
        <span class="border border-top-left"></span>
        <span class="border border-top-right"></span>
        <span class="border border-bottom-left"></span>
        <span class="border border-bottom-right"></span>
        <AdvertisExposure 
          :brandId="brandId" 
          :brandName="brandName" 
          :time="time"  
          :currentArea="currentArea"
        ></AdvertisExposure>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  TotalClient,
  VisitChannel,
  AdvertisExposure,
  BaiduExposure
} from '@/components/index.ts'; // 组件
interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}
@Component({
  components: {
    TotalClient,
    VisitChannel,
    AdvertisExposure,
    BaiduExposure
  }
})
export default class SpreadNav extends Vue {
  @Prop({
    required: false,
    default: ''
  })
  brandName!: string;

  @Prop({
    required: false,
    default: 101
  })
  brandId!: number;

  @Prop({
    required: false,
    default: {}
  })
  time!: TIMERANGE;

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  mounted() {
  }
}
</script>

<style lang="scss">
.spreadNav-wrap {
  flex: 1;
  padding:0 40px 0 40px;
  .spreadNav-tc {
    width: 100%;
    height: 50% /* 760/100 */;
    // height: calc(100% - .6px);
    padding: 0px 0px 20px 0px;
    display: flex;
    .spreadNav-tcf {
      width: 1060px /* 1060/100 */;
      height:  100% /* 820/100 */;
      background: rgba(18,22,38,1);
    }
    .spreadNav-tcr {
      width: 2416px /* 1060/100 */;
      height: 100%  /* 820/100 */;
      background: rgba(18,22,38,1);
      margin-left: 20px /* 20/100 */
    }
  }
  .spreadNav-bc {
    width: 100%;
    height: 50% /* 760/100 */;
    // height: calc(100% - 7.8px);
    // padding: 0 0.4px 0.2px 0.4px;
    display: flex;
    .spreadNav-bcf {
      width: 1738px /* 1060/100 */;
      height: 100%  /* 820/100 */;
      background: rgba(18,22,38,1);
    }
    .spreadNav-bcr {
      width: 1738px/* 1060/100 */;
      height: 100%  /* 820/100 */;
      background: rgba(18,22,38,1);
      margin-left: 20px /* 20/100 */
    }
  }
}
</style>

