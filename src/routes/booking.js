const express = require("express");
const router = express.Router();
const { connection } = require("../connector");

/**
 * @openapi
 * /api/booking:
 *   post:
 *     summary: Create a new movie booking
 *     tags:
 *       - Booking
 *     responses:
 *       200:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: 'Internal Server Error'
 *
 */
router.post("/", async (req, res) => {
    const { movie, slot, seats } = req.body;
    if (!movie || !slot || !seats) {
        return res.status(400).json({ message: "Missing required fields: movie, slot, seats" });
    }
    try {
        const newBooking = new connection({ movie, slot, seats });
        await newBooking.save();
        res.status(200).json({ message: "Booking successful", data: newBooking });
    } catch (err) {
        res.status(500).json({ message: "Booking failed", error: err.message });
    }
});

/**
 * @openapi
 * /api/booking:
 *   get:
 *     summary: Get last booking details
 *     tags:
 *       - Booking
 *     responses:
 *       200:
 *         description: success
 *       500: 
 *         description: 'Error: Internal Server Error'
 *
 */
router.get("/", async (req, res) => {
    try {
        const lastBooking = await connection.findOne().sort({ _id: -1 });
        if (!lastBooking) {
            return res.status(200).json({ message: "no previous booking found" });
        }
        res.status(200).json(lastBooking);
    } catch (err) {
        res.status(500).json({ message: "Error fetching booking", error: err.message });
    }
});

module.exports = router;
