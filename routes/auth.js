const User = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const secretKey = 'rajeevecommerce';

router.post('/newuser', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        if (user) {
            return res.status(500).send("User already exists with this email");
        } else {
            user = User(req.body);
            user.password = secPassword;
            user = await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            };
            const accessToken = jwt.sign(payload, secretKey);
            res.send({ user, accessToken });
            console.log(user.id);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(500).send("Check Credentials");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(401).send("Check credentials");
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        const accessToken = jwt.sign(payload, secretKey);
        res.json({ accessToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
