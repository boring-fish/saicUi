import { HttpRequest } from '../rest/rest.service';

export class DashboardApi extends HttpRequest {
  // 获客地图
  getArea(params: object) {
    return this.Get('api/dashboard/leadstrend/pcmap', params);
  }

  // 线上线下占比
  ifOnLine(params: object) {
    return this.Get('api/dashboard/leadstrend/ifonline', params);
  }

  // 首页订单
  order(params: object) {
    return this.Get('/api/dashboard/order', params);
  }

  // 获客意向
  oppor(params: object) {
    return this.Get('/api/dashboard/oppor', params);
  }

  // 获客留资
  liuzi(params: object) {
    return this.Get('/api/dashboard/liuzi', params);
  }

  // 获客跟进
  follow(params: object) {
    return this.Get('/api/dashboard/follow', params);
  }

  // 获客趋势
  leadstrend(params: object) {
    return this.Get('/api/dashboard/leadstrend', params);
  }

  // 大小区
  areaData(params: object) {
    return this.Get('/api/dashboard/rfsMacName', params);
  }

  // 大小区
  carSeriesData(params: object) {
    return this.Get('/api/dashboard/rfsMacName', params);
  }

  // 经销商
  dealersData(params: object) {
    return this.Get('/api/dashboard/dealers', params);
  }

  // 留资
  getData(params: object) {
    return this.Get('/api/dashboard/leads', params);
  }

  getopporOrderData(params: object) {
    return this.Get('/api/dashboard/opporOrder', params);
  }

  //战败
  defeatData(params: object) {
    return this.Get('/api/dashboard/defeat', params);
  }

  //建卡
  ConverforsalesData(params: object) {
    return this.Get('/api/dashboard/converforsales', params);
  }

  //传播数据 首页使用
  spreadData(params: object) {
    return this.Get('/api/dashboard/spread', params);
  }
  //传播数据 词云使用
  spreadCloudData(params: object) {
    return this.Get('/api/dashboard/spread/journalSearch', params);
  }
  //传播数据 传播页使用
  spreadData2(params: object) {
    return this.Get('/api/dashboard/spread2', params);
  }

  //到店数据
  ToshopData(params: object) {
    return this.Get('/api/dashboard/converforvisit', params);
  }

  //到店数据 转化页面使用
  ToshopDataInConversion(params: object) {
    return this.Get('/api/dashboard/conversion/visit', params);
  }

  //总成交用户数据
  AlldealData(params: object) {
    return this.Get('/api/dashboard/salesdelivery', params);
  }

  //战败原因数据
  DetailData(params: object) {
    return this.Get('/api/dashboard/defeat/detail', params);
  }

  // 车系
  seriesIds(params: object) {
    return this.Get('/api/dashboard/seriesIds', params);
  }

  // 获客tap
  opporOrder(params: object) {
    return this.Get('/api/dashboard/opporOrder', params);
  }

  // 留资tap
  tabLeads(params: object) {
    return this.Get('/api/dashboard/tab/leads', params);
  }

  // 成交tab
  delivery(params: object) {
    return this.Get('/api/dashboard/conversion/delivery', params);
  }

  funnel(params: object) {
    return this.Get('/api/dashboard/funnel', params);
  }

  leadsTrend(params: object) {
    return this.Get('/api/dashboard/leadstrend/ifonline', params);
  }

  //目标值
  aimsData(params: object) {
    return this.Get('/api/manual/search', params);
  }

}


















