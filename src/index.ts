import express from "express";



const app = express();
const PORT = process.env.PORT || 8000;


// bootstrap middelware
app.use(express.json());

app.listen(PORT, () => {
	console.log(`App running on port ${8000}`)
})