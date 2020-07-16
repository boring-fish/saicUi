/**
  * @description: 筛选按钮
  * @author: qian.wan
  * @date: 
  */
<template>
  <div class="filterbutton-wrap" :style="wrapStyle">
     <span 
            v-for="(label) in filterArr"
            class="filter-button"
            :class="{'filter-button-active': label === activeLabel}"
            :style="buttonStyle"
            @click="onFilterChange(label)"
            :label="label"
            :key="label">        
            {{label}}
          </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class FilterButton extends Vue {
  // prop
  
  @Prop({
    required: true,
    default: ''
  }) filterArr!: string[];

  @Prop({
    required: true,
    default: ''
  }) filterLabel?: string;

   @Prop({
    required: false,
    default: '',
  }) wrapStyle?: object;

  @Prop({
    required: false,
    default: '',
  }) buttonStyle?: object;



  activeLabel: string = '';

  @Emit()
  onFilterChange(label: string) {
    if (label === '计划值') return this.activeLabel;

      this.activeLabel = label;
      return label;
  }

  created() {
    this.activeLabel = this.filterLabel ? this.filterLabel : this.filterArr[0];
  }

  mounted() {
    //
  }

}
</script>

<style lang="scss">
.filterbutton-wrap{
            // position: absolute;
            // top: 20px;
            // right: 48px;
            height: 60px /* 60/100 */;
            border-radius: 200px;
            border:2px solid rgba(58,66,99,1);
            overflow: hidden;
            .filter-button{
              display:inline-block;
              width: 218px;
              height: 60px;
              line-height: 60px;
              padding: 0;
              font-size: 28px;
              font-weight: normal;
              color:rgba(255,255,255,0.4);
              background-color: rgba(9,12,21,1);
              // border:2px solid rgba(58,66,99,1);
              text-align: center;
              cursor: pointer;
            }
            .filter-button-active {
              color: #fff;
              background:rgba(35,107,180,1);
            }

            .filter-button-leftRadius {
             border-radius:200px 0px 0px 200px;
            }
            .filter-button-rightRadius{
            border-radius:0px 200px 200px 0px;
            }
          }

</style>

