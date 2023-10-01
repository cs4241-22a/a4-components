import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config"

// eslint-disable-next-line no-undef
const port = process.env.PORT
const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
    console.log(req.body)
    res.status(200)
    res.end()
})

ViteExpress.listen(app, port, () => console.log("Server is listening on", port));