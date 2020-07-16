<template>
  <div class="aimsetting-wrap">
    <div class="simulate-button-wrap">
      <a  class="simulate-button" :href="href" download="Excel模板.zip">下载Excel模板</a>
      <input class="upload-input" @change="handleUploadFile"  
      type="file" 
      accept=".xls,.xlsx" 
      value="请选择文件" />
      <span class="simulate-button">上传大区KPI占比</span>
      <span>最近上传时间：{{uploadTime}}</span>
    </div>
    <div class="box-bg-border">
            <span class="border border-top-left"></span>
            <span class="border border-top-right"></span>
            <span class="border border-bottom-left"></span>
            <span class="border border-bottom-right"></span>
            <el-table
                :data="tableData"
                border
                stripe
            >
                <el-table-column
                  v-for="item in column"
                  :key="item.prop"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width">
                </el-table-column>
               
                <el-table-column
                  label="操作"
                  >
                  <template slot-scope="scope">
                    <el-button @click="handleOpenUpload(scope.row)" type="text">上传</el-button>
                    <el-button 
                      :style="{ visibility: (scope.row.uploadTime ==='- -'? 'hidden' : 'visible')}"
                      type="text" 
                      @click="handleOpenViewLog(scope.row)"
                      >查看记录</el-button>
                  </template>
                </el-table-column>
          </el-table>
      </div>
      <view-log 
        :visible="viewLogVisible" 
        :row="viewLogRow" 
        @on-view-log-close="onViewLogCLose">
      </view-log>
      <upload 
        :visible="uploadVisible" 
        :row="uploadRow" 
        @on-upload-close="onUploadClose">
      </upload>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Upload  from './Upload.vue'; // 组件
import  ViewLog from './ViewLog.vue'; 
import { Message } from 'element-ui';

@Component({
  components: {
    Upload,
    ViewLog,
  }
})
export default class AimSetting extends Vue {
viewLogVisible = false;
viewLogRow = {};
uploadVisible = false;
uploadRow = {};
column = [{
            prop: 'type',
            label: '指标',
            width: '700'
          }, {
            prop: 'timeRange',
            label: '最新上传KPI时间范围',
            width: '1062'
          }, {
            prop: 'uploadTime',
            label: '最新上传时间',
            width: '1494'
          }, ];
tableData = [];
uploadTime = '';


    get href () {
      return $api.AimSettingApi.getExcelTemplate();
    }


    handleUploadFile( e: any ) {
       const file = e.target.files && e.target.files[0];
        if ((/\.xl(s[xmb]|t[xm]|am)$/).test(file.name)) {
           let form = new FormData(); 
           form.append('file', file); 
           $api.AimSettingApi.uploadRegion (form).then ( (res) => {
             if (res.code === '00') {
                Message({
                message: '上传成功',
                type: 'success'
                });

                this.uploadTime = res.time;
             } else {
                Message({
                message: `上传失败，原因：${res.msg}`,
                type: 'error'
                });
             }

           });

        } else {
            Message({
                message: '请选择excel文件',
                type: 'warning'
                });
        }
       
    }

    handleOpenUpload(row: any): void  {
      this.uploadRow = row;
      this.uploadVisible = true;

    }
    onUploadClose(visible: boolean, time?: string, timeRange?: string): void {
      this.uploadVisible = false;
      if (time) {
        this.$set(this.uploadRow, 'uploadTime', time);
        this.$set(this.uploadRow, 'timeRange', timeRange);

      }
    }
    handleOpenViewLog(row: object): void {
      this.viewLogRow = row;
      this.viewLogVisible = true;

    }
    onViewLogCLose(visible: boolean): void {
      this.viewLogVisible = visible;
    }

    mounted() {
      $api.AimSettingApi.getList().then( res => {
        if (res.now && res.now[0]) {
          const arr = res.now[0].filter( (item: any) => {
            if ( item.type === '大区KPI比例维度' ) {
              this.uploadTime = item.uploadTime;
              return false;
            } else {
              return true;
            }
          });

          this.tableData = arr.map( (item: any) => {
            if (item.uploadTime) {
              item.timeRange = item.startDate + ' ~ ' + item.endDate ;
            } else {
              item.timeRange = '- -';
              item.uploadTime = '- -';
            }
            
            return item;     
          });
        } else {
          this.tableData = [];
        }
      });
    }

}
</script>

<style lang="scss">
.aimsetting-wrap{
  margin: 40px;
  padding: 40px;
  height: 100%;
  color: #fff;
  background-color: #121626;
  .simulate-button-wrap{
    position: relative;
    font-size: 28px;
    margin-bottom: 40px;
    .simulate-button{
      display: inline-block;
      width: 268px;
      height: 80px;
      line-height: 80px;
      margin-right: 40px;
      color: #fff;
      background: rgba(20,32,56,1);
      text-align: center;
      border-radius:16px;
      // cursor: pointer;
      
    }
    .upload-input {
      width: 268px;
      height: 80px;
      position: absolute;
      top: 0;
      left: 308px;
      cursor: pointer;
      opacity: 0;
    }
  }
   .box-bg-border{
    width: 3896px;
    // height: 938px;
    padding: 40px;
    .el-table{
      background-color: #1E2441;
      color: #fff;
      font-size: 28px;
      border: none;
      thead{
        color: #fff;
      }
      th{
        background-color: #1E2441;
        height: 120px;
      }
      tr{
        background-color: #121626;
        height: 80px;
        .el-button--text {
          color: #3B9CFF;
          font-size: 28px;
          text-decoration:underline;
        }
      }
      
      tr.el-table__row--striped td {
          background-color: rgba(30, 36, 65, 0.4);
      }
      td:first-child, tr.el-table__row--striped td:first-child {
        background-color: #1E2441;
      }
    }
   }
   .el-table td, .el-table th.is-leaf{
     border: none;
     text-align: center;
    //  border-left: none;
   }
   .el-table--enable-row-hover .el-table__body tr:hover>td{
     background-color: rgba(30,36,65,1);
   }
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(30,36,65,1);
}
   .el-button+.el-button{
     margin-left: 28px;
   }
}

</style>
