  /**
  * @description: 转化
  * @author: qian.wan
  * @date: 
  */
<template>
  <div class="conversion-wrap">
    <!-- 转化菜单 -->
    <div class="conversion-nav  box-bg-border">
      <div 
        v-for="item in navList" 
        class="conversion-button" 
        :class="{'conversion-button-active': item.name === activeRoute ,
                'conversion-button-topradius': item.label === '渠道转化详情',
                'conversion-button-bottomradius' : item.label === '成交战败详情'
                }" 
        @click="handleRouteChange(item.name)"
        :key="item.name" >
        {{item.label}}
      </div>
      
    </div>
    <!-- 详情 -->
    <!-- <keep-alive> -->
      <router-view
      :brandId="brandId"
      :brandName="brandName"
      :series="series"
      :currentArea="currentArea"
      @onMonthChange="onMonthChange"
      ></router-view>
    <!-- </keep-alive> -->
    
  </div>
</template>

<script lang="ts">
import { Component, Vue , Prop} from 'vue-property-decorator';

@Component({
  
})
export default class Conversion extends Vue {
    @Prop({
    required: false,
    default: ''
  }) brandName!: string;

  @Prop({
    required: false,
    default: 101
  }) brandId!: number;

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  @Prop({
    required: false,
    default: () => []
  }) series!: any[];

  navList: object[] = [
    {
      label: '渠道转化详情',
      name: 'ChannelConversion',
    }, 
    {
      label: '成交战败详情',
      name: 'TurnoverDefeate'
    },
   ];
  activeRoute: string = 'ChannelConversion';

  handleRouteChange(name: string): void {
    this.activeRoute = name;
    this.$router.push(name);
  }

  onMonthChange(date: string) {
    this.$emit('onConversionPageMonthChange', date);
  }

  mounted() {
    
    // console.log(this.brandName ,22222);
    const name = this.$router.currentRoute.name;
    if ( this.navList.map(item => {
            return (item as any).name === name;
          }
        ).length ) {
      this.activeRoute = (name as string);
    }
    
  }

}
</script>

<style lang="scss">
.conversion-wrap{
  display: flex;
  padding:0 40px 0 40px;
  justify-content: space-between;
  .conversion-nav{
    width: 120px;
    height: 100%;
    padding: 496px 22px 496px 22px;
    background-color: $box-bg-primary;
    margin-right: 20px;
    .conversion-button{
      width: 72px;
      height: 340px;
      line-height: 72px;
      font-size: 28px;
      color: rgba(255,255,255,0.7);
      background-color:rgba(9,12,21,1);
     
      writing-mode: vertical-lr;
      text-align: center;
      cursor: pointer;

    }
    .conversion-button-active{
     background:rgba(35,107,180,1);
     color:rgba(255,255,255,1);
     font-weight:600;
      // border: 1px solid #0AC9CD;
      // box-shadow: 0 0 6px 2px #0AC9CD inset;
    }
    .conversion-button-topradius{
      border-radius:200px 200px 0px 0px;
      border:2px solid rgba(58,66,99,1);
    }
    .conversion-button-bottomradius{
      border-radius:0px 0px 200px 200px;
      border:2px solid rgba(58,66,99,1);
    }
  }
}

</style>
