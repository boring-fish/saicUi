// export const mainColors = [
//   '#007DD5',
//   '#FF9020',
//   '#7881C1',
//   '#0BBBB3',
//   '#FFBD00',
//   '#FF4A55',
//   '#006681',
//   '#21B979',
//   '#EB5FAF',
//   '#38DEF4',
//   '#4EF1A3',
//   '#B6E56B'
// ];

// export const titleColor = '#0C2A4C';
// export const subTitleColor = '#8494a6';
// export const axisColor = '#d8d8d8';
// export const axisLabelColor = '#8494a6';
// export const legendTextColor = '#0C2A4C';
// export const splitColor = '#d8d8d8';
// export const rangeColors = ['#ffbd00', '#ff4a55'];
// export const blankColor = '#FFFFFF';
// export const tooltipBack = 'rgba(43, 81, 116, 0.8)';
// export const axisPointerLineColor = '#ABB8C4';
// // equal echarts default
// export const lineSeriesDefault = {
//   symbolSize: 2,
//   lineStyle: { width: 2 }
// };

// const listeners: any[] = [];
// let resizeTimer: any = null;
// type OptionParams = {
//   title?: string;
//   subTitle?: string;
//   legendData?: any[];
//   visualMapMax?: number;
//   // tooltipFormatter?: string | () =>  string ;
//   tooltipFormatter?: any;
//   hasAxis?: boolean;
//   xAxisData?: any[];
//   useToolbox?: boolean;
// };
// // 样式统一：
// // TODO: yAxis splitLine height:39 (dashboard)
// // TODO: legend icon distance with text
// // TODO: axisPointer icon size

// // 参考 https://www.echartsjs.com/option3.html#title
// export function generateOption(optionParams: OptionParams): any {
//   let {
//     title,
//     subTitle,
//     legendData,
//     visualMapMax,
//     tooltipFormatter,
//     hasAxis,
//     xAxisData,
//     useToolbox
//   } = optionParams;
//   if (xAxisData) hasAxis = true;
//   if (useToolbox === undefined) useToolbox = true;
//   const shareOption = {
//     color: mainColors,
//     grid: {
//       top: 70,
//       left: 10,
//       right: 10,
//       bottom: 0,
//       containLabel: true,
//       backgroundColor: '#FFFFFF'
//     },
//     tooltip: {
//       trigger: hasAxis ? 'axis' : 'item',
//       backgroundColor: tooltipBack,
//       axisPointer: {
//         lineStyle: {
//           color: axisPointerLineColor,
//           width: 1
//         }
//       },
//       // extraCssText: 'max-width:400px;break-word:all;overflow:auto',
//       // alwaysShowContent: true,
//       formatter: tooltipFormatter
//     }
//   };
//   const targetOption: any = {};
//   if (title) {
//     targetOption.title = {
//       text: title,
//       textStyle: {
//         color: titleColor,
//         fontSize: 16,
//         fontWeight: 'normal'
//       },
//       subtext: subTitle,
//       subtextStyle: {
//         color: subTitleColor
//       }
//     };
//   } else {
//     shareOption.grid.top = 30;
//   }

//   if (legendData) {
//     targetOption.legend = {
//       type: 'scroll',
//       show: true,
//       bottom: 0,
//       textStyle: {
//         color: legendTextColor,
//         fontSize: 12
//       },
//       itemGap: 20,
//       orent: 'horizontal',
//       pageButtonPosition: 'end',
//       itemWidth: 10,
//       itemHeight: 10,
//       data: legendData
//     };
//     shareOption.grid.bottom = 30;
//   }
//   if (visualMapMax) {
//     targetOption.visualMap = [
//       {
//         orient: 'horizontal',
//         min: 0,
//         max: visualMapMax,
//         calculable: true,
//         top: 5,
//         right: 80,
//         inRange: {
//           color: rangeColors
//         },
//         range: [1, visualMapMax]
//       }
//     ];
//   }
//   if (hasAxis) {
//     targetOption.xAxis = {
//       type: 'category',
//       data: xAxisData,
//       axisLabel: {
//         show: true,
//         color: axisLabelColor,
//         fontSize: 12
//       },
//       axisLine: {
//         lineStyle: {
//           color: axisColor
//         }
//       }
//     };
//     targetOption.yAxis = {
//       type: 'value',
//       lineStyle: {
//         color: axisColor
//       },
//       axisLabel: {
//         show: true,
//         color: axisLabelColor,
//         fontSize: 12
//       },
//       axisTick: {
//         show: false
//       },
//       axisLine: {
//         show: false
//       },
//       splitLine: {
//         lineStyle: {
//           color: splitColor
//         }
//       }
//     };
//   }

//   if (useToolbox) {
//     targetOption.toolbox = {
//       show: true,
//       feature: {
//         saveAsImage: {}
//       },
//       top: 0,
//       right: 5,
//       iconStyle: {
//         normal: {
//           borderColor: titleColor,
//           borderWidth: 1
//         }
//       }
//     };
//   }
//   return Object.assign({}, shareOption, targetOption);
// }

// export function blankMsgOption(xAxisData, legendData = null) {
//   let blankOption: any = {
//     grid: {
//       top: 70,
//       left: 10,
//       right: 10,
//       bottom: 0,
//       containLabel: true,
//       backgroundColor: '#FFFFFF'
//     },
//     title: {
//       show: true,
//       textStyle: {
//         color: axisLabelColor,
//         fontSize: 20
//       },
//       text: $i18n.get('common.nodata'),
//       left: 'center',
//       top: 'center'
//     },
//     xAxis: {
//       type: 'category',
//       data: xAxisData,
//       axisLabel: {
//         show: true,
//         color: axisLabelColor,
//         fontSize: 12
//       },
//       axisLine: {
//         lineStyle: {
//           color: axisColor
//         }
//       }
//     },
//     yAxis: {
//       show: true,
//       type: 'value',
//       axisLine: {
//         lineStyle: {
//           color: axisColor
//         }
//       }
//     },
//     series: []
//   };

//   if (legendData) {
//     blankOption.legend = {
//       type: 'scroll',
//       show: true,
//       bottom: 0,
//       textStyle: {
//         color: legendTextColor,
//         fontSize: 12
//       },
//       itemGap: 20,
//       orent: 'horizontal',
//       pageButtonPosition: 'end',
//       itemWidth: 10,
//       itemHeight: 10,
//       data: legendData
//     };
//     blankOption.grid.bottom = 30;
//     for (let i = 0; i < legendData.length; i++) {
//       blankOption.series.push({ type: 'line', data: [], name: legendData[i] });
//     }
//   }
//   return blankOption;
// }

// function publishResize() {
//   if (resizeTimer) clearTimeout(resizeTimer);
//   if (listeners.length) {
//     resizeTimer = window.setTimeout(() => {
//       listeners.forEach(callback => {
//         callback();
//       });
//     }, 300);
//   }
// }

// export function subscribeResize(listener) {
//   if (listeners.indexOf(listener) === -1) {
//     listeners.push(listener);
//   }
//   window.addEventListener('resize', publishResize);
// }

// export function unSubscribeResize(listener) {
//   let idx = listeners.indexOf(listener);
//   if (idx !== -1) {
//     listeners.splice(idx, 1);
//   }
//   if (!listeners.length) {
//     window.removeEventListener('resize', publishResize);
//   }
// }
