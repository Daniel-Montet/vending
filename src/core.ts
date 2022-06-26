interface IProduct {
	stock: number,
	sold: number,
	price: number,
	code: number,
	name: string
}


class VendingMachine {
	private coins: any;
	private products;

	constructor() {
		this.coins = new Map();
		this.products = new Map<IProduct["code"], IProduct>();
	}

	addOne(product: IProduct) {
		this.products.set(product.code, product);
		return this.findOne(product.code)
	}

	findOne(code: number) {
		return this.products.get(code);
	}

	find() {
		return [...this.products.values()];
	}

	delete(code: number) {
		return this.products.delete(code);
	}


	// setPrice
	// collectMoney
	// addProducts
	// addOrUpdateCoins
}

const MachineService = new VendingMachine()

export default MachineService;