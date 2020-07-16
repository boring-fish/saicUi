<template>
  <div class="getChannel">
    <p class="tip"><span>提示：</span><span>点击柱状图查看各渠道获客趋势</span></p>
    <!-- 左上nav -->
    <div class="Proportion">
      <p>各渠道获得的线索量</p>
      <span>线上占比：{{ onLine ? onLine : "——" }}</span>
      <span>线下占比: {{ offLine ? offLine : "——" }}</span>
    </div>
    <!-- 横线 -->
    <div class="hr"></div>
    <!-- 右上nav -->
    <div class="getTable">
      <ul class="changeDataChannel">
        <li
          v-for="(data, index) in tableMenu"
          :key="index"
          @click="handleClickChannel(index)"
          :class="index === activeClassIndex ? 'active' : ''"
        >
          {{ data }}
        </li>
      </ul>
    </div>
    <!-- echarts图上的数据 -->
    <div class="preview">
      <div class="childname">
        <p v-for="(item, index) in name" :key="index">
          {{ item.name }}
        </p>
      </div>
      <div class="child-wrap">
        <div
          v-for="(item, index) in datalist"
          :key="index"
          @click="handleEchartOpen(index)"
        >
          <li @click="centerDialogVisible = true">
            <p
              style="height: 84px; font-size:60px; line-height:84px; text-align:left;color:#FFF;"
            >
              {{ item.value ? item.value : "——" }}
              <span style="font-size:24px; color:#FFF">{{ item.unit }}</span>
            </p>
            <p
              style="height:48px; line-height:48px; font-size:24px; text-align:left; color: rgba(255, 255, 255, 0.4)"
            >
              {{ planTbHb }}
              <span
                v-if="item[channelStr]"
                :class="
                  item[channelStr].startsWith('-')
                    ? 'iconfont iconxiajiang'
                    : 'iconfont iconshangsheng'
                "
                >{{ item[channelStr].startsWith('-') ? item[channelStr].substring(1) : item[channelStr] }}</span
              >
              <span v-else>——</span>
            </p>
          </li>
        </div>
      </div>
    </div>
    <!-- echart图 -->
    <div class="proportionOfChannel" ref="ProportionOfChannel"></div>

    <el-dialog
      title="各渠道获得线索详情"
      :visible.sync="centerDialogVisible"
      :modal-append-to-body="false"
      @open="openCloud"
    >
      <div class="channelDetailAbove">
        <p><span class="check"><span></span></span>{{ motalName }}线索质量情况</p>
        <ul>
          <li>
            <p style="color:rgba(255,255,255,0.6);">线索总数</p>
            <p>
              {{
                this.winGuestQuality.searchTotal.value
                  ? this.winGuestQuality.searchTotal.value
                  : "——"
              }}
              {{ this.winGuestQuality.searchTotal.unit }}
            </p>
          </li>
          <!-- <li>
            <p>首发线索数</p>
            <p>
              {{
                numberFormat(this.winGuestQuality.firstClue).value
                  ? numberFormat(this.winGuestQuality.firstClue).value
                  : "——"
              }}
              {{ numberFormat(this.winGuestQuality.firstClue).unit }}
            </p>
          </li>
          <li>
            <p>首发线索占比</p>
            <p>{{ this.winGuestQuality.ProportionOfFirst }}</p>
          </li> -->
        </ul>
      </div>
      <div class="channelDetailBottom">
        <p><span class="check"><span></span></span>{{ motalName }}线索趋势图</p>
        <!-- 模态框echarts图 -->
        <div class="echartWinCustomer" ref="cloudWinCustomer"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { calculation } from '@/utils/utils.ts';
import moment from 'moment';
import _ from 'lodash';

interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}

@Component({
  components: {},
})
export default class GetChannl extends Vue {
  @Prop({
    required: false,
    default: '',
  })
  brandName!: string;

  @Prop({
    required: false,
    default: 101,
  })
  brandId!: number;

  @Prop({
    required: false,
    default: {},
  })
  time!: TIMERANGE;

  @Prop({
    required: true,
    default: {
      all: 'all'
    }
  })
  currentArea!: object;

  @Prop({
    required: false,
    default: () => []
  }) series!: any[];

