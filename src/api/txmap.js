export function TMap () {
    return new Promise(function (resolve, reject) {
        window.init = function () {
            resolve(window.qq)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key=FOXBZ-5J5LO-3ECWC-SBMPQ-K6R7F-VWFEC'
        script.onerror = reject
        document.head.appendChild(script)
    })
}
