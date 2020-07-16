import { DashboardApi } from './dashboard';
import { TurnoverDefeateApi } from './turnoverDefeate';
import { ChannelConversionApi } from './channelConversion';
import { SettingApi, AimSettingApi } from './setting';


export class ApiService {
  DashboardApi: DashboardApi;
  TurnoverDefeateApi: TurnoverDefeateApi;
  ChannelConversionApi: ChannelConversionApi;
  SettingApi: SettingApi;
  AimSettingApi: AimSettingApi;
  
  constructor() {
    this.DashboardApi = new DashboardApi();
    this.TurnoverDefeateApi = new TurnoverDefeateApi();
    this.ChannelConversionApi = new ChannelConversionApi();
    this.SettingApi = new SettingApi();
    this.AimSettingApi = new AimSettingApi();

  }
}