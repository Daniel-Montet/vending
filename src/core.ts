interface product {
	stock: number,
	sold: number,
	price: number,
	code: number
}


class VendingMachine {
	private coins: any;
	private products;

	constructor() {
		this.coins = new Set();
		this.products = new Set<product>();
	}

	get items() {
		return this.products.entries()
	}
	// setPrice
	// collectMoney
	// addProducts
	// addOrUpdateCoins
}


const Machine = new VendingMachine();

export default Machine;