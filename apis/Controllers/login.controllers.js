const { body, validationResult } = require('express-validator');
const { PrismaClient, Prisma } = require("@prisma/client");
const { use } = require('../Routes/property.routes');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userLogin = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                email: username
            }
        });

        if (user && user.status && await bcrypt.compare(password, user.password)) {

            // Create token
            const token = jwt.sign({
                userId: user.id,
                role: user.role
            }, process.env.JWT_SECRET, {
                expiresIn: '5h',
            }
            );
            res.status(200).json({
                status: true,
                token: token,
                user: {
                    id: user.uuid,
                    name: user.fullName,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    role: user.role
                }
            });
        }

        else
            res.status(401).json({ status: false, message: 'Invalid Credentials' });

    } catch (e) {

        res.status(500).json({
            message: "something went wrong"
        })
    }
}

const validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('username', 'Invalid email').isEmail(),
                body('password', 'Password is required').notEmpty()
            ]
        }
    }
}


module.exports = {
    userLogin,
    validate
}