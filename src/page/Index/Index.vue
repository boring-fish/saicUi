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
      <EarlyWarn :changeDefeatedModal="changeDefeatedModal" @closeyj="closeyj"></EarlyWarn>
      <TargetModal :visible="TargetModalflag" @onSpecificationClose="onSpecificationClose" ></TargetModal>
    </Container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SideNav, TopBar, Container, EarlyWarn, TargetModal } from '@/components/index';
import { calculation, areadataToMap } from '@/utils/utils';
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
  carType: object[] = [
    {
      brandId: '100',
      brandName: 'R标'
    },
    {
      brandId: '101',
      brandName: '荣威'
    },
    {
      brandId: '121',
      brandName: '名爵'
    }
  ];
  filterData: any = {
    brandId: 121,
    brandName: '名爵',
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
  brandId: number = 121;
  brandName: string = '名爵';
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
    this.brandName = '名爵';
    this.brandId = 121;
    this.time = {
      key: 'month',
      type: '当月',
    };
    let params = {
      brandId: 121
    };
    this.ConversionDate = moment().format('YYYYMM');
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
  }

  onConversionPageMonthChange(date: string) {
    this.ConversionDate = date;
    this.reloadTopBar();
  }

  onTopNavChange(type: string) {
    this.$router.push(`/${type}`);
    this.resetRule();
    this.reloadTopBar();
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
        this.reloadTopBar();
      }).catch((err) => {

      });
    } else if ( type === RuleType.TIME ) {
      this.time = value;
      filterRule.timeKey = value.key;
      filterRule.timeType = value.type;
      this.filterData = filterRule;
      this.reloadTopBar();
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
          this.reloadTopBar();
        }).catch((err) => {

        });
      } else {
        this.reloadTopBar();
      }
    } else {
      this.checkedArea = value;
      filterRule.checkedArea = value;
      this.filterData = filterRule;
      this.reloadTopBar();
    }
  }

  onAreaRadioChange(value: object) {
    this.currentArea = value;
    this.reloadTopBar();
  }

  created() {
    this.initTopBar();
  }

  numberFormat(value: any) {
    let param: any = {};
    let k = 10000,
        sizes = ['' , '万', '亿', '万亿'],
        i;
    if (value < k) {
      param.value = value;
      param.unit = '';
    } else {
      i = Math.floor(Math.log(value) / Math.log(k)); 
      param.value = ((value / Math.pow(k, i))).toFixed(2);
      param.unit = sizes[i];
    }
    param.value = isNaN(param.value) ? '' : param.value;
    return param;
  }

  initTopBar() {
    let params: any = {
      brandId: this.brandId,
      type: this.time.key,
      rfsCodes: this.checkedArea.toString()
    };
    if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
      delete params.rfsCodes;
    }
    if (this.$route.name === 'dashboard') {
      this.initSpreadData(params);
      this.initWinGuestData(params);
      this.initConversionData(params);
      this.initToshopData(params);
    }
    if ( this.$route.name === 'spread' ) {
      this.initSpreadData2(params);
      this.initWinGuestData(params);
      this.initConversionData(params);
      this.initToshopData(params);
    }
    if ( this.$route.name === 'visitors' ) {
      this.initSpreadData(params);
      this.initWinGuestDataOnVisitorsPage(params);
      this.initConversionData(params);
      this.initToshopData(params);
    }
    if ( this.$route.name === 'ChannelConversion' || this.$route.name === 'TurnoverDefeate') {
      this.initSpreadData(params);
      this.initWinGuestData(params);
      this.initConversionDataOnMonth(params);
      this.initToshopDataOnMonth(params);
    }
  }

  reloadTopBar() {
    let params: any = {
      brandId: this.brandId,
      type: this.time.key,
      rfsCodes: this.checkedArea.toString()
    };
    if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
      delete params.rfsCodes;
    }
    if (this.$route.name === 'dashboard') {
      params['seriesIds'] = this.series.toString();
      this.initSpreadData(params);
      this.initWinGuestData(params);
      this.initConversionData(params);
      this.initToshopData(params);
    }
    if ( this.$route.name === 'spread' ) {
      this.initSpreadData2(params);
    }
    if ( this.$route.name === 'visitors' ) {
      this.initWinGuestDataOnVisitorsPage(params);
    }
    if ( this.$route.name === 'ChannelConversion' || this.$route.name === 'TurnoverDefeate') {
      this.initConversionDataOnMonth(params);
      this.initToshopDataOnMonth(params);
    }
  }

  // exposure 总访客量 imp 曝光量
  initSpreadData(params: object) {
    $api.DashboardApi.spreadData(params).then((res) => {
      this.dataList.spread.spreadImpModel = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'imp');
      this.dataList.spread.spreadExposureModel = this.buildVisitorsModel(res.now[0], res.lsatYear[0], res.last[0]);
    }).catch((err) => {
      this.dataList.spread.spreadImpModel = {};
      this.dataList.spread.spreadExposureModel = {};
    });
  }

  initSpreadData2(params: any) {
    delete params.rfsCodes;
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.spreadData2(params).then((res) => {
      this.dataList.spread.spreadImpModel = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'imp');
      this.dataList.spread.spreadExposureModel = this.buildVisitorsModel(res.now[0], res.lsatYear[0], res.last[0]);
    }).catch((err) => {
      this.dataList.spread.spreadImpModel = {};
      this.dataList.spread.spreadExposureModel = {};
    });
  }

  initWinGuestData(params: object) {
    $api.DashboardApi.opporOrder(params).then((res) => {
      this.dataList.winguest.intention = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'opporNum');
    }).catch((err) => {
      this.dataList.winguest.intention = {};
    });
    $api.DashboardApi.tabLeads(params).then((res) => {
      this.dataList.winguest.Retention = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'leadsNum');
    }).catch((err) => {
      this.dataList.winguest.Retention = {};
    });
  }

  initWinGuestDataOnVisitorsPage(params: any) {
    if (Object.keys(this.currentArea)[0] !== 'all') {
      if (Object.keys(this.currentArea)[0] === 'rfsCode') {
        params['rfsCodes'] = this.currentArea['rfsCode'];
      } else {
        params['macCodes'] = this.currentArea['macCode'];
      }
    }
    $api.DashboardApi.opporOrder(params).then((res) => {
      this.dataList.winguest.intention = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'opporNum');
    }).catch((err) => {
      this.dataList.winguest.intention = {};
    });
    $api.DashboardApi.tabLeads(params).then((res) => {
      this.dataList.winguest.Retention = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'leadsNum');
    }).catch((err) => {
      this.dataList.winguest.Retention = {};
    });
  }

  initConversionData(params: object) {
    $api.DashboardApi.AlldealData(params).then((res) => {
      this.dataList.conversion.deal = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'num');
    }).catch((err) => {
      this.dataList.conversion.deal = {};
    });
  }

  initToshopData(params: object) {
    $api.DashboardApi.ToshopData(params).then((res) => {
      this.dataList.conversion.createcard = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'visitsNums');
    }).catch((err) => {
      this.dataList.conversion.createcard = {};
    });
  }

  initConversionDataOnMonth(params: any) {
    let query = _.cloneDeep(params);
    delete query.type;
    if (Object.keys(this.currentArea)[0] !== 'all') {
      if (Object.keys(this.currentArea)[0] === 'rfsCode') {
        query['rfsCodes'] = this.currentArea['rfsCode'];
      } else {
        query['macCodes'] = this.currentArea['macCode'];
      }
    }
    query['time'] = this.ConversionDate;
    $api.DashboardApi.delivery(query).then((res) => {
      this.dataList.conversion.deal = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'num');
    }).catch((err) => {
      this.dataList.conversion.deal = {};
    });
  }

  initToshopDataOnMonth(params: any) {
    let query = _.cloneDeep(params);
    delete query.type;
    if (Object.keys(this.currentArea)[0] !== 'all') {
      if (Object.keys(this.currentArea)[0] === 'rfsCode') {
        query['rfsCodes'] = this.currentArea['rfsCode'];
      } else {
        query['macCodes'] = this.currentArea['macCode'];
      }
    }
    query['time'] = this.ConversionDate;
    $api.DashboardApi.ToshopDataInConversion(query).then((res) => {
      this.dataList.conversion.createcard = this.buildTopBarModel(res.now[0], res.lsatYear[0], res.last[0], 'visitsNums');
    }).catch((err) => {
      this.dataList.conversion.createcard = {};
    });
  }

  buildVisitorsModel(now: any , old: any , last: any) {
    let publics = {
        value: '',
        unit: '',
        tb: '',
        hb: '',
        aims: '',
        finished: ''
    };
    if (!now) {
      return publics;
    } else {
      let nowVisitors = now.newVisitors + now.oldVisitors;
      let params = this.numberFormat(nowVisitors);
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

  buildTopBarModel(now: any, old: any, last: any, key: any) {
    let publics = {
      value: '',
      unit: '',
      tb: '',
      hb: '',
      aims: '',
      finished: ''
    };
    if (!now) {
      return publics;
    } else {
      let params = this.numberFormat(now[key]);
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
