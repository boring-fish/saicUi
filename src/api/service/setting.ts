import { HttpRequest } from '../rest/rest.service';

export class SettingApi extends HttpRequest {
  

}

export class AimSettingApi extends HttpRequest {

   //获取KPI模板
   getExcelTemplate() {
    return '/api/manual/model/dowload';
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


