  // 基本数据
  onLine: any = '';
  offLine: any = '';
  // nav点击前的默认配置
  channelStr: any = 'tb'; //初始化时默认同比
  activeClassIndex: number = 0;
  planTbHb: string = '同比';
  public tableMenu: any = ['同比', '环比'];
  public strMenu: any = ['tb', 'hb'];
  // 渠道echarts图形上面数据的模拟
  public name: any = [
    //无数据时也有标题
    { name: '厂方分配' },
    { name: '垂媒' },
    { name: '外拓获客' },
    { name: '自然获客' }
  ];
  // value和tb&hb
  public datalist: any = [];

  //第一方触点ui显示数据
  contactRatiodata = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: '',
    proportion: '',
  };
  //垂媒ui数据
  verticalRatiodata = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: '',
    proportion: '',
  };
  //外拓获客ui数据
  outreachRatiodata = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: '',
    proportion: '',
  };

  //自然获客ui数据
  naturalRatiodata = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: '',
    proportion: '',
  };
  public channelTb: any = [0, 0, 0, 0];
  public channelHb: any = [0, 0, 0, 0];

  // 渠道echart柱状图数据
  private channelEchart: any = null;
  public $echarts: any;
  channelLegend: any = [
    '高意向-H',
    '中意向-A',
    '低意向-B',
    '战败-F',
    '同比意向',
  ];
  channelLegendColor: any = [
    '#6BC7E6',
    '#4EDFD1',
    '#EBCD52',
    '#F27A7A',
    '#236BB4',
  ];
  channelXaxisData: any = [
    '厂商分配',
    '垂媒',
    '外拓获客',
    '自然获客',
  ];
  public alevel: any = [0, 0, 0, 0];
  public blevel: any = [0, 0, 0, 0];
  public hlevel: any = [0, 0, 0, 0];
  public flevel: any = [0, 0, 0, 0];

  heightPrefer: any = [];
  midPrefer: any = [];
  lowPrefer: any = [];
  defeat: any = [];
  anyPrefer: any = [];
  planPrefer: any = [];

  //模态框数据
  winGuestQuality: any = {
    searchTotal: {value: '', unit: ''},
    firstClue: '',
    ProportionOfFirst: '89%',
  };

  public channelMotalLegend: any = ['实际线索量', '同比线索量', '环比线索量'];
  public channelMotalLegendColor: any = ['#EBCD52', '#4EDFD1', '#236BB4'];
  public channelMotalXaxisData: any = [];
  // public strMotal: any = 'tb';
  public aims: any = 820;
  // public motalArr: any = [];                               //目标获客
  public actual: any = [];          //实际获客     
  public hb: any = [];               //环比获客
  public tb: any = [];               //同比获客
  // public plan: any = [];            //计划值获客

  // 预处理数据
  nowMotal: any = [];
  lyMotal: any = [];
  lastMotal: any = [];

  // 模态框默认状态
  public centerDialogVisible: any = false;
  public motalEchart: any = null;

  // 监测品牌名改变
  @Watch('brandName')
  brandNameChange() {
    this.getDiffBrand();            //品牌改变
    this.getEchartData();           //获取数据
    this.getProportionData();       //获取占比
  }
  // 监测日期改变
  @Watch('time.key')
  brandTimeKeyChange() {
    this.getDiffTime();       
    this.getEchartData();
    this.getProportionData();
  }
  // 检测大区改变
  @Watch('currentArea')
  channelAreaChange() {
    this.getProportionData();       
    this.getDiffTime();           
    this.getEchartData();
  }

  // 渠道获客量数据改变，执行函数——brand
  getDiffBrand() {
    this.getChannelData();
  }
  // 渠道获客量数据改变，执行函数——time
  getDiffTime() {
    this.getChannelData();
  }

  // 线上线下占比数据
  getProportionData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.ifOnLine(params).then( (res: any) => {
      // 取出全部占比
      let arr: any = [];
      if (res.now.length > 0) {
        res.now.forEach( (item: any) => {
        arr.push(item.leadsNum);
        });
        // console.log(arr);
        // 加到一起
        let sum: any = arr.reduce( (pre: any, now: any) => {
          return pre + now;
        }, 0);
        // console.log(sum);
        // 线上占比
        let onLine: any = res.now.filter( (item: any) => {
          return item.ifonline === 1;
        });
        // console.log(onLine);
        if (onLine.length > 0) {
          this.onLine = (100 * onLine[0].leadsNum / sum).toFixed(2) + '%';
        }
        // 线下占比
        let offLine: any = res.now.filter( (item: any) => {
          return item.ifonline === 2;
        });
        // console.log(offLine);
        if (offLine.length > 0) {
          this.offLine = (100 * offLine[0].leadsNum / sum).toFixed(2) + '%';
        }
      } else {
        this.onLine = '';
        this.offLine = '';
      }
    });
  }

  // 获取图上div的数据
  getChannelData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.getData(params).then((res: any) => {
      // console.log(res);
      let nowcontactData: any = {
        year: [],
        last: [],
        now: [],
      };
      //垂媒数据
      let nowverticalMediaData: any = {
        year: [],
        last: [],
        now: [],
      };
      //外拓数据
      let nowoutreachData: any = {
        year: [],
        last: [],
        now: [],
      };
      //自然数据
      let nownaturalData: any = {
        year: [],
        last: [],
        now: [],
      };
      let allNowsleadsNum = 0;      //当前  now
      let allYearleadsNum = 0;      //去年  lastyear
      let allLastleadsNum = 0;      //上次  last
      // 为echart图获得hb数组
      res.last.forEach((item: any) => {
        allLastleadsNum += item.leadsNum;     //上次的全部
        if (item.sourceType === '第一方触点') {
          nowcontactData.last.push(item);
          this.channelHb.splice(0, 1, item.leadsNum);
        } else if (item.sourceType === '垂媒') {
          nowverticalMediaData.last.push(item);
          this.channelHb.splice(1, 1, item.leadsNum);
        } else if (item.sourceType === '外拓客户') {
          nowoutreachData.last.push(item);
          this.channelHb.splice(2, 1, item.leadsNum);
        } else if (item.sourceType === '自然获客') {
          nownaturalData.last.push(item);
          this.channelHb.splice(3, 1, item.leadsNum);
        }
      });

      res.now.forEach((item: any) => {
        allNowsleadsNum += item.leadsNum;
        if (item.sourceType === '第一方触点') {
          nowcontactData.now.push(item);
        } else if (item.sourceType === '垂媒') {
          nowverticalMediaData.now.push(item);
        } else if (item.sourceType === '外拓客户') {
          nowoutreachData.now.push(item);
        } else if (item.sourceType === '自然获客') {
          nownaturalData.now.push(item);
        }
      });
      // 为echart图获得tb数组
      res.lsatYear.forEach((item: any) => {
        allYearleadsNum += item.leadsNum;
        if (item.sourceType === '第一方触点') {
          nowcontactData.year.push(item);
          this.channelTb.splice(0, 1, item.leadsNum);
        } else if (item.sourceType === '垂媒') {
          nowverticalMediaData.year.push(item);
          this.channelTb.splice(1, 1, item.leadsNum);
        } else if (item.sourceType === '外拓客户') {
          nowoutreachData.year.push(item);
          this.channelTb.splice(2, 1, item.leadsNum);
        } else if (item.sourceType === '自然获客') {
          nownaturalData.year.push(item);
          this.channelTb.splice(3, 1, item.leadsNum);
        }
      });
      if (this.time.key === 'all') {
        this.handleClickChannel(0);
        let arr = [];
        this.contactRatiodata = this.allOperationData(nowcontactData.now);
        this.verticalRatiodata = this.allOperationData(nowverticalMediaData.now);
        this.outreachRatiodata = this.allOperationData(nowoutreachData.now);
        this.naturalRatiodata = this.allOperationData(nownaturalData.now);
        arr = [
          this.contactRatiodata,
          this.verticalRatiodata,
          this.outreachRatiodata,
          this.naturalRatiodata,
        ];
        this.datalist = arr;
      } else {
        this.handleClickChannel(0);
        let arr = [];
        this.contactRatiodata = this.operationData(
          nowcontactData.now,
          nowcontactData.year,
          nowcontactData.last
        );
        this.verticalRatiodata = this.operationData(
          nowverticalMediaData.now,
          nowverticalMediaData.year,
          nowverticalMediaData.last
        );
        // console.log(this.verticalRatiodata);
        this.outreachRatiodata = this.operationData(
          nowoutreachData.now,
          nowoutreachData.year,
          nowoutreachData.last
        );
        this.naturalRatiodata = this.operationData(
          nownaturalData.now,
          nownaturalData.year,
          nownaturalData.last
        );
        arr = [
          this.contactRatiodata,
          this.verticalRatiodata,
          this.outreachRatiodata,
          this.naturalRatiodata,
        ];
        this.datalist = arr;
        this.$nextTick( () => {
          this.winGuestChannelEchartInit();
        });
      }
    });
  }

  allOperationData(now: any) {
    let publics: any = {
      value: '',
      unit: '',
      tb: '',
      hb: '',
      plan: '',
    };
    if (now.length === 0) {
      return publics;
    } else {
      let params = this.numberFormat(now[0].leadsNum);
      publics.value = params.value;
      publics.unit = params.unit;
      publics.name = now[0].sourceType;
    }
    return publics;
  }

  operationData(now: any, old: any, last: any) {
    let publics: any = {
      value: '',
      unit: '',
      tb: '',
      hb: '',
      plan: '',
    };
    if (now.length === 0) {
      return publics;
    } else {
      let params = this.numberFormat(now[0].leadsNum);
      publics.name = now[0].sourceType;
      publics.value = params.value;
      publics.unit = params.unit;
    }
    if (old.length === 0) {
      publics.tb = '';
    } else {
      publics.tb = calculation(now[0].leadsNum, old[0].leadsNum);
    }
    if (last.length === 0) {
      publics.hb = '';
    } else {
      if (this.time.key === 'year') {
        publics.hb = publics.tb = calculation(
          now[0].leadsNum,
          last[0].leadsNum
        );
      } else {
        publics.hb = calculation(now[0].leadsNum, last[0].leadsNum);
      }
    }
    return publics;
  }

  // nav点击事件
  public handleClickChannel(index: number): void {
    this.channelStr = this.strMenu[index];
    this.planTbHb = this.tableMenu[index];
    this.activeClassIndex = index;
    this.channelLegend[4] = `${this.tableMenu[index]}意向`;
    if (index === 0) {
      this.anyPrefer = this.channelTb;
      this.winGuestChannelEchartInit();
    }
    if (index === 1) {
      this.anyPrefer = this.channelHb;
      this.winGuestChannelEchartInit();
    }
    // if (index === 2) {
    //   this.anyPrefer = this.channelHb;
    //   this.winGuestChannelEchartInit();
    // }
  }
  // --------------------------------------------------------------------------------------------
  // 柱状图部分

  // 上树初始化柱状图Echart
  private mounted() {
    this.getProportionData();     //线上线下占比
    this.getChannelData();        //柱状图上的数据
    this.getEchartData();         //柱状图数据
    // this.getMotalData();
    window.onresize = () => {
      this.channelEchart.resize();
    };
  }

  getEchartData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.oppor(params).then((res: any) => {
      if (res.now.length > 0) {
        res.now.map( (item: any) => {
          if (item.bizModuleName === '第一触电') {
            this.hlevel.splice(0, 1, item.alevel);
            this.alevel.splice(0, 1, item.alevel);
            this.blevel.splice(0, 1, item.blevel);
            this.flevel.splice(0, 1, item.blevel);
          }
          if (item.bizModuleName === '垂媒') {
            this.hlevel.splice(1, 1, item.alevel);
            this.alevel.splice(1, 1, item.alevel);
            this.blevel.splice(1, 1, item.blevel);
            this.flevel.splice(1, 1, item.blevel);
          }
          if (item.bizModuleName === '外拓获客') {
            this.hlevel.splice(2, 1, item.alevel);
            this.alevel.splice(2, 1, item.alevel);
            this.blevel.splice(2, 1, item.blevel);
            this.flevel.splice(2, 1, item.blevel);
          }
          if (item.bizModuleName === '自然获客') {
            this.hlevel.splice(3, 1, item.alevel);
            this.alevel.splice(3, 1, item.alevel);
            this.blevel.splice(3, 1, item.blevel);
            this.flevel.splice(3, 1, item.blevel);
          }
        });
        this.heightPrefer = this.hlevel;
        this.midPrefer = this.alevel;
        this.lowPrefer = this.blevel;
        this.defeat = this.flevel;
        this.anyPrefer = this.channelTb;
        this.$nextTick( () => {
          this.winGuestChannelEchartInit();
        });

      }
    });
  }

  // 柱状图初始化执行函数
  public winGuestChannelEchartInit() {
    this.channelEchart = this.$echarts.init(this.$refs.ProportionOfChannel);
    this.channelBarEchart();
  }
  // 柱状图Echart初始化
  public channelBarEchart() {
    this.channelEchart.clear();
    let options: any = {
      color: this.channelLegendColor,
      legend: {
        selectedMode: false,
        formatter: function (name: any) {
            return `    ` + name;
        },
        data: this.channelLegend,
        itemHeight: 40,
        itemWidth: 40,
        icon: 'react',
        itemGap: 60,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: 32,
        },
        bottom: '3%',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '20%',
        height: '70%',
        width: '90%',
        containLabel: true,
      },
      xAxis: [
        {
          show: false,
          type: 'category',
          data: this.channelXaxisData,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
          position: 'top',
          axisLabel: {
            textStyle: {
              color: '#FFF',
              fontSize: 32,
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          show: false,
        },
      ],
      series: [
        {
          name: '高意向-H',
          type: 'bar',
          stack: '广告',
          data: this.heightPrefer,
          showBackground: true,
          showBackgroundStyle: {
            color: '#021722',
          },
          barWidth: 102,
          itemStyle: {
            normal: {
              color: '#6BC7E6',
            },
          },
        },
        {
          name: '中意向-A',
          type: 'bar',
          stack: '广告',
          data: this.midPrefer,
          // showBackground: true,
          barWidth: 102,
          itemStyle: {
            normal: {
              color: '#4EDFD1',
            },
          },
          showBackgroundStyle: {
            color: '#021722',
          },
        },
        {
          name: '低意向-B',
          type: 'bar',
          stack: '广告',
          data: this.lowPrefer,
          // showBackground: true,
          barWidth: 102,
          itemStyle: {
            normal: {
              color: '#EBCD52',
            },
          },
          showBackgroundStyle: {
            color: '#021722',
          },
        },
        {
          name: '战败-F',
          type: 'bar',
          stack: '广告',
          data: this.defeat,
          // showBackground: true,
          barWidth: 102,
          itemStyle: {
            normal: {
              color: '#F27A7A',
            },
          },
          showBackgroundStyle: {
            color: '#021722',
          },
        },
        {
          name: `${this.tableMenu[this.activeClassIndex]}意向`,
          type: 'bar',
          data: this.anyPrefer,
          showBackground: true,
          barWidth: 102,
          itemStyle: {
            normal: {
              color: '#236BB4',
            },
          },
          showBackgroundStyle: {
            color: '#021722',
          },
        },
      ],
    };
    this.channelEchart.setOption(options);
  }
  // --------------------------------------------------------------------------------------------
  // 模态框部分

  // 根据时间排序
  // 单位为month
  sortYear(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.month - b.month;
    });
  }
  // 赋值排序后的数据
  assignmentYear(res: any) {
    this.nowMotal = this.sortYear(res.now);
    this.lyMotal = this.sortYear(res.lsatYear);
    this.lastMotal = this.sortYear(res.last);
  }
  // 单位为day
  sortDay(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.day - b.day;
    });
  }
  assignmentDay(res: any) {
    this.nowMotal = this.sortDay(res.now);
    this.lyMotal = this.sortDay(res.lsatYear);
    this.lastMotal = this.sortDay(res.last);
  }
  // 单位为dayWeek
  sortDayWeek(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.dayWeek - b.dayWeek;
    });
  }
  assignmentDayWeek(res: any) {
    this.nowMotal = this.sortDayWeek(res.now);
    this.lyMotal = this.sortDayWeek(res.lsatYear);
    this.lastMotal = this.sortDayWeek(res.last);
  }
  // 单位为hour
  sortHour(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.hour - b.hour;
    });
  }
  assignmentHour(res: any) {
    this.nowMotal = this.sortHour(res.now);
    this.lyMotal = this.sortHour(res.lsatYear);
    this.lastMotal = this.sortHour(res.last);
  }
  // 历史总计
  sortAll(arr: any) {
    return arr.sort((a: any, b: any) => {
      return a.year - b.year;
    });
  }
  assignmentAll(res: any) {
    this.nowMotal = this.sortAll(res.now);
    this.lyMotal = this.sortAll(res.lsatYear);
    this.lastMotal = this.sortAll(res.last);
  }
  arrangeAll(a: any, b: any) {
    b.length = 0;
    a.forEach((item: any) => {
      if (item.year !== null) {
        b.push(item.year);
      }
    });
    return b;
  }

  // 处理合并数组
  arrangement(a: any, b: any) {
    b.length = 0;
    a.forEach((item: any) => {
      b.push(item.leadsNum);
    });
    return b;
  }
  // 执行合并数组
  mergeLeads() {
    this.arrangement(this.nowMotal, this.actual);
    this.arrangement(this.lastMotal, this.hb);
    this.arrangement(this.lyMotal, this.tb);
  }

  // 点击echarts图的函数
  public motalName: string = '';
  public handleEchartOpen(index: any) {
    this.getClueData(index);
    let whichWay: any;
    switch (index) {
      case 0:
        whichWay = '第一方触点'; break;
      case 1:
        whichWay = '垂媒'; break;
      case 2:
        whichWay = '外拓获客'; break;
      case 3:
        whichWay = '自然获客'; break;
    }
    if (index === 0) {
      this.motalName = this.name[0].name;
    } else {
      this.motalName = whichWay;
    }
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      sourceType: whichWay,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.leadstrend(params).then( (res: any) => {
      // 判断日期
      let d = new Date();
      // moment().daysInMonth();    获取当月天数
      // moment().get('month');     获取当月月份（+1）
      if (this.time.key === 'year') {
        this.assignmentYear(res);
        this.mergeLeads();
        // console.log(this.nowMotal, this.lyMotal, this.lastMotal);
        // console.log(this.actual, this.hb, this.tb);
        let arr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        this.channelMotalXaxisData = arr;
      }
      // 三月
      if (this.time.key === 'threemonth') {
        this.assignmentYear(res);
        this.mergeLeads();
        let arr: any = [];
        if (moment().get('month') === 0) {
          arr = ['11月', '12月', '1月'];
          this.channelMotalXaxisData = arr;
        }
        if (moment().get('month') === 1) {
          arr = ['12月', '1月', '2月'];
          this.channelMotalXaxisData = arr;
        }
        if (moment().get('month') > 1) {
          for (let i = -1; i < 2; i++) {
            arr.push(moment().get('month') + i + '月');
          }
          this.channelMotalXaxisData = arr;
        }
      }
      // 当月
      if (this.time.key === 'month') {
        this.assignmentDay(res);
        this.mergeLeads();
        let  arr = [];
        for (let i = 0; i < moment().daysInMonth(); i++) {
          arr.push(i + 1 + '天');
        }
        this.channelMotalXaxisData = arr;
      }
      // 上个月
      if (this.time.key === 'last_month') {
        let date: any = moment(new Date()).subtract(1, 'months').format('YYYY-MM');  //上个月日期
        let dates: any;     //上个月天数 
        this.assignmentDay(res);
        this.mergeLeads();
        dates = moment(`${date}`, 'YYYY-MM').daysInMonth();
        let  arr = [];
        for (let i = 0; i < dates; i++) {
          arr.push(i + 1 + '天');
        }
        this.channelMotalXaxisData = arr;
      }
      // 当周
      if (this.time.key === 'week') {
        this.assignmentDayWeek(res);
        this.mergeLeads();
        // console.log(this.nowMotal, this.lyMotal, this.lastMotal);
        // console.log(this.actual, this.hb, this.tb);
        let arr = ['周一', '周二', '周三', '周四', '周五', '周六' , '周日'];
        this.channelMotalXaxisData = arr;
      }
      // 昨日
      if (this.time.key === 'day') {
        this.assignmentHour(res);
        this.mergeLeads();
        let arr = ['0时', '', '2时', '', '4时', '', '6时', '', '8时', '', '10时', '', '12时', '', '14时', '', '16时', '', '18时', '', '20时', '', '22时', '', '24时'];
        this.channelMotalXaxisData = arr;
      }
      // 历史累计
      if (this.time.key === 'all') {
        this.assignmentAll(res);
        this.mergeLeads();
        if (res.last.length > 0) {
          this.arrangeAll(res.last, this.channelMotalXaxisData);
        }
        if (res.last.length === 0 && res.lsatYear.length > 0) {
          this.arrangeAll(res.lsatYear, this.channelMotalXaxisData);
        }
        if (res.last.length === 0 && res.lsatYear.length === 0 && res.now.length > 0) {
          this.arrangeAll(res.now, this.channelMotalXaxisData);
        }
        // console.log(this.nowMotal, this.lyMotal, this.lastMotal);
      }
      // this.motalArr = [];
      // for (let i = 0; i < 5; i++) {
      //   this.motalArr.push(this.aims);
      // }
      this.$nextTick(() => {
        this.winGuestMotalEchartInit();
      });
    });
  }

  // 模态框打开
  public openCloud() {
    // this.motalEchartInit();
  }

  // 获取线索数据
  getClueData(index: any) {
    // console.log(this.datalist[index]);
    this.winGuestQuality.searchTotal.value = this.datalist[index].value;
    this.winGuestQuality.searchTotal.unit = this.datalist[index].unit;
  }

  // 模态框Echart初始化执行函数
  public winGuestMotalEchartInit() {
    this.motalEchart = this.$echarts.init(this.$refs.cloudWinCustomer);
    this.motalEchartLine();
  }

  // 模态框Echart折线图执行函数
  public motalEchartLine() {
    this.motalEchart.clear();
    let motalOptions: any = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
            return `<p style="font-size=24px"> ${ params.name + '的值：' + this.numberFormat(params.data).value + this.numberFormat(params.data).unit} </P>`;
        }
      },
      color: this.channelMotalLegendColor,
      legend: {
        itemHeight: 40,
        itemWidth: 40,
        itemGap: 100,
        icon: 'react',
        type: 'scroll',
        data: this.channelMotalLegend,
        // formatter: function (name: any) {
        //   // console.log(name);
        //     return `    ` + name;
        // },
        textStyle: {
          color: '#FFF',
          fontSize: 32,
        },
        bottom: '1%',
      },
      grid: {
        // show: true,
        containLabel: true,
        left: '5%',
        right: '5%',
        height: '70%',
        borderWidth: '0',
        bottom: '15%',
      },
      // x轴
      xAxis: {
        offset: 20,
        type: 'category',
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 28,
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#01475A',
            opacity: 1,
          },
        },
        data: this.channelMotalXaxisData,
      },
      // y轴
      yAxis: {
        // max: 1500,
        offset: 20,
        type: 'value',
        // minInterval: 500,
        splitLine: {
          // interval: 0,
          lineStyle: {
            color: '#01475A',
          },
        },
        axisLine: {
          lineStyle: {
            opacity: 0,
          },
        },
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 28,
          },
        },
      },
      series: [
        {
          // symbol: 'none',
          symbolSize: 10,
          name: '实际线索量',
          data: this.actual,
          type: 'line',
          // lineStyle: { type: 'dashed' },
        },
        {
          // symbol: 'none',
          symbolSize: 10,
          name: '同比线索量',
          data: this.tb,
          type: 'line',
        },
        {
          // symbol: 'none',
          symbolSize: 10,
          name: `环比线索量`,
          data: this.hb,
          type: 'line',
        },
      ],
    };
    this.motalEchart.setOption(motalOptions);
  }

  numberFormat(value: any) {
    let param: any = {};
    let k = 10000,
      sizes = ['', '万', '亿', '万亿'],
      i;
    if (value < k) {
      param.value = value;
      param.unit = '';
    } else {
      i = Math.floor(Math.log(value) / Math.log(k));
      param.value = (value / Math.pow(k, i)).toFixed(2);
      param.unit = sizes[i];
      if (param.value > 1000) {
        param.value = param.value / 10000;
        param.unit = sizes[i + 1];
      }
    }
    return param;
  }

  private destroyed() {
    window.onresize = null;
  }
}
</script>

