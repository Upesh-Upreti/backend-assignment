
const jwt = require("jsonwebtoken");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
require('dotenv').config();

const withAuth = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json(nonExistingUser);

    try {
        const decodedToken = jwt.verify(token, 'y89oih6ug5gung67bg5nf6h4jimlrefybnetfbmne,jfnewm7nuewdmynwe,dmwenvdyrvwentbymdnu');
        req.body.id = decodedToken.id;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.UNAUTHORIZED).json({ 'message': ReasonPhrases.UNAUTHORIZED });
    }

};

module.exports = withAuth;