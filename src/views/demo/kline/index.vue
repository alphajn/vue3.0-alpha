<template>
    <div class="wrap">
        <h3 class="flex-row-space-between">
            Kline-demo
            <el-switch
                v-model="theme"
                active-text="黑色主题"
                inactive-text="白色主题"
                @change="changeTheme"
            />
        </h3>
        <div
            id="kline"
            :style="{'background-color': theme ? '#17181e' : '#fff'}"
        />
    </div>
</template>
<script>
import { onMounted, reactive, toRefs } from 'vue';
import getData from './data';
import { useKline } from './entry';

export default {
    setup() {
        const state = reactive({
            theme: true,
            chart: null,
        });

        const changeTheme = (isDark) => {
            const cache = isDark ? 'dark' : 'light';

            state.chart.changeTheme(cache);
        };

        onMounted(() => {
            state.chart = useKline('kline', 'dark');

            state.chart.createTag({
                id: 'ask_price',
                point: { price: 5000 },
                text: '10',
                mark: 'Ask',
                styles: {
                    line: {
                        show: true,
                        style: 'dash',
                        dashValue: [4, 2],
                        size: 0.4,
                        color: '#2bb462',
                    },
                    text: {
                        size: 10,
                        paddingTop: 3,
                        paddingRight: 3,
                    },
                    mark: {
                        backgroundColor: '#2bb462',
                        size: 10,
                        family: 'DINPro,-apple-system,BlinkMacSystemFont,Roboto',
                        paddingTop: 3,
                    },
                },
            });
            state.chart.createTag({
                id: 'bid_price',
                point: { price: 4900 },
                text: '100',
                mark: 'Bid',
                styles: {
                    line: {
                        show: true,
                        style: 'dash',
                        dashValue: [4, 2],
                        size: 0.4,
                        color: '#fb4c51',
                    },
                    text: {
                        size: 10,
                        paddingTop: 3,
                        paddingRight: 3,
                    },
                    mark: {
                        backgroundColor: '#fb4c51',
                        size: 10,
                        family: 'DINPro,-apple-system,BlinkMacSystemFont,Roboto',
                        paddingTop: 3,
                    },
                },
            });

            state.chart.setPriceVolumePrecision(8, 8);

            // 添加数据
            state.chart.applyNewData(getData());

            // 加载更多数据
            state.chart.loadMore((arg) => {
                setTimeout(() => {
                    state.chart.applyMoreData(getData(arg));
                }, 1000);
            });
        });

        return {
            ...toRefs(state),
            changeTheme,
        };
    },
};
</script>
<style lang="scss" scoped>
.wrap {
    h3 {
        padding: 20px;
        background-color: beige;
        margin-bottom: 20px;
        color: blueviolet;
        font-weight: bold;
    }

    #kline {
        width: 100%;
        height: 600px;
    }
}
</style>
