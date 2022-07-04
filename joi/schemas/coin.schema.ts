import joi from "joi";

export const coinSchema = joi.object({
	name: joi.string().min(3).max(10).required(),
	count: joi.number().min(1).required(),
	code: joi.number().min(0).required()
})