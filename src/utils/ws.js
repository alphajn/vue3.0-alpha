/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export class Scoket {
    constructor(options = {}) {
        this.options = {
            retry: 4, // 重试次数
            connect: true, // 初始化的时候是否创建连接
            listenLine: true, // 是否监听离线/在线事件
            ...options,
        };

        this.retry = 0; // 当前重试次数
        this.queue = []; // 连接之前缓存的请求
        this.callback = {}; // 回掉对象
        this.listenLine = false; // 是否监听离线/在线事件

        if (this.options.connect) this.init();
    }

    // 连接ws
    init() {
        if (!this.options.url) throw new Error('url 不能为空');

        // 如果ws存在 并且状态不是关闭 则返回
        if (this.ws && [0, 1].includes(this.ws.readyState)) return;

        const { protocols, url } = this.options;
        this.ws = protocols ? new WebSocket(url, protocols) : new WebSocket(url);

        this._log(`${this.options.name}-开始连接`);
        this._event();
        this._listenLine();
    }

    // 发送数据
    send(data = {}, callback) {
        if (!this.ws || this.ws.readyState !== 1) {
            return this.queue.push({
                data,
                callback,
            });
        }

        const key = this._getCallbackKey(data);
        if (!this.callback[key]) this.callback[key] = [];

        this.callback[key].push({
            data,
            callback,
        });

        this._log(`发送数据\n${JSON.stringify(data, null, 2)}`);

        // 相同请求只请求一次
        if (this.callback[key].length === 1) this.ws.send(JSON.stringify(data));
    }

    // 手动关闭ws
    close() {
        if ([2, 3].includes(this.ws.readyState)) return;

        this.ws.close(4000);
        this._resetQueue();
    }

    // 获取请求的唯一标示
    _getCallbackKey(data) {
        return `${data.action}@${data.msgType}`;
    }

    // 处理返回数据
    _message(data) {
        const key = this._getCallbackKey(data);
        const callbacks = this.callback[key];

        this._log(`返回数据\n${JSON.stringify(data, null, 2)}`);

        if (!callbacks || !callbacks.length) return;

        if (data.action === 'unsubscribe') {
            const subKey = this._getCallbackKey({
                ...data,
                action: 'subscribe',
            });
            delete this.callback[subKey];
        }

        callbacks.forEach((item) => {
            if (typeof item.callback === 'function') {
                item.callback.call(this, {
                    ...data,
                    success: data.code === 200,
                });
            }
        });

        if (data.action === 'req' || data.action === 'unsubscribe') {
            delete this.callback[key];
        }
    }

    // 事件初始化
    _event() {
        this.ws.onopen = () => {
            if (this.queue.length) {
                this.queue.forEach(({
                    data,
                    callback,
                }) => {
                    this.send(data, callback);
                });
                this.queue = [];
            }
        };

        this.ws.onmessage = (ev) => {
            let data = {};

            try {
                data = JSON.parse(ev.data);
            } catch (err) {
                return this._log(`返回数据解析出错\n${JSON.stringify(err, null, 2)}`, 'error');
            }

            // 过滤垃圾数据
            if (!data.msgType || !data.action) return;

            // 心跳
            if (data.action === 'ping') {
                const pong = {
                    data: Date.now(),
                    msgType: 'heartbeat',
                    action: 'pong',
                };
                return this.ws.send(JSON.stringify(pong));
            }

            this._message(data);
        };

        this.ws.onclose = (ev) => {
            // code=4000 是手动调用的关闭
            if (ev.code !== 4000 && this.connect) {
                this._resetQueue();
                this._reconnect();
            }
        };
    }

    // log 打印
    _log(message, type) {
        if (sessionStorage.getItem('ws-debug')) {
            const style = {
                title: 'background-color: #2c3e50; color: #fff; padding: 2px 6px; border-radius: 4px 0 0 4px;',
                info: 'background-color: #3eaf7c; color: #fff; padding: 2px 6px; border-radius: 0 4px 4px 0;',
                error: 'background-color: #f56c6c; color: #fff; padding: 2px 6px; border-radius: 0 4px 4px 0;',
            };

            console.log(`%c${this.options.name}-debug%c${message}`, style.title, style[type || 'info']);
        }
    }

    // 重置请求队列
    _resetQueue() {
        // 把回调的数据重新放到队列中，让重新建连后再订阅下
        Object.keys(this.callback).forEach((key) => {
            this.callback[key].forEach((data) => this.queue.push(data));
        });
        this.callback = {};
    }

    // 重连ws
    _reconnect() {
        if (!navigator.online) return;

        this.retry += 1;
        this._log(`重试连接，第${this.retry}次`, 'error');

        if (this.retry < this.options.retry) {
            setTimeout(() => this.init(), 2 * 1000);
        } else {
            this.retry = 0;
        }
    }

    // 监听离线/在线事件
    _listenLine() {
        if (this.options.listenLine && !this.listenLine) {
            this.listenLine = true;

            window.addEventListener('online', () => {
                this._log('断线重连');
                this.init();
            }, false);

            window.addEventListener('offline', () => {
                if (this.ws.readyState === 1) {
                    this._log('断线断连', 'error');
                    this.close();
                }
                this.ws.retry = 0;
            }, false);
        }
    }
}

export const useWs = (options) => {
    if (options.name) options.name = 'ws-v1.0.0';
    return new Scoket(options);
};

export default Scoket;
