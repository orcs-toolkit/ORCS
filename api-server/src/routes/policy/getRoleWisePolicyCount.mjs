import express from "express";
import { Policy } from "../../models/Policy.mjs";

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const data = await Policy.aggregate([
            { $group: { _id: "$role", list: { $push: "$banList" } } },
        ]);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: "Couldn't fetch data",
            error: err,
        });
    }
});

export { router as roleWisePolicyRouter };