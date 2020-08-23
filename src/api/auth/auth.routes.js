const express = require('express');
const yup = require('yup');
const User = require('../users/users.model');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('../../lib/jwt');
//Validation Username, Password, Email
const schema = yup.object().shape({
    name: yup.string().trim().min(2).matches(/\w+/i).required(),
    email: yup.string().trim().email().required(),
    password: yup
    .string()
    .min(8)
    .max(100)
    .matches(/[^A-Za-z0-9]/, 'password must contain special character.')
    .matches(/[A-Z]/, 'password must contain uppercase character.')
    .matches(/[a-z]/, 'password must contain lowercase character.')
    .matches(/[0-9]/, 'password must contain digit number.')
    .required()
});

router.post('/signup', async (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;

    try {
        const createUser = {
            name,
            email,
            password
        };
        await schema.validate(createUser, {
            abortEarly: false
        });

        const existingUser = await User.query().where({email}).first();
        if(existingUser) {
            const error = new Error('Email is use');
            res.status(403);
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const insertedUser =  await User.query().insert(
            {
                email,
                name,
                password: hashedPassword
            }
        );

        delete insertedUser.password;
        const userId = insertedUser.id;
        const payload = {
           userId,
            name, 
            email
        };
        const token = await jwt.signin(payload);
        res.json(
            {
                user:payload,
                token
            }
        );
    } catch (error) {
        next(error);
    }

   
});

router.post('/signin', async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    try {
        await schema.validate({
            name: 'EslaM',
            email,
            password
        }, {
            abortEarly: false
        });

        const user = await User.query().where({
            email
        }).first();
        if (!user) {
            const error = new Error('invalid login!');
            res.status(403);
            throw error;
        }

        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            const error = new Error('invalid password!');
            res.status(401);
            throw error;
        }

        const userId = user.id;
        const username = user.name;

        const payload = {
            userId,
            username,
            email
        }

        const token = await jwt.signin(payload);
        res.json({
            payload,
            token
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;