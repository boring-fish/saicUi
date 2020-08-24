import { HttpRequest } from '../rest/rest.service';

export class DashboardApi extends HttpRequest {
  //系统时间及更新时间
  getTime() {
    const params = {};
    return this.Get('/api/dashboard/data/updatime', params);
  }
  // 获客地图
  getArea(params: object) {
    return this.Get('/api/dashboard/leadstrend/pcmap', params);
  }

  // 线上线下占比
  ifOnLine(params: object) {
    return this.Get('/api/dashboard/leadstrend/ifonline', params);
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
  
  // 大区code及名称关系查询接口
  getrfsBaseData(params: object) {
    return this.Get('/api/dashboard/rfsBaseData', {});
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
 //传播数据 传播页百度曝光量使用
 spreadData3(params: object) {
  return this.Get('/api/dashboard/spread3', params);
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
  
  // 曝光 兴趣tab
  spreadOnMonth(params: object) {
    return this.Get('/api/dashboard/conversion/spread', params);
  }

  // 留资tab
  tableadsOnMonth(params: object) {
    return this.Get('/api/dashboard/conversion/tableads', params);
  }

  // 获客tab
  opporOrderOnMonth(params: object) {
    return this.Get('/api/dashboard/conversion/opporOrder', params);
  }

  // 兴趣曝光kpi
  spreadKpi(params: object) {
    return this.Get('/api/dashboard/journalTarget', params);
  }

  // 兴趣曝光转化页kpi
  spreadKpiOnMonth(params: object) {
    return this.Get('/api/dashboard/conversion/journalTarget', params);
  }

  // 转化页kpi
  kpiSearchOnMonth(params: object) {
    return this.Get('/api/manual/search/time', params);
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
  //退出接口
  logout() {
    const params = {};
    return this.Get('/api/sys/logout' , params);
  }

  //查询预报警配置
  configuration(params: object) {
    const body = {};
    return this.Post('/api/warning/search' , body , params);
  }

  //战败挽回漏斗数据查询
  delfunnel() {
      let params = {};
      return this.Get('/api/dashboard/failRecover' , params);
  }

  //线索按来源分群数据查询
  getClue() {
    let params = {};
    return this.Get('/api/dashboard/userPortraitLabel' , params);
  }

  // 培育用户池阶段分布数据查询
  nurtureUsers() {
    let params = {};
    return this.Get('/api/dashboard/gradeStatus' , params);
  }

  //词云筛选条件查询
  inquireSelect(params: object) {
    return this.Get('/api/dashboard/defeatReasons/baseData', params);
  }

  // 词云数据查询
  getcloudData(params: object) {
    return this.Get('/api/dashboard/defeatReasons', params);

  }

  //标签调用情况
  getlabelData() {
    let params = {};
    return this.Get('/api/dashboard/portraitClustering' , params);
  }

}


















