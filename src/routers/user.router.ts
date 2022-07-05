// view all products
// purchase with specific coin
// get change back
// 



import express, { application } from "express";
import joi from "joi";
import { validate } from "../../joi/joi.helpers";
import MachineService from "../core";

const buySchema = joi.object({
	productCode: joi.number().min(0).required(),
	coinCode: joi.number().min(0).required(),
	numberOfItems: joi.number().min(1).required(),
	amount: joi.number().min(0).required()
})

const router = express.Router();


router.get("/", (req, res) => {
	return res.send("works")
})

router.get("/products", (_, res) => {
	const result = MachineService.findAllProducts();
	return res.send(result);
})


router.get("/products/:code", (req, res) => {
	const result = MachineService.findOneProduct(parseInt(req.params.code));

	if (!result) {
		return res.status(400).send("Resource not found")
	}

	return res.send(result);
})


router.post("/buy", (req, res) => {
	const { value, error } = validate(buySchema, req.body);
	console.log("=================================================")
	if (error) {
		return res.status(400).send(error)
	}

	// check if coin exists
	// check if we can disburse change if the transaction were to happen
	const coin = MachineService.findOneCoin(value.coinCode);

	if (!coin) {
		return res.status(404).send("Resource not found, no coin with given code found")
	}

	// check if product exists
	const product = MachineService.findOneProduct(value.productCode);
	if (!coin) {
		return res.status(404).send("Resource not found, no product with given code found")
	}

	// calculate amount to be charged
	const cash = MachineService.round(value.amount);
	const bill = product!.price * value.numberOfItems;
	console.log("total to be charged", bill)
	console.log("amount provided by customer", value.amount)

	// check if cash by customer is enough for purchase
	const isEnough = cash >= bill;
	console.log("isEnough money provided", isEnough)
	if (!isEnough) {
		return res.status(400).send("Provide enough money")
	}


	// check if there are enough coins for change
	const change = cash - bill;
	const coinReserve = coin.count - MachineService.round(change);
	console.log("coin count before bill", coin.count)
	console.log("coins after giving change ", coinReserve)
	let canOfferChange = Math.sign(coinReserve);
	console.log("can offer change", canOfferChange)

	if (canOfferChange === -1) {
		return res.send("Out of order, no change available")
	}

	// check if stock is enough
	const stock = product!.stock - value.numberOfItems;
	const canOfferProducts = Math.sign(stock)

	if (canOfferProducts === -1) {
		return res.send("Out of order, not enough products left")
	}

	// bill the client and record sale
	coin.count = coinReserve;
	product!.stock = stock;
	const sale = {
		"coinCode": coin.code,
		"productCode": product!.code,
		"bill": bill,
		"items": value.numberOfItems
	}
	MachineService.addOneCoin(coin);
	console.log(product)
	MachineService.addOneProduct(product!)
	MachineService.addOneSale(sale);
	MachineService.updateAccount(bill);

	return res.send({
		"message": `Thank you for purchasing ${value.numberOfItems} ${product!.name}`,
		"bill": bill,
		"change": change
	})
})


export default router;