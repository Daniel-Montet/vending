import joi from "joi";

export const productSchema = joi.object({
	name: joi.string().min(3).max(10).required(),
	price: joi.number().min(1).required(),
	stock: joi.number().min(0),
	code: joi.number().min(0).required()
})


export const coinSchema = joi.object({
	name: joi.string().min(3).max(10).required(),
	total: joi.number().min(1).required(),
	code: joi.number().min(0).required()
})