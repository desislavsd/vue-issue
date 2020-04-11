import Issue from './Issue'
import VueModal from './modal'
import VueToast from './toast'

export * from './modal'
export * from './toast'

export { Issue, VueModal, VueToast }

export default {
    install(Vue, { modal, toast } = {}){
        Vue.use(VueModal, modal)
        Vue.use(VueToast, toast)
    }
}
