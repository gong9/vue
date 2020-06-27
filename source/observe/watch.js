import { pushTarget, popTarget } from './dep'

let id = 0
class Watch {
    constructor(vm, exprs, cb = () => {}, opts) {
        this.vm = vm
        this.exprs = exprs
        this.cb = cb
        this.id = id++;
        this.deps = []
        this.depsId = new Set()

        if (typeof exprs === 'function') {
            this.getter = exprs
        }

        this.get()
    }
    get() {
        pushTarget(this)
        this.getter()
        popTarget()
    }
    update() {
        // 实现异步更新
        // this.get()
        queneWatcher(this)

    }
    run() {
        this.get()
    }
    addDep(dep) {
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.depsId.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }

}

//异步更新
let has = {}
let queue = []

function queneWatcher(watcher) {
    let id = watcher.id
    if (has[id] == null) {
        has[id] = true
        queue.push(watcher)
    }
    nextTick(fluqueue)

}

function fluqueue() {
    queue.forEach(watcher => {
        watcher.run()
    })
    has = {}
    queue = []
}



function nextTick(fluqueue) {
    setTimeout(fluqueue, 0)
}
export default Watch