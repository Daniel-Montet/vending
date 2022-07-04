import { ICoin, IProduct } from "./lib/types/types";


class VendingMachine {
	private coins;
	private products;

	constructor() {
		this.coins = new Map<ICoin["code"], ICoin>();
		this.products = new Map<IProduct["code"], IProduct>();
	}

	addOneProduct(product: IProduct) {
		this.products.set(product.code, product);
		return this.findOneProduct(product.code)
	}

	findOneProduct(code: number) {
		return this.products.get(code);
	}

	findAllProducts() {
		return [...this.products.values()];
	}

	deleteOneProduct(code: number) {
		return this.products.delete(code);
	}

	addOneCoin(coin: ICoin) {
		this.coins.set(coin.code, coin);
		return this.findOneCoin(coin.code);
	}

	findOneCoin(code: number) {
		return this.coins.get(code);
	}

	findAllCoins() {
		return [...this.coins.values()]
	}

	deleteOneCoin(code: number) {
		return this.coins.delete(code)
	}

}

const MachineService = new VendingMachine()

export default MachineService;