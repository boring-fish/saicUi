import _, { LoDashExplicitNillableArrayWrapper } from 'lodash';
export function observerDomResize(dom: any, callback: any) {
  const MutationObserver = window.MutationObserver;
  const observer = new MutationObserver(callback);
  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true
  });
  return observer;
}

export function getPointDistance(pointOne: any, pointTwo: any) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0]);
  const minusY = Math.abs(pointOne[1] - pointTwo[1]);
  return Math.sqrt(minusX * minusX + minusY * minusY);
}
export function calculation(thisPeriod: any, samePeriod: any) {
  if ( samePeriod === 0) {
      return '';
  } else {
    let data: any = ((thisPeriod - samePeriod) * 100) / samePeriod;
    data = `${data.toFixed(2)}%`;
    return data;
  }

}

export function toTenThousandStr(data: number): string {
  let str = '';
  str = data > 1000 ? Math.floor( data / 10000) + '万' : data + '';
  return  str;
}
export function numberFormat(value: any) {
  let param: any = {};
  let k = 10000,
   sizes = ['' , '万', '亿', '万亿'],
   i;
   if (value < k) {
       param.value = Math.floor(value) === Number(value) ? value : Number(value).toFixed(2);
       param.unit = '';
   } else {
       i = Math.floor(Math.log(value) / Math.log(k)); 
       param.value = ((value / Math.pow(k, i))).toFixed(2);
       param.unit = sizes[i];
   }
  param.value = isNaN(param.value) ? '' : param.value;
 return param;
}

export function finishingRate(num: number, kpi: number) {
  if (kpi) {
    let finish = ((num / kpi) * 100).toFixed(2);
    return `${finish}%`;
  } else {
    return '0%';
  }

}

export function areadataToMap(arr: any[]) {
  if (!arr || !arr.length) {
    return {};
  }
  let r: any = [];
  arr.forEach((element: any, index: number) => {
    r.push({
      rfsCode: element.rfsCode,
      rfsName: element.rfsName
    });
  });
  r = _.uniqBy(r, 'rfsCode');
  r.forEach((item: any, index: number) => {
    item['children'] = [];
    arr.forEach((element, index) => {
      if ( item.rfsCode === element.rfsCode ) {
        item['children'].push({
          macCode: element.macCode,
          macName: element.macName,
        });
      }
    });
  });
  return r;
}

/**
 * @method divideArr
 * @description 根据属性将数组分组
 * @param {arr: object[], attribute: string, list: string}
 * @return {newArr: obejct[]} 
 * @author qian.wan
 * 
 */
export function  divideArr( arr: object[], attribute: string = 'name', list: string = 'list') {

  const map = new Map();
  return arr.reduce( (pre: any[], cur: any) => {
    // 区分到店和试乘
    const index = map.get(cur[attribute]);
    // 将相同sourceType的对象放入同一数组
    if (index !== undefined) {
      pre[index][list].push(cur);
    } else {
      pre.push({
        [attribute]: cur[attribute],
        [list]: [cur]
      });
      map.set(cur[attribute], pre.length - 1);
    }
    return pre;
}, []);
}

/**
 * @method divideArrToObj
 * @description 根据属性将数组分组成对象组
 * @param {arr: object[], attribute: string, total?: string}
 * @return {newArr: obejct} 
 * @author qian.wan
 * 
 */
export function  divideArrToObj( arr: object[], attribute: string = 'name', total?: string) {
  return arr.reduce( (pre: any, cur: any) => {
    pre[cur[attribute]] = pre[cur[attribute]] || [];
    pre[cur[attribute]].push(cur);
    if ( total) {
      pre[total] = pre[total] || [];
      pre[total].push(JSON.parse(JSON.stringify(cur)));
      // console.log(pre[total]);
    }
    // console.log(pre, attribute);
    return pre;
  }, {});
}

/**
 * @method combineArrItem
 * @description 根据属性将数组分组成对象组
 * @param {arr: object[], attribute: string, combineAttr: string}
 * @return {newArr: obejct} 
 * @author qian.wan
 * 
 */
