<template>

  <transition-group :name="animation" tag="div">
    
    <component v-for="modal in issues" :key="modal.id" 
      :is="modal.layout"
      :modal="modal"
      v-show="modal.opened">
      
      <component :is="modal.component" v-bind="modal.props" v-on="listeners(modal)" :modal="modal" />

    </component>
    
  </transition-group>

</template>

<script>

import mixin from '../list-mixin'

export default {

  name: 'Modals',

  mixins: [mixin],

  props: {
    animation: { default: 'modal' }, 
    bodyClass: { default: 'has-modal' }
  },
}
</script>

<style lang="stylus">
  body.has-modal
    overflow hidden

  /* ANIMATIONS */
  .modal-enter-active, .modal-leave-active
    &, .modal-body, .modal-content
      transition: transform .2s

  .modal-enter, .modal-leave-to
    opacity: 0;
    &.modal-center .modal-body
      transform translateY(2em)
    &.modal-right .modal-body
      transform translateX(100%)
    &.modal-full .modal-body
      transform translateY(-10vh)
</style>