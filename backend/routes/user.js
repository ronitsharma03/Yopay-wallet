const dotenv = require('dotenv').config();
const express = require("express");
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;


router.get('/me', (req, res) => {
    const token = req.headers.authorization;
    // const user = res.json({
    //     firstName: username
    // })
    if(!token){
        return res.status(411).json({
            message: "Authentication failed"
        })
    }
    res.json({
        message: "Authentication successfull"
        // firstName: user
    })
    
})

// Signup route for user
const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3)
});

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Wrong inputs"
        });
    }

    try {
        const existingUser = await User.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken!"
            })
        }

        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = await User.create({
            username: req.body.username,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });


        const userId = newUser._id;

        // Initialize amount to every new user
        await Account.create({
            userId: userId,
            balance: Math.floor(Math.random() * 12000)
        });

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        return res.status(200).json({
            message: "User created successfully!",
            token: token,
        });
    }
    catch (error) {
        console.error("Error singing up the user", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})



// Signin route for the user
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Wrong inputs"
        });
    }

    try {
        const user = await User.findOne({
            username: req.body.username
        });

        if (!user) {
            return res.status(411).json({
                message: "Error while logging in: User not found"
            });
        }

        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isPassword) {
            return res.status(411).json({
                message: "Error while logging in: Incorrect password"
            });
        }

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.status(200).json({
            message: "Signin successfull",
            token: token,
            firstName: user.firstName
        });
    }
    catch (error) {
        console.log("Error while signing in ", error);
        return res.status(500).json({
            message: "Intrnal server error"
        })
    }
})

// Update profile route
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});
router.put('/profile', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }
    try {
        await User.updateOne({ _id: req.userId }, req.body);
    }
    catch (error) {
        return res.status(411).json({
            message: "Internal server error"
        })
    }

    res.json({
        message: "Updated successfully!"
    });
});

// Route to get the searched users
router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    try{

    const users = await User.find({
        $and: [
            { _id: { $ne: req.userId } },
            {
                $or: [
                    { firstName: { "$regex": filter } },
                    { lastName: { "$regex": filter } }
                ]
            }
        ]
    })
    // console.log(users)

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
}
catch (error){
    return res.status(411).json({
        message: "Failed to fetch Users"
    })
}
})




module.exports = router;