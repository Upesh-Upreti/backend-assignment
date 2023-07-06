const constants = require("../constants/constants");
const { CartItem, User, Product } = require("../models");
const generateUid = require("../utils/generateUid");
const { StatusCodes } = require('http-status-codes')

const postAddToCart = async (req, res) => {
    const { quantity, id: userId } = req.body;
    const productId = req.params.productId;

    try {
        const product = await Product.findOne({ where: { id: productId } });
        const cart = await CartItem.create({
            id: await generateUid(),
            productId,
            quantity,
            price: product.price,
            userId,
        });
        if (cart)
            return res.status(StatusCodes.CREATED).json({ message: constants.PRODUCT_ADDED_TO_CART });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }

}

const getAllCartItem = async (req, res) => {
    const { page, limit, offset } = req.query;
    const userId = req.body.id;


    try {
        const totalCartItems = await CartItem.count();
        const cartItems = await User.findOne({
            where: { id: userId },
            limit: limit,
            attributes: ['id',],
            offset,
            include: [{ model: CartItem }],
        });
        const hasMore = totalCartItems > offset + limit;
        return res.status(StatusCodes.OK).json({
            pagination: {
                totalCartItems,
                page,
                limit,
                hasMore,
            },
            cartItems,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

const clearCart = async (req, res) => {
    const userId = req.body.id;

    try {
        const deletedCart = await CartItem.destroy({ where: { userId } });

        if (deletedCart)
            return res.status(StatusCodes.OK).json(constants.CART_DELETED);
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}


const deleteCartItem = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedCart = await CartItem.destroy({ where: { id } });

        if (deletedCart)
            return res.status(StatusCodes.OK).json(constants.CART_ITEM_DELETED);
        return res.status(StatusCodes.BAD_REQUEST).json(constants.NO_ITEM_FOUND);
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

const updateCartItem = async (req, res) => {
    const id = req.params.id;

    const { quantity, } = req.body;

    try {
        const cart = await CartItem.update(
            { quantity },
            { where: { id } }
        );
        if (cart)
            return res.status(StatusCodes.CREATED).json({ message: constants.CART_ITEM_UPDATED });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

module.exports = {
    postAddToCart,
    clearCart,
    getAllCartItem,
    updateCartItem,
    deleteCartItem
}