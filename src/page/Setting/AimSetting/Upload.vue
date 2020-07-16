<template>
    <el-dialog
        title="上传指标目标值"
        :visible.sync="visible"
        width="1400px"
        top="360px"
        class="upload"
        :before-close="handleClose"
        :modal-append-to-body="false"
        >
       
        <div class="upload-time-range">
            <span class="target-modal-title-icon"></span>
            <span>选择要上传的KPI时间范围</span>
             <el-date-picker
                v-model="timeRange"
                :type="uploadType"
                value-format="yyyy-MM-dd"
                :appendToBody="false"
                unlink-panels
                range-separator="至"
                @change="handleChangeTime"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            
        </div>
     <div class="kpi">
        <span class="target-modal-title-icon"></span>
        <span>上传KPI</span>
     </div>
        <div>
             <el-radio-group v-model="uploadType" @change="handleChangeType">
                <el-radio label="monthrange" :class="{'radio-checked':uploadType === 'monthrange'}">“日均KPI”方式</el-radio>
                <el-radio label="daterange" :class="{'radio-checked':uploadType === 'daterange'}">“每日明细KPI”方式</el-radio>
             </el-radio-group>
            <div class="upload-area">
                <!-- <i class="el-icon-delete"></i> -->
                  <div style="marginTop: 80px"><span class="iconfont iconupload upfiles" ></span></div>
                <div>点击上传</div>
                <input class="upload-input"  
                    ref="uploadFileInput"
                    @change="handleChangeFile" 
                    accept=".xls,.xlsx" 
                    type="file" 
                    value="请选择文件" />
            </div>
            <!-- <i class="el-icon-s-order"></i> -->
            <span class="iconfont iconcl-icon-DocumentBook ShowUpload" v-if="uploadFile.name"></span>
            <span>{{uploadFile.name}}</span>
            <i class="el-icon-circle-check checkMark" v-if="uploadFile.name"></i>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button class="button-cancel" @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleUpload">确定</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Message } from 'element-ui';
import { dateFormat } from '@/utils/utils';

@Component({})
export default class Upload extends Vue {
    @Prop({
    required: false,
    default: false
  }) visible!: boolean;
    @Prop({
        required: false,
        default: {}
    }) row!: any;
    @Prop({
        required: false,
        default: false
    }) hasUploadRegion!: boolean;


    selectedTime = '';

    uploadType = 'monthrange';
    uploadFile = {
        name: ''
    };
    timeRange = [];

    handleChangeType(value: string ) {
        this.uploadType = value;
    }
    handleChangeTime(value: string) {
       console.log(value);
    }
    handleChangeFile( e: any ) {
        const file = e.target.files && e.target.files[0];
        if ((/\.xl(s[xmb]|t[xm]|am)$/).test(file.name)) {
            this.uploadFile = file;

        } else {
            Message({
                message: '请选择excel文件',
                type: 'warning'
                });
        }

    }
    handleClose(e: any, time?: string, timeRange?: string) {
     ( this.$refs.uploadFileInput as any ).value = '';
        this.uploadFile = { name: ''};
        this.$emit('on-upload-close', false, time, timeRange);
        
    }
    handleUpload() {
        if (this.timeRange.length !== 2) {
             Message({
                message: '请先选择时间范围',
                type: 'warning'
                });
                return;
        }
        if (!this.uploadFile.name) {
             Message({
                message: '请先选择上传文件',
                type: 'warning'
                });
                return;
        }

        const form: any = new FormData(); 
        form.append('file', this.uploadFile); 

        const request = this.uploadType === 'monthrange' ?  
                        $api.AimSettingApi.uploadAvgKPI.bind($api.AimSettingApi) : 
                        $api.AimSettingApi.uploadEveryKPI.bind($api.AimSettingApi);
        const params = this.uploadType === 'monthrange' ? 
            { type: this.row.type,
            startMonth: (this.timeRange[0] as any).substr(0, 7),
            endMonth: (this.timeRange[1] as any).substr(0, 7),
        } : {
            type: this.row.type,
            startDate: this.timeRange[0],
            endDate: this.timeRange[1],
        };
        
        request(form, params ).then ( (res: any) => {
            if ( res.code === '00') {
                Message({
                    message: '上传成功！',
                    type: 'success'
                });

                const time = res.time;
                const timeRange = this.uploadType === 'monthrange' ? 
                        params.startMonth + ' ~ ' + params.endMonth :
                        params.startDate + ' ~ ' + params.endDate ;
                this.handleClose(null, time, timeRange);
            } else {
                Message({
                    message: `上传失败，错误原因：${res.msg}`,
                    type: 'error'
                });
            }
        });
        
    }

