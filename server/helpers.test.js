
import { getAmountsForTagsQueries } from "./helpers.js";

describe("getAmountsForTagsQueries", () => {
    test("getAmountsForTagsQueries should return queries to get the sum of all transactions with that tag", async () => {
        const result = getAmountForTagQuery(
            [
                {tagname: "food"},
                {tagname: "vacation"},
                {tagname: "matcha"}
            ],
            "abc123"
        );
        expect(result).toEqual([
            "SELECT SUM(amount) FROM transactions WHERE tagname='food' AND clerkid='abc123'",
            "SELECT SUM(amount) FROM transactions WHERE tagname='vacation' AND clerkid='abc123'",
            "SELECT SUM(amount) FROM transactions WHERE tagname='matcha' AND clerkid='abc123'"
        ]);
    });
});
