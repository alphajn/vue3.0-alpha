this.onmessage = function (e) {
    console.log(e.data);
    // // eslint-disable-next-line
    // var { navigator, location, XMLHttpRequest, fetch } = { };
    // const result = new Function(`return ${e.data};`)();
    // result();
    this.postMessage('收到');
};
