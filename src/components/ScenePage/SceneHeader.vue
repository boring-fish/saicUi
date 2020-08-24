<template>
  <div class="sceneHeadertital">
    <span>{{title}}</span>
    <div class="pailie" v-if="isachieve">
      <span :class="jxx?'jx':'sx'" @click="jx()">降序</span>
      <span :class="sxx?'jx':'sx'" @click="sx()">升序</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class SceneHeader extends Vue {
  public jxx: boolean = true;
  public sxx: boolean = false;
  public isachieve: boolean = false;
  @Prop({
    required: false,
    default: ''
  })
  title!: String;
  mounted() {
    this.achieve();
  }
  public achieve() {
    if (this.title === '指标达成') {
      this.isachieve = true;
    }
  }
  jx() {
    this.$emit('jx', true);
    this.jxx = true;
    this.sxx = false;
  }
  sx() {
    this.$emit('sx', true);
    this.jxx = false;
    this.sxx = true;
  }
}
</script>

<style lang="scss" scoped>
//
.sceneHeadertital {
  font-size: 36px;
  padding: 30px 40px 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
  border-bottom: 2px solid rgba(58,66,99,1);
  margin-bottom: 17px;
  display: flex;
  justify-content: space-between;
  .pailie {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background: #021722;
    font-size: 28px;
    font-weight:600;
    color:rgba(255,255,255,1);
    cursor: pointer;
    span:nth-child(1) {
      border-radius: 200px 0px 0px 200px;
      border: 2px solid rgba(58, 66, 99, 1);
    }
    span:nth-child(2) {
      border-radius: 0px 200px 200px 0px;
      border: 2px solid rgba(58, 66, 99, 1);
    }
    .jx {
      width: 120px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #236bb4;
      border: 2px solid #3a4263;
      color: #ffffff;
      font-size: 28px;
    }
    .sx {
      background: rgba(2, 23, 34, 1);
      font-size: 28px;
      width: 120px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
