import Issue from '../Issue'

class Modal extends Issue {
    
    get componentName(){
        let cmp = this.component;
        
        if(typeof cmp == 'string') return cmp

        return cmp && cmp.name || ''
    }

    static get(name){
        
        return this.instances.find( instance => [ instance.name, instance.componentName ].includes(name) )
    }
}

export default Modal