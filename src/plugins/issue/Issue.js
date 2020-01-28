
let extend = Object.assign;

export default class Issue {

	constructor() {
		
		let store = this.constructor.instances = this.constructor.instances || [], // get the store of all created instances
			id = this.constructor.index = (this.constructor.index || 0) + 1;

		Object.assign(this, {
			id,
			data: {},
			date: Date.now(),
			opened: false,
			promise: new Deferred,
		}).set(this.constructor.defaults, ...arguments)

		// add the created issue into the store
		store.push(this);
	}

	/**
	 * Sets issue's associated data
	 * @param  {...Object} args 
	 */
	set(...args){
		
		args = args.map(e => (e instanceof Issue) ? e.data : e ).filter(Boolean)
		
		if(args.length) 
			this.data = extend( Object.create(null), this.data, ...args );

		return this
	}
	/**
	 * Opens the issue
	 */
	open() {
		this.set(...arguments);
		this.promise = new Deferred;
		this.opened = Date.now();
		this.promise
			.finally( () => this.opened = false )
			.finally( () => this.data.once && this.destroy() )
		return this;
	}

	/**
	 * Closes the issue & calls success callbacks
	 * @returns Promise
	 */
	resolve() {
		return this.promise.resolve(...arguments),this
	}

	/**
	 * Closes the issue & calls error callbacks
	 * @returns Promise
	 */
	reject() {
		return this.promise.reject(...arguments), this
	}

	/**
	 * Alias for `this.promise.then`
	 */
	then(){
		return this.promise.then(...arguments)
	}

	/**
	 * Unregisters the Issue from from it's store
	 * @return {Issue} this
	 */
	destroy() {

		let i = this.constructor.instances.indexOf(this);

		if (~i) this.constructor.instances.splice(i, 1)

		return this
	}

	static get opened() {
		return this.instances.filter(e => e.opened)
	}

	/**
	 * Creates Issue instance
	 * @param {Object} opts for the new Issue instance
	 * @returns Issue instance
	 */
	static create() {

		return new this(...arguments);
	}

	/**
	 * Creates Issue instance & opens it
	 * @param {Object} opts for the new Issue instance
	 * @returns Issue instance
	 */
	static open() {

		return this.create(...arguments).open();
	}

	/**
	 * Rejects all existing Issues starting from the last one.
     * Stops if issue is required and no `force` parameter is provided.
     * @param { Boolean } force force reject `required` issues
	 * @returns this
	 */
	static rejectAll(force) {
		
		for (let issue of this.opened.reverse() )
			if( issue.data.required && !force ) break;
			else issue.reject()

		return this
	}

	/**
	 * Rejects last Issue if issue is not required or no `force` parameter is provided.
	 * @param { Boolean } force force reject `required` issue
	 * @returns this
	 */
	static rejectLast(force) {

		let issue = this.opened.slice(-1)[0];

		if( issue && (!issue.required || force) ) issue.reject();

		return this;
	}
}

/**
 * Returns a promise extended with resolve/reject methods
 * so that its state may be triggered from outside
 * @returns Promise
 */
function Deferred(f, d, resolve, reject) {

	return d = extend( new Promise( (...a) => [resolve, reject] = a ),  { resolve, reject } ), f && f(d), d;
}