import { HttpRequest } from '../rest/rest.service';
export class ChannelConversionApi extends HttpRequest {

    //获取潜客状态
    getStatus(params: object) {
        return this.Get('/api/dashboard/conversion/convercard/status', params);
      }
  
      //获取潜客状态
    getDetails(params: object) {
      return this.Get('/api/dashboard/conversion/sourcetype', params);
    }

}