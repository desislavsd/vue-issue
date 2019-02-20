import Vue from 'vue'

export function inject(plugins) {
    Object.assign(Vue, plugins)
    Object.assign(Vue.prototype, plugins)
}