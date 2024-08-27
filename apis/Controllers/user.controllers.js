const bcrypt = require("bcrypt");
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const { body, validationResult } = require('express-validator');

// Get all users

const getUsers = async (req, res, next) => {

    try {
        const users = await prisma.users.findMany({});
        res.status(200).json({ status: true, data: users });
    }
    catch (e) {
        res.status(500).json({ error: true, message: 'Went something wrong' });
    }
}

const addUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(body.password, 10);

        const payload = {
            email: body.email,
            fullName: body.fullName,
            mobileNumber: body.mobileNumber,
            password: encryptedPassword,
            role: body.role
        }

        const user = await prisma.users.create({ data: payload });
        res.status(200).json(user);

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.error('There is a unique constraint violation, a new user cannot be created with this email')
                res.status(409).json({
                    message: "Email Exists",
                    errorText: e?.message
                })
            }
            res.status(500).json({
                message: "something went wrong!",
                errorText: e?.message
            })
        }
        res.status(500).json({
            message: "something went wrong!!",
            errorText: e?.message
        })
        // throw e
    }
}

const updateUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.uuid;
    const body = req.body;
    try {
        const user = await prisma.users.update({
            where: {
                uuid: id
            },
            data: {
                //email: body.email,
                fullName: body.fullName,
                mobileNumber: body.mobileNumber,
                //  updatedAt: Date(now())
                // password: body.password,
                // role: body.role
            }
        })
        res.status(200).json(user);

    } catch (e) {

        console.log(e);

        res.status(500).json({
            message: "something went wrong33"
        })

        // throw e
    }

}

const removeUser = async (req, res, next) => {

    const id = req.params.uuid;
    try {
        const user = await prisma.users.delete({
            where: {
                uuid: id
            }
        })
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ error: true, message: 'Went something wrong' });
    }
}

const validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                body('email', 'Invalid email').isEmail(),
                body('fullName', 'Name field is required').notEmpty(),
                body('mobileNumber').isMobilePhone(),
                body('password', 'Password is required').notEmpty()
            ]
        }
        case 'updateUser': {
            return [
                body('fullName', 'Name field is required').notEmpty(),
                body('mobileNumber').isMobilePhone()
            ]
        }
        case 'removeUser': {
            return [

            ]
        }
    }
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    removeUser,
    validate
};