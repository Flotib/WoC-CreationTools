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
				type: undefined,
				name: undefined,
				subtype: undefined,
			},
			icon: null,
			baseMinDamage: undefined,
			baseMaxDamage: undefined,
			requiredLevel: undefined,
			stackMaxSize: undefined,
			stackSize: 1,
        	quote: undefined,
			material: undefined,
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
				case 0:
					return '#9d9d9d'
				case 1:
					return '#fff'
				case 2:
					return '#1eff00'
				case 3:
					return '#0070dd'
				case 4:
					return '#a335ee'
				case 5:
					return '#ff8000'
				case 6:
					return '#e6cc80'
				case 7:
					return '#00ccff'
				default:
					return '#fff'
			}
		},

		printItem() { // Enzo saved me again bruuuh
			this.itemCreation.id = parseInt(this.itemCreation.id)
			const object = this.itemCreation;
			const json = JSON.stringify(object, null, 4); 
			const unquoted = json.replace(/"([^"]+)":/g, '$1:');
			return unquoted
		},

		/*
		idcheck(){
			if 
		},
		*/

	},

	methods: {

		itemEquipable() {
			if (this.itemCreation.equipable == false || this.itemCreation.equipable == undefined) {
				this.itemCreation.equipable = !this.itemCreation.equipable
				this.itemCreation.slotType.type = "weapon"
				this.itemCreation.slotType.name = 0
				this.itemCreation.slotType.subtype = "One-Hand"
			} else {
				this.itemCreation.equipable = !this.itemCreation.equipable
				this.itemCreation.slotType.type = undefined
				this.itemCreation.slotType.name = undefined
				this.itemCreation.slotType.subtype = undefined
			}
		},

		itemTypeChange() {
			if (this.itemCreation.slotType.type == "trinket") {
				this.itemCreation.slotType.name = undefined
				this.itemCreation.slotType.subtype = "Neck"
			} else {
				this.itemCreation.slotType.name = 0
				this.itemCreation.slotType.subtype = "One-Hand"
			}
		},

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
