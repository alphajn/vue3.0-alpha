/**
 * 接口代理配置
 *
 * @type {Object}
 */

const { NODE_ENV } = process.env;

export default {
    '@api2/': {
        url: NODE_ENV === 'development' ? '/-/api2/' : 'http://jinnan.dev',
        headers() {
            return {

            };
        },
    },
};
