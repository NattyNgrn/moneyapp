import express  from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./helpers.js";

const app = express();
const port = 1287;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



async function getTags() {
    await pool.connect();
    const res = await pool.query("SELECT * FROM tags");
    console.log(res.rows);
}
getTags();

app.get("/", (req, res) => {
    res.json("IT WORKS");
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
