<template>
  <div :class="classes" class="modal" @click="modal.data.required || modal.reject()">
    <div class="modal-body">
      <div class="modal-content" @click.stop>
          <slot v-bind="modal.data.props" v-on="modal.data.listeners" :modal="modal" />
          <button v-if="!modal.data.required" class="modal-close" @click.stop="modal.reject()">&times;</button>
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
      resolveEvent: this.$modal.options.eventsPrefix + 'resolve',
      rejectEvent: this.$modal.options.eventsPrefix + 'reject',
    }
  },
  
  computed: {
    classes(){

      return [
        {'modal-opened': this.modal.opened}, 
        'modal-' + (this.modal.name || 'unknown'),
        'modal-' + (this.modal.componentName || 'unknown')

      ].concat(this.modal.data.classes || []);
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
    background: rgba(0,0,0,.6)
    will-change opacity
    &.modal-opened
      overflow-y scroll
    &.modal-full
      .modal-body
        width 100%
      .modal-content
        min-height 100vh
    &.modal-right
      justify-content flex-end
      .modal-body
        min-height 100%
        max-width 30%
        background #fff
    &.modal-center
      .modal-body
        padding 10%
        align-self baseline
        margin 0 auto
    .modal-body
      will-change transform
      perspective 800px
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