    mounted() {
       
    }

}
</script>

<style lang="scss">

.upload{
    .el-dialog {
        height: 950px;
        background-color: $box-bg-primary;
        .el-dialog__heade{
            border-bottom: 2px solid rgba(0,0,0,0.6);
        }
        .el-dialog__body{
            height: 720px;
            padding: 64px 80px;
            font-size: 28px;
            .upload-time-range{
                height: 60px;
                line-height: 60px;
                margin-bottom: 72px;
                .el-range-editor.el-input__inner{
                    margin-left: 64px;
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
          top: -16px;
          left: -10px;
      }
            }
            .el-radio{
                margin: 24px 318px 24px 56px;
                .el-radio__label{
                    font-size: 28px;
                }
            }
             .el-radio__label {
                color: #fff;
                vertical-align: bottom;
            }
            .radio-checked .el-radio__label{
                color: #3B9CFF;
            }
           
            .upload-area{
                position: relative;
                width: 1128px;
                height: 256px;
                margin: 0 auto 36px;
                // display: flex;
                align-items: center;
                justify-content: center;
                background-color: #090C15;
                border: 2px solid #3A4263;
                text-align: center;
                .upload-input{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    cursor: pointer;

                }
                .upfiles{
                    font-size: 40px;
                }
            }
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
       .el-radio__inner{
           width: 24px;
           height: 24px;
        //    background-color: #121626;
        //    border: #fff;
       }

       .el-radio__input.is-checked .el-radio__inner{
           width: 24px;
           height: 24px;
       }
        .el-month-table td.in-range div, .el-month-table td.in-range div:hover{
            background-color: transparent;
        }
        .el-date-range-picker__content .el-date-range-picker__header div{
            color: #fff;
            font-size: 28px;
        }
        .el-picker-panel__icon-btn{
            color: #fff;
            font-size: 28px;
        }
        .el-picker-panel__icon-btn.is-disabled{
            color: #fff;
        }
        .el-date-editor--monthrange.el-input, .el-date-editor--monthrange.el-input__inner, .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
            width: 600px;
            border: 2px solid #3A4263;
            border-radius: 20px;
        }
        .el-input__inner, .el-range-editor .el-range-input{
            background-color: #090C15;
            color: #fff;
            font-size: 20px;
            width: 45%;
        }
        .el-date-editor .el-range__icon {
            display: none;
        }
        .el-date-table td.in-range div, .el-date-table td.in-range div:hover, .el-date-table.is-week-mode .el-date-table__row.current div, .el-date-table.is-week-mode .el-date-table__row:hover div{
            background-color: transparent;
        }
        .el-date-table{
            font-size: 20px;
        }
        
       
    }
    
    .ShowUpload{
    font-size: 28px;
    margin-right: 20px ;
     }

     .checkMark{
         float:right;
         color: #89E388;
     }
     .kpi{
        .target-modal-title-icon{
          display: inline-block;
          width: 15px;
          height: 15px;
          background-color: #236BB4;
          border: 2px solid #236BB4;
          border-radius: 50%;
          vertical-align: middle;
          margin: 7px 24px 10px 10px;
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
     }
}

</style>
