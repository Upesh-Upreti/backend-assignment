const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { User } = require('../models/')

const getProfile = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] }, });
        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getProfile,
}