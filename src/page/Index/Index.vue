<template>
  <div class="index-warp">
    <Container :options="{ width: 4096, height: 2160 }">
      <div class="view">
        <topBar 
          @onTopNavChange="onTopNavChange" 
          @openyj="openyj" 
          :brandId="brandId"
          :brandName="brandName"
          :time="time"
          @onSpecificationOpen="onSpecificationOpen"
          :dataList="dataList"
        />
        <div class="board">
          <SideNav
            :carType="carType"
            :area="area"
            :timeRange="timeRange"
            :checkedArea="checkedArea"
            :currentArea="currentArea"
            :filterTime="time"
            :filterBrandName="brandName"
            @onRuleChange="onRuleChange"
            @onAreaRadioChange="onAreaRadioChange"
          />
          <router-view
            :brandId="brandId"
            :brandName="brandName"
            :time="time"
            :checkedArea="checkedArea"
            :filterData="filterData"
            :series="series"
            :currentArea="currentArea"
            @onConversionPageMonthChange="onConversionPageMonthChange"
          />
        </div>
      </div>
      <EarlyWarn :changeDefeatedModal="changeDefeatedModal" @closeyj="closeyj" ></EarlyWarn>
      <TargetModal :visible="TargetModalflag" @onSpecificationClose="onSpecificationClose" ></TargetModal>
    </Container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SideNav, TopBar, Container, EarlyWarn, TargetModal } from '@/components/index';
import { calculation, areadataToMap, numberFormat, finishingRate, decideColor } from '@/utils/utils';
import _ from 'lodash';
import moment from 'moment';

enum RuleType {
  BRAND = 'brand',
  AREA = 'area',
  TIME = 'time',
  SERIES = 'series'
}

interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}
@Component({
  components: {
    TopBar,
    SideNav,
    Container,
    EarlyWarn,
    TargetModal
  }
})



export default class Index extends Vue {
  changeDefeatedModal: boolean = false;
  TargetModalflag: boolean = false;
  carType: any[] = [
    {
      brandId: '100',
      brandName: 'R标',
      admission: false
    },
    {
      brandId: '101',
      brandName: '荣威',
      admission: false
    },
    {
      brandId: '121',
      brandName: '名爵',
      admission: false
    }
  ];
  filterData: any = {
    brandId: $permission.getDefaultBrandId(),
    brandName: $permission.getDefaultBrandName(),
    timeKey: 'year',
    timeType: '当年',
    checkedArea: [],
    series: []
  };
  area: string[] = $commonData.areaData.getAreaMap();
  checkedArea: string[] = [];
  currentArea: any = {
    all: 'all'
  };
  ConversionDate: string = moment().format('YYYYMM');
  series: any[] = [];
  timeRange: TIMERANGE[] = [
    {
      key: 'year',
      type: '当年',
    },
    {
      key: 'threemonth',
      type: '近3个月',
    },
    {
      key: 'month',
      type: '当月',
    },
    {
      key: 'last_month',
      type: '上个月',
    },
    {
      key: 'week',
      type: '当周',
    },
    {
      key: 'day',
      type: '昨日',
    },
    {
      key: 'all',
      type: '历史累计',
    },
  ];
  brandId: any = $permission.getDefaultBrandId();
  brandName: any = $permission.getDefaultBrandName();
  time: TIMERANGE = {
    key: 'month',
    type: '当月',
  };
  dataList: any = {
    spread: {
      spreadImpModel: {
        value: '',
        tb: '',
        unit: '',
        hb: '',
        aims: '',
        finished: ''
      },
      spreadExposureModel: {
        value: '',
        tb: '',
        unit: '',
        hb: '',
        aims: '',
        finished: ''
      }
    },
    conversion: {
      createcard: {
        value: '',
        tb: '',
        unit: '',             
        hb: '',
        aims: '',
        finished: ''
      },
      deal: {
        value: '',
        tb: '',
        unit: '',
        hb: '',
        aims: '',
        finished: ''
      }
    },
    winguest: {
      Retention: {
        value: '',
        tb: '',
        unit: '',
        hb: '',
        aims: '',
        finished: ''
      },
      intention: {
        value: '',
        tb: '',
        unit: '',
        hb: '',
        aims: '',
        finished: ''
      }
    }
  };

  async resetRule() {
    this.brandName = $permission.getDefaultBrandName();
    this.brandId = $permission.getDefaultBrandId();
    this.time = {
      key: 'month',
      type: '当月',
    };
    let params = {
      brandId: $permission.getDefaultBrandId()
    };
    if (moment().format('YYYYMMDD') === moment().startOf('month').format('YYYYMMDD')) {
      this.ConversionDate = moment().subtract(1, 'months').format('YYYYMM');
    } else {
      this.ConversionDate = moment().format( 'YYYYMM' );
    }
    await $api.DashboardApi.areaData(params).then((data) => {
      $commonData.areaData.setAreaList(data);
      $commonData.areaData.setAreaMap(areadataToMap(data));
      this.area = areadataToMap(data);
    }).catch((err) => {

    });
    this.checkedArea = [];
    this.currentArea = {
      all: 'all'
    };
    this.initTopBar();
  }