<style lang="scss">
.getChannel {
  width: 100%;
  height: 100%;
  position: relative;
  .Proportion {
    position: absolute;
    left: 0;
    top: 0;
    height: 100px;
    width: 1000px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      height: 50px;
      font-size: 36px;
      line-height: 50px;
    }
    span {
      height: 44px;
      line-height: 44px;
      font-size: 28px;
      color:rgba(255,255,255,0.6);
    }
  }
  .hr {
    position: absolute;
    top: 100px;
    width: 100%;
    height: 2px;
    background: #1e2237;
  }
  .getTable {
    width: 654px;
    height: 60px;
    // background-color: #fff;
    position: absolute;
    top: 20px;
    right: 48px;
    box-sizing: border-box;
    // background: rgba(9, 12, 21, 1);
    border-radius: 30px;
    // border: 2px solid rgba(58, 66, 99, 1);
    overflow: hidden;
    color: rgba(255, 255, 255, 0.4);
    .changeDataChannel {
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      z-index: 2;
      li {
        width: 218px;
        height: 60px;
        font-size: 28px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.4);
        text-align: center;
        line-height: 60px;
        border: 2px solid rgba(58, 66, 99, 1);
      }
      li:first-child {
        border-radius: 30px 0px 0px 30px;
      }
      li:last-child {
        border-radius: 0px 30px 30px 0px;
      }
      .active {
        font-size: 28px;
        width: 218px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        color: #fff;
        background: rgba(35, 107, 180, 1);
        border: 2px solid rgba(58, 66, 99, 1);
      }
    }
  }
  .preview {
    width: 1350px;
    // height: 200px;
    position: absolute;
    top: 160px;
    left: 180px;
    // background-color: #fff;
    .childname {
      width: 100%;
      height: 44px;
      display: flex;
      p {
        height: 44px;
        line-height: 44px;
        font-size: 32px;
        width: 230px;
        margin-right: 150px;
      }
      p:last-child {
        margin-right: 0;
      }
    }
    .child-wrap {
      width: 100%;
      height: 156px;
      display: flex;
      div {
        width: 230px;
        height: 156px;
        margin-right: 150px;
        position: relative;
        li {
          width: 100%;
          height: 550px;
          position: absolute;
          z-index: 100;
          p {
            .iconshangsheng {
              color: #35e967;
              font-size: 24px;
            }
            .iconxiajiang {
              color: #e80404;
              font-size: 24px;
            }
          }
        }
      }
      div:last-child {
        margin-right: 0;
      }
    }
  }
  .proportionOfChannel {
    width: 100%;
    height: calc(100% - 300px);
    position: absolute;
    bottom: 0;
    // top: 100px;
  }
  .el-dialog__wrapper {
    background-color: rgba($color: #000, $alpha: 0.5);
    .el-dialog {
      width: 1896px;
      height: 1174px;
      background-color: #121626;
      position: absolute;
      left: 1098px;
      top: 494px;
      .el-dialog__header {
        height: 104px;
        width: 100%;
        border-bottom: 2px solid #3A4263;
        display: flex;
        align-items: center;
        .el-dialog__title {
          color: #fff;
          font-size: 36px;
        }
        .el-dialog__headerbtn {
          font-size: 50px;
          color: #fff;
        }
      }
      .el-dialog__body {
        width: 100%;
        padding: 40px;
        .channelDetailAbove {
          width: 1816px;
          height: 304px;
          background-color: #121626;
          p {
            width: 100%;
            height: 100px;
            border-bottom: 2px solid #121626;
            line-height: 100px;
            font-size: 36px;
            color: #fff;
            letter-spacing: -1px;
            text-indent: 40px;
            display: flex;
            align-items: center;
          }
          ul {
            width: 100%;
            height: 202px;
            li {
              width: 260px;
              height: 100%;
              margin-right: 96px;
              float: left;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: space-between;
              p {
                width: 100%;
                height: 44px;
                font-size: 32px;
                line-height: 44px;
                color: #fff;
                border: none;
              }
            }
          }
        }
        .channelDetailBottom {
          width: 1816px;
          height: 664px;
          background-color: #121626;
          margin-top: 20px;
          p {
            width: 100%;
            height: 100px;
            border: 2px solid #121626;
            line-height: 100px;
            font-size: 36px;
            color: #fff;
            letter-spacing: -1px;
            text-indent: 40px;
            display: flex;
            align-items: center;
          }
          .echartWinCustomer {
            width: 100%;
            height: 562px;
          }
        }
      }
    }
  }
}
.check{
  display: block;
  width: 32px;
  height: 32px;
  border: dashed 2px #236BB4;
  border-radius: 50%;
  position: relative;
  margin-right: 20px;
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;background-color: #236BB4;
    position: absolute;
    left: 8px;
    top: 8px;
  }
}
.tip {
  position: absolute;
  left: 60px;
  top: 110px;
  font-size: 24px;
  color: #666666;
}
</style>
