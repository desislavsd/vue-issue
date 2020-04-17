<template>
    <div>

        <transition-group v-for="pos in positions" :key="pos" :name="animation" class="vi-toasts" :class="`-${pos}`" tag="div">

            <component v-for="toast in groups[pos]" :is="toast.component" :key="toast.id" 
                v-bind="toast.props" :toast="toast"
                v-on="listeners(toast)"
                v-show="toast.opened" 
                />

        </transition-group>

    </div>
</template>

<script>
    import mixin from '../list-mixin'
    
    export default {
        
        name: 'Toasts',
        
        mixins: [mixin],

        props: {
            animation: { default: 'vi-toast' }, 
            bodyClass: { default: 'vi-has-toast' }
        },
        
        data(){
            return { 
                positions: ['top', 'bottom'].map( a => ['left', 'center', 'right'].map( b => `${a}-${b}`) ).flat(),
            }
        },

        computed: {
            groups(){
                return [...this.issues].reverse().reduce( (m, toast) =>{
                    m[toast.position] = m[toast.position] || [];
                    m[toast.position].push(toast)
                    return m
                }, {})
            }
        },
    }
</script>

<style lang="stylus">
    $gap = 1em
    .vi-toasts
        --gap 1em
        position fixed 
        display flex
        user-select none
        z-index 99999
        padding var(--gap)
        &[class*="-top-"]
            top 0
            flex-direction column
            margin-top: calc( 0 - var(--gap) / 2 )
        &[class*="-bottom-"]
            bottom 0
            flex-direction column-reverse
        &.-bottom-left, &.-top-left
            left 0
            align-items flex-start
        &.-bottom-center, &.-top-center
            left 50%
            transform translateX(-50%)
            align-items center
        &.-bottom-right, &.-top-right
            right 0
            align-items flex-end
        .vi-toast
            margin-top: calc( var(--gap) / 2 )
            transition: transform .2s
            position relative
            &:first-child
                z-index 2

        /* ANIMATIONS */
        .vi-toast-enter-active, .vi-toast-leave-active
            // &, .vi-toast
            transition: .2s

        &[class*="-top-"]
            .vi-toast-enter, .vi-toast-leave-to
                transform: translate(0%,-100%);
        &[class*="-bottom-"]
            .vi-toast-enter, .vi-toast-leave-to
                transform: translate(0%,100%);
</style>
