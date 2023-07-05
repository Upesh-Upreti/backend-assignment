const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { User } = require('../models/')

const withAdmin = async (req, res, next) => {

    const id = req.body.id;

    try {
        const user = await User.findOne({ where: { id } });
        if (user.role === 'admin' || user.role === "superAdmin")
            return next();
        else res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}

module.exports = withAdmin;