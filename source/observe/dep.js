let id = 0

class Dep {
    constructor() {
        this.subs = []
        this.id = id++
    }

    // 订阅
    addSub(watcher) {
        this.subs.push(watcher)
    }

    // 发布
    notify() {
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

}

let stack = []

export function pushTarget(wacher) {
    stack.push(wacher)
    Dep.target = wacher
}

export function popTarget() {
    stack.pop()
    Dep.target = stack[stack.length]
}

export default Dep