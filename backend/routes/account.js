const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    });
})

// Route to handle the transfer the money
router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();
        const { amount, to } = req.body;

        // Fetch the accounts within the transaction

        const accountFrom = await Account.findOne({
            userId: req.userId
        });

        if (!accountFrom || accountFrom.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance"
            });
        }

        const toAccount = await Account.findOne({
            userId: to
        });

        if (!toAccount) {
            return res.status(400).json({
                message: "Account do not exist"
            });
        }

        // Perform the transfer
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        );

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        );

        // Commit the final transaction

        await session.commitTransaction();
        res.status(200).json({
            message: "Transfer successfull"
        })

    }
    catch(error){
        await session.abortTransaction();
        return res.status(411).json({
            message: "Transaction failed"
        })
    }


});


module.exports = router;