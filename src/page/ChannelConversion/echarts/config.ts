//不同渠道下漏斗的配置
//每个block的高度差 144
export const funnelConfig: any = {
    '全部': {
        name: '全部',
        block: [{
            label: '获客',
            key: 'monthLeadsCnt',
        }, {
            label: '建卡',
            key: 'monthCardsCnt',
            text: [
            {
                name: '建卡成交率',
                numerator: 4,
                denominator: 1,
                position: 'left',
                radii: [40, 420],
                ending: [20, 420],
                avertence: -100,
            }, {
                name: '到店率',
                numerator: 2,
                denominator: 1,
                position: 'right',
                // radii: [44, 200]
            }, 
            ]
        }, {
            label: '到店',
            key: 'monthArriveCnt',
            text: [
                {
                    name: '到店成交率',
                    numerator: 4,
                    denominator: 2,
                    position: 'left',
                    radii: [30, 200],
                    ending: [15, 267],
                    avertence: 0,
                },
                {
                    name: '试乘试驾率',
                    numerator: 3,
                    denominator: 2,
                    position: 'right',
                }, 
            ]
        }, {
            label: '试乘试驾',
            key: 'monthTestRideCnt'
        }, {
            label: '订单',
            key: 'monthOrderCnt',
            text: [
            {
                name: '交车率',
                numerator: 5,
                denominator: 4,
                position: 'right',
                radii: [44, 200]
            },
            ]
        }, {
            label: '成交',
            key: 'monthDeliverCnt'
        },
        ],

    },
    '垂媒': {
        name: '网销',
        block: [{
            label: '线索',
            key: 'monthLeadsCnt',
            text: [
                {
                    name: '线索成交率',
                    numerator: 4,
                    denominator: 0,
                    position: 'left',
                    radii: [40, 560],
                    ending: [20, 560],
                    avertence: -100,
                }, {
                    name: '线索建卡率',
                    numerator: 1,
                    denominator: 0,
                    position: 'right',
                }, ]   
            }, {
            label: '建卡',
            key: 'monthCardsCnt',
            text: [ {
                name: '到店率',
                numerator: 2,
                denominator: 1,
                position: 'right',
                // radii: [44, 200]
            }, 
            ]
        }, {
            label: '到店',
            key: 'monthArriveCnt',
            text: [
                {
                    name: '到店成交率',
                    numerator: 4,
                    denominator: 2,
                    position: 'left',
                    radii: [30, 200],
                    ending: [15, 267],
                    avertence: 0,
                },
                {
                    name: '试乘试驾率',
                    numerator: 3,
                    denominator: 2,
                    position: 'right',
                }, 
            ]
        }, {
            label: '试乘/试驾',
            key: 'monthTestRideCnt'
        }, {
            label: '订单',
            key: 'monthOrderCnt',
            text: [
            {
                name: '交车率',
                numerator: 5,
                denominator: 4,
                position: 'right',
                radii: [44, 200]
            },
            ]
        }, {
            label: '交车',
            key: 'monthDeliverCnt'
       },
     ]
    },
    '厂方分配': {
        name: '网销',
        block: [{
            label: '线索',
            key: 'monthLeadsCnt',
            text: [
                {
                    name: '线索成交率',
                    numerator: 4,
                    denominator: 0,
                    position: 'left',
                    radii: [40, 560],
                    ending: [20, 560],
                    avertence: -100,
                }, {
                    name: '线索建卡数',
                    numerator: 1,
                    denominator: 0,
                    position: 'right',
                }, ]   
            }, {
            label: '建卡',
            key: 'monthCardsCnt',
            text: [ {
                name: '到店率',
                numerator: 2,
                denominator: 1,
                position: 'right',
                // radii: [44, 200]
            }, 
            ]
        }, {
            label: '到店',
            key: 'monthArriveCnt',
            text: [
                {
                    name: '到店成交率',
                    numerator: 4,
                    denominator: 2,
                    position: 'left',
                    radii: [30, 200],
                    ending: [15, 267],
                    avertence: 0,
                },
                {
                    name: '试乘试驾率',
                    numerator: 3,
                    denominator: 2,
                    position: 'right',
                }, 
            ]
        }, {
            label: '试乘/试驾',
            key: 'monthTestRideCnt'
        }, {
            label: '订单',
            key: 'monthOrderCnt',
            text: [
            {
                name: '交车率',
                numerator: 5,
                denominator: 4,
                position: 'right',
                radii: [44, 200]
            },
            ]
        }, {
            label: '交车',
            key: 'monthDeliverCnt'
       },
    ]
    },
    '自然获客': {
        name: '展厅自然客流',
        block: [{
            label: '自然客流',
            key: 'monthLeadsCnt',
            text: [
            {
                name: '首次到店建卡率',
                numerator: 1,
                denominator: 0,
                position: 'right',
                radii: [44, 200],
            },
            ]
        }, {
            label: '建卡',
            key: 'monthCardsCnt',
            text: [
            {
                name: '建卡成交率',
                numerator: 4,
                denominator: 1,
                position: 'left',
                radii: [40, 420],
                ending: [20, 420],
                avertence: -50,
            }, {
                name: '再次到店率',
                numerator: 2,
                denominator: 1,
                position: 'right',
                radii: [44, 200]
            }, 
            ]
        }, {
            label: '二次到店',
            key: 'monthArriveCnt',
            text: [
            {
                name: '试乘试驾率',
                numerator: 3,
                denominator: 2,
                position: 'right',
            },
            ]
        }, {
            label: '试乘/试驾',
            key: 'monthTestRideCnt'
        }, {
            label: '订单',
            key: 'monthOrderCnt',
            text: [
            {
                name: '交车率',
                numerator: 5,
                denominator: 4,
                position: 'right',
                radii: [44, 200]
            },
            ]
        }, {
            label: '交车',
            key: 'monthDeliverCnt'
        },
        ],

    },
    '外拓获客': {
        name: '展厅主动开拓',
        block: [{
            label: '建卡',
            key: 'monthCardsCnt',
            text: [
            {
                name: '建卡成交率',
                numerator: 3,
                denominator: 0,
                position: 'left',
                radii: [40, 420],
                ending: [20, 420],
                avertence: -100,
            }, {
                name: '到店率',
                numerator: 1,
                denominator: 0,
                position: 'right',
                radii: [44, 200]
            }, 
            ]
        }, {
            label: '到店',
            key: 'monthArriveCnt',
            text: [
            {
                name: '到店成交率',
                numerator: 3,
                denominator: 1,
                position: 'left',
                radii: [20, 200],
                ending: [15, 267],
                avertence: 0,
            },
            {
                name: '试乘试驾率',
                numerator: 2,
                denominator: 1,
                position: 'right',
            }, 
            ]
        }, {
            label: '试乘/试驾',
            key: 'monthTestRideCnt'
        }, {
            label: '订单',
            key: 'monthOrderCnt',
            text: [
            {
                name: '交车率',
                numerator: 4,
                denominator: 3,
                position: 'right',
                radii: [44, 200]
            },
            ]
        }, {
            label: '交车',
            key: 'monthDeliverCnt'
        },
        ],

    },

};
    