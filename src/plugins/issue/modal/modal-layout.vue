<template>
  <div :class="classes" class="vi-modal" 
    @mousedown="targets.mousedown = $event.target"
    @mouseup="targets.mouseup = $event.target"
    @click="onclick"  
    >
    <div ref="body" class="vi-modal-body">
      <div class="vi-modal-content">
          <slot />
          <button v-show="!modal.required" class="vi-modal-close" @click.stop="modal.reject()">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'ModalLayout',
  
  props: { 
    modal: {type: Modal, required: true }
  },

  data(){
    return {
      targets: {
        mousedown: null,
        mouseup: null,
      }
    }
  },

  computed: {

    classes(){
      
      let { modal } = this;

      let names = [modal.name, modal.componentName].filter(Boolean);

      names.length || names.push('unknown')

      // merge all classes and filter unique
      return [ ...new Set( [].concat(
        modal.classes,
        `-${modal.position}`,
        modal.opened && '-opened', 
        names.map( name => `vi-modal-${name}`)
      ))];
    },

  },

  methods: {
    onclick(ev){
      
      /**
       * The click should be ignored if any of mousedown, mouseup or click
       * target elements was an element within the body
       */
      if(
        this.$refs.body.contains(this.targets.mousedown) ||
        this.$refs.body.contains(this.targets.mouseup) ||
        this.$refs.body.contains(ev.target)
      ) return;
      
      this.modal.required || this.modal.reject()
    }
  }
}
</script>
<style lang="stylus">
  .vi-modal
    display flex
    position: fixed;
    top 0
    left 0
    height 100%
    width 100%
    z-index 9999
    overflow hidden
    will-change opacity
    overflow-y scroll
    background: rgba(0,0,0,.6)
    box-sizing border-box
    &.-full
      .vi-modal-body
        width 100%
      .vi-modal-content
        min-height 100vh
    &.-right
      justify-content flex-end
    &.-right, &.-left
      .vi-modal-body
        position relative
        z-index 2
        min-height 100%
        max-width 30%
        background #fff
    &.-center
      padding 10% 0
      .vi-modal-body
        align-self baseline
        margin 0 auto 
    .vi-modal-body
      will-change transform
      perspective 800px
      max-width 100%
    .vi-modal-content
      position relative
      background #fff;
      padding: 3em
      overflow: hidden
      text-align initial
      box-sizing border-box
    .vi-modal-close
      position absolute 
      top 0
      right 0
      width 1em
      height 1em
      font-size 20px
      z-index 11
      transition .3s
      cursor pointer
      padding 0
      background none
      border none
      padding 0
      line-height 0
      &:not(:hover)
        opacity 0.6
</style>