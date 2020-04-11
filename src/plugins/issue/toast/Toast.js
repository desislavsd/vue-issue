import Issue from '../Issue'

export default class Toast extends Issue {
    
    /**
     * Extends default `open` method to automatically
     * run the toast timeout as soon as the toast is opened;
     */
    open(){
        
        return super.open.apply(this, arguments).timeout();
    }

    /**
     * Extend default set method to support string 
     * arguments to be used as a `message` prop;
     */
    set( ...args ){
        
        args = args.map( message => typeof message != 'string' ? message : { message })

        return super.set.call(this, ...args);
    }

    /**
     * Start/Restart toast autorejection timeout
     * @param {Number} duration Duration in miliseconds
     */
    timeout(duration){

        if(duration === false) 
            return clearTimeout(this._timeout), this

        if( arguments.length ) 
            this.set({duration})

        if(this.duration && this.duration != Infinity) 
            this._timeout = setTimeout( this.promise.reject, this.duration );

        return this;
    }


}