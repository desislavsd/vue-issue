<template>
    <div class="toast" :class="classes" 
        @click="$emit($toast.options.eventsPrefix + 'reject')"
        @mouseenter="toast.timeout(false)"
        @mouseleave="toast.timeout()"
        >
        <p v-html="opts.message" @click="linkClick"></p>
        <button v-if="typeof opts.resolve != 'undefined'" @click.stop="$emit($toast.options.eventsPrefix + 'resolve')" v-html="opts.resolve"></button>
        <button v-if="typeof opts.reject != 'undefined'" @click.stop="$emit($toast.options.eventsPrefix + 'reject')" v-html="opts.reject"></button>
        <!-- <button v-else class="toast-close" @click="$emit($toast.options.eventsPrefix + 'reject')">&times;</button> -->
    </div>
</template>

<script>
import Toast from './Toast'
export default {
    name: 'Toast',
    props: {
        toast: { type: Toast, required: true },
    },
    computed: {
        opts(){
            return this.toast.data
        },
        classes(){
            let { opts } = this;

            return [
                'toast-' + opts.type,
                opts.classes || [],
            ].flat()
        }
    },
    methods: {
        linkClick(ev){
            if(ev.target.matches('a,button'))
                ev.stopPropagation()
        }
    }
}
</script>

<style lang="stylus">
    .toast
        background #212121
        color #fff
        display flex
        align-items center
        padding 0 1em
        border-radius 3px
        cursor default
        min-width 7em
        min-height 2em
        line-height 0
        justify-content space-between
        &.toast-info
            background #58a6ca
        &.toast-done
            background #73B573
        &.toast-warn
            background #F9A937
        &.toast-error
            background #CA5E58
        p
            flex-grow 1
            &:not(:last-child)
                padding-right 1em
        button
            border none
            cursor pointer
            background none
            font inherit
            font-weight bolder
            color #fff
            &:not(:hover)
                opacity 0.7
            &:last-chlid
                margin-right -0.3em
        .toast-close
            width 1em
            height 1em
            font-size 20px
            padding 0
            line-height 0
            color #ffffff
            font-weight normal
            &:not(:hover)
                opacity 0.6
</style>
