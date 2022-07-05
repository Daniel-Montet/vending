import { ICoin, IProduct, ISale } from "./lib/types/types";


class VendingMachine {
	private coins;
	private products;
	private sales;
	private accountBalance;

	constructor() {
		this.coins = new Map<ICoin["code"], ICoin>();
		this.products = new Map<IProduct["code"], IProduct>();
		this.sales = new Map<ISale, ISale>()
		this.accountBalance = 0;
	}

	addOneProduct(product: IProduct) {
		product.price = this.round(product.price)
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
		coin.count = this.round(coin.count);
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

	addOneSale(sale: ISale) {
		this.sales.set(sale, sale);
	}

	findAllSalesRecords() {
		return [...this.sales.values()]
	}

	findSumOfSales() {
		const listOfSales = [...this.sales.values()]
		// const sales = listOfSales.reduce((prevSale: ISale, currSale: ISale) => prevSale.bill + currSale.bill, {
		// 	bill: 0,
		// 	coinCode: null,
		// 	items: null,
		// 	productCode: null
		// });
		let total = 0;
		listOfSales.map(sale => {
			return total += sale.bill
		})
		return total;
	}

	withDraw(amount: number) {
		if (amount > this.accountBalance) {
			return "No more cash in account"
		}
		const result = this.accountBalance - this.round(amount);
		this.accountBalance = result;
		return amount;
	}

	findAccountBalance() {
		return this.accountBalance
	}

	updateAccount(amount: any) {
		amount = this.round(amount)
		return this.accountBalance += amount
	}

	round(number: number) {
		return Math.round(number * 100) / 100
	}
}

const MachineService = new VendingMachine()

export default MachineService;