var app = new Vue({
	el: '#app',
	data: {
		tab: 0, // 0 -> item; 1 -> merchants; 2 -> enemies
		itemCreation: {
			id: undefined,
			name: '',
			equipable: undefined,
			quality: 1,
			unique: undefined,
			slotType: {
				basicItem: true,
				type: '',
				name: undefined,
				subtype: '',
			},
			icon: '',
			baseMinDamage: undefined,
			baseMaxDamage: undefined,
			requiredLevel: undefined,
        	quote: '',
		},
	},

	watch: {},

	computed: {

		tabname(){

			const tabMap = {
				0: 'Item creation',
				1: 'Merchant creation',
				2: 'Enemy creation',
			}

			return tabMap[this.tab]
		},

		printItem() {
			return (
				'{ <br>	id: ' + (this.itemCreation.id === undefined? 'not defined' : this.itemCreation.id) + ',</br>	'
				+ 'name: ' + this.itemCreation.name + ',<br>	'
				+ (this.itemCreation.equipable === undefined || this.itemCreation.equipable === false? '' : ('equipable: true,</br>	')) 
			)
		},

		/*
		idcheck(){
			if 
		},
		*/

	},

	methods: {

		reset(tab) {
			if (tab == 0) {
				this.itemCreation.id = undefined
				this.itemCreation.name = ''
				this.itemCreation.equipable = undefined
				this.itemCreation.quality = 1
				this.itemCreation.unique = undefined
				this.itemCreation.slotType.basicItem = true
				this.itemCreation.slotType.type = ''
				this.itemCreation.slotType.name = undefined
				this.itemCreation.slotType.subtype = ''
				this.itemCreation.icon = ''
				this.itemCreation.baseMinDamage = undefined
				this.itemCreation.baseMaxDamage = undefined
				this.itemCreation.requiredLevel = undefined
				this.itemCreation.quote = ''
			}
		},

	},

	mounted() {},
})
