<template>
  <div class="sceneTop">
    <!-- <div class="sceneTopt"></div> -->
    <div class="sceneTopd">
      <div class="sceneTopdl" @click="sceneSelect()">
        <img src="@/assets/img/logo.png" alt />
        <span class="scenet">场景闭环指标监控</span>
      </div>
      <div class="sceneTopdm">
        <img src="@/assets/img/logo.png" alt />
        <span>场景闭环指标监控</span>
        <!-- todo -->
        <span>|</span>
        <span>SCRM</span>
        <span class="iconfont iconcaidan" @click="menuList()"></span>
        <div class="selectbutton" v-if="menuListcx">
          <el-radio-group v-model="radio">
            <el-radio
              :label="index"
              v-for="(item,index) in radioList"
              :key="index"
              @change="change"
            >{{item}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="sceneTopdr" @click="sceneDetail()">
        <img src="@/assets/img/logo.png" alt />
        <span class="scenet">场景闭环指标监控</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class SceneTop extends Vue {
  radio: number = 0;
  radioList: Array<string> = [
    '概览',
    '一方直播平台',
    '社交裂变',
    'IM视频',
    '上门试驾',
    '在线整车全款支付',
    '上门交车',
    'SCRM'
  ];
  menuListcx: boolean = false;
  menuList() {
    this.menuListcx = true;
  }
  change(val: any) {
    console.log(val);
    this.menuListcx = false;
  }
  sceneSelect() {
    this.$router.push({ path: 'sceneSelect' });
  }
  sceneDetail() {
    this.$router.push({ path: 'sceneDetail' });
  }
}
</script>

<style lang="scss" scoped>
.scene-warp {
  width: 4096px;
  height: 2160px;
  background: #000;
  .sceneTop {
    .sceneTopd {
      width: 100%;
      height: 124px;
      background: url("../../assets/img/tabs-checked-zbjk@2x.png") no-repeat;
      background-size: cover;
      display: flex;
      padding: 0 30px 130px;
      color: #ffffff;
      font-size: 32px;
      span {
        margin: 5px 20px;
      }
      img {
        width: 40px;
        height: 40px;
        vertical-align: 0px;
      }
      .sceneTopdl {
        width: 1395px;
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../assets/img/tabs-unchecked-left@2x.png") no-repeat;
        background-size: cover;
        margin: 65px 0 0 10px;
      }
      .sceneTopdm {
        width: 1115px;
        height: 103px;
        margin-left: 310px;

        margin-top: 30px;
        position: relative;
        .iconcaidan {
          margin-left: 120px;
        }
        .selectbutton {
          position: absolute;
          left: 870px;
          top: 75px;
          width: 418px;
          height: 696px;
          background: rgba(18, 22, 38, 1);
          border-radius: 24px;
          border: 4px solid rgba(58, 66, 99, 1);
          z-index: 1;
          padding: 45px 0;
          .el-radio-group {
            .el-radio {
              color: #ffffff;
              width: 100%;
              height: 82px;
              display: block;
              /deep/ .el-radio__input {
                left: 350px;
                .el-radio__inner {
                  width: 24px;
                  height: 24px;
                  background: none;
                }
              }
              /deep/ .el-radio__inner::after {
                width: 12px;
                height: 12px;
                background-color: #0ac9cd;
              }
              /deep/.el-radio__input.is-checked + .el-radio__label {
                color: #ffffff;
              }
              /deep/ .el-radio__label {
                font-size: 28px;
                padding-left: 10px;
              }
            }
          }
        }
        span {
          font-size: 56px;
        }
      }
      .sceneTopdr {
        width: 1395px;
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../assets/img/tabs-unchecked-right@2x.png")
          no-repeat right;
        background-size: cover;
        margin: 65px 0 0 10px;
      }
    }
  }
  .sceneTopContent {
    width: 100%;
    padding: 15px 40px 40px 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .sceneTopContenTital {
      width: 990px;
      height: 620px;
      background: #00263e;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      span {
        color: #ffffff;
        font-size: 48px;
        margin-top: 120px;
      }
    }
  }
}
</style>
