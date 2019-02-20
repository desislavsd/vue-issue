<template>
  <slot-extract type="modal" :modal="modal" :default="opts.component">
    <slot :modal="modal" />
  </slot-extract>
</template>

<script>

  import slotExtract from '../slot-extract'

  export default {

    name: 'Modal',
    
    props: { opts: {type: Object, default(){return {}} } },
    
    components: { slotExtract },

    provide(){
      return { modal: this.modal }
    },
    data(){

      return {
        modal: this.$modal.create({ 
          component: null,
          ...this.opts,
          once: false,
        })
      }
    },
    watch: {
      opts:{
        deep: true,
        handler(opts){
          this.modal.set(opts)
        }
      },
      'modal.promise': {
        immediate: true,
        handler(promise){
          promise.then(this.$emit.bind(this, 'resolve'), this.$emit.bind(this, 'reject'))
        }
      }
    },

    destroyed(){
      this.modal.destroy();
    }

  }

</script>