import Vue from 'vue'
let extend = Object.assign;

export default {
	name: 'extractor',
	functional: true,
	render(h, { props, slots, scopedSlots, parent }) {

		let vnode = scopedSlots.default ? scopedSlots.default(parent) : slots.default,
			issue = props[props.type], 
			name = props.type + 'Content';

		vnode = vnode && vnode[0] || null;
		
		if (vnode && vnode.componentOptions){
			vnode.componentOptions.listeners = vnode.componentOptions.listeners || {};
			vnode.componentOptions.propsData = vnode.componentOptions.propsData || {};

			extend(vnode.componentOptions.listeners, {
				[Vue[`$${props.type}`].options.eventsPrefix + `resolve`]: issue.resolve.bind(issue),
				[Vue[`$${props.type}`].options.eventsPrefix + `reject`]: issue.reject.bind(issue),
			})

			extend(vnode.componentOptions.propsData, { [props.type]: issue } )

			name = vnode.componentOptions.Ctor.options.name;
		}
		
		issue.data.component = !vnode && props.default || {
			name,
			functional: true,
			render: () => vnode
		};
		
		return null
	}
};