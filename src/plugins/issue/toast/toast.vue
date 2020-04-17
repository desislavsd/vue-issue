<template>
    <div class="vi-toast" :class="classes" 
        @click="$emit(`${toast.constructor.options.eventsPrefix}reject`)"
        @mouseenter="toast.timeout(false)"
        @mouseleave="toast.timeout()"
        >

        <div>
            <strong v-if="opts.title">{{opts.title}}</strong>
            <div class="vi-toast-content" v-html="opts.message" @click="linkClick"></div>
        </div>

        <button v-for="action in actions" :key="action" 
            @click.stop="$emit(`toast:${action}`)" 
            :class="`vi-toast-${action}-btn`"
            v-html="opts[`${action}Btn`]" 
            >
        </button>
        
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
            return { ...this.toast }
        },
        
        actions(){
            return ['resolve', 'reject'].filter( action => this.opts[`${action}Btn`] )
        },

        classes(){

            let { opts } = this;

            return [].concat(
                opts.classes,
                `toast-${opts.type}`,
            )
        }
    },
    methods: {
        
        linkClick(ev){
            
            if( ev.target.matches('a,button') )
                ev.stopPropagation()
        }
    }
}
</script>

<style lang="stylus">
    .vi-toast
        background #212121
        color #fff
        display flex
        align-items center
        padding .5em 1em .7em
        border-radius 3px
        cursor default
        min-width 7em
        line-height 1.4
        &.vi-toast-info
            background #58a6ca
        &.vi-toast-done
            background #73B573
        &.vi-toast-warn
            background #F9A937
        &.vi-toast-error
            background #CA5E58
        .vi-toast-content
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
        .vi-toast-close
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
