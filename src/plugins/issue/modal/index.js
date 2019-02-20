import { inject } from '../utils'
import Modal from './Modal.js'
import vModal from './modal.vue'
import vModalLayout from './modal-layout.vue'
import vModals from './modals.vue'
import vDialog from './dialog.vue'

export { Modal, vModal, vModalLayout, vModals, vDialog }

export default { install }

function install(Vue, options = {}) {

    if(install.installed) return;
    
    install.installed = true

    let { defaults = {}, dialog = {} } = options;

    Modal.instances = Vue.observable([])

    // Modal constructor defaults
    Modal.defaults = options.defaults = {
        name: '',
        component: vDialog,
        props: { reject: 'Cancel'},
        once: true,
        required: false,
        layout: 'v-modal-layout',
        classes: ['modal-center'],
        ...defaults
    };

    // $modal service options
    Modal.options = options = {
        eventsPrefix: '', // 'modal:'
        ...options,
        dialog: {
            resolve: 'OK',
            reject: 'Cancel',
            message: 'Confirm',
            title: '',
            ...dialog
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

    inject({ $modal: Modal })

    if (typeof document == 'undefined') return;

    document.addEventListener('keydown', ev => {

        if (ev.which != 27) return;

        let modal = Modal.opened.slice(-1)[0];

        if (modal && !modal.data.required) modal.reject();
    })
}

/**
 * Utility function to define `Modal.dialog` aliases.
 * @param {*}
 */
function dialogAlias({prop = 'message', type = 'alert' } = {}){

    return function (val, opts = {}) {

        if (typeof val != 'object') val = {[prop]: val};

        return this.open({
            ...opts,
            props: { ...val, type },
            component: vDialog,
        })
    }
}