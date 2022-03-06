var app = new Vue({
	el: '#app',
	data: {
		tab: 0, // 0 -> item; 1 -> merchants; 2 -> enemies
		icons: [],
		itemCreation: {
			id: undefined,
			name: '',
			equipable: undefined,
			quality: 0,
			unique: 0,
			slotType: {
				type: 'weapon',
				name: 0,
				subtype: undefined,
			},
			icon: null,
			baseMinDamage: undefined,
			baseMaxDamage: undefined,
			requiredLevel: undefined,
			stackMaxSize: undefined,
			stackSize: 1,
        	quote: '',
			material: false,
			salable: true,
			sellPrice: undefined,
			cost: undefined,
		},
	},

	watch: {},

	computed: {

		tabname() {

			const tabMap = {
				0: 'Item creation',
				1: 'Merchant creation',
				2: 'Enemy creation',
			}

			return tabMap[this.tab]
		},

		getQualityColor() {
			switch (this.itemCreation.quality) {
				case '0':
					return '#9d9d9d'
				case '1':
					return '#fff'
				case '2':
					return '#1eff00'
				case '3':
					return '#0070dd'
				case '4':
					return '#a335ee'
				case '5':
					return '#ff8000'
				case '6':
					return '#e6cc80'
				case '7':
					return '#00ccff'
				default:
					return '#fff'
			}
		},

		printItem() {
			return (
				'{ <br>	id: ' + (this.itemCreation.id === undefined? 'not defined' : this.itemCreation.id) + ',</br>	'
				+ 'name: ' + this.itemCreation.name + ',<br>	'
				+ (this.itemCreation.equipable === undefined || this.itemCreation.equipable === false? '' : ('equipable: true,</br>	'))
				+ 'quality: ' + this.itemCreation.quality + ',<br>	'
				+ 'unique: ' + this.itemCreation.unique + ',<br>	'
				+ (this.itemCreation.equipable === true? ('slotType: { <br>		') : '')
				+ (this.itemCreation.equipable === true? ('type: ' + this.itemCreation.slotType.type + ',</br>		') : '') 
				+ (this.itemCreation.equipable === true && this.itemCreation.slotType.type === 'weapon'? ('name: ' + this.itemCreation.slotType.name + ',<br>		') : '')
				+ (this.itemCreation.equipable === true? ('subtype: ' + (this.itemCreation.slotType.subtype === undefined? 'not defined' : this.itemCreation.slotType.subtype ) + ',<br>	},<br>') : '')
				+'<br>},'
				
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
				this.itemCreation.quality = 0
				this.itemCreation.unique = 0
				this.itemCreation.slotType.type = 'weapon'
				this.itemCreation.slotType.name = 0
				this.itemCreation.slotType.subtype = ''
				this.itemCreation.icon = null
				this.itemCreation.baseMinDamage = undefined
				this.itemCreation.baseMaxDamage = undefined
				this.itemCreation.requiredLevel = undefined
				this.itemCreation.stackMaxSize = undefined
				this.itemCreation.stackSize = 1
				this.itemCreation.quote = ''
				this.itemCreation.material = false
				this.itemCreation.salable = true
				this.itemCreation.sellPrice = undefined
				this.itemCreation.cost = undefined
			}
		},

	},

	mounted() {
	},
})