export function  combineArr( arr: object[], attribute: string = 'name', combineAttr: string = 'num') {
  const map = new Map();
  return arr.reduce( (pre: any, cur: any) => {
    const index = map.get(cur[attribute]);
    if (index !== undefined) {
      pre[index][combineAttr] += Number(cur[combineAttr]);
    } else {
      cur[combineAttr] = cur[combineAttr] ? Number(cur[combineAttr]) : 0;
      pre.push(cur);
      map.set(cur[attribute], pre.length - 1);
    }
    return pre;
  }, []);
}

/**
 * @method getPercent
 * @description 获取百分比，不带%,保留round位小数
 * @param {curNum: number, totalNum: number, round: number = 0}
 * @return string
 * @author qian.wan
 * 
 */
export function getPercent(curNum: number, totalNum: number, round: number = 0, unit: boolean = false ): string {
    if (isNaN(curNum) || isNaN(totalNum) || totalNum === 0) {
        return '';
    }

    const result = Math.round(curNum / totalNum * 100 * (10 ** round)) / ( 10 ** round);
    return unit ? ( result + '%' ) : ( result + '' );
}



export function seriesdataToMap(arr: any[]) {
  if (!arr || !arr.length) {
    return {};
  }
  let r: any = [];
  arr.forEach((element: any, index: number) => {
    r.push({
      brandId: element.brandId,
    });
  });
  r = _.uniqBy(r, 'brandId');
  r.forEach((item: any, index: number) => {
    item['children'] = [];
    arr.forEach((element, index) => {
      if ( item.brandId === element.brandId ) {
        item['children'].push({
          seriesId: element.seriesId,
          seriesChineseName: element.seriesChineseName,
        });
      }
    });
  });
  return r;
}

export function dateFormat(date: any, format: string = 'yyyy-MM-dd HH:mm:ss') {
  let o: any = {
      'M+' : date.getMonth() + 1,                 //月份
      'd+' : date.getDate(),                    //日
      'H+' : date.getHours(),                   //小时
      'h+' : date.getHours(),                   //小时
      'm+' : date.getMinutes(),                 //分
      's+' : date.getSeconds(),                 //秒
      'q+' : Math.floor((date.getMonth() + 3) / 3), //季度
      'S'  : date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
  }
  return format;
}

export const saveLocal = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocal = (key: string) => {
  let data = localStorage.getItem(key);
  if (!data || data === 'undefined') {
    return null;
  } else {
    return JSON.parse(data);
  }
};

export const saveSession = (key: string, data: any) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getSession = (key: string) => {
  let data = sessionStorage.getItem(key);
  if (!data || data === 'undefined') {
    return null;
  } else {
    return JSON.parse(data);
  }
};

/**
 * @method decideColor
 * @description 
 * @param {actual: any, AlarmCycle: any, round: EarlyWarCycle: any}
 * @return 0 白色 1 红 2 黄 3 绿色
 * @author qi.chen
 */
export function decideColor(actual: any ,  AlarmCycle: any , EarlyWarCycle: any , symbol: any = '高于') {
  // let alarm = AlarmCycle * 100;
  // let earlWarLeft = EarlyWarCycle.split(',')[0] * 100;
  // let earlWarRight = EarlyWarCycle.split(',')[1] * 100;
  // let value = Number(actual.split('%')[0]);
  // console.log(value , alarm , earlWarLeft , earlWarRight , '计算的值');
  if (!actual || !AlarmCycle || !EarlyWarCycle) {
    return 0;
  } else {
    let alarm = AlarmCycle * 100;
    let earlWarLeft = EarlyWarCycle.split(',')[0] * 100;
    let earlWarRight = EarlyWarCycle.split(',')[1] * 100;
    let value = Number(actual.split('%')[0]);

    if (symbol === '高于') {
      if (value > alarm) {
        return 1;
      } else if (value >= earlWarLeft && value <= earlWarRight) {
        return 2;
      } else {
        return 3;
      }
    } else {
      if (value < alarm) {
        return 1;
      } else if (value >= earlWarLeft && value <= earlWarRight) {
        return 2;
      } else {
        return 3;
      }
    }
  }
}