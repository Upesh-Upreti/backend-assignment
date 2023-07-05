const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { User } = require('../models/')

const getAllUsers = async (req, res) => {
    const { page, limit, offset } = req.query;

    try {
        const totalUsers = await User.count();
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            limit: limit,
            offset,
        });
        const hasMore = totalUsers > offset + limit;
        return res.status(StatusCodes.OK).json({
            pagination: {
                totalUsers,
                page,
                limit,
                hasMore,
            },
            users,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] }, });
        if (user) return res.status(StatusCodes.OK).json(user);
        return res.status(StatusCodes.NOT_FOUND).json({ 'message': 'User not found.' });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
}