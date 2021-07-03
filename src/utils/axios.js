import axios from 'axios';
import proxy from '@/config/proxy';
import { i18n } from '@/lang/i18n';

const Axios = axios.create({
    timeout: 30000, // 30秒
    headers: {
        post: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    },
    emulateJSON: true,
    // withCredentials: true, // `withCredentials` 表示跨域请求时是否需要使用凭证
});

/**
 * 匹配请求配置
 *
 * @param {object} config 请求配置
 * @returns {} 替换后的连接
 */
const matchConfig = (config) => {
    const cache = { url: config.url };

    Object.keys(proxy).some((key) => {
        if (cache.url.indexOf(key) === 0) {
            const {
                url,
                headers,
                params,
                responseHandle,
            } = proxy[key];

            cache.url = cache.url.replace(key, url);
            cache.headers = typeof headers === 'function' ? headers(config.headers) : headers;
            cache.params = typeof params === 'function' ? params(config.params) : params;
            cache.responseHandle = typeof responseHandle === 'function' ? responseHandle : null;

            return true;
        }

        return false;
    });

    return cache;
};

/**
 * 请求参数处理
 *
 * @param {object} config 请求参数
 * @returns {object} 处理后的参数
 */
const requestHandle = (config) => {
    const {
        url,
        headers,
        params,
        responseHandle,
    } = matchConfig(config);

    // 添加国际化
    config.headers = {
        'Accept-Language': i18n.getLang(),
        ...config.headers,
    };

    config.url = url;
    config.responseHandle = responseHandle;

    // 处理 headers
    if (headers) {
        config.headers = { ...headers, ...config.headers };
    }
    // 处理 params
    if (params) {
        config.params = { ...params, ...config.params };
    }

    config.params = {
        ...config.params,
        r: Math.random().toString(32).substring(2),
    };

    return config;
};

/**
 * 请求结果处理
 *
 * @param {object} response axios返回的结果
 * @returns {object} 处理之后的结果
 */
const responseHandle = (response) => {
    const data = { ...response.data };

    data.success = data.success || data.code === 200 || data.status === 'ok';
    data.code = data.code || 200;
    data.message = data.message || '200';

    // 如果代理有处理相应函数优先使用
    if (response.config.responseHandle) {
        return response.config.responseHandle(data, response);
    }

    return data;
};

/**
 * 错误处理
 *
 * @returns {object} 处理之后的结果
 */
const errorHandle = () => ({
    success: false,
    code: 500,
    data: null,
    message: '访问出错，请稍后重试',
});

// 请求参数处理
Axios.interceptors.request.use(
    (config) => requestHandle(config),
    (error) => errorHandle(error),
);

// 响应数据处理
Axios.interceptors.response.use(
    (response) => responseHandle(response),
    (error) => errorHandle(error),
);

export default Axios;
