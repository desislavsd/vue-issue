<template>
	<article class="vi-dialog">
		<p v-if="opts.title" class="vi-dialog-title">{{ opts.title }}</p>
		<p v-if="flags.message" v-html="opts.message"></p>
		
		<form v-if="flags.prompt" ref="form" @submit.prevent="$emit(`${service.options.eventsPrefix}resolve`, value)">
			<slot :dialog="this">
				<input ref="input" v-bind="model_" v-model.trim="value">
			</slot>
			<button ref="submit"></button>
		</form>

		<footer>
			<button v-if="!flags.alert && opts.reject" tabindex="0" @click="$emit(`${service.options.eventsPrefix}reject`, data)">{{ opts.reject }}</button>
			<button tabindex="0" @click="flags.prompt ? $refs.submit.click() : $emit(`${service.options.eventsPrefix}resolve`, data)">{{ opts.resolve }}</button>
		</footer>

	</article>
</template>

<script>
export default {
	name: 'Dialog',
	props: {
		title: String,
		message: [String, Number],
		reject: { },
		resolve: { type: String },
		model: { },
		type: String,
		data: {},
		modal: {},
	},
	data(){
		
		return { 
			value: '', 
			defaults: this.$modal.options.dialog,
		}
	},
	computed: {
		service(){
			return this.modal.constructor
		},
		opts(){
            
			let props = clear(this.$props),
				noProps = !Object.keys(props).length,
				opts = clear({...this.$modal.options.dialog, ...props});

			
			opts.type = ['alert', 'confirm', 'prompt'].find( e => e == opts.type)
				|| ( opts.model ? 'prompt' : props.reject || noProps ? 'confirm' : 'alert' )

			return opts
        },
        flags(){
            let {opts} = this,
                type = {[opts.type]: true};

            return {
                message: this.message || !type.prompt && opts.message,
                ...type,
            }
        },
		model_(){
			let { model = {} } = this.opts;
					
			if(typeof model != 'object') model = { value: model }

			return {
				type: {number: 'number'}[typeof model.value] || 'text',
				...model,
			}
		}
	},
	watch: {
		'model_.value': {
			immediate: true,
			handler(val){
				this.value = val 
			}
		}
	},
	mounted(){
		this.$refs.input && this.$refs.input.select();
	}
}

function clear(o){

    return Object.entries(o).filter( e => typeof e[1] != 'undefined').reduce((m,e) => {m[e[0]] = e[1]; return m}, {})
}
</script>

<style lang="stylus">
	.vi-modal-Dialog
		background none
		line-height 1.5
		.vi-modal-body 
			* 
				box-sizing border-box
				margin 0
				padding 0
			.vi-modal-content
				min-width 20em
				padding 1em
				border-radius 5px
				box-shadow 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)
			.vi-modal-close
				display none
			p
				margin 0em 0 1em
			p.vi-dialog-title
				font-weight bold
				margin 0 0 .3em
			footer
				margin-top 1em
				display flex
				justify-content flex-end
			input
				border none
				width 100%
				background #f0f0f0
				height 2em
				border-radius 3px
				padding 0 0.5em
				outline none
				border 1px solid transparent
				&:required
					border-color orange
					background #f8f8f8
				&+button
					visibility hidden
					height 0
					width 0
					position absolute
			button
				background none
				border none
				cursor pointer
				margin 0 -.5em 0 1em
				height 2em
				padding 0 0.5em
				&:nth-last-of-type(2):not(:hover)
					opacity 0.6
				&:hover, &:active
					color #09c
</style>

