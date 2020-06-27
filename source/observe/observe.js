import { observe } from "./index"
import { arrayMethods, observeArray } from './array'
import Dep from "./dep"


class Observe {

    constructor(data) {
        // 实现对数组的依赖收集
        //此Dep是专供数组使用的
        this.dep = new Dep()
        Object.defineProperty(data, '__ob__', {
            get: () => this
        })
        if (Array.isArray(data)) {
            // 扩展数组方法
            data.__proto__ = arrayMethods

            // 监听数组元素
            observeArray(data)

        } else {
            this.walk(data)
        }

    }
    walk(data) {
        let keys = Object.keys(data)

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let value = data[key]
            defineReactive(data, key, value)
        }
    }
}

function defineReactive(obj, key, value) {
    // 观察value是不是一个对象
    let childOb;
    if (typeof value === 'object') {
        childOb = observe(value)
    }
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {

            // 进行依赖收集
            if (Dep.target) {
                dep.depend()


                if (childOb) {
                    childOb.dep.depend()
                        // 处理多维数组的问题
                    dependArray(value)
                }
            }
            console.log('获取了数据')
            return value
        },
        set(newValue) {
            if (newValue == value) return
            if (typeof newValue === 'object') {
                observe(newValue)
            }
            console.log('设置了数据')
            value = newValue

            // 进行派发更新
            dep.notify()
        }
    })


}

function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        let current = value[i]
        current.__ob__ && current.__ob__.dep.depend
        if (Array.isArray(current)) {
            dependArray(current)
        }
    }
}
export default Observe