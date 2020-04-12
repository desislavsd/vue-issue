import { Deferred } from "./utils";

class VueIssueError extends Error {}

export default class Issue {

	constructor() {
		
		let store 	= this.constructor.instances =  this.constructor.instances 	|| [], // get the store of all created instances
			id 		= this.constructor.index 	 = (this.constructor.index 		|| 0 ) + 1;

		this.set(
			{ 
				once: true, 
				required: false, 
			}, 
			this.constructor.defaults, 
			...arguments, 
			{
				id,
				date: Date.now(),
				opened: false,
				promise: new Deferred,
			}
		);

		// add the created issue into the store
		store.push(this);
	}

	/**
	 * Sets issue's associated data
	 * @param  {...Object} args 
	 */
	set(...args){
		
		return Object.assign(this, ...args)
	}
	/**
	 * Opens the issue
	 */
	open() {

		this.set(...arguments, {
			promise: new Deferred,
			opened: Date.now(),
		})

		this.promise
			.finally( () => this.opened = false )
			.finally( () => this.once && this.destroy() )
			.catch( () => {} )
			
		return this;
	}

	/**
	 * Closes the issue & calls success callbacks
	 */
	resolve() {

		this.promise.resolve(...arguments)
	}

	/**
	 * Closes the issue & calls error callbacks
	 */
	reject() {

		this.promise.reject(...arguments)
	}

	/**
	 * Alias for `this.promise.then`
	 */
	then(){
		return this.promise.then(...arguments)
	}

	/**
	 * Unregisters the Issue from it's store
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
	 * Rejects all opened Issues starting from the last one 
	 * stopping on the first that rejects with error.
	 * @returns Promise
	 */
	static async rejectAll() {
		
		while(this.opened.length)
			await this.rejectLast(...arguments)

		return this
	}

	/**
	 * Rejects the last opened Issue 
	 * @returns Promise
	 */
	static async rejectLast() {

		let issue = this.opened.slice(-1)[0];

		issue && await issue.reject(...arguments);

		return this;
	}

    /**
     * Utility method to register new static methods that act 
	 * as aliases of opening instances with predefined options
     * @param {String, Object} name or map of {[name]: defaults }
     * @param {Object} defaults default options 
     */
    static reg(name, defaults){
        
        if(typeof name == 'object') 
            return Object.keys(name).forEach( key => this.reg(key, name[key])), this;

        if (!name) throw new VueIssueError(`Parameter "name" is required when registering a predefined instance constructor!`)

        this[name] = (...args) => this.open(defaults, ...args) 
        
        return this;
    }
}
