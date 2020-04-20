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
    animation: { default: 'vi-modal' }, 
    bodyClass: { default: 'vi-has-modal' }
  },
}
</script>

<style lang="stylus">
  .vi-has-modal, .vi-has-modal body
    overflow hidden

  /* ANIMATIONS */
  .vi-modal-enter-active, .vi-modal-leave-active
    &, .vi-modal-body, .vi-modal-content
      transition: transform .2s

  .vi-modal-enter, .vi-modal-leave-to
    opacity: 0;
    &.-center .vi-modal-body
      transform translateY(2em)
    &.-right .vi-modal-body
      transform translateX(100%)
    &.-left .vi-modal-body
      transform translateX(-100%)
    &.-full .vi-modal-body
      transform translateY(-10vh)
</style>