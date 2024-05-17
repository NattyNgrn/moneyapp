import express  from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./helpers.js";

const app = express();
const port = 1287;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

pool.connect();

app.get("/", (req, res) => {
    res.json("IT WORKS");
});

app.get("/transactions/:clerkid", async (req, res) => {
    try {
        const clerkid = req.params.clerkid;
        const result = await pool.query("SELECT * FROM transactions where clerkid=$1", [clerkid]);
        res.send(result.rows);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);  
    }
});

app.put("/addtransaction", async (req, res) => {
    try {
        const { clerkid, category, tagname, amount, name, date } = req.body;
        await pool.query(
            "INSERT INTO transactions (clerkid, category, tagname, amount, name, date) VALUES ($1, $2, $3, $4, $5, $6)",
            [clerkid, category, tagname, amount, name, date]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.post("/updatetransaction", async (req, res) => {
    try {
        const { clerkid, category, tagname, amount, name, date } = req.body;
        console.log("updating transaction");
        await pool.query(
            "UPDATE transactions SET category = $2, tagname = $3, amount = $4, date = $6 WHERE name = $5 AND clerkid=$1",
            [clerkid, category, tagname, amount, name, date]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.delete("/deletetransaction", async (req, res) => {
    try {
        const { clerkid, name } = req.body;
        await pool.query("DELETE FROM transactions WHERE name = $1 AND clerkid = $2", [name, clerkid]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.get("/tags/:clerkid", async (req, res) => {
    try {
        const clerkid = req.params.clerkid;
        const result = await pool.query("SELECT * FROM tags WHERE clerkid=$1", [clerkid]);
        res.send(result.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.put("/addtag", async (req, res) => {
    try {
        const { clerkid, tagname, isgoal, total, category } = req.body;
        await pool.query(
            "INSERT INTO tags (clerkid, tagname, isgoal, total, category) VALUES ($1, $2, $3, $4, $5)",
            [clerkid, tagname, isgoal, total, category]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.post("/updatetag", async (req, res) => {
    try {
        const { clerkid, tagname, isgoal, total, category } = req.body;
        await pool.query(
            "UPDATE tags SET isgoal = $3, total = $4, category = $5 WHERE tagname = $2 AND clerkid = $1",
            [clerkid, tagname, isgoal, total, category]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

async function getAmountForTag(tagname, clerkid) {
    const sumResult = await pool.query(
        "SELECT SUM(amount) FROM transactions WHERE tagname = $1 AND clerkid=$2",
        [tagname, clerkid]
    );
    return sumResult.rows[0].sum;
}

app.get("/getgoalsinfo/:clerkid", async (req, res) => {
    try {
        const clerkid = req.params.clerkid;
        let result = [];
        const goalTags = await pool.query(
            "SELECT tagname, total FROM tags WHERE clerkid = $1 AND isgoal = true",
            [clerkid]
        );
        for (let i = 0; i < goalTags.rows.length; i++) {
            const row = goalTags.rows[i];
            const amount = await getAmountForTag(row.tagname, clerkid);
            result.push({
                tagname: row.tagname,
                current: amount,
                total: row.total
            });
        }
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.get("/getcategoryinfo/:clerkid", async (req, res) => {
    try {
        const clerkid = req.params.clerkid;
        const { category } = req.body;
        let result = [];
        const tags = await pool.query(
            "SELECT tagname FROM tags WHERE clerkid=$2 AND category = $1",
            [category, clerkid]
        );
        for (const row in tags.rows) {
            const amount = await getAmountForTag(row.tagname);
            result.push({
                tagname: row.tagname,
                amount: amount
            });
        }
        res.send(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
