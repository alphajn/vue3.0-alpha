// 数字处理 https://mikemcl.github.io/bignumber.js/#rounding-mode
import BN from 'bignumber.js';

BN.config({
    DECIMAL_PLACES: 20, // 小数位数
    EXPONENTIAL_AT: 20, // 科学标识法位数
});

// 处理返回结果
function handleReturn(result) {
    if (result.toFixed) {
        return result.toFixed();
    }

    return /[a-z]/i.test(result) ? '0' : result;
}

/**
 *
 * 生成随机数
 *
 * @param {number} num 随机小数位数
 *
 * random(3) // '0.105'
 * random(1) // '0.1'
 */
function random(num) {
    return handleReturn(BN.random(num));
}

/**
 * 累计和
 *
 * @param {...str} str 需要累加的字符串
 *
 * sum('1', '2', '3') // '6'
 * sum(null, '1') // '0'
 * sum('sdaf', '1') // '0'
 */
function sum(str) {
    return handleReturn(BN.sum(...str));
}

/**
 * 绝对值
 *
 * @param {str} str 字符串
 *
 * abs('-112') // '112'
 * abs('dsaf') // '0'
 */
function abs(str) {
    return handleReturn(BN(`${str}`).abs());
}

/**
 * 加法
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * plus('1', '9') // '10'
 * plus('dsaf', 1) // '0'
 */
function plus(s1, s2) {
    return handleReturn(BN(`${s1}`).plus(`${s2}`));
}

/**
 * 减法
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * minus('10', '5') // '5'
 * minus('dsaf', 1) // '0'
 */
function minus(s1, s2) {
    return handleReturn(BN(`${s1}`).minus(`${s2}`));
}

/**
 * 乘法
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * times('1', '9') // '9'
 * times('dsaf', 1) // '0'
 */
function times(s1, s2) {
    return handleReturn(BN(`${s1}`).times(`${s2}`));
}

/**
 * 除法
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * div('8', '1') // '8'
 * div('10', '3') // '3.33333333333333333333333333333333333333333333333333333333333333333333333'
 * div('dsaf', 1) // '0'
 */
function div(s1, s2) {
    if (`${s2}` === '0') return '0';
    return handleReturn(BN(`${s1}`).div(`${s2}`));
}

/**
 * 整数除法
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * idiv('10', '3') // '3'
 * idiv('dsaf', 1) // '0'
 */
function idiv(s1, s2) {
    if (`${s2}` === '0') return '0';
    return handleReturn(BN(`${s1}`).idiv(`${s2}`));
}

/**
 * 大于
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * gt('4', '2') // true
 * gt('3', '3') // false
 * gt('dsaf', 1) // false
 */
function gt(s1, s2) {
    return BN(`${s1}`).gt(`${s2}`);
}

/**
 * 大于等于
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * gte('10', '10') // true
 * gte('10', '3') // false
 * gte('dsaf', 1) // false
 */
function gte(s1, s2) {
    return BN(`${s1}`).gte(`${s2}`);
}

/**
 * 小于
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * lt('2', '3') // true
 * lt('4', '2') // false
 * lt('dsaf', 1) // false
 */
function lt(s1, s2) {
    return BN(`${s1}`).lt(`${s2}`);
}

/**
 * 小于等于
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * lte('2', '2') // true
 * lte('4', '2') // false
 * lte('dsaf', 1) // false
 */
function lte(s1, s2) {
    return BN(`${s1}`).lte(`${s2}`);
}

/**
 * 等于
 *
 * @param {string} s1 第一个值
 * @param {string} s2 第二个值
 *
 * eq('10', '10') // true
 * eq('10', '3') // false
 * eq('dsaf', 1) // false
 */
function eq(s1, s2) {
    return BN(`${s1}`).eq(`${s2}`);
}

/**
 * 整体精度精度
 *
 * @param {string} s1 需要取精度的字符串
 * @param {number} d 几位精度
 * @param {string} rm 四舍五入方式 默认向上取证，1向下取整
 *
 * sd('125.125', 2) // '130'
 * sd('125.125', 2, 1) // '120'
 * sd('sdfsd', 2, 1) // '0'
 */
function sd(s1, d, rm) {
    if (!d) throw new Error('精度为必填');
    return handleReturn(BN(`${s1}`).sd(d, rm));
}

/**
 * 不带千分位保留几位小数 默认为向下取整
 *
 * @param {string} s1 需要格式化的字符串
 * @param {number} dp 保留几位小数 默认保留所有小数
 * @param {number} [rm=1] 最后一位保留方式，默认为1向下取整
 *
 * toFixed('123.555') // '123.555'
 * toFixed('123.555', 0) // '124'
 * toFixed('123.555', 1) // '123.5'
 * toFixed('123.555', 1, 1) // '123.5'
 * toFixed('123.555', 6) // '123.555000'
 * toFixed('111123.555', 6) // '111123.555000'
 */
function toFixed(s1, dp, rm = 1) {
    return handleReturn(BN(`${s1}`).toFixed(dp, rm));
}

/**
 * 带千分位保留几位小数 默认为向下取整
 *
 * @param {string} s1 需要格式化的字符串
 * @param {number} dp 保留几位小数 默认保留所有小数
 * @param {number} [rm=1] 最后一位保留方式，默认为1向下取整
 * @param {Object} format 格式化配置 参考 https://mikemcl.github.io/bignumber.js/#format
 *
 * toFormat('123456789.567') // '123,456,789.567'
 * toFormat('123456789.567', 1) // '123,456,789.5'
 * toFormat('123456789.567', 5) // '123,456,789.56700'
 * toFormat('123456789.567', 1, 1) // '123,456,789.5'
 */
function toFormat(s1, dp, rm = 1, format) {
    return handleReturn(BN(`${s1}`).toFormat(dp, rm, format));
}

export {
    plus,
    minus,
    times,
    div,
    idiv,
    sd,
    gt,
    gte,
    lt,
    lte,
    eq,
    toFixed,
    toFormat,
    sum,
    random,
    abs,
};
