import Observe from './observe'


export function initstate(vm) {
    let opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {}
    if (opts.watch) {}

}
// 初始化data
function initData(vm) {
    // 获取data
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

    // 实现代理
    for (let key in data) {
        proxy(vm, '_data', key)
    }
    // 实现数据监听
    observe(data)
}

// 数据监听
export function observe(data) {
    // 判断类型
    if (typeof data !== 'object' || data === null) return
    if (data.__ob__) {
        return data.__ob__
    }
    return new Observe(data)
}

// 数据代理
function proxy(obj, tar, key) {
    Object.defineProperty(obj, key, {
        get() {
            return obj[tar][key]
        },
        set(newValue) {
            obj[tar][key] = newValue
        }
    })
}