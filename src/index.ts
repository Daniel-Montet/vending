import express from "express";
import MachineService from "./core";
import joi from "joi";

const app = express();
const PORT = process.env.PORT || 8000;




const productSchema = joi.object({
	name: joi.string().min(3).max(10).required(),
	price: joi.number().min(1).required(),
	stock: joi.number().min(0),
	code: joi.number().min(0).required()
})


export function validate(schema: any, input: {}): { value: any, error: any } {
	return schema.validate(input)
}


// bootstrap middelware
app.use(express.json());

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

app.listen(PORT, () => {
	console.log(`App running on port ${8000}`)
})