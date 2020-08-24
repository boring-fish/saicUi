<template>
  <div class="user-role-setting-wrap">
    <div class="button-wrap">
      <el-button type="primary" icon="el-icon-circle-plus" class="add-btn" @click="openaddConfirmModal">员工</el-button>
      <el-input class="searchinput" v-model="searchFor" prefix-icon="el-icon-search" @change="inquireUser"></el-input>
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
        max-height="1540"
      >
        <el-table-column
          v-for="item in column"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="openaddConfirmModal(scope.row)" type="text">编辑</el-button>
            <el-button @click="openDelConfirmModal(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
      </div>
  <!-- 为了兼容大屏不使用MessageBox 使用dialog -->
    <DeleteUser
      :visible="delConfirmVisible"
      @onOpen="openDelConfirmModal"
      @onClose="onConfirmDel"
      @onConfirmDel="onConfirmDel"
    >
    </DeleteUser>
    
    <AddUser
      :visible="addConfirmVisible"
      @onOpen="openaddConfirmModal"
      @onClose="addConfirmDel"
      @onConfirmDel="addConfirmDel"
      @onUpdateData="onUpdateData"
      :user="updateUser"
    >

    </AddUser>

    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="pageModel.currentPage"
        :page-size="pageModel.size"
        layout="prev, pager, next, jumper"
        :total="pageModel.total"
      >
      </el-pagination>
    </div>  
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DeleteUser from './DeleteUser.vue'; // 组件
import AddUser from './addUser.vue';

@Component({
  components: {
    DeleteUser,
    AddUser
  }
})
export default class UserRoleSetting extends Vue {
  column = [{
    prop: 'frLoginName',
    label: 'saicID',
    width: '1000'
  },
  {
    prop: 'frDisplayName',
    label: '用户姓名',
    width: '500'
  },
  {
    prop: 'userRole',
    label: '角色',
    width: '1062'
  },
    {
    prop: 'createTime',
    label: '创建时间'
  },
  {
    prop: 'createUser',
    label: '创建人'
  }
  ];
  pageModel: any = {
    page: 0,
    size: 100,
    currentPage: 0,
    total: 0
  };
  tableData: any = [];
  currentUser: any = null;
  updateUser: any = null;
  uploadTime = '';
  delConfirmVisible: boolean = false;
  addConfirmVisible: boolean = false;
  searchFor: string = '';

  openDelConfirmModal(user: any) {
    this.currentUser = user; 
    this.delConfirmVisible = true;
  }

  onConfirmDel(flag: boolean) {
    if ( !flag ) {
      this.delConfirmVisible = false;
      return;
    }
    // console.log(1111);
    console.log(this.currentUser);
    let params = {
      userId: this.currentUser.userId
    };
    $api.SettingApi.delUseId(params).then((res: any) => {
      // console.log(res);
      if (res.code === '00') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        this.getUsers();
      } else {
        this.$message.error('删除失败');
      }
      
    });

    this.delConfirmVisible = false;

  }

  handleCurrentChange(val: number) {
    // console.log(val);
    this.pageModel.currentPage = val;
    this.getUsers();
  }
  openaddConfirmModal(value: any) {
    // console.log(value);
    if (value.userId) {
      // console.log(1111);
      this.updateUser = value;
    } else {
      this.updateUser = null;
    }
    this.addConfirmVisible = true;
  }

  addConfirmDel(flag: boolean) {
    if ( !flag ) {
      this.addConfirmVisible = false;
      // console.log('更新');
      return;
    }
      // this.getUsers();
      this.addConfirmVisible = false;
  }

  //获取联系人
  getUsers() {
    let params = {
      pageNo: this.pageModel.currentPage,
      pageSize: this.pageModel.size
    };
    $api.SettingApi.getUserList(params).then((res: any) => {
      console.log(res);
      this.tableData = res.datas;
      this.pageModel.total = res.pageSize * res.totalPage;
      // console.log( this.pageModel.total);
    });
  }
onUpdateData(flag: boolean) {
if (flag) {
  this.getUsers();
}

}

//查询用户列表
inquireUser() {
  // console.log(this.searchFor);
  if (this.searchFor) {
    let params = {
      keyWord: this.searchFor,
      pageNo: this.pageModel.currentPage,
      pageSize: this.pageModel.size

    };
    $api.SettingApi.inquireUser(params).then((res: any) => {
      console.log(res); 
      this.tableData = res.datas;
      this.pageModel.total = res.pageSize * res.totalPage;
    })
    .catch(e => {
      this.$message.error('查询失败');
    });
  } else {
    this.getUsers();
  }
}

  mounted() {
    this.getUsers();
  }


}
</script>

<style lang="scss">
.user-role-setting-wrap{
  margin: 40px;
  padding: 40px;
  height: 100%;
  position: relative;
  color: #fff;
  background-color: #121626;
  .button-wrap{
    margin-bottom: 40px;
    // display: flex;
    .searchinput{
      float: right;
      width: 662px;
      // height: 40px;
    }
    .add-btn{
      width: 200px;
      height: 80px;
      border-radius: 16px;
      font-size: 28px;
      i{
        margin-right: 26px;
      }
    }
  }
  .box-bg-border{
    width: 3896px;
    // height: 938px;
    padding: 40px;
    max-height: 1600px;
    .el-table{
      background-color: #1E2441;
      color: #fff;
      font-size: 28px;
      border: none;
      .is-scrolling-none{
        background-color: #121626;
      }
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
  .el-input__inner {
    height: 70px;
    background-color: #090C15;
    border: 4px solid #3a4263;
    // box-shadow: inset 0px 2px 50px 16px #1f222d;
    font-size: 16px;
    color: #fff;
    font-size: 26px;
    border-radius: 40px;
  }
  .el-input__icon{
    width: 40px;
    font-size: 28px;
    line-height: 70px;
    // padding-right: 20px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 64px;
  }
  .el-input__prefix {
    left: 20px;
  }
  .pagination{
    height: 140px;
    padding-top: 40px;
    position: absolute;
    width: 100%;
    bottom: 0;
    .el-pagination{
      height: 100%;
      padding-left: 72%;
      .btn-prev, .btn-next{
        width: 64px;
        height: 64px;
        background: #142038;
        color: #fff;
        border-radius: 8px;
        i{
          font-size: 32px;
        }
      }
      .el-pager{
        li{
          width: 64px;
          height: 64px;
          font-size: 32px;
          line-height: 64px;
          border-radius: 8px;
          font-weight: 300;
          background: #142038;
          .active{
            background: rgba(35,107,180,1);
          }
        }
      }
      .el-pagination__jump{
        line-height: 64px;
        font-size: 32px;
        .el-pagination__editor{
          width:104px;
          height:64px;
          font-size: 32px;
          line-height: 64px;
          input{
            width: 100%;
            height: 100%;
            background:rgba(9,12,21,1);
            border-radius:8px;
            border:2px solid rgba(58,66,99,1);
          }
        }
      }
    }
  }
}

</style>
