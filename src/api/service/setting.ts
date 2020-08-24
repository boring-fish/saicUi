import { HttpRequest } from '../rest/rest.service';

export class SettingApi extends HttpRequest {

  //按useId删除用户
  delUseId(params: object) {
    return this.Get('/api/permis/delUser', params);
  }
  //查询用户列表
  getUserList(params: object) {
    return this.Get('/api/permis/queryUserList', params);
  }
  //保存用户信息
  saveUsers(params: object) {
    const body = {};
    return this.Post('/api/permis/saveUsers', body , params);
  }
  //更新用户信息
  updateUser(params: object) {
    return this.Get('/api/permis/updateUser' , params);
  }

  //查询用户列表
  inquireUser(params: object) {
    return this.Get('/api/permis/queryUserList' , params);
  }
      
}

export class AimSettingApi extends HttpRequest {

   //获取KPI模板
  getExcelTemplate() {
    return '/api/manual/model/dowload';
  }

  getExcelTemplate1() {
    return this.DownLoad('/api/manual/model/dowload', {});
  }

  //获取指标列表
  getList() {
    return this.Get('/api/manual/uploadLog/query', {});
  }
  getViewLog( params: object ) {
    return this.Get('/api/manual/uploadLog/query/detail', params);
    
  }
  
  // 上传大区KPI占比
  uploadRegion(body: Object) {
    const params = {};
    // const headers = {
    //   'Content-Type': 'application/vnd.ms-excel'
    // }
    return this.Post('/api/manual/upload/proportion', body, params);
  }
  // 上传日均指标KPI
  uploadAvgKPI( body: Object, params: object) {
    // type=意向&startMonth=2020-07&endMonth=2020-07
    console.log(this, 'post');
    return this.Post('/api/manual/upload/dayavg', body, params);
  }
  // 上传日均指标KPI
  uploadEveryKPI( body: Object, params: object) {
    // type=意向&startDate=2020-07&endDate=2020-07
   
    return this.Post('/api/manual/upload/everyday', body, params);
  }

}

export class WarnSettingApi extends HttpRequest {

  //获取下载模板
 getExcelTemplate() {
   return this.DownLoad('/api/warning/model/dowload', {});
 }
//查询字典数据timetype
 getTimeType(params: object) {
   return this.Get('/api/dashboard/dictData', params);
 }

 //获取列表
 getList(body: Object, params: object) {
   return this.Post('/api/warning/search', body, params);
 }
 //获取列表
 getDataList(body: Object, params: object) {
  return this.Post('/api/warning/queryPageList', body, params);
}
 //新增、编辑预警配置
 addWarn( body: Object, params: object ) {
   return this.Post('/api/warning/save', body, params);
 }

 // 上传大区KPI占比
 uploadWarn(body: Object) {
   const params = {};
   return this.Post('/api/warning/upload/save', body, params);
 }
 //查询预警标识(warningType为空代表没有预警和报警)
 getwarningType(params: object) {
  return this.Get('/api/warning/search/warningType', {});
}
 //删除指标
 deloadKpi(params: object) {
   const body = {};
   return this.Post('/api/warning/delete' , body , params);
 }
  //停用
 deactivate(params: object) {
   const body = {};
   return this.Post('/api/warning/status' , body , params);
 }
 //查询预报警日志列表
 getWarnList(params: object) {
  const body = {};
  return this.Post('/api/warning/query/log' , body , params);
}
//下载预报警日志列表
getWarnExcel(params: object) {
  return this.DownLoadPost('/api/warning/query/log/dowload',  params);
}
}

