  onConversionPageMonthChange(date: string) {
    this.ConversionDate = date;
    this.initTopBar();
  }

  onTopNavChange(type: string) {
    this.resetRule();
    this.$router.push(`/${type}`);    
  }

  // TODO 删除单个类型的rule
  onRuleChange(type: string, value: any, car?: any) {
    let filterRule: any = _.cloneDeep(this.filterData);
    if ( type === RuleType.BRAND ) {
      this.brandName = value.brandName;
      this.brandId = value.brandId;
      filterRule.brandName = value.brandName;
      filterRule.brandId = value.brandId;
      this.series = [];
      filterRule.series = [];
      this.currentArea = {
        all: 'all'
      };
      let params = {
        brandId: value.brandId
      };
      $api.DashboardApi.areaData(params).then((data) => {
        $commonData.areaData.setAreaList(data);
        $commonData.areaData.setAreaMap(areadataToMap(data));
        this.area = areadataToMap(data);
        let checkedItem: any = [];
        this.area.forEach((item: any) => {
          checkedItem.push(item['rfsCode']);
        });
        this.checkedArea = checkedItem;
        filterRule.checkedArea = checkedItem;
        this.filterData = filterRule;
        this.initTopBar();
      }).catch((err) => {

      });
    } else if ( type === RuleType.TIME ) {
      this.time = value;
      filterRule.timeKey = value.key;
      filterRule.timeType = value.type;
      this.filterData = filterRule;
      this.initTopBar();
    } else if ( type === RuleType.SERIES ) {
      this.series = value;
      filterRule.series = value;
      this.filterData = filterRule;
      if ( this.brandId !== car.brandId ) {
        let params = {
          brandId: car.brandId
        };
        this.brandName = car.brandName;
        this.brandId = car.brandId;
        filterRule.brandName = car.brandName;
        filterRule.brandId = car.brandId;
        $api.DashboardApi.areaData(params).then((data) => {
          $commonData.areaData.setAreaList(data);
          $commonData.areaData.setAreaMap(areadataToMap(data));
          this.area = areadataToMap(data);
          let checkedItem: any = [];
          this.area.forEach((item: any) => {
            checkedItem.push(item['rfsCode']);
          });
          this.checkedArea = checkedItem;
          filterRule.checkedArea = checkedItem;
          this.filterData = filterRule;
          this.initTopBar();
        }).catch((err) => {

        });
      } else {
        this.initTopBar();
      }
    } else {
      this.checkedArea = value;
      filterRule.checkedArea = value;
      this.filterData = filterRule;
      this.initTopBar();
    }
  }

  onAreaRadioChange(value: object) {
    this.currentArea = value;
    this.initTopBar();
  }

  created() {
    let roles = $permission.getRoles();
    if ( roles.isAdministrator ) {
      this.carType.forEach((v) => {
        v['admission'] = true;
      });
    } else {
      this.carType[0]['admission'] = roles.isRAdmin ? true : false;
      this.carType[1]['admission'] = roles.isRWAdmin ? true : false;
      this.carType[2]['admission'] = roles.isMGAdmin ? true : false;
    }
    if (moment().format('YYYYMMDD') === moment().startOf('month').format('YYYYMMDD')) {
      this.ConversionDate = moment().subtract(1, 'months').format('YYYYMM');
    } else {
      this.ConversionDate = moment().format( 'YYYYMM' );
    }
    this.initTopBar();
  }


