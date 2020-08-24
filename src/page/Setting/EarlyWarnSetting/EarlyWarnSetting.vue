<template>
  <div class="EarlyWarnSetting-wrap">
    <div class="simulate-button-wrap">
      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        class="add-btn"
        @click="handleOpenWarn()"
        >添加</el-button
      >
      <input
        class="upload-input"
        @change="handleUploadFile"
        type="file"
        accept=".xls,.xlsx"
        value="请选择文件"
      />
      <span class="simulate-button">批量上传</span>
      <a class="simulate-button" download="Excel模板.zip" @click="download"
        >下载Excel模板</a
      >
    </div>
    <div class="box-bg-border">
      <span class="border border-top-left"></span>
      <span class="border border-top-right"></span>
      <span class="border border-bottom-left"></span>
      <span class="border border-bottom-right"></span>
      <el-table :data="tableData" border stripe>
      <el-table-column prop="module" label="指标" show-overflow-tooltip></el-table-column>
       <el-table-column prop="timeType" label="指标计算周期" show-overflow-tooltip></el-table-column>
       <el-table-column prop="kpiEarlyWarCycle" label="目标预警阈值" show-overflow-tooltip></el-table-column>
       <el-table-column prop="kpiAlarmCycle" label="目标报警阈值" show-overflow-tooltip></el-table-column>
       <el-table-column prop="lastEarlyWarCycle" label="同比预警阈值" show-overflow-tooltip></el-table-column>
       <el-table-column prop="lastAlarmCycle" label="同比报警阈值" show-overflow-tooltip></el-table-column>
       <el-table-column prop="ringEarlyWarCycle" label="环比预警阈值" show-overflow-tooltip></el-table-column>
       <el-table-column prop="ringAlarmCycle" label="环比报警阈值" show-overflow-tooltip></el-table-column>
       <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
          <el-table-column label='状态' prop="status">
          <template slot-scope="scope">
            <span type="text" v-if="scope.row.status==='启用中'"  style="color:rgba(86,216,132,1)">启用中</span>
            <span type="text" v-else-if="scope.row.status ==='已停用'" style="color:rgba(255,113,118,1)" >已停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" v-if="scope.row.status==='启用中'"  @click="handleStop(scope.row)">停用</el-button>
            <el-button type="text" v-else-if="scope.row.status ==='已停用'"  @click="handleStop(scope.row)">启用</el-button>
            <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
   
    <warn-setting-remind
      :visible="warnVisible"
      :row="uploadRow"
      :editRow="editRow"
      @warnClose="warnClose"
      @addWarnSuss="addWarnSuss"
    >
    </warn-setting-remind>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import warnSettingRemind from './warnSettingRemind.vue'; // 组件
import { Message } from 'element-ui';

@Component({
  components: {
    warnSettingRemind,
  },
})
export default class EarlyWarnSetting extends Vue {
  viewLogVisible = false;
  viewLogRow = {};
  warnVisible = false;
  uploadRow = false;
  editRow = {};
  column = [
    
    {
      prop: 'module',
      label: '指标',
    },
    {
      prop: 'timeType',
      label: '指标计算周期',
    },
    {
      prop: 'kpiEarlyWarCycle',
      label: '目标预警阈值',
    },
    {
      prop: 'kpiAlarmCycle',
      label: '目标报警阈值',
    },
    {
      prop: 'lastEarlyWarCycle',
      label: '同比预警阈值',
    },
    {
      prop: 'lastAlarmCycle',
      label: '同比报警阈值',
    },
    {
      prop: 'ringEarlyWarCycle',
      label: '环比预警阈值',
    },
    {
      prop: 'ringAlarmCycle',
      label: '环比报警阈值',
    },
    {
      prop: 'email',
      label: '邮箱',
    },
    {
      prop: 'status',
      label: '状态',
    },
  ];
  tableData: any = [];
  tableNotChangeData: any = [];
  uploadTime = '';

  download() {
    $api.WarnSettingApi.getExcelTemplate().then((res) => {
      const blob = new Blob([res], { type: 'application/xlsx' });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = url;
      link.style.display = 'none';
      //取出下载文件名
      link.setAttribute('download', 'Excel模板.xlsx');
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    });
  }
  
  handleUploadFile(e: any) {
    const file = e.target.files && e.target.files[0];
    if (/\.xl(s[xmb]|t[xm]|am)$/.test(file.name)) {
      let form = new FormData();
      form.append('file', file);
      $api.WarnSettingApi.uploadWarn(form).then((res) => {
        if (res.code === '00') {
          Message({
            message: '上传成功',
            type: 'success',
          });
          this.getDataList();
          e.target.value = '';
        } else {
          Message({
            message: `上传失败，原因：${res.msg}`,
            type: 'error',
          });
        }
      });
    } else {
      Message({
        message: '请选择excel文件',
        type: 'warning',
      });
    }
  }

  handleOpenWarn(row: any): void {
     this.editRow = {};
    this.warnVisible = true;
  }
  warnClose(visible: boolean): void {
    this.warnVisible = false;
  }
addWarnSuss() {
  this.getDataList();
}
  //编辑
  handleEdit(row: any) {
    this.tableNotChangeData.forEach((item: any) => {
        if (item.id === row.id) {
             this.editRow = item;
        }
    });
    this.warnVisible = true;
  }

