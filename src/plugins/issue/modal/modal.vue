
<script>

  let vnode = {
    functional: true,
    render(h, { props }){

      return props.vnode || getDefaultSlot(arguments[1])
    }
  };

  export default {

    name: 'Modal',
    
    props: { 
      service: { required: true }
    },

    data(){

      return {
        modal: this.$modal.create({  
          ...this.attrs, 
          component: vnode,
          once: false, 
        })
      }
    },

    render(h){

      let { modal } = this;

      let vnode = getDefaultSlot( { scopedSlots: this.$scopedSlots, slots: this.$slots }, { modal } );

      modal.set({ ...this.$attrs,  props: { vnode } })

      return null
    },

    watch: {
      'modal.promise': {

        immediate: true,

        handler(promise){

          promise.then(
            this.$emit.bind(this, 'resolve'), 
            this.$emit.bind(this, 'reject'),
          )
        }
      }
    },

    destroyed(){
      this.modal.destroy();
    }

  }

function getDefaultSlot({scopedSlots, slots}, props){

  let slot = slots.default || ( scopedSlots.default && scopedSlots.default(props) )

  return slot && slot[0] || null;
}
</script>