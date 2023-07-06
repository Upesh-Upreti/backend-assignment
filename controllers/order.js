const { StatusCodes } = require('http-status-codes');
const { User, CartItem, Order, OrderItem } = require('../models');
const generateUid = require('../utils/generateUid');

const placeOrder = async (req, res) => {

    const userId = req.body.id;

    try {
        const cartItems = await User.findOne({
            where: { id: userId },
            attributes: ['id',],
            include: [{ model: CartItem }],
        });

        const totalAmount = cartItems.CartItems.reduce(
            (totalAmount, item) => (item.price * item.quantity) + totalAmount,
            0
        );

        const deliveryLocation = await User.findOne({ where: { id: userId } }).address;

        const order = await Order.create({
            id: await generateUid(),
            userId,
            totalAmount,
            deliveryLocation,
            orderStatus: "processing",
        });

        const mapCartItem = async (item) => ({
            id: await generateUid(),
            userId,
            orderId: order.id,
            orderId: item.productId,
            quantity: item.quantity,
            price: item.price,
        });

        const orderItemsPromises = cartItems.CartItems.map(mapCartItem);
        const orderItems = await Promise.all(orderItemsPromises);

        //console.log(orderItems);
        const placedOrder = await OrderItem.bulkCreate(orderItems);

        const deletedCart = await CartItem.destroy({ where: { userId } });
        console.log(deletedCart);

        if (placedOrder)
            return res.status(StatusCodes.CREATED).json(placedOrder);

    } catch (error) {
        console.log(error);
    }
}

const getAllOrders = async (req, res) => {
    const { page, limit, offset } = req.query;
    const userId = req.body.id;

    try {
        const totalOrder = await Order.count();
        const order = await Order.findAll({
            where: { id: userId },
            limit: limit,
            offset,
        });
        const hasMore = totalOrder > offset + limit;
        return res.status(StatusCodes.OK).json({
            pagination: {
                totalOrder,
                page,
                limit,
                hasMore,
            },
            order,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

const getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Order.findOne({ where: { id } });
        if (order) return res.status(StatusCodes.OK).json(order);
        return res.status(StatusCodes.NOT_FOUND).json({ 'message': 'User not found.' });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}

const changeOrderStatus = async (req, res) => {

}

module.exports = {
    placeOrder,
    getAllOrders,
    getOrderById,
    changeOrderStatus,
}