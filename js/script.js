var app = new Vue({
	el: '#app',
	data: {
		tab: 0, // 0 -> item; 1 -> merchants; 2 -> enemies
		icons: [],
		itemCreation: {
			id: 0,
			name: '',
			equipable: undefined,
			quality: 0,
			unique: 0,
			slotType: {
				type: undefined,
				name: undefined,
				subtype: undefined,
			},
			stats: {
				strength: undefined,
				agility: undefined,
				intelligence: undefined,
				stamina: undefined,
				luck: undefined,
			},
			icon: null,
			baseMinDamage: undefined,
			baseMaxDamage: undefined,
			requiredLevel: undefined,
			stackMaxSize: undefined,
			stackSize: undefined,
			effectDescription: undefined,
        	quote: undefined,
			material: undefined,
			salable: true,
			sellPrice: undefined,
			cost: undefined,
		},
	},

	watch: {

		'itemCreation.slotType.type': function () {
			if (this.itemCreation.slotType.type == 'trinket') {
				this.itemCreation.slotType.name = undefined
				this.itemCreation.slotType.subtype = "Neck"
				this.itemCreation.baseMinDamage = undefined
				this.itemCreation.baseMaxDamage = undefined
			} else if (this.itemCreation.slotType.type == 'weapon') {
				this.itemCreation.slotType.name = 0
				this.itemCreation.slotType.subtype = "One-Hand"
				this.itemCreation.baseMinDamage = 0
				this.itemCreation.baseMaxDamage = 1
			}
		},

		'itemCreation.baseMinDamage': function () {
			if (this.itemCreation.baseMinDamage > this.itemCreation.baseMaxDamage) {
				this.itemCreation.baseMaxDamage = this.itemCreation.baseMinDamage
			}
		},

		'itemCreation.baseMaxDamage': function () {
			if (this.itemCreation.baseMinDamage > this.itemCreation.baseMaxDamage) {
				this.itemCreation.baseMinDamage = this.itemCreation.baseMaxDamage
			}
		},

		'itemCreation.effectDescription': function () {
			if (this.itemCreation.effectDescription === '') {
				this.itemCreation.effectDescription = undefined
			}
		},

		'itemCreation.quote': function () {
			if (this.itemCreation.quote === '') {
				this.itemCreation.quote = undefined
			}
		},

	},

	computed: {

		tooltipItemWeaponType() {
			let itemWeaponType = this.itemCreation.slotType.name

			const weaponTypeMapping = {
				0: 'Sword',
				1: 'Axe',
				2: 'Mace',
				3: 'Dagger',
				4: 'Polearm',
				5: 'Fist Weapon',
				6: 'Staff',
				7: 'Bow',
				8: 'Crossbow',
				9: 'Gun',
				20: 'Shield',
			}

			return weaponTypeMapping[itemWeaponType]
		},

		tooltipItemUniqueType() {
			let itemUniqueType = this.itemCreation.unique

			const weaponTypeMapping = {
				1: 'Unique',
				2: 'Unique-Equipped',
			}

			return weaponTypeMapping[itemUniqueType]
		},

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

		equipableCheckbox() {
			if (this.itemCreation.equipable) {
				return 'background-color: white'
			}
			else {
				return
			}
		},

		itemRequiredLevelCheckbox() {
			if (this.itemCreation.requiredLevel > 1) {
				return 'background-color: white'
			}
			else {
				return
			}
		},

		itemStackableCheckbox() {
			if (this.itemCreation.stackMaxSize !== undefined) {
				return 'background-color: white'
			}
			else {
				return
			}
		},

		itemMaterialCheckbox() {
			if (this.itemCreation.material !== undefined) {
				return 'background-color: white'
			}
			else {
				return
			}
		},

		itemSalableCheckbox() {
			if (this.itemCreation.salable == true) {
				return 'background-color: white'
			}
			else {
				return
			}
		},

		printItem() { // Enzo saved me again bruuuh
			this.itemCreation.id = parseInt(this.itemCreation.id)
			this.itemCreation.requiredLevel !== undefined ? this.itemCreation.requiredLevel = parseInt(this.itemCreation.requiredLevel) : ''
			this.itemCreation.baseMinDamage !== undefined ? this.itemCreation.baseMinDamage = parseInt(this.itemCreation.baseMinDamage) : ''
			this.itemCreation.baseMaxDamage !== undefined ? this.itemCreation.baseMaxDamage = parseInt(this.itemCreation.baseMaxDamage) : ''
			this.itemCreation.stackMaxSize !== undefined ? this.itemCreation.stackMaxSize = parseInt(this.itemCreation.stackMaxSize) : ''
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

		itemPriceMultiplier(item) {
			switch (item.quality) {
				case 0:
					return 0.95
				case 1:
					return 1
				case 2:
					return 1.05
				case 3:
					return 1.1
				case 4:
					return 1.2
				case 5:
					return 1.4
				case 6:
					return 1.45
				case 7:
					return 0 // heirloom for now so 0
				default:
					return 1
			}
		},

		itemEquipable() {
			if (this.itemCreation.equipable == false || this.itemCreation.equipable == undefined) {
				this.itemCreation.equipable = !this.itemCreation.equipable
				this.itemCreation.slotType.type = "weapon"
				this.itemCreation.slotType.name = 0
				this.itemCreation.slotType.subtype = "One-Hand"
				this.itemCreation.stackMaxSize = undefined
				this.itemCreation.stackSize = undefined
			} else {
				this.itemCreation.equipable = undefined
				this.itemCreation.slotType.type = undefined
				this.itemCreation.slotType.name = undefined
				this.itemCreation.slotType.subtype = undefined
				this.itemCreation.baseMinDamage = undefined
				this.itemCreation.baseMaxDamage = undefined
			}
		},

		itemLevelRequired() {
			if (this.itemCreation.requiredLevel === undefined) {
				this.itemCreation.requiredLevel = 2
			} else if (this.itemCreation.requiredLevel > 1) {
				this.itemCreation.requiredLevel = undefined
			}
		},

		itemStackable() {
			if (this.itemCreation.stackMaxSize === undefined) {
				this.itemCreation.stackMaxSize = 1
				this.itemCreation.stackSize = 1
			} else if (this.itemCreation.stackMaxSize !== undefined) {
				this.itemCreation.stackMaxSize = undefined
				this.itemCreation.stackSize = undefined
			}
		},

		itemIsAMaterial() {
			if (this.itemCreation.material === undefined) {
				this.itemCreation.material = true
			} else if (this.itemCreation.material !== undefined) {
				this.itemCreation.material = undefined
			}
		},

		itemSalable() {
			if (this.itemCreation.salable) {
				this.itemCreation.salable = false
			} else {
				this.itemCreation.salable = true
			}
		},

		itemIcon(item) {
			icon = 'inv_misc_questionmark'
			if (item.icon != null) {
				icon = item.icon
			}

			return icon
		},

		reset(tab) {
			if (tab == 0) {
				this.itemCreation.id = undefined
				this.itemCreation.name = ''
				this.itemCreation.equipable = undefined
				this.itemCreation.quality = 0
				this.itemCreation.unique = 0
				this.itemCreation.slotType.type = undefined
				this.itemCreation.slotType.name = undefined
				this.itemCreation.slotType.subtype = undefined
				this.itemCreation.icon = null
				this.itemCreation.baseMinDamage = undefined
				this.itemCreation.baseMaxDamage = undefined
				this.itemCreation.requiredLevel = undefined
				this.itemCreation.stackMaxSize = undefined
				this.itemCreation.stackSize = undefined
				this.itemCreation.effectDescription = undefined
				this.itemCreation.quote = undefined
				this.itemCreation.material = undefined
				this.itemCreation.salable = true
				this.itemCreation.sellPrice = undefined
				this.itemCreation.cost = undefined
			}
		},

	},

	mounted() {
	},
})
