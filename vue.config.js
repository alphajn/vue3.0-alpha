const StylelintPlugin = require('stylelint-webpack-plugin');
const { proxy, LogMessage } = require('./config/proxy');

module.exports = {
    // 打包库文件使用
    // output: {
    //     libraryExport: 'default',
    // },
    lintOnSave: 'warning',
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        proxy,
        open: true,
        overlay: {
            errors: false,
        },
    },
    // css: {
    //     loaderOptions: {
    //         scss: {
    //             prependData: '@import "~@/assets/styles/mixins.scss";',
    //         },
    //     },
    // },
    chainWebpack: (config) => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
    },
    configureWebpack: {
        plugins: [
            new LogMessage(),
            new StylelintPlugin({
                files: ['**/*.(s(c|a)ss|css|vue)'],
                fix: false, // 打开自动修复（谨慎使用！注意上面的配置不要加入js或html文件，会发生问题，js文件请手动修复）
            }),
        ],
    },
};
