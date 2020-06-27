import myVue from '../source/index'

let vm = new myVue({
    el: '#app',
    data() {
        return {
            message: 'hello',
            msg: {
                name: 'gxb'
            },
            arr: [1, 2, 3]
        }
    }
})

setTimeout(function() {
    vm.arr.push(6)
}, 1000)

console.log(vm);