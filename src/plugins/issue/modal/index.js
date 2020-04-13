import Vue from 'vue'
import { inject } from '../utils'
import ModalBase from './Modal.js'
import vModalLayout from './modal-layout.vue'
import vModals from './modals.vue'
import vDialog from './dialog.vue'
// import vModal from './modal.vue'

export { Modal, vModalLayout, vModals, /* vModal,  */vDialog }

export function createModalService( options = {} ){

    class Modal extends ModalBase {};
    
    Modal.instances = Vue.observable([])
    
    // $modal service options
    Modal.options = options = {
        eventsPrefix: '',
        ...options,
        // modals defaults
        defaults: Modal.defaults = {
            name: '',
            component: vDialog,
            props: {},
            listeners: {},
            once: true,
            required: false,
            layout: vModalLayout,
            classes: ['modal-center'],
            ...options.defaults || {}
        },
        // dialog modal default props
        dialog: {
            resolve: 'OK',
            reject: 'Cancel',
            message: 'Confirm',
            title: '',
            ...options.dialog || {}
        }
    };
    
    // add alert/confirm/prompt aliases of `vDialog` modal
    Object.assign(Modal, {
        dialog(props, ...args){
            if (typeof props != 'object' && typeof props != 'undefined') props = {
                message: props
            };
            if(typeof props == 'object') args.unshift({props})
            return this.open(...args)
        },
        alert: dialogAlias(),
        confirm: dialogAlias({
            type: 'confirm'
        }),
        prompt: dialogAlias({
            type: 'prompt',
            prop: 'model'
        }),
    })

    return Modal
}

export default { install }

function install(Vue, options = {}) {

    let service = createModalService(options);

    inject({
        [options.serviceName || '$modal']: service
    })
}

/**
 * Utility function to define `Modal.dialog` aliases.
 * @param {*}
 */
function dialogAlias({prop = 'message', type = 'alert' } = {}){

    return function (val, opts = {}) {

        if (prop == 'model' ? !val.hasOwnProperty(prop) : typeof val != 'object') 
            val = {[prop]: val};

        return this.open({
            ...opts,
            props: { ...opts.props || {}, ...val, type },
            component: vDialog,
        })
    }
}