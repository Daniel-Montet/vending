import express from "express";
import adminRouter from "./routers/admin.router";
import userRouter from "./routers/user.router";



const app = express();
const PORT = process.env.PORT || 8000;


// bootstrap middelware
app.use(express.json());


app.use("/admin", adminRouter);
app.use("/users", userRouter)

app.listen(PORT, () => {
	console.log(`App running on port ${8000}`)
})