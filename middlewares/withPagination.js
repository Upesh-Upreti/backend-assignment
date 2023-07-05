const withPagination = (req, res, next) => {
    let { page, limit } = req.query;

    req.query.page = isNaN(page) ? 1 : parseInt(page);
    req.query.limit = isNaN(limit) ? 10 : parseInt(limit);
    req.query.offset = (req.query.page - 1) * req.query.limit;

    next();
}

module.exports = withPagination;