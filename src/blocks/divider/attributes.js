export default {
	tagName: {
		type: 'string',
		default: 'section',
	},
	align: {
		type: 'string',
		default: 'full',
	},
	enableHeight: {
		type: 'boolean',
		default: true
	},
	height: {
		type: 'number',
		default: 120
	},
	scale: {
		type: 'number',
		default: 1
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customShapeColor: {
		type: 'string',
	},
	bgImage: {
		type: 'object',
		default: null,
	},
	flipV: {
		type: 'boolean',
		default: false
	},
	flipH: {
		type: 'boolean',
		default: false
	},
	bgOptions: {
		type: 'object',
		default: {
			repeat: false,
			stretch: true,
			fixed: false,
			opacity: 0.5,
		}
	},
}