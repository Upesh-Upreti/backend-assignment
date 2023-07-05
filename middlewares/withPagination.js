const withPagination = (req, res, next) => {
    let { page, limit } = req.query;

    req.query.page = parseInt(page) || 1;
    req.query.limit = parseInt(limit) || 10;
    req.query.offset = (page - 1) * limit;

    next();
}

module.exports = withPagination;