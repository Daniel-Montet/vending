// Step one
// 	create coin
// 	update coin
// 	delete coin
// 	read coin
//  get all coins

// Step two
//  create product
//  update product
//  delete product
//  read product
//  get all products


// Step 3
// 	get total amount of sales
//  withdraw all profit
//  

import MachineService from "../core";

import express from "express";
import { validate } from "../lib/joi/joi.helpers";
import { coinSchema, productSchema } from "../lib/joi/schemas/product.schema";
const app = express();


app.get("/products", (_, res) => {
	const result = MachineService.findAllProducts();
	return res.send(result)
})

app.get("/products/:code", (req, res) => {
	const result = MachineService.findOneProduct(parseInt(req.params.code));

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	return res.send(result)
})

app.post("/products", (req, res) => {
	const { value, error } = validate(productSchema, req.body);

	if (error) {
		return res.status(400).send(error);
	}

	const result = MachineService.addOneProduct(value);
	return res.send(result).status(201);
})

app.put("/products/:code", (req: any, res) => {
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

app.delete("/products/:code", (req, res) => {
	// check if product exists
	const result = MachineService.findOneProduct(parseInt(req.params.code));

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	const isDeleted = MachineService.deleteOneProduct(parseInt(req.params.code));
	return res.send(isDeleted)
})


app.get("/coins", (req, res) => {
	const result = MachineService.findAllCoins();
	return res.send(result)
})

app.get("/coins/:code", (req, res) => {
	const result = MachineService.findOneCoin(parseInt(req.params.code));

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	return res.send(result)
})


app.post("/coins", (req, res) => {
	const { value, error } = validate(coinSchema, req.body);

	if (error) {
		return res.status(400).send(error);
	}

	const result = MachineService.addOneCoin(value);
	return res.send(result).status(201);
})


app.put("/coins/:code", (req: any, res) => {
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

app.delete("/coins/:code", (req, res) => {
	// check if product exists
	const result = MachineService.findOneCoin(parseInt(req.params.code));

	if (!result) {
		return res.status(404).send("Resource not found")
	}

	const isDeleted = MachineService.deleteOneCoin(parseInt(req.params.code));
	return res.send(isDeleted)
})