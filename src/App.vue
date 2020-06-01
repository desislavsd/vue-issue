<template>
	<div id="app">
		<input type="number" v-model.number="count">
		name: {{name}} 
		<button @click="openModal()">Open modal</button>
		<button @click="openToast()">Open toast</button>
		<button @click="$toast.rejectAll()">Reject all toasts &times;</button>
		<!-- <button v-if="count" @click="$refs.m1.modal.open()">Open v-modal modal</button> -->

		<v-modals :service="$modal" />

		<v-toasts :service="$toast" />
		
		<!-- <v-modal v-if="count" ref="m1" :service="$modal" name="Dialog" @resolve="log('resolved')">
			
			<template #default="{modal}">
				<v-dialog v-show="count < 2" type="confirm" message="Hello?" :modal="modal"/>
			</template>
		</v-modal> -->
	</div>
</template>

<script>
// eslint-disable
import { vModals/* , vModal */, vToasts, vDialog } from './plugins/issue'

export default {
	name: 'app',
	components: { vModals/* , vModal */, vToasts, vDialog },
	data(){
		return {
			count: 0,
			name: 'John Doe',
		}
	},
	
	methods: {
		
		log: console.log,

		openToast(){

			let vm = this;

			this.$toast.open({
				message: 123,
				duration: Infinity,
				async reject(){

					await vm.$modal.confirm();
					
					// if(this.constructor.opened.length < 3) 
					// 	throw 123// return Promise.reject();

					return this.constructor.prototype.reject.call(this);
				}
			});
		},
		
		openModal(text = `
			<div>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, maxime consectetur doloremque quis fuga expedita quas quo impedit vero earum voluptas ipsum iure iste dolorum perferendis doloribus laudantium? Esse, odio. <br>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, maxime consectetur doloremque quis fuga expedita quas quo impedit vero earum voluptas ipsum iure iste dolorum perferendis doloribus laudantium? Esse, odio. <br>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, maxime consectetur doloremque quis fuga expedita quas quo impedit vero earum voluptas ipsum iure iste dolorum perferendis doloribus laudantium? Esse, odio. <br>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, maxime consectetur doloremque quis fuga expedita quas quo impedit vero earum voluptas ipsum iure iste dolorum perferendis doloribus laudantium? Esse, odio. <br>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, maxime consectetur doloremque quis fuga expedita quas quo impedit vero earum voluptas ipsum iure iste dolorum perferendis doloribus laudantium? Esse, odio. <br>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, maxime consectetur doloremque quis fuga expedita quas quo impedit vero earum voluptas ipsum iure iste dolorum perferendis doloribus laudantium? Esse, odio. <br>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, maxime consectetur doloremque quis fuga expedita quas quo impedit vero earum voluptas ipsum iure iste dolorum perferendis doloribus laudantium? Esse, odio. <br>
			</div>
		`){

			this.$modal.get('foo').open({
				required: false,
				props: {
					text
				}
			});

			return;

			this.$modal.open({
				props: {
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
			}).then(console.log)
			// .then( v => this.name = v )
		}
	},

	created(){
		let component = {
			props: {text: {default: 'Slim was here!'}, modal: {}},
			render(h){ return h('div', [this.text]) }
		};

		this.$modal.create({
			name: 'foo',
			component,
			props: {},
			// classes: ['modal-center'],
			once: false,
		})

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
*
	padding 0
	margin 0
	box-sizing border-box
</style>
