import Issue from '../Issue'

class Modal extends Issue {
    
    get name(){
        return this.data.name || this.componentName
    }

    get componentName(){
        let cmp = this.data.component;
        
        if(typeof cmp == 'string') return cmp

        return cmp && cmp.name || ''
    }

    static get(name){
        return this.instances.find( modal => modal.name == name )
    }

    /**
     * Opens an existing modal or creates and opens a new one
     * @param {String, Object} name Name of an existing modal
     * @param  {...any} args 
     */
    static open(name, ...args){

        if(typeof name != 'string') 
            return super.open.apply(this, arguments);

        try {
            return this.get(name).open(...args)
        } catch (ex){
            throw new Error(`[VueModal]: Modal called '${name}' doesn't exist!`);
        }
    }

    /**
     * Utility method to register new static methods
     * that as aliases of opening certain modal
     * @param {String, Object} name of the method
     * @param {*} this
     */
    static reg(name, defaults){
        
        if(typeof name == 'object') 
            return Object.keys(name).forEach( key => this.reg(key, name[key])), this;

        if(!name) throw new Error(`Parameter "name" is required when registering a predefined modal!`)

        this[name] = (...args) => {
            return this.open({defaults, ...args})
        }
        
        return this;
    }
}

export default Modal