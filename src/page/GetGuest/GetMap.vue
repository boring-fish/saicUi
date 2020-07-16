<template>
  <div class="map">
    <p>各经销商所在地线索量</p>
    <div class="hr"></div>
    <div class="chinaIcon">
      <div ref="myChartChina" style="height: 100%; width: 100%"></div>
    </div>
    <!-- <img src="../../assets/img/expect.png" alt=""> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import 'echarts/map/js/china.js';
// import 'echarts/map/js/province/'
import { geoCoordMap, provienceData } from './map/geo';
const geoJson = require('./json/china.json');

interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}

@Component({
  components: {},
})
export default class GetMap extends Vue {
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

  private chinaEchart: any = null;
  public $echarts: any;
  public geoShow: boolean = true; 

  public mapData: any = [];       //echarts数据
  public nowAreaData: any = [];   //当前地域
  public peakValue: any = 300;    //visualMap峰值
  public scatterWidth: number = 20; 

  public data: any = [
    {
      name: '北京',
      value: 900,
      area: '华北大区',
      type: 'areaCenterCity',
    },
    {
      name: '天津',
      value: 90,
      area: '华北大区',
      type: 'areaCenterCity',
    },
    {
      name: '上海',
      value: 990,
      area: '华东大区',
      type: 'areaCenterCity',
    },
    {
      name: '合肥',
      value: 490,
      area: '华东大区',
      type: 'areaCenterCity',
    }
  ];


  public itemStyle: any;

  public winGuestMapInit() {
    this.$echarts.registerMap('zhongguo', geoJson);
    // for (let item of this.mapData) {
    //   // console.log(item);
    //   if (item.area === '东北大区') {
    //     // console.log(item);
    //     item.itemStyle = {
    //       normal: {
    //         // areaColor: 'red',
    //       },
    //       emphasis: {
    //         // areaColor: '#3CA2FC',
    //       },
    //     };
    //   } else if (item.area === '华北大区') {
    //     // item.itemStyle = {
    //     //   normal: {
    //     //     areaColor: 'blue',
    //     //   },
    //     //   emphasis: {
    //     //     areaColor: '#6CAFBE',
    //     //   },
    //     // };
    //   } else if (item.area === '华中大区') {
    //     // item.itemStyle = {
    //     //   normal: {
    //     //     areaColor: 'pink',
    //     //   },
    //     //   emphasis: {
    //     //     areaColor: '#ADD03C',
    //     //   },
    //     // };
    //   } else if (item.area === '华东大区') {
    //     // item.itemStyle = {
    //     //   normal: {
    //     //     areaColor: 'green',
    //     //   },
    //     //   emphasis: {
    //     //     areaColor: '#A13614',
    //     //   },
    //     // };
    //   } else if (item.area === '华西大区') {
    //     // item.itemStyle = {
    //     //   normal: {
    //     //     areaColor: 'gold',
    //     //   },
    //     //   emphasis: {
    //     //     areaColor: '#FFBA00',
    //     //   },
    //     // };
    //   } else if (item.area === '华南大区') {
    //     // item.itemStyle = {
    //     //   normal: {
    //     //     areaColor: 'yelllow',
    //     //   },
    //     //   emphasis: {
    //     //     areaColor: '#FFD300',
    //     //   },
    //     // };
    //   } else if (item.area === '南海诸岛') {
    //     // item.itemStyle = {
    //     //   normal: {
    //     //     borderColor: 'lightblue', //区域边框颜色
    //     //     areaColor: '#fff', //区域颜色
    //     //   },
    //     //   emphasis: {
    //     //     show: false,
    //     //   },
    //     // };
    //   } else {
    //     item.itemStyle = {
    //       normal: {
    //         areaColor: '#018080',
    //       },
    //       emphasis: {
    //         areaColor: '#D9D9D9',
    //       },
    //     };
    //   }
    // }
    this.chinaEchart = this.$echarts.init(this.$refs.myChartChina);
    this.chinaMap();
  }

