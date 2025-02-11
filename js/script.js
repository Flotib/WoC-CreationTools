var app = new Vue({
	el: '#app',
	data: {
		tab: 0, // 0 -> item; 1 -> merchants; 2 -> enemies
		cursorX: null,
		cursorY: null,
		icons: [],
		itemsList: [],
		toasts: [],
		pastedItemCode: '',
		hoverItem: {
			item: [],
		},
		searchQuery: "",
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
				intellect: undefined,
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
		shiftPressed: false,
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

		itemsList: {
			handler(newItems) {
				localStorage.setItem("itemsList", JSON.stringify(newItems));
			},
			deep: true
		},
	},

	computed: {

		filteredItems() {
			return this.itemsList.filter(item => {
				const query = this.searchQuery.toLowerCase();
		
				// Si la recherche commence par #, cherchez dans les quotes, descriptions et ID
				if (query.startsWith('#')) {
					const textQuery = query.slice(1); // Supprime le #
					return (
						(item.quote && item.quote.toLowerCase().includes(textQuery)) ||
						(item.effectDescription && item.effectDescription.toLowerCase().includes(textQuery)) ||
						item.id.toString().includes(textQuery) // Recherche dans l'ID
					);
				}
		
				// Sinon, cherchez uniquement dans les noms
				return item.name.toLowerCase().includes(query);
			});
		},

		tooltipPosition() {
			let e = 0
			let correctionY = 0
			let correctionX = 0
			this.cursorY
			this.cursorX

			const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

			if (document.querySelector('.saved-item-tooltip') && this.hoverItem) {
				e = document.querySelector('.saved-item-tooltip')
				correctionY = Math.max(e.offsetHeight + 5, this.cursorY)
				correctionX = Math.min(this.cursorX, vw - e.offsetWidth - 30)
			}

			const left = correctionX + 10 + 'px'

			const top = correctionY - 2 + 'px'


			return {
				left,
				top
			}
		},

		tooltipTextWidth() {
			let e = 0
			let correctionY = 0
			let correctionX = 0
			this.cursorY
			this.cursorX

			const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

			if (document.querySelector('.item-tooltip') && this.hoverItem) {
				e = document.querySelector('.item-tooltip')
				return e.offsetWidth
			} else {
				return null
			}
		},

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
				3: 'Saved presets'
			}

			return tabMap[this.tab]
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

		isItemAlreadySaved() {
			// Vérifie si un item avec le même ID ou le même nom existe déjà
			return this.filteredItems.some(item => 
				item.id === this.itemCreation.id || item.name === this.itemCreation.name
			);
		}

		/*
		idcheck(){
			if 
		},
		*/

	},

	methods: {

		tooltipHoverItemWeaponType() {
			let itemWeaponType = this.hoverItem.slotType.name

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

		getMouseCoords(e) {
			this.cursorX = e.pageX
			this.cursorY = e.pageY
			//console.log({'x':e.pageX, 'y':e.pageY})
		},

		itemHoverEnter(item) {
			this.hoverItem = item;
		},

		itemHoverLeave() {
			this.hoverItem = null
		},

		handleKeyDown(event) {
			if (event.key === "Shift") {
				this.shiftPressed = true;
			}
		},

		handleKeyUp(event) {
			if (event.key === "Shift") {
				this.shiftPressed = false;
			}
		},

		getQualityColor(item) {
			switch (item.quality) {
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
				this.itemCreation.stats.strength = undefined
				this.itemCreation.stats.agility = undefined
				this.itemCreation.stats.intellect = undefined
				this.itemCreation.stats.stamina = undefined
				this.itemCreation.stats.luck = undefined
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
				this.itemCreation.stats.strength = undefined
				this.itemCreation.stats.agility = undefined
				this.itemCreation.stats.intellect = undefined
				this.itemCreation.stats.stamina = undefined
				this.itemCreation.stats.luck = undefined
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

        saveItem() {
            if (!this.itemCreation.name) {
                alert("Enter a name!");
                return;
            }
			if (this.itemCreation.id==0) {
                alert("Enter a valid ID!");
                return;
            }
            let storedItems = JSON.parse(localStorage.getItem("items")) || [];
            storedItems.push({ ...this.itemCreation });
            localStorage.setItem("items", JSON.stringify(storedItems));

            this.loadItems();
        },

        loadItems() {
            this.itemsList = JSON.parse(localStorage.getItem("items")) || [];
        },

        deleteItem(itemId) {
			let storedItems = JSON.parse(localStorage.getItem("items")) || [];
    
			storedItems = storedItems.filter(item => item.id !== itemId);
			
			localStorage.setItem("items", JSON.stringify(storedItems));
		
			this.loadItems();
		},

		clearAllItems() {
			localStorage.removeItem("items");
			this.savedItems = [];
		},

		copyItemCode(item) {
			// Convertir l'objet item en JSON
			const json = JSON.stringify(item, null, 4); // Indentation de 4 espaces
			const unquoted = json.replace(/"([^"]+)":/g, '$1:'); // Supprimer les guillemets des clés
		
			// Copier le JSON dans le presse-papiers
			navigator.clipboard.writeText(unquoted)
				.then(() => {
					// Générer un ID unique avec Date.now()
					const toastId = Date.now();
					// Ajouter un nouveau toast à la liste
					this.toasts.push({ id: toastId, message: "Code copied to clipboard!" });
		
					// Supprimer le toast après 3 secondes en utilisant son ID
					setTimeout(() => {
						this.toasts = this.toasts.filter(t => t.id !== toastId);
					}, 3000);
				})
				.catch((err) => {
					console.error("Error:", err); // Gestion des erreurs
				});
		},

		loadItemFromCode() {
			try {
				// 1️⃣ Parse le JSON collé dans la zone de texte
				let itemData = JSON.parse(this.pastedItemCode);
		
				// 2️⃣ Vérifie que l'objet a bien la structure attendue
				if (!itemData.id || !itemData.name) {
					alert("Invalid item data! Make sure it's correctly formatted.");
					return;
				}
		
				// 3️⃣ Charge l'objet dans le modèle `itemCreation`
				this.itemCreation = { ...this.itemCreation, ...itemData };
		
				// 4️⃣ "À la crados" : Force la mise à jour des damages en les définissant deux fois
				if (itemData.baseMinDamage !== undefined || itemData.baseMaxDamage !== undefined) {
					const { baseMinDamage, baseMaxDamage } = itemData;
					this.itemCreation.baseMinDamage = baseMinDamage !== undefined ? baseMinDamage : 0;
					this.itemCreation.baseMaxDamage = baseMaxDamage !== undefined ? baseMaxDamage : 0;
		
					// Deuxième étape pour forcer la mise à jour
					setTimeout(() => {
						this.itemCreation.baseMinDamage = baseMinDamage !== undefined ? baseMinDamage : 0;
						this.itemCreation.baseMaxDamage = baseMaxDamage !== undefined ? baseMaxDamage : 0;
					}, 10); // Un petit délai pour garantir que Vue.js met à jour les propriétés
				}
		
				alert("Item loaded successfully!");
			} catch (error) {
				alert("Invalid JSON format! Please check your item code.");
			}
		}

	},

	mounted() {
		window.addEventListener('mousemove', this.getMouseCoords)
		window.addEventListener("keydown", this.handleKeyDown);
		window.addEventListener("keyup", this.handleKeyUp);
		const savedItems = localStorage.getItem("itemsList");
		if (savedItems) {
			this.itemsList = JSON.parse(savedItems);
		}
		this.loadItems();
	},
})
