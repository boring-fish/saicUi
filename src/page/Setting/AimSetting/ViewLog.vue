<template>
    <el-dialog
        title="查看记录"
        :visible.sync="visible"
        :modal-append-to-body="false"
        width="1400px"
        top="360px"
        class="view-log"
        :before-close="handleClose">
        <el-table
                :data="tableData"
                stripe
                >
                <el-table-column
                  v-for="item in column"
                  :key="item.prop"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width">
                </el-table-column>
          </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClose">关 闭</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class ViewLog extends Vue {
    @Prop({
    required: false,
    default: false
  }) visible!: boolean;
    @Prop({
        required: false,
        default: {}
    }) row!: any;

    column = [{
            prop: 'timeRange',
            label: 'KPI时间范围',
            width: '658'
          }, {
            prop: 'uploadTime',
            label: '上传时间',
            width: '658'
          }];
tableData = [];

handleClose() {
    this.$emit('on-view-log-close', false);
}
mounted() {
   
}

@Watch('row')
  onRowChange(row: any) {
     const params = {
        type: row.type,
    };
    $api.AimSettingApi.getViewLog(params).then( res => {
        if (res.now && res.now[0] ) {
          this.tableData = res.now[0].map( (item: any) => {
            item.timeRange = item.startDate + ' ~ ' + item.endDate ;
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
.view-log{
  padding: 40px;
    .el-dialog {
        height: 1200px;
        background-color: $box-bg-primary;
        .el-table {
            font-size: 28px;
            color: #fff;
            thead {
                color: #fff;
            }
        }
         .el-table td, .el-table th.is-leaf{
            border: none;
            text-align: center;
            //  border-left: none;
        }
        .el-dialog__header{
            border-bottom: 2px solid #3A4263;
        }
        .el-dialog__body{
            height: 968px;
            padding: 40px 42px 0 44px;
            overflow: scroll;
            th{
                background-color: #1E2441;
                height: 120px;
            }
            tr{
                background-color:#121626;
                height: 80px;
            }
            tr.el-table__row--striped td {
                background-color: rgba(30, 36, 65, 0.4);
            }
            .el-table--border, .el-table--group{
                border: none;
            }
            .el-table--border::after, .el-table--group::after, .el-table::before{
                background-color: transparent;
            }
             .el-table,.el-table__expanded-cell {
                background-color: transparent;
            }
            .el-table--scrollable-x .el-table__body-wrapper{
                overflow-x: hidden;
            }

        }
       
        .el-dialog__footer{
            border-top: 2px solid #3A4263;
            padding: 32px 42px;
        }
         .el-button{
                width: 132px;
                height: 60px;
                font-size: 28px;
                background-color: #236BB4;
            }
    }
   .el-table--border, .el-table--group {
     border: none;
   }
}

</style>