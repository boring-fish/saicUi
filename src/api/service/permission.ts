import { HttpRequest } from '../rest/rest.service';

export class PermissionApi extends HttpRequest {
  permissionRole(params: object) {
    return this.Get('/api/sys/callBack', params);
  }

  getRedirectUri(params: object) {
    return this.Get('/api/sys/index', params);
  }

}


