  public convertData(data: any) {
    // console.log(data);
    let res: any = [];
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].name);           //地区名
      let geoCoord: any = (geoCoordMap as any)[data[i].name];
      // console.log(geoCoord);             //地区坐标
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
          area: data[i].area,
          type: data[i].type,
        });
      }
      // console.log(res);
    }
    return res;
  }


  // convertedData: any = [
  //   this.convertData(this.data),
  //   this.convertData(
  //     this.data
  //       .sort(function(a: any, b: any) {
  //         return b.value - a.value;
  //       })
  //       .slice(0, 6)
  //   )
  // ];

  public chinaMap() {
    // this.chinaEchart.clear();

    let option: any = {
      // baseOption: {
        tooltip: {
          trigger: 'item',
          formatter: (item: any): any => {
            // console.log(item, '12314');
            // console.log(Object.keys(this.currentArea)[0]);
            if (Object.keys(this.currentArea)[0] === 'all'  && item) {
              let str: string = '';  //`<div style=" height: 50px; rgba($color: #FFF, $alpha: 0.5); font-size: 30px; line-height: 50px">${item.name}:${item.value ? item.value : 0}</div>`;
              if (item.data) {
                  item.data.belong.forEach( (val: any) => {
                  str += `<div style=" height: 50px; rgba($color: #FFF, $alpha: 0.5); font-size: 30px; line-height: 50px">${val.area}:${val.value}</div>`;
                });
              }
              return str; 
            }
            if (Object.keys(this.currentArea)[0] === 'rfsCode') {
              let str: string = `<div style=" height: 100px; rgba($color: #FFF, $alpha: 0.5)"><p>${item.data ? item.data.area + '_' + item.name : item.name}:${item.value[0] ? item.value[item.value.length - 1] : (item.value ? item.value : 0)}</p></div>`;
              return str;
            }
          }
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
        visualMap: {
          show: true,
          type: 'continuous',
          max: this.peakValue,
          min: 0,
          top: 'center',
          right: '5%',
          align: 'left',
          calculable: true,
          itemWidth: 40,
          itemHeight: 304,
          inRange: {
            color: ['#00ECFF', '#FCCE00', '#E63504'],
          },
          textStyle: {
            color: '#FFF',
            fontSize: 28,
          },
        },
        geo: {
          show: true,
          roam: true,
          zoom: 1,
          map: this.geoShow === false ? 'china' : '',
          itemStyle: {
            areaColor: '#121626', //#018080
            borderColor: '#13cec5',
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              areaColor: '#018080',
            },
            label: {
              show: false,
              fontSize: 28,
              color: '#FFF',
            },
          },
        },
        series: [],
      };
    // };
    const scatterMap = {
            name: 'light',
            type: 'scatter',
            map: 'china',
            coordinateSystem: 'geo',
            data: this.mapData,
            symbolSize: (val: any) => {
              // console.log(val);
              return this.scatterWidth + Math.log2(val[2]);
            },
            label: {
              // show: true,
              normal: {
                formatter: '{b}',
                position: 'right',
                // show: true,
                textStyle: {
                  fontSize: 28,
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 28,
                  color: '#FFF',
                },
              },
            },
          };
    const wholeMap = {
            roam: true,
            coordinateSystem: 'geo',
            geoIndex: 1,
            type: 'map',
            map: 'china',
            data: this.mapData,
            label: {
              normal: {
                textStyle: {
                  show: true,
                  fontSize: 28,
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 28,
                  color: '#FFF',
                },
              },
            },
            // roam: 'scale',
            // roam: true,
            itemStyle: {
              areaColor: '#121626',
              borderColor: '#13cec5',
              borderWidth: 1,
            },
            emphasis: {
              itemStyle: {
                areaColor: '#018080',
              },
              label: {
                show: true,
                fontSize: 28,
                color: '#FFF',
              },
            },
          };
    if (!this.geoShow) {
      (option as any).series.push(scatterMap);
    } else {
      (option as any).series.push(wholeMap);
    }

    this.$nextTick( () => {
      this.chinaEchart.setOption(option);
    });
    // this.$nextTick( () => {
    //   this.chinaEchart.on('click', (params: any) => {
    //     console.log(params);
    //   });
    // });
  }

  private mounted() {
    // console.log(this.currentArea);
    this.getAllArea();
  }

  // 检测区域改变
  @Watch('currentArea')
  whencurrentAreaChange() {
    // console.log(Object.keys(this.currentArea));
    if (Object.keys(this.currentArea)[0] === 'all') {
      this.geoShow = true;
      // this.mapData = provienceData;
      this.getAllArea();
    }
    if (Object.keys(this.currentArea)[0] === 'rfsCode') {
      this.geoShow = false;
      this.scatterWidth = 20;
      // this.mapData = this.convertData(this.data);
      this.init();
    }
    if (Object.keys(this.currentArea)[0] === 'macCode') {
      this.geoShow = false;
      this.scatterWidth = 5;
      // this.mapData = this.convertData(this.data);
      this.init();
    }
  }
  // 检测品牌改变
  @Watch('brandId')
  whenBranidChange() {
    // console.log(this.brandId);
    this.getAllArea();
  }
  // 检测时间改变
  @Watch('time')
  whenTimeChange() {
    // console.log(this.time);
    this.init();
  }

  init() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      sourceTypes: '厂房分配,垂媒,外拓获客,自然获客'
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.getArea(params).then( (res: any) => {
      // console.log(res);
      let result =  res.now;
      // console.log(result);
      // console.log(Object.keys(this.currentArea), Object.values(this.currentArea));
      // console.log(res.now);
      let area: any = [];       //处理数据后的大小区
      let usearea: any = [];    //将被赋予数据的大小区
      if (Object.keys(this.currentArea)[0] === 'all') {
        // 添上大区名字
        result = result.map( (item: any) => {
          this.nowAreaData.forEach( (val: any) => {
            if (item.source === val.rfsCode) {
              item.sourceName = val.rfsName;
            }
          });
            return item;
        });
        // console.log(result);
        // 去除非大区的数据
        result.forEach( (item: any) => {
          if (item.sourceName) {
            area.push(item);
          }
        });
        // console.log(result);
        // // 给visualMap设定峰值
        // area.sort( (a: any, b: any) => {
        //   return b.leadsNum - a.leadsNum;
        // });
        // // console.log(area);
        // if (area.length > 0) {
        //   this.peakValue = area[0].leadsNum;
        // }

        // area = [
        //   {source: 'SQR703', sourceName: '南方区-卫旻', leadsNum: 210, 
        //   areaMap: {
        //     广东省: ['深圳市', '清远市', '揭阳市', '东莞市', '中山市', '江门市', '汕头市', '珠海市', '佛山市', '肇庆市', '茂名市', '湛江市', '惠州市', '广州市'],
        //     // 海南省: ['海口市'],
        //     // 上海市: ['上海市'],
        //     // 天津: ['狗不理'],
        //     内蒙古自治区: ['啊，蒙古包'],
        //     新疆维吾尔自治区: ['啊，羊肉串'],
        //     // 广西壮族自治区: ['啊，荔枝'],
        //     // 西藏自治区: ['啊，牦牛'],
        //     // 宁夏回族自治区: ['啊，枸杞'],
        //     // 合肥市: ['123']
        //   }},
        //   {
        //     source: 'SQRW60', sourceName: '上海区-某某某', leadsNum: 390,
        //     areaMap: {
        //       内蒙古自治区: ['啊，蒙古包'],
        //     }
        //   }
        // ];

        // 一个省属于多个大区
        // console.log(area);
        area.forEach( (item: any) => {
          Object.keys(item.areaMap).forEach( (val: any) => {
            // console.log(usearea);
            let repeat =  usearea.some( (i: any) => {
              return (i.name === val);
            });
            if (!repeat) {
              usearea.push({
                name: val,
                area: item.sourceName,
                value: item.leadsNum,
                belong: [
                  {
                    name: val,
                    area: item.sourceName,
                    value: item.leadsNum,
                  }
                ],
              });
            } else {
              usearea.forEach( (j: any) => {
                Object.keys(item.areaMap).forEach((provinceName, index) => {
                  if ( j.name === provinceName ) {
                    j.area += ` | ${item.sourceName}`;
                    // console.log(j.area);
                    j.value += item.leadsNum;
                    // console.log(j.value);
                    j.belong.push({
                      name: provinceName,
                      area: item.sourceName,
                      value: item.leadsNum,
                    });
                  }
                });
              });
            }
          });
        });
        // 给visualMap设定峰值
        usearea.sort( (a: any, b: any) => {
          return b.value - a.value;
        });
        // console.log(usearea);
        if (usearea.length > 0) {
          this.peakValue = usearea[0].value;
        }
        // 大区改名
        usearea = usearea.map( (item: any) => {
          item.name = this.Superfluous(item.name);
          return item;
        });
        usearea.forEach((item: any) => {
          item.belong = this.mergeArr(item.belong);
        });

        this.mapData = usearea;
        // this.mapData = provienceData;
        // console.log(this.mapData);
        this.winGuestMapInit();
      }
      if (Object.keys(this.currentArea)[0] === 'rfsCode') {
        let smallArea: any = [];
        this.nowAreaData.forEach( (item: any) => {
          if (item.rfsCode === Object.values(this.currentArea)[0]) {
            smallArea = item.children;
          }
        });
        // console.log(smallArea);
        // 添上小区名字
        result = result.map( (item: any) => {
          smallArea.forEach( (val: any) => {
            if (item.source === val.macCode) {
              item.sourceName = val.macName;
            }
          });
            return item;
        });
        // console.log(result);
        result.forEach( (item: any) => {
          if (item.sourceName) {
            area.push(item);
          }
        });
        // console.log(area);
        area.sort( (a: any, b: any) => {
          return b.leadsNum - a.leadsNum;
        });
        // console.log(area);
        if (area.length > 0) {
          this.peakValue = area[0].leadsNum;
          area.forEach( (item: any) => {
           let arr: any = Object.values(item.areaMap)[0];
          //  console.log(arr);
            arr && arr.forEach( (val: any) => {
              usearea.push({
                name: this.Superfluous(val),
                area: item.sourceName,
                value: item.leadsNum
              });
            });
          });
        }
        // console.log(usearea);
        this.mapData = this.convertData(usearea);
        this.winGuestMapInit();
        // console.log(this.mapData);
      }
      if (Object.keys(this.currentArea)[0] === 'macCode') {
        // let dealerparams = {};
        // dealerparams = Object.assign(dealerparams, this.currentArea);
        // $api.DashboardApi.dealersData(dealerparams).then( (res: any) =>{
        //   console.log(res);
        // })

        this.winGuestMapInit();
      }
    });
  }
  mergeArr(arr: any[]) {
    let newArr: any[] = [];
    arr.forEach( item => {
      let dataItem = item;
      if (newArr.length > 0) {
        let filterValue = newArr.filter(v => {
          return v.area === dataItem.area;
        });
        if (filterValue.length > 0) {
          newArr.forEach( n => {
            if ( n.area === filterValue[0].area && n.name === filterValue[0].name ) {
              n.value = filterValue[0].value + dataItem.value;
            } 
          });
        } else {
          newArr.push(dataItem);
        }
      } else {
        newArr.push(dataItem);
      }
    });
    return newArr;
  }
  // 获取大区
  getAllArea() {
    let params = {
        brandId: this.brandId,
        type: this.time.key,
    };
    if (Object.keys(this.currentArea)[0] !== 'all') {
      params = Object.assign(params, this.currentArea);
    }
    $api.DashboardApi.areaData(params).then( (area: any) => {
      let codeandName: any = [];
      let areaCode: any;
      area.forEach((item: any) => {
        codeandName.push(`${item.rfsCode}:` + item.rfsName);
      });
      let setcode = new Set(codeandName);
      let arrcode = Array.from(setcode);
      areaCode = arrcode.map( (item: any) => {
        return {
          rfsCode: item.split(':')[0],
          rfsName: item.split(':')[1],
          children: []
        };
      });
      area.forEach( (item: any) => {
        areaCode.forEach( (val: any) => {
          if (item.rfsCode === val.rfsCode) {
            val.children.push({
              macCode: item.macCode,
              macName: item.macName
            });
          }
        });
      });
      this.nowAreaData = areaCode;
      // console.log(this.nowAreaData);
      this.init();
    });
  }

  Superfluous(str: string) {
    // console.log(str);
    if (str.endsWith('省')) {
      return str.replace('省', '');
    } else if (str.endsWith('市')) {
      return str.replace('市', '');
    } else if (str.endsWith('自治区')) {
      switch (str) {
        case '内蒙古自治区' :
          return '内蒙古';
        case '新疆维吾尔自治区':
          return '新疆';
        case '广西壮族自治区' :
          return '广西' ;
        case '西藏自治区' :
          return '西藏' ;
        case '宁夏回族自治区' :
          return '宁夏' ;
      }
    } else if (str.endsWith('特别行政区')) {
      return str.replace('特别行政区', '');
    } else {
      return str;
    }
  }


}
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  p {
    height: 50px;
    font-size: 36px;
    line-height: 50px;
    position: absolute;
    top: 30px;
    left: 40px;
  }
  .hr {
    position: absolute;
    top: 100px;
    width: 100%;
    height: 2px;
    background: #1e2237;
  }
  .chinaIcon {
    width: 100%;
    height: 660px;
    position: absolute;
    // left: 172px;
    bottom: 0;
    // border: 1px solid #fff;
  }
  img {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>
