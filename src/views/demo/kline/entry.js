import { init, dispose, version } from './kline.min';
import getStyle from './style';

const useKline = (elId, theme = 'dark') => {
    if (!elId) throw new Error('Dom id 不能为空');
    const chart = init(elId, getStyle(theme));

    // 设置主题
    chart.changeTheme = (th = 'dark') => {
        chart.setStyleOptions(getStyle(th));
    };

    chart.setLeftMinVisibleBarCount(5); // 左边最小可见柱子数
    chart.setRightMinVisibleBarCount(5); // 右边最小可见柱子数
    chart.setDataSpace(8); // 默认柱子宽度

    // 添加ma
    chart.createTechnicalIndicator('MA', false, {
        id: 'candle_pane',
        dragEnabled: true,
    });
    // 添加量
    chart.createTechnicalIndicator('VOL', false, {
        id: 'VOL',
        dragEnabled: true,
    });
    // 覆盖VOL 如果小于1会不显示
    chart.overrideTechnicalIndicator({
        name: 'VOL',
        calcParams: [20],
        calcParamsAllowDecimal: { 1: true },
        precision: 4,
    });

    return chart;
};

export {
    useKline,
    dispose as destroy,
    version,
};
