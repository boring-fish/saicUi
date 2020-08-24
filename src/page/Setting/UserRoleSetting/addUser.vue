<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1400px"
    top="360px"
    :modal-append-to-body="false"
    :before-close="addModalClose"
    class="confirm-add"
  >
  <div v-if="!user">
    <div class="enter">
      <span class="target-modal-title-icon"></span>
      输入员工saicID</div>
    <div class="prompt">提示：支持输入多个员工saicID批量创建员工，使用英文格式下逗号分隔多个saicID</div>
    <el-input
      class="idTextarea"
      type="textarea"
      :rows="8"
      v-model="saicIds">
   </el-input>
  </div>
  <div class="employee" v-else>
      <span class="target-modal-title-icon"></span>
    员工saicID：{{user.frLoginName}}
  </div>
   <div class="character">
       <div class="characterText">
      <span class="target-modal-title-icon"></span>
         选择角色</div>
       <div class="addSelect">
             <el-select  v-model="character" multiple placeholder="请选择" @visible-change="handleVisibleChange" :appendToBody='false' :popper-append-to-body="false">
                <el-option
                  v-for="item in addoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="marginLeft: 10px">
                     <el-tooltip class="item" effect="light" :content="item.text" placement="top-start">
                    <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                  </span>
                  <span style="float:left; color: #fffff">{{item.label}}</span>
                </el-option>
            </el-select>
       </div>
   </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addModalClose" class="button-cancel">取 消</el-button>
      <el-button type="primary" @click="addConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class DeleteUser extends Vue {
    saicIds: string = '';
    title: string = '添加员工';
    userId: any = '';
    addoptions = [{
          value: '荣威管理层',
          label: '荣威管理层',
          text:  '只能在大屏界面看到荣威品牌的指标'
        }, {
          value: '名爵管理层',
          label: '名爵管理层',
          text:  '只能在大屏界面看到名爵品牌的指标'
        }, {
          value: 'R标管理层',
          label: 'R标管理层',
          text:  '只能在大屏界面看到R标品牌的指标'
        }, {
          value: '目标值和预警值配置',
          label: '目标值和预警值配置',
          text:  '可以进入系统配置页面，进行目标值和预警值的配置'
        }, {
          value: '系统管理员',
          label: '系统管理员',
          text:  '可以看到所有品牌下的所有页面，并且可以进入系统配置页进行相关配置'
        }];
    character: any = [];
  @Prop({
    required: false,
    default: false
  }) visible!: boolean;

@Prop({
    required: false,
    default: null
}) user: any;

@Watch('user')
userChange() {
  // console.log(this.user);
  if (this.user) {
  this.userId = this.user.userId;
  this.character = this.user.userRole.split(',');
  this.title = '修改员工';
  } else {
    this.title = '添加员工';
    this.character = [];
  }

}
  addModalClose() {
    this.$emit('onConfirmDel', false);
    if (!this.user) {
      this.character = [];
      this.saicIds = '';
    }
  }
  addConfirm() {

    if (this.user) {
        let params = {
          userId: this.userId,
          userRole: this.character.toString()
        };
        $api.SettingApi.updateUser(params).then((res: any) => {
          // console.log(res , 11111);
          if (res.code === '00') {
            this.$message({
            message: res.msg,
            type: 'success'
          });
          this.$emit('onUpdateData' , true);
          } else {
            this.$message.error(res.msg);
          this.$emit('onUpdateData' , false);
          }
        
        });
    } else {
      let params = {
        users: this.saicIds,
        userRole: this.character.toString()
      };
    if (this.saicIds !== '' && this.character.length !== 0) {
        // console.log(1111);
        $api.SettingApi.saveUsers(params).then((res: any) => {
          // console.log(res , '保存用户');
          if (res.code === '00') {
          this.saicIds = '';
           this.$message({
            message: res.msg,
            type: 'success'
          });
          this.$emit('onUpdateData' , true);
          } else {
          this.saicIds = '';
          this.$message.error(res.msg);
          this.$emit('onUpdateData' , false);
          }
          
        });
        
    } else {
        this.$message.error('添加失败，请完善数据');
    }
    }
    this.character = [];
    this.$emit('onConfirmDel', true);
  }
  handleVisibleChange( flag: boolean) {
      const optioner = document.getElementsByClassName('el-select-dropdown')[0];
     if (flag) {
       if (this.user) {
        optioner.setAttribute('id', 'updateRoleSettingSelector');
       } else {
         optioner.setAttribute('id', 'roleSettingSelector');
       }
     } else {
       if (this.user) {
          optioner.removeAttribute('updateRoleSettingSelector');
       } else {
         optioner.removeAttribute('roleSettingSelector');
       }
     }
  }
}
</script>

