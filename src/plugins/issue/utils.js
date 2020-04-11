import Vue from 'vue'

export function inject(plugins) {

    [Vue, Vue.prototype].forEach( e => Object.assign(e, plugins) )
}


/**
 * Returns a promise extended with resolve/reject methods
 * so that its state may be triggered from outside
 * @returns Promise
 */
export function Deferred(f, d, resolve, reject) {

	return d = extend( new Promise( (...a) => [resolve, reject] = a ),  { resolve, reject } ), f && f(resolve, reject), d;
}

export const extend = Object.assign