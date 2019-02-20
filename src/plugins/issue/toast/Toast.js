import Issue from '../Issue'

export default class Toast extends Issue {
    
    open(){
        
        return super.open.apply(this, arguments).timeout();
    }

    set( ...args ){
        
        args = args.map( message => typeof message != 'string' ? message : { message })

        return super.set.call(this, ...args);
    }

    timeout(timeout){

        if(timeout === false) 
            return clearTimeout(this._timeout), this

        if( arguments.length ) 
            this.set({timeout})

        if(this.data.timeout && this.data.timeout != Infinity) 
            this._timeout = setTimeout( this.promise.reject, this.data.timeout );

        return this;
    }


}