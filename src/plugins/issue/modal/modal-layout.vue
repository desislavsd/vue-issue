<template>
  <div :class="classes" class="modal" @mousedown="modal.required || modal.reject()">
    <div class="modal-body" @mousedown.stop>
      <div class="modal-content">
          <slot />
          <button v-show="!modal.required" class="modal-close" @click.stop="modal.reject()">&times;</button>
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

  computed: {

    classes(){
      
      let { modal } = this;

      // merge all classes and filter unique
      return [ ...new Set( [].concat(
        modal.classes,
        modal.opened && 'modal-opened', 
        `modal-${modal.name || 'unknown'}`,
        `modal-${modal.componentName || 'unknown'}`,
      ))];
    },

  }
}
</script>
<style lang="stylus">
  .modal
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
    &.modal-full
      .modal-body
        width 100%
      .modal-content
        min-height 100vh
    &.modal-right
      justify-content flex-end
      .modal-body
        position relative
        z-index 2
        min-height 100%
        max-width 30%
        background #fff
    &.modal-center
      padding 10% 0
      .modal-body
        align-self baseline
        margin 0 auto 
    .modal-body
      will-change transform
      perspective 800px
      max-width 100%
    .modal-content
      position relative
      background #fff;
      padding: 3em
      overflow: hidden
      text-align initial
      box-sizing border-box
    .modal-close
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