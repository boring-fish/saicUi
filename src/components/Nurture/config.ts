//不同渠道下漏斗的配置
//每个block的高度差 144
export const funnelConfig: any = {
    name: '展厅主动开拓',
    unit: true, //主文本数据值是否转变成带单位格式
    block: [{
        label: '战败池',
        key: 'faiNum',
        text: [
        {
            name: '高意向比率',
            numerator: 1,
            denominator: 0,
            position: 'left_as_right',
            percent: 'highOpporRate'
            
            
        }, 
        ]
    }, {
        label: '高意向挽回',
        key: 'highOpporRecover',
        text: [
        {
            name: '接通率',
            numerator: 2,
            denominator: 1,
            position: 'left_as_right',
            percent: 'connectRate'

            
            
        }, 
        ]
    }, {
        label: '触达客户',
        key: 'contactCust',
        text: [
            {
                name: '下发率',
                numerator: 3,
                denominator: 2,
                position: 'left_as_right',
                percent: 'issuedRate'
                
                
            }, 
        ]
    }, {
        label: '下发意向数',
        key: 'issuedNum',
        text: [
        {
            name: '成交率',
            numerator: 4,
            denominator: 3,
            position: 'left_as_right',
            percent: 'dealRate'

            
            
        },
        ]
    }, {
        label: '成交',
        key: 'orderNum',
        
    },
    ],

};
    