  //停用
  handleStop(row: any): void {
      let params = {
        id: row.id,
        status: row.status === '已停用' ? 0 : 1
      };
      $api.WarnSettingApi.deactivate(params).then((res: any) => {
        if (res.code === '00') {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getDataList();
        } else {
          this.$message.error(res.msg);
        }
        
      });
  }

   //删除
  handleDel(row: any) {
    let params = {
      id: row.id
    };
    $api.WarnSettingApi.deloadKpi(params).then((res: any) => {
        if (res.code === '00') {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getDataList();
        } else {
          this.$message.error(res.msg);
        }
        
    });
  }
  mounted() {
    this.getDataList();
  }
  updateData(data: any) {
       data = data ? Math.floor(data * 100) === Number(data * 100) ? data * 100 + '%' : (data * 100).toFixed(2) + '%' : '-';
       return data;
}
  getDataList() {
    let params = {
      pageNo : '1',
      pageSize : '50'
    };
    //表格数据
    $api.WarnSettingApi.getDataList({}, params).then((res) => {
      if (res.datas && res.datas[0]) {
         this.tableNotChangeData = JSON.parse(JSON.stringify(res.datas));
        this.tableData = res.datas;
         this.tableData = res.datas.map((item: any) => {
          item.kpiEarlyWarCycle = item.kpiEarlyWarCycle ? this.updateData(item.kpiEarlyWarCycle.split(',')[0])  + '≤' + 'N' + '≤' + this.updateData(item.kpiEarlyWarCycle.split(',')[1]) : '-';
          item.lastEarlyWarCycle = item.lastEarlyWarCycle ? this.updateData(item.lastEarlyWarCycle.split(',')[0])  + '≤' + 'N' + '≤' + this.updateData(item.lastEarlyWarCycle.split(',')[1]) : '-';
          item.ringEarlyWarCycle = item.ringEarlyWarCycle ? this.updateData(item.ringEarlyWarCycle.split(',')[0])  + '≤' + 'N' + '≤' + this.updateData(item.ringEarlyWarCycle.split(',')[1]) : '-';
          item.kpiAlarmCycle = item.kpiAlarmCycleSymbol === '高于' ? 'N' + '>' + this.updateData(item.kpiAlarmCycle) : item.kpiAlarmCycleSymbol === '低于' ? 'N' + '<' + this.updateData(item.kpiAlarmCycle) : '-';
          item.lastAlarmCycle = item.lastAlarmCycleSymbol === '高于' ? 'N' + '>' + this.updateData(item.lastAlarmCycle) : item.lastAlarmCycleSymbol === '低于' ? 'N' + '<' + this.updateData(item.lastAlarmCycle) : '-';
          item.ringAlarmCycle = item.ringAlarmCycleSymbol === '高于' ? 'N' + '>' + this.updateData(item.ringAlarmCycle) : item.ringAlarmCycleSymbol === '低于' ? 'N' + '<' + this.updateData(item.ringAlarmCycle) : '-';
          item.email = item.email ? item.email.replace(/，/ig, ',') : '-';
          item.status = item.status === '0' ? '启用中' : '已停用';
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
.EarlyWarnSetting-wrap {
  margin: 40px;
  padding: 40px;
  height: 100%;
  color: #fff;
  background-color: #121626;
  table td:hover {
  overflow: auto;
  text-overflow: clip;
}
  .simulate-button-wrap {
    position: relative;
    font-size: 28px;
    margin-bottom: 40px;
    .simulate-button {
      display: inline-block;
      width: 216px;
      height: 80px;
      line-height: 80px;
      margin-left: 40px;
      cursor: pointer;
      color: #fff;
      background: rgba(20, 32, 56, 1);
      text-align: center;
      border-radius: 16px;
    }
    .add-btn {
      width: 190px;
      height: 80px;
      background: rgba(35, 107, 180, 1);
      border-radius: 8px;
      border: 2px solid rgba(58, 66, 99, 1);
      font-size: 26px;
      i {
        margin-right: 10px;
      }
    }
    .upload-input {
      width: 268px;
      height: 80px;
      position: absolute;
      top: 0;
      left: 205px;
      cursor: pointer;
      opacity: 0;
    }
  }
  .box-bg-border {
    width: 3896px;
    padding: 40px;
    .el-table {
      background-color: #1e2441;
      color: #fff;
      font-size: 28px;
      border: none;
      thead {
        color: #fff;
      }
      th {
        background-color: #1e2441;
        height: 120px;
      }
      tr {
        background-color: #121626;
        height: 80px;
        .el-button--text {
          color: #3b9cff;
          font-size: 28px;
          text-decoration: underline;
        }
      }
      td{
         overflow: hidden;
         white-space: nowrap;
        
      }
   
 .cell{
       overflow: hidden;
       white-space: nowrap;
}
      tr.el-table__row--striped td {
        background-color: rgba(30, 36, 65, 0.4);
      }
    }
  }
  .el-table td,
  .el-table th.is-leaf {
    border: none;
    text-align: center;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(30, 36, 65, 1);
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: rgba(30, 36, 65, 1);
  }
  .el-button + .el-button {
    margin-left: 28px;
  }
  .el-table__empty-block {
    background: rgba(18, 22, 38, 1);
  }
}
</style>
