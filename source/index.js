import { initstate } from './observe/index'
import Watch from './observe/watch'
import { compiler } from './observe/compiler'
class myVue {
    constructor(options) {
        // 初始化
        this._init(options)
    }

    // 初始化
    _init(options) {
        this.$options = options;

        // 初始化状态
        initstate(this)

        // 初始化渲染页面
        if (this.$options.el) {
            this.$mount()
        }
    }

    $mount() {
        // 拿到节点
        let vm = this
        let el = this.$options.el
        el = this.$el = query(el)
        const updataComponent = () => {
            console.log('更新和渲染的实现')
            vm._update()
        }

        // 渲染节点
        new Watch(this, updataComponent)
    }
    _update() {
        let vm = this
        let el = vm.$el

        let node = document.createDocumentFragment()
        let firstChild
        while (firstChild = el.firstChild) {
            node.appendChild(firstChild)
        }

        // 文本替换
        compiler(node, vm)

        //最终挂载
        el.appendChild(node)

    }
}

function query(el) {
    if (typeof el !== 'string') return
    return document.querySelector(el)
}


export default myVue