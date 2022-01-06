const getStyle = (theme = 'black') => {
    const base = {
        up: '#2bb462',
        up_5: 'rgba(43, 180, 98, 0.5)',
        down: '#fb4c51',
        down_5: 'rgba(251, 76, 81, 0.5)',
        no: '#2bb462',
        family: 'Helvetica Neue',
        font: 10,
        crosshair: '#fff',
        crosshair_bg: '#4c525e',
    };

    const map = {
        black: {
            ...base,
            grid_color: 'rgba(255, 255, 255, 0.05)',
            mark_color: 'rgba(255, 255, 255, 0.7)',
            tooltip_color: 'rgba(255, 255, 255, 0.6)',
            axisLine: 'rgba(255, 255, 255, 0.6)',
        },
        light: {
            ...base,
            grid_color: 'rgba(0, 0, 0, 0.05)',
            mark_color: 'rgba(0, 0, 0, 0.7)',
            tooltip_color: 'rgba(0, 0, 0, 0.6)',
            axisLine: 'rgba(0, 0, 0, 0.6)',
        },
    };

    const style = map[theme] || map.black;

    return {
        // 网格线
        grid: {
            show: true,
            // 网格水平线
            horizontal: {
                show: true,
                size: 1,
                color: style.grid_color,
                style: 'dash', // 'solid'|'dash'
                dashValue: [2, 2],
            },
            // 网格垂直线
            vertical: {
                show: true,
                size: 1,
                color: style.grid_color,
                style: 'dash', // 'solid'|'dash'
                dashValue: [2, 2],
            },
        },
        // 蜡烛图
        candle: {
            // 蜡烛图上下间距，大于1为绝对值，大于0小余1则为比例
            margin: {
                top: 0.2,
                bottom: 0.1,
            },
            // 蜡烛图类型 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
            type: 'candle_solid',
            // 蜡烛柱
            bar: {
                upColor: style.up, // 涨
                downColor: style.down, // 跌
                noChangeColor: style.no, // 不变的颜色
            },
            // 面积图
            area: {
                lineSize: 2, // 线粗
                lineColor: '#2196f3', // 线颜色
                value: 'close', // 对应数据字段里的key
                fillColor: [
                    {
                        offset: 0,
                        color: 'rgba(33, 150, 243, 0.01)',
                    }, {
                        offset: 1,
                        color: 'rgba(33, 150, 243, 0.2)',
                    },
                ],
            },
            priceMark: {
                show: true,
                // 最高价标记
                high: {
                    show: true,
                    color: style.mark_color,
                    textMargin: 4,
                    textSize: style.font,
                    textFamily: style.family,
                    textWeight: 'normal',
                },
                // 最低价标记
                low: {
                    show: true,
                    color: style.mark_color,
                    textMargin: 4,
                    textSize: style.font,
                    textFamily: style.family,
                    textWeight: 'normal',
                },
                // 最新价标记
                last: {
                    show: true,
                    upColor: style.up,
                    downColor: style.down,
                    noChangeColor: style.no,
                    line: {
                        show: true,
                        style: 'dash', // 'solid'|'dash'
                        dashValue: [4, 4],
                        size: 0.4,
                    },
                    text: {
                        show: true,
                        size: style.font,
                        paddingLeft: 7,
                        paddingTop: 3,
                        paddingRight: 5,
                        paddingBottom: 2,
                        borderRadius: 2,
                        color: '#fff',
                        family: style.family,
                        weight: 'normal',
                    },
                },
            },
            // 提示
            tooltip: {
                showRule: 'always', // 'always' | 'follow_cross' | 'none'
                showType: 'standard', // 'standard' | 'rect'
                labels: ['', '开≈', '高≈', '低≈', '收≈', '量: '],
                // values: (kLineData) => {
                //     const change = (kLineData.close - kLineData.open) / kLineData.open * 100;
                //     const color = change < 0 ? base.down : base.up;
                //     return [
                //         { value: kLineData.open, color },
                //         { value: kLineData.high, color },
                //         { value: kLineData.low, color },
                //         { value: kLineData.close, color },
                //         { value: kLineData.volume, color },
                //         { value: `${change.toFixed(2)}%`, color },
                //     ];
                // },
                // 可以是数组，也可以是方法，如果是方法则需要返回一个数组
                // 数组和方法返回的数组格式为:
                // [xxx, xxx, ......]或者[{ color: '#fff', value: xxx }, { color: '#000', value: xxx }, .......]
                values: null,
                defaultValue: 'n/a',
                rect: {
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    paddingBottom: 6,
                    offsetLeft: 8,
                    offsetTop: 8,
                    offsetRight: 8,
                    borderRadius: 4,
                    borderSize: 1,
                    borderColor: '#3f4254',
                    fillColor: 'rgba(17, 17, 17, .3)',
                },
                text: {
                    size: 12,
                    family: style.family,
                    weight: 'normal',
                    color: style.tooltip_color,
                    marginLeft: 8,
                    marginTop: 6,
                    marginRight: 8,
                    marginBottom: 0,
                },
            },
        },
        // 技术指标
        technicalIndicator: {
            margin: {
                top: 0.2,
                bottom: 0.1,
            },
            bar: {
                upColor: style.up_5,
                downColor: style.down_5,
                noChangeColor: style.up_5,
            },
            line: {
                size: 0.4,
                colors: ['#ff9600', '#19e966', '#ef05ce', '#1b7cff', '#9d65c9'],
            },
            circle: {
                upColor: style.up,
                downColor: style.down,
                noChangeColor: style.no,
            },
            // 最新值标记
            lastValueMark: {
                show: false,
                text: {
                    show: false,
                    color: '#ffffff',
                    size: 12,
                    family: style.family,
                    weight: 'normal',
                    paddingLeft: 7,
                    paddingTop: 4,
                    paddingRight: 5,
                    paddingBottom: 2,
                    borderRadius: 2,
                },
            },
            // 提示
            tooltip: {
                // 'always' | 'follow_cross' | 'none'
                showRule: 'always',
                // 'standard' | 'rect'
                showType: 'standard',
                showName: true,
                showParams: true,
                defaultValue: 'n/a',
                text: {
                    size: 12,
                    family: style.family,
                    weight: 'normal',
                    color: style.tooltip_color,
                    marginTop: 6,
                    marginRight: 8,
                    marginBottom: 0,
                    marginLeft: 8,
                },
            },
        },
        // x轴
        xAxis: {
            show: true,
            height: null,
            // x轴线
            axisLine: {
                show: true,
                color: style.axisLine,
                size: 1,
            },
            // x轴分割文字
            tickText: {
                show: true,
                color: style.axisLine,
                family: style.family,
                weight: 'normal',
                size: style.font,
                paddingTop: 3,
                paddingBottom: 6,
            },
            // x轴分割线
            tickLine: {
                show: true,
                size: 1, // 分割线宽度
                length: 3, // 分割线高
                color: style.axisLine,
            },
        },
        // y轴
        yAxis: {
            show: true,
            width: null,
            // 'left' | 'right'
            position: 'right',
            // 'normal' | 'percentage'
            type: 'normal',
            inside: false,
            // y轴线
            axisLine: {
                show: true,
                color: style.axisLine,
                size: 1,
            },
            // y轴分割文字
            tickText: {
                show: true,
                color: style.axisLine,
                family: style.family,
                weight: 'normal',
                size: style.font,
                paddingLeft: 3,
                paddingRight: 6,
            },
            // y轴分割线
            tickLine: {
                show: true,
                size: 1,
                length: 3,
                color: style.axisLine,
            },
        },
        // 图表之间的分割线
        separator: {
            size: 1,
            color: style.axisLine,
            fill: true,
            activeBackgroundColor: 'rgba(230, 230, 230, .15)',
        },
        // 十字光标
        crosshair: {
            show: true,
            // 十字光标水平线及文字
            horizontal: {
                show: true,
                line: {
                    show: true,
                    // 'solid'|'dash'
                    style: 'dash',
                    dashValue: [6, 6],
                    size: 1,
                    color: style.axisLine,
                },
                text: {
                    show: true,
                    color: style.crosshair,
                    size: style.font,
                    family: style.family,
                    weight: 'normal',
                    paddingLeft: 6,
                    paddingTop: 2,
                    paddingRight: 4,
                    paddingBottom: 1,
                    borderSize: 1,
                    borderColor: style.crosshair_bg,
                    borderRadius: 2,
                    backgroundColor: style.crosshair_bg,
                },
            },
            // 十字光标垂直线及文字
            vertical: {
                show: true,
                line: {
                    show: true,
                    // 'solid'|'dash'
                    style: 'dash',
                    dashValue: [6, 6],
                    size: 1,
                    color: style.axisLine,
                },
                text: {
                    show: true,
                    color: style.crosshair,
                    size: style.font,
                    family: style.family,
                    weight: 'normal',
                    paddingLeft: 2,
                    paddingRight: 2,
                    paddingTop: 3,
                    paddingBottom: 2,
                    borderSize: 1,
                    borderColor: style.crosshair_bg,
                    borderRadius: 2,
                    backgroundColor: style.crosshair_bg,
                },
            },
        },
        // 图形标记
        graphicMark: {
            line: {
                color: '#2196F3',
                size: 1,
            },
            point: {
                backgroundColor: '#2196F3',
                borderColor: '#2196F3',
                borderSize: 1,
                radius: 4,
                activeBackgroundColor: '#2196F3',
                activeBorderColor: '#2196F3',
                activeBorderSize: 1,
                activeRadius: 6,
            },
            polygon: {
                stroke: {
                    size: 1,
                    color: '#2196F3',
                },
                fill: {
                    color: 'rgba(33, 150, 243, 0.1)',
                },
            },
            arc: {
                stroke: {
                    size: 1,
                    color: '#2196F3',
                },
                fill: {
                    color: 'rgba(33, 150, 243, 0.1)',
                },
            },
            text: {
                color: '#2196F3',
                size: style.font,
                family: 'Helvetica Neue',
                weight: 'normal',
                marginLeft: 2,
                marginRight: 2,
                marginTop: 2,
                marginBottom: 6,
            },
        },
        // 注解
        annotation: {
            symbol: {
                // 'diamond' | 'circle' | 'rect' | 'triangle' | 'custom' | 'none'
                type: 'diamond',
                // 'top' | 'bottom' | 'point'
                position: 'top',
                size: 8,
                color: '#2196F3',
                activeSize: 10,
                activeColor: '#FF9600',
                offset: [0, 20],
            },
        },
    };
};

export default getStyle;
