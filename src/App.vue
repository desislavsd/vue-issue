<template>
	<div id="app">
		<input type="number" v-model.number="count">
		name: {{name}} 
		<button @click="openModal">✎</button>
		<button @click="$refs.m1.modal.open()">modal 2</button>

		<v-modals />
		<v-toasts />
		
		<v-modal v-if="count" ref="m1" :opts="{component: 'bar'}" />
	</div>
</template>

<script>
import { vModals, vModal, vToasts, vDialog } from './plugins/issue'

export default {
	name: 'app',
	components: { vModals, vModal, vToasts, vDialog },
	data(){
		return {
			count: 0,
			name: 'John Doe',
		}
	},
	
	methods: {
		
		openModal(){
			this.$modal.open({
				attrs: {
					message: 'What is your name?',
					model: this.name,/* 
					model: {
						type: 'text',
						required: true,
						pattern: '\\w{2,}(?:\\s\\w{2,})?',
						title: '1 or 2 names with minimum 2 characters',
						min: 1,
						value: this.name
					}, */
				}
			}).then( v => this.name = v )
		}
	}
}
</script>

<style lang="stylus">
body
	overflow-y scroll
#app
	// font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-family: 'Segoe UI', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
</style>