<style lang="scss">
.confirm-add{
  .el-dialog{
    background:rgba(18,22,38,1);
    box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.6);
    border: none;
    // height: 430px;
    border-radius:24px;
    .el-dialog__body{
      // height: 636px;
      font-size: 28px;
      padding: 0 80px;
    //   line-height: 200px;
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
  .enter{
      margin-top: 64px;
      margin-bottom: 24px;
  }
  .prompt{
      color: rgba(255,255,255,0.6);
      margin-bottom: 24px;
      margin-left: 52px;
  }
  .idTextarea{
      width: 1128px;
      margin-left: 52px;
  }
  .el-textarea__inner{
      background-color: #090C15;
      color: #fff;
      font-size: 28px;
      border-radius:16px;
      border:2px solid rgba(58,66,99,1);
  }
  .character{
      display: flex;
      margin-top: 64px;
      margin-right: 24px;
      height: 40px;

      .characterText{
        width: 178px;
        margin-right: 24px;
      }

      .addSelect{
        position: relative;
        .el-select__tags{
          flex-wrap: nowrap;
          margin-left: 20px;
        }
        .el-tag--info{
          padding: 20px 16px;
          line-height: 0px
        }
        .el-scrollbar__bar,.is-horizontal{
          display: none;
        }
        .el-select-dropdown{
          height: 315px;
          max-height: 330px;
          left: 15px !important;
          position: absolute;
          .el-select-dropdown__wrap{
            height: 330px;
            max-height: 330px;
            .el-select-dropdown__item{
              height: 64px;
              font-size: 28px;
              line-height: 64px;
            }
          }
        }
      }
  }

    .el-input__inner{
        width: 992px;
        background-color: #090C15;
        font-size: 28px;
        // height: 50px !important;
        border: 2px solid rgba(58,66,99,1);
        border-radius: 36px;
        padding: 24px;
    }
    .el-tag.el-tag--info {
        background-color: #1E2441;
        border-color: #1E2441;
        color: #fff;
        font-size: 22px;
    }
    .el-select .el-tag__close.el-icon-close {
        font-size: 22px;
        background-color: #090C15;
        color: #fff;
    }
    .employee{
      margin-top: 100px;
    }
  .target-modal-title-icon{
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: #236BB4;
    border: 2px solid #236BB4;
    border-radius: 50%;
    vertical-align: middle;
    margin: 0 24px 10px 10px;
  }
  .target-modal-title-icon:before{
    content: '';
    display: inline-block;
    width: 28px;
    height: 28px;
    border: 2px dashed #236BB4;
    border-radius: 50%;
    position: relative;
    top: -10px;
    left: -10px;
  }

  .el-select .el-input .el-select__caret {
    font-size: 22px;
  }

  // .item{
  //   background-color: rgba(255,255,255,0.9);
  //   color: #333333;
  // }
}
// .role-setting-select{
    //  #roleSettingSelector.el-select-dropdown {
    //     top: 478px !important;
    //     right: 726px !important;
    // }
    // #updateRoleSettingSelector.el-select-dropdown {
    //     top: 308px !important;
    //     right: 726px !important;
    // }
    .el-select-dropdown{
        background-color: #1E2441;
        color: #fff;
        border: none;
    }
// }
   .el-popper[x-placement^=bottom] .popper__arrow{
       border-bottom-color: #1E2441;
   }
   .el-popper[x-placement^=bottom] .popper__arrow::after{
       border-bottom-color: #1E2441;
   }
     .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
      background-color: #236BB4;
    }
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover{
      background-color: #1E2441;
    }
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
      background-color: #1E2441;
    }
    .el-select-dropdown__item{
      color: #fff;
    }
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
      font-size: 28px;
    }
    .user-role-setting-wrap .el-input__icon{
    line-height: 100% !important;
  }
</style>