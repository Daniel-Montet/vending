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
	const total = product!.price * value.numberOfItems;

	// check if cash by customer is enough for purchase
	const isEnough = value.amount >= total;
	if (!isEnough) {
		return res.status(400).send("Provide enough money")
	}


	// check if there are enough coins for change
	const result = coin.count - total;
	let sign = Math.sign(result);

	if (sign === -1) {
		return res.send("Out of order, no change")
	}

	// check if stock is enough
	const stock = product!.stock - value.numberOfItems;
	sign = Math.sign(stock)

	if (sign === -1) {
		return res.send("Out of order, not enough products left")
	}

	// bill the client
	coin.count = result;
	product!.stock = stock;
	MachineService.addOneCoin(coin);
	MachineService.addOneProduct(product!)

	return res.send("Thank you for purchasing")
})


export default router;