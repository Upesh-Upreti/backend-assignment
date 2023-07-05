const { User } = require("../../models/");
const { compareSync, hashSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { StatusCodes } = require('http-status-codes');
const generateUid = require('../../utils/generateUid');

const postCreateUser = async (req, res) => {

    const { email, password, firstName, lastName, address, phoneNumber } = req.body;

    try {
        const duplicateUser = await User.findOne({ where: { email: email.toLowerCase() } })

        if (duplicateUser) return res.status(StatusCodes.BAD_REQUEST).json({ 'message': 'Email already exists' })

        const user = await User.create({
            id: await generateUid(),
            firstName,
            lastName,
            address: 'Tepu',
            phoneNumber,
            email: email.toLowerCase(),
            role: 'user',
            password: hashSync(password, 10),
        });

        if (user)
            return res.status(StatusCodes.CREATED).json({ 'message': 'user created successfully.' });


    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': 'Server Error Occured' });
    }

}

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email: email.toLowerCase() },
    });

    if (!user)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Sorry! invalid email or password." });

    if (!compareSync(password, user.password))
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Sorry! invalid email or password." });

    const jsonToken = sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "24h",
        }
    );

    res.status(StatusCodes.OK).json({ message: "Login was sucessful", token: jsonToken });
};


module.exports = {
    postLogin,
    postCreateUser
};
