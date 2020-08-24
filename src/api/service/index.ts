import { DashboardApi } from './dashboard';
import { TurnoverDefeateApi } from './turnoverDefeate';
import { ChannelConversionApi } from './channelConversion';
import { SettingApi, AimSettingApi, WarnSettingApi } from './setting';
import { PermissionApi } from './permission';

export class ApiService {
  DashboardApi: DashboardApi;
  TurnoverDefeateApi: TurnoverDefeateApi;
  ChannelConversionApi: ChannelConversionApi;
  SettingApi: SettingApi;
  AimSettingApi: AimSettingApi;
  WarnSettingApi: WarnSettingApi;
  PermissionApi: PermissionApi;

  constructor() {
    this.DashboardApi = new DashboardApi();
    this.TurnoverDefeateApi = new TurnoverDefeateApi();
    this.ChannelConversionApi = new ChannelConversionApi();
    this.SettingApi = new SettingApi();
    this.AimSettingApi = new AimSettingApi();
    this.WarnSettingApi = new WarnSettingApi();
    this.PermissionApi = new PermissionApi();
  }
}