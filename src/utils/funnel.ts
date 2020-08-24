import { numberFormat, getPercent } from '@/utils/utils';

export function renderItem(config: any, data: any, coord?: any, width?: any, height?: any): any {
    return (params: object, api: object, ) => {
        const colors = [
            {
              arc: '#44296C',
              body: '#2C1E52',
              border: 'rgba(85, 42, 150, 0.4)'
            },
            {
              arc: '#5F2828',
              body: '#3E1720',
              border: 'rgba(131, 26, 26, 0.4)'
            },
            {
              arc: '#55342C',
              body: '#482322',
              border: 'rgba(156, 56, 29, 0.4)'
            },
            {
              arc: '#154C24',
              body: '#0D3322',
              border: 'rgba(7, 96, 31, 0.4)'
            },
            {
              arc: '#1D4A51',
              body: '#123744',
              border: 'rgba(21, 104, 116, 0.4)'
            },
            {
              arc: '#1E4266',
              body: '#143052',
              border: 'rgba(25, 88, 149, 0.4)'
            },
          ];
        
          const block = config.block;
          const dataIndex = (params as any).dataIndex;
          const label: any[] = []; //主体文本块
          const text: any[] = []; //两侧文本块
        
          let pathes: any[] = [];
          let start_coord = coord ? Object.assign({}, coord) : ( block.length === 5 ? {x: 286, y: 118} : {x: 286, y: 48}); //起始坐标
          const PART_WIDTH = width ? [...width] : [430, 374, 322, 270, 214, 172] ; //漏斗每部分的长边宽度
          const PART_HEIGHT = height ? height : 92; //漏斗每部分高度
          const ARC_HEIGHT = 20; 
          const SURPLUS = 24; //长边突出短边宽度
          // const ARC = [ //不同跨阶数的箭头曲线弧度
          //   {
          //     radii: '40,267',
          //     ending: '20,267',
          //   },
          //   {
          //     radii: '40,267',
          //     ending: '20,267',
          //   },
          //   {
          //     radii: '40,395',
          //     ending: '20,395',
          //   },
          //   {
          //     radii: '40,267',
          //     ending: '20,267',
          //   },
          // ]
        
          for ( let i = 0; i < block.length; i++) {
            let value = data[block[i].key] ? data[block[i].key] : ''; //各块的主文本数据值
            //转换成带单位格式
            if (config.unit) {
              const format = numberFormat(value);
              value = format.value + format.unit;     
            }
            // let percent = 1 - (data[i] as any).achieve / (data[i] as any).target; //目标完成率
            let bottom_width =  PART_WIDTH[i] - SURPLUS * 2; //下边（短边）宽度
            // let width_tint  = PART_WIDTH[i] * percent / 2; //浅色部分宽度   
            let top = `M${start_coord.x},${start_coord.y} a${PART_WIDTH[i] / 2},${ARC_HEIGHT} 0 0 1 ${PART_WIDTH[i]},0 z`; //顶部即圆弧部分
            let body = `M${start_coord.x},${start_coord.y} l${PART_WIDTH[i]},0 -${SURPLUS} ${PART_HEIGHT} -${bottom_width},0 z`; //主体部分
            // let left = `M${start_coord.x},${start_coord.y} l${width_tint},0  ${SURPLUS} ${PART_HEIGHT} -${width_tint},0 z`; //左边浅色部分
            // let right = `M${start_coord.x + PART_WIDTH[i] - width_tint},${start_coord.y} l${width_tint},0 -${SURPLUS} ${PART_HEIGHT} -${width_tint},0  z`; //右边浅色部分
            
            // pathes.push([top, body, left, right]);
            pathes.push([top, body]);
        
            //主体文本块文本
            

            label.push( {
              name: `${block[i].label}\n${value}`,
              positionX: start_coord.x + PART_WIDTH[i] / 2,
              positionY: start_coord.y + 20,
            } );
        
            //两侧文本块文本
            if (block[i].text ) {
        
              text[i] = [];
              block[i].text.forEach( ( item: any ) => {
                let color = '#236BB4';
                let textX = 0;
                let textY = 0;
                let pathX = 0;
                let pathY = 0;
                let pathLine = '';
                let pathArrow = '';
                let name = '';
                let percent = getPercent( data[block[item.numerator].key], data[block[item.denominator].key]);
        
                if ( item.position === 'left') {
                  
                  //根据item.numerator - item.item.numerator的段数计算箭头曲线长度（略去）
                  //目前根据funnelConfig自定义配置
                  const radiusX = item.radii.length === 2 ? item.radii[0] : 40;
                  const radiusY = item.radii.length === 2 ? item.radii[1] : 131;
                  const endingX = item.ending.length === 2 ? item.ending[0] : 20;
                  const endingY = item.ending.length === 2 ? item.ending[1] : 113;
        
                  name = item.name.split('').join('\n');
                  name += percent === '' ? '' : `\n` + percent + `\n` + '%' ;
                  pathX = start_coord.x - 75 + item.avertence ;
                  pathY = start_coord.y + PART_HEIGHT;
                  pathLine = `M ${pathX + 20},${pathY} a${radiusX},${radiusY} 0 0,1 ${endingX},${endingY}`;
                  pathArrow = `M  ${pathX + 40},${pathY + endingY - 16} l 0 16 l -16 -16 z`;
                  textX = pathX - 20;
                  textY = pathY + 20;
                  
                  
                } else if ( item.position === 'right' ) {
                  color = colors[item.denominator].arc;
                  name = item.name.match(/\S{1,5}/g).join('\n');
                  name += percent === '' ? '' : `\n` + percent + '%' ;
                 
                  pathX = start_coord.x + PART_WIDTH[i] + 44;
                  pathY = start_coord.y + PART_HEIGHT;
                  pathLine = `M ${pathX},${pathY} a20,113 0 0,0 -15,113`;
                  pathArrow = `M ${pathX - 15 },${pathY + 113 - 16} l  16 0 l -16 16 z`;
                  textX = pathX + 90;
                  textY = pathY + 40;
                } else {
                    color = colors[item.denominator].arc;
                    name = item.name + (data[item.percent] * 100).toFixed(2) + '%' ;
                   
                    pathX = start_coord.x - 44;
                    pathY = start_coord.y + PART_HEIGHT;
                    pathLine = `M ${pathX},${pathY} a20,113 0 0,1 20,113`;
                    pathArrow = `M ${pathX + 20 },${pathY + 113 - 16} l  -16 0 l 16 16 z`;
                    textX = pathX - 120;
                    textY = pathY + 50 ;
                }
        
                text[i].push( {
                  name, //文本块文本
                  textX, //文本块X坐标
                  textY, //文本块Y坐标
                  pathLine, //文本块的曲线
                  pathArrow, //文本块的箭头
                  color, //箭头曲线颜色
        
                } );
              });
              //两侧文本块起始坐标
              // textPosition.push({
              //   left: {
              //     x: start_coord.x - 75,
              //     y: start_coord.y + PART_HEIGHT,
              //   },
              //   right: {
              //     x: start_coord.x + PART_WIDTH[i] + 82,
              //     y: start_coord.y + PART_HEIGHT,
              //   }
                
              // });
        
            }    
        
            start_coord.x += 28;
            start_coord.y += 144;
            
          }
          console.log(text);
          let render = {
              type: 'group',
              children: [{
                    type: 'path',
                shape: {
                        pathData: pathes[dataIndex][0],
                      },
                style: {
                    fill: colors[dataIndex].arc,
                    stroke: colors[dataIndex].border,
                  }
              },
              {
                  type: 'path',
                shape: {
                        pathData: pathes[dataIndex][1],
                        },
                style: {
                    fill: colors[dataIndex].body,
                    stroke: colors[dataIndex].border,
                    lineWidth: 1,
                  }
              },
              //   {
              //     type: 'path',
              // shape: {
              //         pathData:  pathes[dataIndex][2],
              //         },
              // style: {
              //     fill: 'rgba(255,255,255,0.2)',
              //     stroke: colors[dataIndex][1],
              //         }
              // },
              // {
              //     type: 'path',
              // shape: {
              //         pathData: pathes[dataIndex][3],
              //         },
              // style: {
              //     fill: 'rgba(255,255,255,0.2)',
              //     stroke: colors[dataIndex][1],
              //         }
              // },
              {
                  type: 'text',
                  
                  style: {
                      text: label[dataIndex].name,
                      x: label[dataIndex].positionX,
                      y: label[dataIndex].positionY,
                      font: '28px/32px PingFangSC-Regular',
                      fill: '#fff',
                      textAlign: 'center',
                  }
              },
              ]};
        
              if ( text[dataIndex]) {
                 text[dataIndex].forEach( ( item: any ) => {
                 
                  console.log(item.path);
                  render.children.push(   {
                  type: 'text',         
                  style: {
                      text: item.name,
                      x: item.textX,
                      y: item.textY,
                      font: '28px/32px PingFangSC-Regular',
                      fill: 'rgba(255,255,255,0.6)',
                      textAlign: 'center',
                    }
                  }, {
                  type: 'path',
                  shape: {
                          pathData: item.pathLine,
                          },
                  style: {
                      fill: 'transparent',
                      stroke: item.color,
                      lineWidth: 6,
                    }
                   }, {
                  type: 'path',
                  shape: {
                          pathData: item.pathArrow,
                          },
                  style: {
                      fill: item.color,
                      stroke: item.color,
                      lineWidth: 0,
                    }
                   });
                });
              }
             
        
              // if ( this.isR ) {
              //   render.children.push({
              //     type: 'text',
                  
              //     style: {
              //         text: label,
              //         x: (labelPosition[dataIndex] as any).left.x,
              //         y: (labelPosition[dataIndex] as any).left.y,
              //         font: '28px/32px PingFangSC-Regular',
              //         fill: 'rgba(255,255,255,0.6)',
              //         textAlign: 'center',
              //     }
              // },
        
              // {
              //     type: 'text',
                  
              //     style: {
              //         text: label,
              //         x: (labelPosition[dataIndex] as any).right.x,
              //         y: (labelPosition[dataIndex] as any).right.y,
              //         font: '28px/32px PingFangSC-Regular',
              //         fill: 'rgba(255,255,255,0.6)',
              //         textAlign: 'center',
              //     }
              // }
              // );
              // }
          return render;
    };
    
      
}