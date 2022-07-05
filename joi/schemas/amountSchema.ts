import joi from "joi";

export const amountSchema = joi.object({
	amount: joi.number().min(0).required()
})