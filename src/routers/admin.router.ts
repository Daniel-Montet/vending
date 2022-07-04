// Step 3
// 	get total amount of sales
//  withdraw all profit
//  

import MachineService from "../core";

import express from "express";
import { validate } from "../../joi/joi.helpers";
import { productSchema } from "../../joi/schemas/product.schema";
import { coinSchema } from "../../joi/schemas/coin.schema";
const router = express.Router()


router.get("/products", (_, res) => {
	const result = MachineService.findAllProducts();
	return res.send(result)
})

router.get("/products/:code", (req, res) => {
	const result = MachineService.findOneProduct(parseInt(req.params.code));

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	return res.send(result)
})

router.post("/products", (req, res) => {
	const { value, error } = validate(productSchema, req.body);

	if (error) {
		return res.status(400).send(error);
	}

	const result = MachineService.addOneProduct(value);
	return res.send(result).status(201);
})

router.put("/products/:code", (req: any, res) => {
	// check if product exists
	const result = MachineService.findOneProduct(parseInt(req.params.code))

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	// validate payload
	const { value, error } = validate(productSchema, req.body);

	if (error) {
		return res.status(400).send(error);
	}

	const updatedProduct = MachineService.addOneProduct(value);
	return res.send(updatedProduct);
})

router.delete("/products/:code", (req, res) => {
	// check if product exists
	const result = MachineService.findOneProduct(parseInt(req.params.code));

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	const isDeleted = MachineService.deleteOneProduct(parseInt(req.params.code));
	return res.send(isDeleted)
})


router.get("/coins", (req, res) => {
	const result = MachineService.findAllCoins();
	return res.send(result)
})

router.get("/coins/:code", (req, res) => {
	const result = MachineService.findOneCoin(parseInt(req.params.code));

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	return res.send(result)
})


router.post("/coins", (req, res) => {
	const { value, error } = validate(coinSchema, req.body);

	if (error) {
		return res.status(400).send(error);
	}

	const result = MachineService.addOneCoin(value);
	return res.send(result).status(201);
})


router.put("/coins/:code", (req: any, res) => {
	// check if product exists
	const result = MachineService.findOneCoin(parseInt(req.params.code))

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	// validate payload
	const { value, error } = validate(coinSchema, req.body);

	if (error) {
		return res.status(400).send(error);
	}

	const updatedProduct = MachineService.addOneCoin(value);
	return res.send(updatedProduct);
})

router.delete("/coins/:code", (req, res) => {
	// check if product exists
	const result = MachineService.findOneCoin(parseInt(req.params.code));

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	const isDeleted = MachineService.deleteOneCoin(parseInt(req.params.code));
	return res.send(isDeleted)
})


export default router;