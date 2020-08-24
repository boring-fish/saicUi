import _ from 'lodash';

interface PERMISSIONMODEL {
  isRWAdmin: boolean;
  isMGAdmin: boolean;
  isRAdmin: boolean;
  isKpiAdmin: boolean;
  isAdministrator: boolean;
}

export class Permission {
  permissionResp: any = {};
  permissionRole: PERMISSIONMODEL = {
    isRWAdmin: false,
    isMGAdmin: false,
    isRAdmin: false,
    isKpiAdmin: false,
    isAdministrator: false
  };
  effectiveRole: string = '';
  constructor() {

  }

  setResp(resp: any) {
    let role = {
      isRWAdmin: resp.roles.indexOf('荣威管理层') > -1 ? true : false,
      isMGAdmin: resp.roles.indexOf('名爵管理层') > -1 ? true : false,
      isRAdmin: resp.roles.indexOf('R标管理层') > -1 ? true : false,
      isKpiAdmin: resp.roles.indexOf('目标值和预警值配置') > -1 ? true : false,
      isAdministrator: resp.roles.indexOf('系统管理员') > -1 ? true : false,
    };
    let effectiveRole = this.getEffective(resp.roles);
    console.log(effectiveRole, 'effectiveRole');
    this.permissionResp = resp;
    this.permissionRole = role;
    this.effectiveRole = effectiveRole;
  }

  getRoles() {
    return this.permissionRole;
  }

  getResp() {
    return this.permissionResp;
  }

  getDefaultBrandId() {
    console.log(this.effectiveRole, 'this.effectiveRole');
    if ( this.effectiveRole === 'admin' || this.effectiveRole === '121') {
      return '121';
    } else {
      return this.effectiveRole;
    }
  }

  getDefaultBrandName() {
    if ( this.effectiveRole === 'admin' || this.effectiveRole === '121') {
      return '名爵';
    } else {
      if ( this.effectiveRole === '101' ) {
        return '荣威';
      } else if ( this.effectiveRole === '100' ) {
        return 'R标';
      }
    }
  }

  getEffectiveRole() {
    return this.effectiveRole;
  }

  private getEffective(arr: string[]) {
    let newArr: any = [];
    arr.forEach((item: string) => {
      let str = '';
      switch (item) {
        case '荣威管理层':
          str = '101';
          break;
        case '名爵管理层':
          str = '121';
          break;
        case 'R标管理层':
          str = '100';
          break;
        case '系统管理员':
          str = 'admin';
          break;
        case '目标值和预警值配置':
          str = 'kpi';
          break;
        default:
          break;
      }
      newArr.push(str);
    });
    console.log(newArr);
    if (newArr.indexOf('admin') > -1) {
      return 'admin';
    }
    if ( newArr.indexOf('kpi') > -1 ) {
      newArr.splice(newArr.indexOf('kpi'), 1);
    }
    return newArr[0] || '';
  }

}

