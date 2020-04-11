export default {

	props: {
		service: { required: true },
	},

	data(){
		return {
			issues: this.service.instances || [],
		}
	},

	computed: {
		
		hasOpened(){
			return this.issues.some( e => e.opened )
		}

	},

	watch: {
		hasOpened: {
			immediate: true,
			handler(hasOpened){

				document.body.classList[hasOpened ? 'add' : 'remove'](this.bodyClass);
			}
		}
	},

	methods: {

		listeners(instance){
			
			let prefix = this.service.options.eventsPrefix;

			return ['resolve', 'reject'].reduce((m, e) => ({
				...m, 
				[prefix + e]: instance[e].bind(instance)
			}), instance.listeners || {})
		},
	}
}