export function validate(schema: any, input: {}): { value: any, error: any } {
	return schema.validate(input)
}

