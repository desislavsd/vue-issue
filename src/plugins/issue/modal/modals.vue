<template>
  <transition-group name="modal" tag="div" v-if="$modal">
    <component v-for="modal in validModals" :is="modal.data.layout" :key="modal.id" :modal="modal" v-show="modal.opened">
      <component :is="modal.data.component" v-bind="modal.data.props" v-on="modal.data.listeners" :modal="modal"
        @[resolveEvent]="modal.resolve($event)" 
        @[rejectEvent]="modal.reject($event)"/>
    </component>
  </transition-group>
</template>

<script>
import vModalLayout from './modal-layout'

export default {
  name: 'Modals',

  components: { vModalLayout },
  
  data(){
    return {
      modals: this.$modal.instances,
      resolveEvent: this.$modal.options.eventsPrefix + 'resolve',
      rejectEvent: this.$modal.options.eventsPrefix + 'reject',
    }
  },

  computed: {
    validModals(){
      return this.modals.filter( e => e.data && e.data.component )
    },
    hasOpenedModal(){
      return this.modals.some( e => e.opened )
    }
  },

  watch: {
    hasOpenedModal(hasOpenedModal){

      document.body.classList[hasOpenedModal ? 'add' : 'remove']('has-modal');
    }
  }
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