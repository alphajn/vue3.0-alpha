/**
 *
 * @param {function|path|worker} fn 执行参数
 * function: 执行函数
 * path: worker文件 如'utils/worker.js'
 * worker: worker实例
 *
 */
export const useWorker = (fn) => {
    if (fn instanceof Worker) return fn;
    if (typeof fn === 'string' && fn.endsWith('.js')) return new Worker(fn);
    if (typeof fn === 'function') {
        const code = [
            `this.fn = ${fn.toString()};`,
            `this.onmessage = (e) => {
                let data = JSON.parse(e.data);
                const r = this.fn(data);
                this.postMessage(r);
            }`,
        ];
        const blob = new Blob(code, {
            type: 'text/javascript',
        });
        const url = URL.createObjectURL(blob);
        const worker = new Worker(url);

        worker.send = (arg) => {
            worker.postMessage(JSON.stringify(arg));

            return new Promise((resolve) => {
                worker.onmessage = (e) => {
                    resolve({
                        success: true,
                        data: e.data,
                    });
                };

                worker.onerror = (e) => {
                    resolve({
                        success: false,
                        data: e.message,
                    });
                };

                worker.onmessageerror = (e) => {
                    resolve({
                        success: false,
                        data: e.message,
                    });
                };
            });
        };

        worker.cleanup = () => {
            URL.revokeObjectURL(url);
            worker.terminate();
        };

        return worker;
    }
};

export default useWorker;
