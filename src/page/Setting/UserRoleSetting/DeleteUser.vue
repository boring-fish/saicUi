<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    width="800px"
    top="360px"
    :modal-append-to-body="false"
    :before-close="onModalClose"
    class="confirm-del"
  >
    <span class="confirm-text">
      <i class="el-icon-warning"></i>
      确认删除该员工
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onModalClose" class="button-cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class DeleteUser extends Vue {
  @Prop({
    required: false,
    default: false
  }) visible!: boolean;

  onModalClose() {
    this.$emit('onConfirmDel', false);
  }

  confirm() {
    this.$emit('onConfirmDel', true);
  }

}
</script>

<style lang="scss">
.confirm-del{
  .el-dialog{
    background:rgba(18,22,38,1);
    box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.6);
    border: none;
    height: 430px;
    border-radius:24px;
    .el-dialog__body{
      height: 200px;
      font-size: 34px;
      line-height: 200px;
    }
    .el-dialog__footer{
      padding: 32px 42px;
      .button-cancel{
        background: transparent;
        border: none;
        color: #fff;
      }
      .el-button{
        width: 132px;
        height: 60px;
        font-size: 28px;
      }
    }
  }
  .el-icon-warning{
    margin-right: 40px;
    color: #E80404;
  }
}
</style>