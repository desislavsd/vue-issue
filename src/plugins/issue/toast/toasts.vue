<template>
    <div @contextmenu.prevent="$toast.rejectAll()">
        <transition-group v-for="pos in positions" :key="pos" :name="$toast.options.animation||'toast'" class="toasts" :class="'toasts-' + pos" tag="div">
            <component v-for="issue in groups[pos]" :is="issue.data.component" :key="issue.id" v-show="issue.opened" 
                v-bind="issue.data.props" :toast="issue"
                v-on="issue.listeners" @[resolveEvent]="issue.resolve($event)" @[rejectEvent]="issue.reject($event)"
                />
        </transition-group>
    </div>
</template>

<script>
    import vToast from './toast.vue'
    
    export default {
        name: 'Toasts',
        components: { vToast },
        data(){
            return { 
                issues: this.$toast.instances,
                resolveEvent: this.$toast.options.eventsPrefix + 'resolve',
                rejectEvent: this.$toast.options.eventsPrefix + 'reject',
                positions: ['top', 'bottom'].map( a => ['left', 'center', 'right'].map( b => `${a}-${b}`) ).flat()
            }
        },
        computed: {
            groups(){
                return [...this.issues].reverse().reduce( (m, toast) =>{
                    m[toast.data.position] = m[toast.data.position] || [];
                    m[toast.data.position].push(toast)
                    return m
                }, {})
            }
        }
    }
</script>

<style lang="stylus">
    $gap = 1em
    .toasts
        position fixed 
        display flex
        user-select none
        z-index 99999
        &[class*="toasts-top-"]
            top: $gap
            flex-direction column
            margin-top: -($gap/2)
        &[class*="toasts-bottom-"]
            bottom: $gap
            flex-direction column-reverse
        &.toasts-bottom-left, &.toasts-top-left
            left: $gap
            align-items flex-start
        &.toasts-bottom-center, &.toasts-top-center
            left 50%
            transform translateX(-50%)
            align-items center
        &.toasts-bottom-right, &.toasts-top-right
            right: $gap
            align-items flex-end
        .toast
            margin-top: ($gap/2)
            transition: transform .2s
            position relative
            &:first-child
                z-index 2
    /* ANIMATIONS */
    .toast-enter-active, .toast-leave-active
        // &, .toast
        transition: .2s

    [class*="toasts-top-"]
        .toast-enter, .toast-leave-to
            transform: translate(0%,-100%);
    [class*="toasts-bottom-"]
        .toast-enter, .toast-leave-to
            transform: translate(0%,100%);
</style>
