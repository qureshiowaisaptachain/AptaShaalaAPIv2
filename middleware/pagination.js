exports.pagination = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    result.curr = {
      page: startIndex,
      limit: limit,
    };

    const totalCount = await model.countDocuments().exec();

    if (endIndex < totalCount) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      result.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    req.paginationData = result;
    next();
  };
};

