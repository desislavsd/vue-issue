import Issue from './Issue'
import VueModal from './modal'
import VueToast from './toast'
import { version } from '../../../package.json'
export * from './modal'
export * from './toast'

export { Issue, VueModal, VueToast }

export default {
    version,
    install(Vue, { modal, toast } = {}){
        Vue.use(VueModal, modal)
        Vue.use(VueToast, toast)
    }
}
