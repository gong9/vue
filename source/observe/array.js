import { observe } from "./index"

// 监听数组
const methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice']

// AOP的思想扩展数组
const oldMethods = Array.prototype
export let arrayMethods = Object.create(oldMethods)
methods.forEach((methods) => {
    arrayMethods[methods] = function(...args) {
        let res = oldMethods[methods].apply(this, args)
        console.log('监听逻辑')

        // 获取新增属性
        let insert
        switch (methods) {
            case 'push':
            case 'unshift':
                insert = args
                break;
            case 'splice':
                insert = args.slice(2)
                break
        }
        // 新增属性的监听
        if (insert) {
            observeArray(insert)
        }
        //更新通知
        this.__ob__.dep.notify()
        return res
    }
})

// 新增属性的监听
export function observeArray(insert) {
    for (let i = 0; i < insert.length; i++) {
        observe(insert[i])
    }
}