  initTopBar() {
    let params: any = {
      brandId: this.brandId,
      type: this.time.key,
      rfsCodes: this.checkedArea.toString()
    };
    let kpiParams: any = {
      type: '',
      timeType: this.time.key,
      brandId: this.brandId,
      rfsCodes: this.checkedArea.toString(),
      seriesIds: this.series.toString(),
      bizModuleName: true
    };
    if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
      delete params.rfsCodes;
      delete kpiParams.rfsCodes;
    }
    if (this.$route.name === 'dashboard') {
      params['seriesIds'] = this.series.toString();
      this.initSpreadData(params);
      this.initWinGuestData(params, kpiParams);
      this.initConversionData(params, kpiParams);
      this.initToshopData(params, kpiParams);
    }
    if ( this.$route.name === 'spread' || this.$route.name === 'visitors') {
      delete params.rfsCodes;
      let noKpi = false;
      if (Object.keys(this.currentArea)[0] !== 'all') {
        if ( Object.keys(this.currentArea)[0] === 'macCode' ) {
          noKpi = true;
          params['macCodes'] = this.currentArea.macCode;
        } else {
          kpiParams.rfsCodes = this.currentArea.rfsCode;
          params['rfsCodes'] = this.currentArea.rfsCode;
        }
      }
      this.initSpreadData2(params, noKpi);
      this.initWinGuestData(params, kpiParams, noKpi);
      this.initConversionData(params, kpiParams, noKpi);
      this.initToshopData(params, kpiParams, noKpi);
    }
    if ( this.$route.name === 'ChannelConversion' || this.$route.name === 'TurnoverDefeate') {
      delete params.type;
      delete params.rfsCodes;
      delete kpiParams.timeType;
      delete kpiParams.rfsCodes;
      delete kpiParams.seriesIds;
      kpiParams['time'] = this.ConversionDate;
      let noKpi = false;
      if (Object.keys(this.currentArea)[0] !== 'all') {
        if ( Object.keys(this.currentArea)[0] === 'macCode' ) {
          noKpi = true;
        } else {
          kpiParams.rfsCodes = this.currentArea.rfsCode;
        }
        params = Object.assign(params, this.currentArea);
      }
      params['time'] = this.ConversionDate;
      this.initSpreadDataOnMonth(params, noKpi);
      this.initWinGuestDataOnMonth(params, kpiParams, noKpi);
      this.initConversionDataOnMonth(params, kpiParams, noKpi);
      this.initToshopDataOnMonth(params, kpiParams, noKpi);
    }
  }

  // exposure 总访客量 imp 曝光量
  async initSpreadData(params: object) {
    let kpiParams = {
      type: this.time.key,
      brandId: this.brandId,
      rfsCodes: this.checkedArea.toString(),
      seriesIds: this.series.toString(),
    };
    if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
      delete kpiParams.rfsCodes;
    }
    let spreadKpi = await $api.DashboardApi.spreadKpi(kpiParams);
    let impKpi: any;
    let exposureKpi: any;
    if (spreadKpi.now[0]) {
      impKpi = Number(spreadKpi.now[0].imp);
      impKpi = Math.round(impKpi);
      exposureKpi = Number(spreadKpi.now[0].click);
      exposureKpi = Math.round(exposureKpi);
    } else {
      impKpi = '';
      exposureKpi = '';
    }

    let exposureWarning = await $api.DashboardApi.configuration({module: '曝光'});
    const exposurecolor = exposureWarning.datas[0];

    let exposureinterest = await $api.DashboardApi.configuration({module: '兴趣'});
    const interestcolor = exposureinterest.datas[0];
    console.log(exposurecolor , '曝光配置');
    
    
    $api.DashboardApi.spreadData(params).then((res) => {
      this.dataList.spread.spreadImpModel = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'imp', impKpi);
      this.dataList.spread.spreadExposureModel = this.buildVisitorsModel(res.now[0], res.lsatYear[0], res.last[0], exposureKpi);

      if (exposurecolor) {
      this.dataList.spread.spreadImpModel.tbColor = decideColor( this.dataList.spread.spreadImpModel.tb , exposurecolor.lastAlarmCycle , exposurecolor.lastEarlyWarCycle , exposurecolor.lastAlarmCycleSymbol);
      this.dataList.spread.spreadImpModel.hbColor = decideColor( this.dataList.spread.spreadImpModel.hb, exposurecolor.ringAlarmCycle , exposurecolor.ringEarlyWarCycle, exposurecolor.ringAlarmCycleSymbol);
      this.dataList.spread.spreadImpModel.aimColor = decideColor( this.dataList.spread.spreadImpModel.finished, exposurecolor.kpiAlarmCycle , exposurecolor.kpiEarlyWarCycle , exposurecolor.kpiAlarmCycleSymbol);
      
      }

      if (interestcolor) {
      this.dataList.spread.spreadExposureModel.tbColor = decideColor( this.dataList.spread.spreadExposureModel.tb , interestcolor.lastAlarmCycle , interestcolor.lastEarlyWarCycle, interestcolor.lastAlarmCycleSymbol);
      this.dataList.spread.spreadExposureModel.hbColor = decideColor( this.dataList.spread.spreadExposureModel.hb, interestcolor.ringAlarmCycle , interestcolor.ringEarlyWarCycle, interestcolor.ringAlarmCycleSymbol);
      this.dataList.spread.spreadExposureModel.aimColor = decideColor( this.dataList.spread.spreadExposureModel.finished, interestcolor.kpiAlarmCycle , interestcolor.kpiEarlyWarCycle, interestcolor.kpiAlarmCycleSymbol);

      }
      // console.log(this.dataList.spread.spreadImpModel , this.dataList.spread.spreadExposureModel  , '谁的数据');
      // console.log(this.dataList.spread.spreadImpModel, '曝光color');
      
      
    }).catch((err) => {
      this.dataList.spread.spreadImpModel = {};
      this.dataList.spread.spreadExposureModel = {};
    });
  }

  async initSpreadData2(params: any, noKpi: boolean) {
    let kpiParams: any = {
      type: this.time.key,
      brandId: this.brandId
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      if ( Object.keys(this.currentArea)[0] !== 'macCode' ) {
        kpiParams.rfsCodes = this.currentArea.rfsCode;
      }
    }
    let impKpi: any;
    let exposureKpi: any;
    if ( noKpi ) {
      impKpi = '';
      exposureKpi = '';
    } else {
      let spreadKpi = await $api.DashboardApi.spreadKpi(kpiParams);
      if (spreadKpi.now[0]) {
        impKpi = Number(spreadKpi.now[0].imp);
        impKpi = Math.round(impKpi);
        exposureKpi = Number(spreadKpi.now[0].click);
        exposureKpi = Math.round(exposureKpi);
      } else {
        impKpi = '';
        exposureKpi = '';
      }
    }
    let exposureWarning = await $api.DashboardApi.configuration({module: '曝光'});
    const exposurecolor = exposureWarning.datas[0];

    let exposureinterest = await $api.DashboardApi.configuration({module: '兴趣'});
    const interestcolor = exposureinterest.datas[0];
    $api.DashboardApi.spreadData2(params).then((res) => {
      this.dataList.spread.spreadImpModel = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'imp', impKpi);
      this.dataList.spread.spreadExposureModel = this.buildVisitorsModel(res.now[0], res.lsatYear[0], res.last[0], exposureKpi);

      if (exposurecolor) {
      this.dataList.spread.spreadImpModel.tbColor = decideColor( this.dataList.spread.spreadImpModel.tb , exposurecolor.lastAlarmCycle , exposurecolor.lastEarlyWarCycle, exposurecolor.lastAlarmCycleSymbol);
      this.dataList.spread.spreadImpModel.hbColor = decideColor( this.dataList.spread.spreadImpModel.hb, exposurecolor.ringAlarmCycle , exposurecolor.ringEarlyWarCycle, exposurecolor.ringAlarmCycleSymbol);
      this.dataList.spread.spreadImpModel.aimColor = decideColor( this.dataList.spread.spreadImpModel.finished, exposurecolor.kpiAlarmCycle , exposurecolor.kpiEarlyWarCycle, exposurecolor.kpiAlarmCycleSymbol);
      }

      if (interestcolor) {
      this.dataList.spread.spreadExposureModel.tbColor = decideColor( this.dataList.spread.spreadExposureModel.tb , interestcolor.lastAlarmCycle , interestcolor.lastEarlyWarCycle, interestcolor.lastAlarmCycleSymbol);
      this.dataList.spread.spreadExposureModel.hbColor = decideColor( this.dataList.spread.spreadExposureModel.hb, interestcolor.ringAlarmCycle , interestcolor.ringEarlyWarCycle, interestcolor.ringAlarmCycleSymbol);
      this.dataList.spread.spreadExposureModel.aimColor = decideColor( this.dataList.spread.spreadExposureModel.finished, interestcolor.kpiAlarmCycle , interestcolor.kpiEarlyWarCycle, interestcolor.kpiAlarmCycleSymbol);

      }
      
    }).catch((err) => {
      this.dataList.spread.spreadImpModel = {};
      this.dataList.spread.spreadExposureModel = {};
    });
  }

  async initSpreadDataOnMonth(query: any, noKpi: boolean) {
    let impKpi: any;
    let exposureKpi: any;
    if ( noKpi ) {
      impKpi = '';
      exposureKpi = '';
    } else {
      let spreadKpi = await $api.DashboardApi.spreadKpiOnMonth(query);
      if (spreadKpi.now[0]) {
        impKpi = Number(spreadKpi.now[0].imp);
        impKpi = Math.round(impKpi);
        exposureKpi = Number(spreadKpi.now[0].click);
        exposureKpi = Math.round(exposureKpi);
      } else {
        impKpi = '';
        exposureKpi = '';
      }
    }
    let exposureWarning = await $api.DashboardApi.configuration({module: '曝光'});
    const exposurecolor = exposureWarning.datas[0];

    let exposureinterest = await $api.DashboardApi.configuration({module: '兴趣'});
    const interestcolor = exposureinterest.datas[0];

    $api.DashboardApi.spreadOnMonth(query).then((res) => {
      this.dataList.spread.spreadImpModel = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'imp', impKpi);
      this.dataList.spread.spreadExposureModel = this.buildVisitorsModel(res.now[0], res.lsatYear[0], res.last[0], exposureKpi);
      if (exposurecolor) {
      this.dataList.spread.spreadImpModel.tbColor = decideColor( this.dataList.spread.spreadImpModel.tb , exposurecolor.lastAlarmCycle , exposurecolor.lastEarlyWarCycle, exposurecolor.lastAlarmCycleSymbol);
      this.dataList.spread.spreadImpModel.hbColor = decideColor( this.dataList.spread.spreadImpModel.hb, exposurecolor.ringAlarmCycle , exposurecolor.ringEarlyWarCycle, exposurecolor.ringAlarmCycleSymbol);
      this.dataList.spread.spreadImpModel.aimColor = decideColor( this.dataList.spread.spreadImpModel.finished, exposurecolor.kpiAlarmCycle , exposurecolor.kpiEarlyWarCycle, exposurecolor.kpiAlarmCycleSymbol);
      }
      if (interestcolor) {
      this.dataList.spread.spreadExposureModel.tbColor = decideColor( this.dataList.spread.spreadExposureModel.tb , interestcolor.lastAlarmCycle , interestcolor.lastEarlyWarCycle, interestcolor.lastAlarmCycleSymbol);
      this.dataList.spread.spreadExposureModel.hbColor = decideColor( this.dataList.spread.spreadExposureModel.hb, interestcolor.ringAlarmCycle , interestcolor.ringEarlyWarCycle, interestcolor.ringAlarmCycleSymbol);
      this.dataList.spread.spreadExposureModel.aimColor = decideColor( this.dataList.spread.spreadExposureModel.finished, interestcolor.kpiAlarmCycle , interestcolor.kpiEarlyWarCycle, interestcolor.kpiAlarmCycleSymbol);

      }

    }).catch((err) => {
      this.dataList.spread.spreadImpModel = {};
      this.dataList.spread.spreadExposureModel = {};
    });
  }

  async initWinGuestData(params: object, kpiParams: any, noKpi: boolean = false) {
    let intentionKpiquery = _.cloneDeep(kpiParams);
    let leadsKpiquery = _.cloneDeep(kpiParams);
    intentionKpiquery.type = '意向';
    leadsKpiquery.type = '线索';
    let intentionKpi: any;
    let leadsKpi: any;
    if ( noKpi ) {
      intentionKpi = '';
      leadsKpi = '';
    } else {
      const intentionKpiData = await $api.DashboardApi.aimsData(intentionKpiquery);
      if (intentionKpiData.now[0]) {
        let intentionKpiTemp = _.sumBy(intentionKpiData.now, (kpi: any) => {
          return Number(kpi.kpi);
        });
        intentionKpi = Number(intentionKpiTemp);
        intentionKpi = Math.round(intentionKpi);
      } else {
        intentionKpi = '';
      }

      const leadsKpiData = await $api.DashboardApi.aimsData(leadsKpiquery);
      if (leadsKpiData.now[0]) {
        let leadsKpiTemp = _.sumBy(leadsKpiData.now, (kpi: any) => {
          return Number(kpi.kpi);
        });
        leadsKpi = Number(leadsKpiTemp);
        leadsKpi = Math.round(leadsKpi);
      } else {
        leadsKpi = '';
      }
    }

    
    let exposureintention = await $api.DashboardApi.configuration({module: '意向'});
    const intentioncolor = exposureintention.datas[0];

    let exposureRetention = await $api.DashboardApi.configuration({module: '线索'});
    const retentioncolor = exposureRetention.datas[0];
    console.log(retentioncolor , '线索配置');
    

    $api.DashboardApi.opporOrder(params).then((res) => {
      this.dataList.winguest.intention = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'opporNum', intentionKpi);

      if (intentioncolor) {
      this.dataList.winguest.intention.tbColor = decideColor( this.dataList.winguest.intention.tb , intentioncolor.lastAlarmCycle , intentioncolor.lastEarlyWarCycle, intentioncolor.lastAlarmCycleSymbol);
      this.dataList.winguest.intention.hbColor = decideColor( this.dataList.winguest.intention.hb, intentioncolor.ringAlarmCycle , intentioncolor.ringEarlyWarCycle, intentioncolor.ringAlarmCycleSymbol);
      this.dataList.winguest.intention.aimColor = decideColor( this.dataList.winguest.intention.finished, intentioncolor.kpiAlarmCycle , intentioncolor.kpiEarlyWarCycle, intentioncolor.kpiAlarmCycleSymbol);
      }
    }).catch((err) => {
      this.dataList.winguest.intention = {};
    });
    $api.DashboardApi.tabLeads(params).then((res) => {
      this.dataList.winguest.Retention = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'leadsNum', leadsKpi);
      if (retentioncolor) {
      this.dataList.winguest.Retention.tbColor = decideColor(  this.dataList.winguest.Retention.tb , retentioncolor.lastAlarmCycle , retentioncolor.lastEarlyWarCycle, retentioncolor.lastAlarmCycleSymbol);
      this.dataList.winguest.Retention.hbColor = decideColor(  this.dataList.winguest.Retention.hb, retentioncolor.ringAlarmCycle , retentioncolor.ringEarlyWarCycle, retentioncolor.ringAlarmCycleSymbol);
      this.dataList.winguest.Retention.aimColor = decideColor(  this.dataList.winguest.Retention.finished, retentioncolor.kpiAlarmCycle , retentioncolor.kpiEarlyWarCycle, retentioncolor.kpiAlarmCycleSymbol);
      }
    }).catch((err) => {
      this.dataList.winguest.Retention = {};
    });
  }

  async initWinGuestDataOnMonth(query: any, kpiParams: any, noKpi: boolean = false) {
    let intentionKpiquery = _.cloneDeep(kpiParams);
    let leadsKpiquery = _.cloneDeep(kpiParams);
    intentionKpiquery.type = '意向';
    leadsKpiquery.type = '线索';
    let intentionKpi: any;
    let leadsKpi: any;
    if ( noKpi ) {
      intentionKpi = '';
      leadsKpi = '';
    } else {
      const intentionKpiData = await $api.DashboardApi.kpiSearchOnMonth(intentionKpiquery);
      if (intentionKpiData.now[0]) {
        let intentionKpiTemp = _.sumBy(intentionKpiData.now, (kpi: any) => {
          return Number(kpi.kpi);
        });
        intentionKpi = Number(intentionKpiTemp);
        intentionKpi = Math.round(intentionKpi);
      } else {
        intentionKpi = '';
      }

      const leadsKpiData = await $api.DashboardApi.kpiSearchOnMonth(leadsKpiquery);
      if (leadsKpiData.now[0]) {
        let leadsKpiTemp = _.sumBy(leadsKpiData.now, (kpi: any) => {
          return Number(kpi.kpi);
        });
        leadsKpi = Number(leadsKpiTemp);
        leadsKpi = Math.round(leadsKpi);
      } else {
        leadsKpi = '';
      }
    }

    let exposureintention = await $api.DashboardApi.configuration({module: '意向'});
    const intentioncolor = exposureintention.datas[0];

    let exposureRetention = await $api.DashboardApi.configuration({module: '线索'});
    const retentioncolor = exposureRetention.datas[0];

    $api.DashboardApi.opporOrderOnMonth(query).then((res) => {
      this.dataList.winguest.intention = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'opporNum', intentionKpi);
        if (intentioncolor) {
      this.dataList.winguest.intention.tbColor = decideColor( this.dataList.winguest.intention.tb , intentioncolor.lastAlarmCycle , intentioncolor.lastEarlyWarCycle, intentioncolor.lastAlarmCycleSymbol);
      this.dataList.winguest.intention.hbColor = decideColor( this.dataList.winguest.intention.hb, intentioncolor.ringAlarmCycle , intentioncolor.ringEarlyWarCycle, intentioncolor.ringAlarmCycleSymbol);
      this.dataList.winguest.intention.aimColor = decideColor( this.dataList.winguest.intention.finished, intentioncolor.kpiAlarmCycle , intentioncolor.kpiEarlyWarCycle, intentioncolor.kpiAlarmCycleSymbol);
        }

    }).catch((err) => {
      this.dataList.winguest.intention = {};
    });
    $api.DashboardApi.tableadsOnMonth(query).then((res) => {
      this.dataList.winguest.Retention = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'leadsNum', leadsKpi);
       
       if (retentioncolor) {
       this.dataList.winguest.Retention.tbColor = decideColor(  this.dataList.winguest.Retention.tb , retentioncolor.lastAlarmCycle , retentioncolor.lastEarlyWarCycle, retentioncolor.lastAlarmCycleSymbol);
       this.dataList.winguest.Retention.hbColor = decideColor(  this.dataList.winguest.Retention.hb, retentioncolor.ringAlarmCycle , retentioncolor.ringEarlyWarCycle, retentioncolor.ringAlarmCycleSymbol);
       this.dataList.winguest.Retention.aimColor = decideColor(  this.dataList.winguest.Retention.finished, retentioncolor.kpiAlarmCycle , retentioncolor.kpiEarlyWarCycle, retentioncolor.kpiAlarmCycleSymbol);
       }

    }).catch((err) => {
      this.dataList.winguest.Retention = {};
    });
  }

  async initConversionData(params: object, kpiParams: any, noKpi: boolean = false) {
    let kpiquery = _.cloneDeep(kpiParams);
    kpiquery.type = '成交';
    delete kpiquery.bizModuleName;
    let kpi: any;
    if ( noKpi ) {
      kpi = '';
    } else {
      const kpiData = await $api.DashboardApi.aimsData(kpiquery);
      if (kpiData.now[0]) {
        kpi = Number(kpiData.now[0].kpi);
        kpi = Math.round(kpi);
      } else {
        kpi = '';
      }
    }    

    let returnValue = await $api.DashboardApi.configuration({module: '成交'});
    const actualData = returnValue.datas[0];
    $api.DashboardApi.AlldealData(params).then((res) => {
      this.dataList.conversion.deal = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'num', kpi);
    if (actualData) {
     this.dataList.conversion.deal.tbColor = decideColor(this.dataList.conversion.deal.tb , actualData.lastAlarmCycle , actualData.lastEarlyWarCycle, actualData.lastAlarmCycleSymbol);
     this.dataList.conversion.deal.hbColor = decideColor(this.dataList.conversion.deal.hb, actualData.ringAlarmCycle , actualData.ringEarlyWarCycle, actualData.ringAlarmCycleSymbol);
     this.dataList.conversion.deal.aimColor = decideColor(this.dataList.conversion.deal.finished, actualData.kpiAlarmCycle , actualData.kpiEarlyWarCycle, actualData.kpiAlarmCycleSymbol);
      }
    }).catch((err) => {
      this.dataList.conversion.deal = {};
    });
  }

  async initToshopData(params: object, kpiParams: any, noKpi: boolean = false) {
    let kpiquery = _.cloneDeep(kpiParams);
    kpiquery.type = '客流';
    delete kpiquery.bizModuleName;
    let kpi: any;
    if ( noKpi ) {
      kpi = '';
    } else {
      const kpiData = await $api.DashboardApi.aimsData(kpiquery);
      if (kpiData.now[0]) {
        kpi = Number(kpiData.now[0].kpi);
        kpi = Math.round(kpi);
      } else {
        kpi = '';
      }
    }
    let returnValue = await $api.DashboardApi.configuration({module: '到店'});
    const actualData = returnValue.datas[0];
    $api.DashboardApi.ToshopData(params).then((res) => {
      this.dataList.conversion.createcard = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'visitsNums', kpi);

      if (actualData) {
      this.dataList.conversion.createcard.tbColor = decideColor( this.dataList.conversion.createcard.tb , actualData.lastAlarmCycle , actualData.lastEarlyWarCycle, actualData.lastAlarmCycleSymbol);
      this.dataList.conversion.createcard.hbColor = decideColor( this.dataList.conversion.createcard.hb, actualData.ringAlarmCycle , actualData.ringEarlyWarCycle, actualData.ringAlarmCycleSymbol);
      this.dataList.conversion.createcard.aimColor = decideColor( this.dataList.conversion.createcard.finished, actualData.kpiAlarmCycle , actualData.kpiEarlyWarCycle, actualData.kpiAlarmCycleSymbol);
      }
      // console.log(this.dataList.conversion.createcard , '???');
      
    }).catch((err) => {
      this.dataList.conversion.createcard = {};
    });
  }

  async initConversionDataOnMonth(query: any, kpiParams: any, noKpi: boolean) {
    let kpiquery = _.cloneDeep(kpiParams);
    kpiquery.type = '成交';
    delete kpiquery.bizModuleName;
    let kpi: any;
    if ( noKpi ) {
      kpi = '';
    } else {
      const kpiData = await $api.DashboardApi.kpiSearchOnMonth(kpiquery);
      if (kpiData.now[0]) {
        kpi = Number(kpiData.now[0].kpi);
        kpi = Math.round(kpi);
      } else {
        kpi = '';
      }
    }   
    
    let returnValue = await $api.DashboardApi.configuration({module: '成交'});
    const actualData = returnValue.datas[0];
    $api.DashboardApi.delivery(query).then((res) => {
      this.dataList.conversion.deal = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'num', kpi);

      if (actualData) {
     this.dataList.conversion.deal.tbColor = decideColor(this.dataList.conversion.deal.tb , actualData.lastAlarmCycle , actualData.lastEarlyWarCycle, actualData.lastAlarmCycleSymbol);
     this.dataList.conversion.deal.hbColor = decideColor(this.dataList.conversion.deal.hb, actualData.ringAlarmCycle , actualData.ringEarlyWarCycle, actualData.ringAlarmCycleSymbol);
     this.dataList.conversion.deal.aimColor = decideColor(this.dataList.conversion.deal.finished, actualData.kpiAlarmCycle , actualData.kpiEarlyWarCycle, actualData.kpiAlarmCycleSymbol);
      }
    }).catch((err) => {
      this.dataList.conversion.deal = {};
    });
  }

  async initToshopDataOnMonth(query: any, kpiParams: any, noKpi: boolean) {
    let kpiquery = _.cloneDeep(kpiParams);
    kpiquery.type = '客流';
    delete kpiquery.bizModuleName;
    let kpi: any;
    if ( noKpi ) {
      kpi = '';
    } else {
      const kpiData = await $api.DashboardApi.kpiSearchOnMonth(kpiquery);
      if (kpiData.now[0]) {
        kpi = Number(kpiData.now[0].kpi);
        kpi = Math.round(kpi);
      } else {
        kpi = '';
      }
    }

    let returnValue = await $api.DashboardApi.configuration({module: '到店'});
    const actualData = returnValue.datas[0];

    $api.DashboardApi.ToshopDataInConversion(query).then((res) => {
      this.dataList.conversion.createcard = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'visitsNums', kpi);
      if (actualData) {
      this.dataList.conversion.createcard.tbColor = decideColor( this.dataList.conversion.createcard.tb , actualData.lastAlarmCycle , actualData.lastEarlyWarCycle, actualData.lastAlarmCycleSymbol);
      this.dataList.conversion.createcard.hbColor = decideColor( this.dataList.conversion.createcard.hb, actualData.ringAlarmCycle , actualData.ringEarlyWarCycle, actualData.ringAlarmCycleSymbol);
      this.dataList.conversion.createcard.aimColor = decideColor( this.dataList.conversion.createcard.finished, actualData.kpiAlarmCycle , actualData.kpiEarlyWarCycle, actualData.kpiAlarmCycleSymbol);
      }
    }).catch((err) => {
      this.dataList.conversion.createcard = {};
    });
  }

  buildVisitorsModel(now: any , old: any , last: any, exposureKpi?: any) {
    let publics = {
        value: '',
        unit: '',
        tb: '',
        hb: '',
        aims: '',
        finished: '',
        tbColor: 0,
        hbColor: 0,
        aimColor: 0
    };
    if (exposureKpi) {
      let kpiUnit = numberFormat(exposureKpi);
      publics.aims = `${kpiUnit.value}${kpiUnit.unit}`;
    }
    if (!now) {
      if (exposureKpi) {
        publics.finished = '0%';
      }
      return publics;
    } else {
      let nowVisitors = now.newVisitors + now.oldVisitors;
      let params = numberFormat(nowVisitors);
      if (exposureKpi) {
        publics.finished = finishingRate(nowVisitors, exposureKpi);
      }
      publics.value = params.value;
      publics.unit = params.unit;
    }

    if (!old) {
      publics.tb = '';
    } else {
      let nowVisitors = now.newVisitors + now.oldVisitors;
      let oldVisitors = old.newVisitors + old.oldVisitors;
      publics.tb = calculation(nowVisitors, oldVisitors);
    } 

    if (!last) {
       publics.hb = '';
    } else {
      let nowVisitors = now.newVisitors + now.oldVisitors;
      let lastVisitors = last.newVisitors + last.oldVisitors;
        if (this.time.key === 'year') {
          publics.hb = publics.tb = calculation(nowVisitors , lastVisitors);
        }  else if (this.time.key === 'all') {
          publics.hb = publics.tb = '';
        }
        else {
        publics.hb = calculation(nowVisitors, lastVisitors);
        }
    }
    return publics;
  }

  sumLeadsNum(res: any) {
    if ( res.now[0] ) {
      res.now[0].leadsNum = _.sumBy(res.now, (o: any) => {
        return o.leadsNum;
      });
    }
    if ( res.lsatYear[0] ) {
      res.lsatYear[0].leadsNum = _.sumBy(res.lsatYear, (o: any) => {
        return o.leadsNum;
      });
    }
    if ( res.last[0] ) {
      res.last[0].leadsNum = _.sumBy(res.last, (o: any) => {
        return o.leadsNum;
      });
    }
    return res;
  }

  buildTopBarModel(now: any, old: any, last: any, key: any, kpi?: any) {
    let publics = {
      value: '',
      unit: '',
      tb: '',
      hb: '',
      aims: '',
      finished: '',
      tbColor: 0,
      hbColor: 0,
      aimColor: 0
    };
    if (kpi) {
      let kpiUnit = numberFormat(kpi);
      publics.aims = `${kpiUnit.value}${kpiUnit.unit}`;
    }
    if (!now) {
      if (kpi) {
        publics.finished = '0%';
      }
      return publics;
    } else {
      let params = numberFormat(now[key]);
      if (kpi) {
        publics.finished = finishingRate(now[key], kpi);
      }
      publics.value = params.value;
      publics.unit = params.unit;
    }

    if (!old) {
      publics.tb = '';
    } else {
      publics.tb = calculation(now[key], old[key]);
    } 

    if (!last) {
      publics.hb = '';
    } else {
      if (this.time.key === 'year') {
         publics.hb = publics.tb = calculation(now[key], last[key]);
      } else if (this.time.key === 'all') {
        publics.hb = publics.tb = ''; 
      } else {
        publics.hb = calculation(now[key], last[key]);
      }
    }
    return publics;
  }

  onSpecificationOpen() {
    this.TargetModalflag = true;
  }

  onSpecificationClose() {
    this.TargetModalflag = false;
  }

  openyj() {
    this.changeDefeatedModal = true;
  }

  closeyj() {
    this.changeDefeatedModal = false;
  }

  // handleIndex(val: any) {
  //   this.areaCode = val;
  //   // console.log(val);
  // }

}
</script>

<style lang="scss">
.index-warp {
  width: 100%;
  height: 100%;
  background: #090C15;
  .view{
    background: url('../../assets/img/bg-img@2x.png') no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    .board {
      display: flex;
      width: 100%;
      height: calc(100% - 430px);
      padding: 20px 0 40px 40px;
    }
  }
}
</style>
