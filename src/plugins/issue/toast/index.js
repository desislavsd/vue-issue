import { inject } from '../utils'
import Toast from './Toast'
import vToast from './toast.vue'
import vToasts from './toasts.vue'

export {
    Toast,
    vToast,
    vToasts,
}

export default {
    install
}

function install(Vue, options = {}) {

    if (install.installed) return;

    install.installed = true

    let { defaults = {} } = options;

    Toast.instances = Vue.observable([])

    // Toast constructor defaults
    Toast.defaults = options.defaults = {
        component: vToast,
        position: 'bottom-right', //'bottom-[ left|center|right ] | top-[ left|center|right ]'
        type: 'default', // info|done|warn|error
        classes: [],
        timeout: 3000,
        ...defaults,
        once: true,
    };

    // $modal service options
    Toast.options = options = {
        eventsPrefix: '', // 'toast:'
        ...options,
    };
    
    Object.assign(Toast, {
        default: alias('default'),
        info: alias('info'),
        done: alias('done'),
        warn: alias('warn'),
        error: alias('error'),
    })

    inject({
        $toast: Toast
    })
}

function alias(type){

    return function () {
        
        return this.open({ component: vToast, type }, ...arguments)
    }
}