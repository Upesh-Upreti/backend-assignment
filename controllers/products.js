const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { Product } = require('../models/')
const generateUid = require('../utils/generateUid');

const postCreateProduct = async (req, res) => {
    const {
        title,
        imageUrl,
        imageAlt,
        display,
        price,
        description,
    } = req.body;

    try {
        const product = await Product.create({
            id: await generateUid(),
            title,
            description,
            imageUrl,
            imageAlt,
            price,
            display,
        })

        if (product)
            return res.status(StatusCodes.CREATED).json({ message: "Product was created successfully." });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

const getAllProducts = async (req, res) => {
    const { page, limit, offset } = req.query;

    console.log(req.query);

    try {
        const totalProducts = await Product.count();
        const products = await Product.findAll({
            limit: limit,
            offset,
        });
        const hasMore = totalProducts > offset + limit;
        return res.status(StatusCodes.OK).json({
            pagination: {
                totalProducts,
                page,
                limit,
                hasMore,
            },
            products,
        });
    } catch (error) {
        console.log(error.message);

    }
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ where: { id } });
        if (product) return res.status(StatusCodes.OK).json(product);
        return res.status(StatusCodes.NOT_FOUND).json({ 'message': 'User not found.' });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}

const deleteProdutById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.destroy({ where: { id } });
        if (product) return res.status(StatusCodes.OK).json(product);
        return res.status(StatusCodes.NOT_FOUND).json({ 'message': 'Product not found.' });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}

const updateProductById = async (req, res) => {

    const id = req.params.id;

    const {
        title,
        imageUrl,
        imageAlt,
        display,
        price,
        description,
    } = req.body;

    try {
        const product = await Product.findOne({ where: { id } });

        if (!product)
            return res.status(StatusCodes.BAD_REQUEST).json({ 'message': 'No such product found' });

        const editedProduct = await product.update({
            title,
            imageUrl,
            imageAlt,
            display,
            price,
            description,
        })
        if (editedProduct)
            return res.status(StatusCodes.OK).json({ 'message': 'Product updated successfully.', editedProduct });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}


module.exports = {
    postCreateProduct,
    getAllProducts,
    getProductById,
    deleteProdutById,
    updateProductById,
}