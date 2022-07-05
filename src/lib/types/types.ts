export interface IProduct {
	stock: number,
	sold: number,
	price: number,
	code: number,
	name: string
}

export interface ICoin {
	name: string,
	count: number,
	code: number
}

export interface ISale {
	coinCode: number,
	productCode: number,
	items: number,
	bill: number
}