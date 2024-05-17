import express  from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool, getAmountsForTagsQueries } from "./helpers.js";

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

app.get("/getgoalsinfo/:clerkid", async (req, res) => {
    try {
        const clerkid = req.params.clerkid;
        let result = [];
        const goalTags = await pool.query(
            "SELECT tagname, total FROM tags WHERE clerkid = $1 AND isgoal = true",
            [clerkid]
        );
        const amountQueries = getAmountsForTagsQueries(goalTags.rows, clerkid);
        for (let i = 0; i < goalTags.rows.length; i++) {
            const row = goalTags.rows[i];
            const sumResult = await pool.query(amountQueries[i]);
            const amount = sumResult.rows[0].sum;
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

async function getCategoryInfo(category, clerkid) {
    let result = [["tag", "amount"]];
    const tags = await pool.query(
        "SELECT tagname FROM tags WHERE clerkid=$2 AND category = $1",
        [category, clerkid]
    );
    const amountQueries = getAmountsForTagsQueries(tags.rows, clerkid);
    for (let i = 0; i < tags.rows.length; i++) {
        const tagname = tags.rows[i].tagname;
        const sumResult = await pool.query(amountQueries[i]);
        const amount = sumResult.rows[0].sum;
        result.push([tagname, Number(amount)]);
    }
    return result;
}

app.get("/getcategoryinfo/:clerkid", async (req, res) => {
    try {
        const clerkid = req.params.clerkid;
        let result = {};
        result.income = await getCategoryInfo("Income", clerkid);
        result.expense = await getCategoryInfo("Expense", clerkid);
        result.saving = await getCategoryInfo("Saving", clerkid);
        res.send(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.get("/getamountforcategories/:clerkid", async (req, res) => {
    try {
        const clerkid = req.params.clerkid;
        const result = {};
        const income = await pool.query(`SELECT SUM(amount) FROM transactions WHERE category='Income' AND clerkid='${clerkid}'`);
        const expense = await pool.query(`SELECT SUM(amount) FROM transactions WHERE category='Expense' AND clerkid='${clerkid}'`);
        const saving = await pool.query(`SELECT SUM(amount) FROM transactions WHERE category='Saving' AND clerkid='${clerkid}'`);
        result.income = Number(income.rows[0].sum);
        result.expense = Number(expense.rows[0].sum);
        result.saving = Number(saving.rows[0].sum);
        result.savingsRate = (result.saving / result.income) * 100;
        result.spendingRate = (result.expense / result.income) * 100;
        res.send(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
