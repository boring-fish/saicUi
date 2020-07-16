import { HttpRequest } from '../rest/rest.service';
export class TurnoverDefeateApi extends HttpRequest {

  //成交
  AlldealData(params: object) {
    return this.Get('/api/dashboard/conversion/delivery', params);
  }
  //战败
  defeated(params: object) {
    return this.Get('/api/dashboard/conversion/defeat', params);
  }

  //渠道api
  // salesData(params: object) {
  //   return this.Get('/api/dashboard/conversion/delivery/sourcetype', params);
  // }

  //经销商和渠道
  channelData(params: object) {
    return this.Get('/api/dashboard/conversion/delivery/rfscode', params);
  }
  //每日数据api
  everydayData(params: object) {
    return this.Get('/api/dashboard/conversion/delivery/everyday', params);
  }

}