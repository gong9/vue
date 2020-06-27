const util = {
    getval: function(vm, expr) {
        // 可能是msg.foo.name.age,故需要一层一层的取
        let keys = expr.split('.')
        return keys.reduce((pre, next) => {
            pre = pre[next]
            return pre
        }, vm)
    },
    compilerText: function(node, vm) {
        if (!node.expr) {
            node.expr = node.textContent
        }
        node.textContent = node.expr.replace(/\{\{((?:.|\r?\n)+?)\}\}/g, function(...args) {

            return util.getval(vm, args[1])

        })
    }
}

export function compiler(node, vm) {
    let childNodes = node.childNodes;

    [...childNodes].forEach(child => {
        if (child.nodeType === 1) {
            compiler(child, vm)
        }
        if (child.nodeType === 3) {
            util.compilerText(child, vm)
        }
    })
}