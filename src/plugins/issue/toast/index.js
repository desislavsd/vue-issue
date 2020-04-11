import Vue from 'vue'
import { inject } from '../utils'
import ToastBase from './Toast'
import vToast from './toast.vue'
import vToasts from './toasts.vue'

export { Toast, vToast, vToasts }

export function createToastService(options = {}) {

    class Toast extends ToastBase {};
    
    Toast.instances = Vue.observable([])
    
    // $modal service options
    Toast.options = options = {
        eventsPrefix: '',
        ...options,
        defaults: Toast.defaults = {
            component: vToast,
            position: 'bottom-right', //'bottom-[ left|center|right ] | top-[ left|center|right ]'
            type: 'default', // info|done|warn|error
            message: '',
            classes: [],
            duration: 3000,
            once: true,
            ...options.defaults || {},
        }
    };
    
    Object.assign(Toast, {
        default: alias('default'),
        info: alias('info'),
        done: alias('done'),
        warn: alias('warn'),
        error: alias('error'),
    })

    return Toast
}

export default { install }

function install(Vue, options = {}) {

    let service = createToastService(options)

    inject({
        [options.serviceName || '$toast']: service
    })
}

function alias(type){

    return function () {
        
        return this.open({ type }, ...arguments )
    }
}