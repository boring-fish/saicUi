/**
  * @description: 成交战败详情-每日量
  * @author: qian.wan
  * @date: 
  */
<template>
  <div v-show="changeShowEcharts"  class="channelbar-wrap" :id="id" style="width: 898px;height: 1070px;">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop , Watch} from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class ChannelBar extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  }) id!: string;

  @Prop({
    required: false,
    default: ''
  }) type!: string;

  @Prop({
    required: false,
    default: () => []
  })dayArr!: [];

  changeShowEcharts: boolean = true;
  @Watch('type')
typeChange() {
// if (this.type === '成交') {
//     this.dailybarEcharts();
// } else {
//   console.log(111);
//   this.defeatEcharts();
//   console.log(222);
// }

    // this.dailybarEcharts();
}
  @Watch('dayArr')
  dayArrChange() {
      if (this.dayArr.length === 0) {
          this.changeShowEcharts = false;
      } else {
        this.changeShowEcharts = true;
        this.dailybarEcharts();
      }
  }
  created() {
    //
  }

  mounted() {
    // console.log(this.type);
    // console.log(this.dayArr);
    this.dailybarEcharts();
  }

  dailybarEcharts() {
    if ((this as any).dayArr.length === 0) {
      return;
    } else {
      let newDayarr: any = (this as any).dealWithdayArr((this as any).dayArr);
      // console.log(newDayarr);
      if (newDayarr.length === 0) {
        return;
      } else {
      // console.log(newDayarr ,11111);
       let newArr: any[] = [];
          newDayarr.forEach((item: any) => {
              newArr.push(item.num);
          });
    let chat: object = (this as any).$echarts.init(document.getElementById((this as any).id));
    let option: object = {
        grid: {
            top: 106,
            left: 60,
            right: 60,
            bottom: 120,
          },
        xAxis: {
          show: true,
          axisTick: {
            show: false,
          },
          type: 'category',
          data: ['周日', '周一', '周二', '周三', '周四', '周五' , '周六'],
          axisLabel: {
              color: 'rgba(255,255,255,0.6)',
              fontSize: 28,
              margin: 40,
            },
    },
    yAxis: {
        show: false,
        type: 'value',
        max: Math.max(...newArr)
    },
    series: [{
        data: [{
          
          value: newDayarr[0].num || 0,
          label: {
            distance: (this as any).maxNumber(newDayarr, newDayarr[0].num),
          } 
        }, {
          
          value:  newDayarr[1].num || 0,
          label: {
            distance: (this as any).maxNumber(newDayarr , newDayarr[1].num),
          } 
        }, {
          
          value:  newDayarr[2].num || 0,
          label: {
            distance: (this as any).maxNumber(newDayarr , newDayarr[2].num),
          } 
        }, {
          
          value:  newDayarr[3].num  || 0,
          label: {
            distance: (this as any).maxNumber(newDayarr , newDayarr[3].num),
          } 
        }, {
          
          value:  newDayarr[4].num  || 0,
          label: {
            distance: (this as any).maxNumber(newDayarr , newDayarr[4].num),
          } 
        }, {
          
          value:  newDayarr[5].num  || 0,
          label: {
            distance: (this as any).maxNumber(newDayarr , newDayarr[5].num),
          } 
        },
        {
          value:  newDayarr[6].num  || 0,
          label: {
            distance: (this as any).maxNumber(newDayarr , newDayarr[6].num),
          } 
        },
        
        ], 
        type: 'bar',
        itemStyle: {
          color: '#236BB4',
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 24,
        },
        barWidth: '45%',
        showBackground: true,
        backgroundStyle: {
            color: '#090C15',
        }
    }]
      };
    (chat as any).setOption(option);
      }

    }

  }
  maxNumber(max: any , num: any) {
      let newArr: any[] = [];
      max.forEach((item: any) => {
        newArr.push(item.num);
      });
      let newNumber: any = (Math.max(...newArr) - num) * (844 / Math.max(...newArr) );
      return newNumber + 15;
  }

  //   defeatMaxNumber(max: any , num: any) {
  //     let newArr: any[] = [];
  //     max.forEach((item: any) => {
  //       newArr.push(item.defeat);
  //     });
  //     let newNumber: any = (Math.max(...newArr) - num) * (844 / Math.max(...newArr) );
  //     return newNumber + 20;
  // }


dealWithdayArr(arr: any) {

  if (arr.length === 0) {
    return [];
  }
  else {
  let newArr: any = [];
  arr.forEach((item: any) => {
      newArr.push(item);
  });
  if (newArr.length === 7) {
     newArr = newArr.sort((a: any, b: any) => {
          return a.dayWeek - b.dayWeek;
        });
     let lastOne = newArr.splice((newArr.length - 1) , 1);
     newArr.unshift(lastOne[0]);
     return newArr;
  } else {
    let arr1 = [
        {num: 0 , dayWeek: 7},
        {num: 0 , dayWeek: 1},
        {num: 0 , dayWeek: 2},
        {num: 0 , dayWeek: 3},
        {num: 0 , dayWeek: 4},
        {num: 0 , dayWeek: 5},
        {num: 0 , dayWeek: 6}
       ];
    let map = new Map();
    newArr.forEach((item: any) => {
      map.set(item.dayWeek , 1);
    });
    for (let i = 0 ; i < arr1.length; i++) {
      if (map.get(arr1[i].dayWeek)) {
        continue;
        
      } else {
        newArr.push(arr1[i]);
      }
    }

     newArr = newArr.sort((a: any, b: any) => {
          return a.dayWeek - b.dayWeek;
        });
     let lastOne = newArr.splice((newArr.length - 1) , 1);
     newArr.unshift(lastOne[0]);
     return newArr;
   }
  }

}

}
</script>

<style lang="scss">

</style>

