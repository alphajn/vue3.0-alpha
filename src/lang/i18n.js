// i18n-setup.js
// 文档 https://vue-i18n.intlify.dev/api/composition.html

import { createI18n } from 'vue-i18n';
import { langs, lang as defaultLang, STORE_LANG } from '@/config/setup';

// 国家化实例对象
const i18n = createI18n({
    // locale: defaultLang,
    legacy: false, // Composition 语法格式
    fallbackLocale: defaultLang, // 失败使用默认默认语言
    missingWarn: false, // 禁止本地失败警告
    fallbackWarn: false, // 禁止本地回退失败警告
    messages: {}, // 如果不设置 availableLocales 获取会有个默认的 en-US
});

/**
 * 判断语言是否支持设置
 *
 * @param {string} lang 需要判断的语言
 * @returns {boolean}
 */
const supportLang = (lang = '') => !!lang && langs.includes(lang);

/**
 * 替换链接中的语言标识
 *
 * @description
 * 1. 会自动替换错误的 //
 * 2. 根据当前的语言，自动处理前缀
 * 3. 如果为单语言，将自动删除 lang 前缀
 *
 * @param  {string} path - 路径链接.
 * @param  {string} [lang=i18n.global.locale.value] - 追加语言，默认为当前语言
 * @return {string} 替换后的路径
 *
 * @example
 *  1. 默认追加当前语言
 *      replace('/login') => /zh-cn/login
 *
 *  2. 替换当前语言
 *      replace('/en-us/login') => /zh-cn/login
 *
 *  3. 替换参数语言
 *      replace('/en-us/login', 'zh') => /zh/login
 *
 *  4. 自动修改链接中的 /
 *      replace('//zh-cn///login') => /zh-cn/login
 */
const replacePath = (path = '', lang = i18n.global.locale.value) => {
    // 过滤开头的 / ，用来做路径分隔。过滤转义符，防止外链接钓鱼
    // 以 / 分隔来取 lang
    const paths = path.replace(/^[\\/]+/, '').split(/\/+/);

    // 如果一级是语言，则删除
    if (supportLang(paths[0].toLowerCase())) {
        paths.shift();
    }

    // 处理多语言前缀
    return lang ? `/${lang}/${paths.join('/')}` : `/${paths.join('/')}`;
};

/**
 * 获取除origin之外的全路径-替换语言之后的
 *
 * @param {string} lang 需要转换的语言
 * @returns {string} 获取带语言的url
 */
const getFullPath = (lang = i18n.global.locale.value) => {
    const fullPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    return replacePath(fullPath, lang);
};

/**
 * 获取语言 本地缓存 > 浏览器 > 默认
 *
 * @return {string} 语言标识
 */
const getLanguage = () => {
    const storageLang = localStorage.getItem(STORE_LANG);
    if (supportLang(storageLang)) {
        return storageLang;
    }

    const language = navigator.language || navigator.userLanguage;
    const index = langs.findIndex((lang) => language.indexOf(lang.split('-')[0]) > -1);

    if (index > -1) {
        return langs[index];
    }

    return defaultLang;
};

/**
 * 异步加载语言包并设置语言
 *
 * @param {string} lang 目标语言
 * @return {Promise}
 */
const setAsyncLang = async (lang = '') => {
    lang = supportLang(lang) ? lang.toLowerCase() : defaultLang;

    localStorage.setItem(STORE_LANG, lang);
    document.querySelector('html').setAttribute('lang', lang);

    if (!i18n.global.availableLocales.includes(lang)) {
        const message = await import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}/index.js`);
        i18n.global.setLocaleMessage(lang, message.default);
    }

    if (i18n.mode === 'legacy') {
        i18n.global.locale = lang;
    } else {
        i18n.global.locale.value = lang;
    }

    return Promise.resolve(lang);
};

/**
 * 设置当前语言
 *
 * @param {string} lang 需要设置的语言
 * @param {Boolean} redirect 设置完是否需要重定向
 */
const setLang = (lang = '', redirect = false) => {
    if (!supportLang(lang)) return;

    // 如果重定向
    if (redirect) {
        localStorage.setItem(STORE_LANG, lang);

        // 跳转链接
        window.location.href = getFullPath(lang);
    } else {
        window.history.pushState(null, '', getFullPath(lang));

        setAsyncLang(lang);
    }
};

/**
 * 获取当前语言
 *
 * @return {Sting} zh-cn
 */
const getI18nLang = () => {
    if (i18n.mode === 'legacy') {
        return i18n.global.locale;
    }

    return i18n.global.locale.value;
};

export {
    i18n,
    setLang,
    getI18nLang,
    supportLang,
    replacePath,
    setAsyncLang,
    getLanguage,
};
