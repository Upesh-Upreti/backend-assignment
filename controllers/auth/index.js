const { User } = require("../../models/");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { StatusCodes } = require('http-status-codes');

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
};
