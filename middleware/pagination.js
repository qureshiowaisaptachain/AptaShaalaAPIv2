exports.pagination = (model) => {
  return async (req, res, next) => {
    const totalCount = await model.countDocuments().exec();
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    result.curr = {
      page: page,
      limit: limit,
    };

    if (startIndex > 0) {
      result.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    if (endIndex < totalCount) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    } else {
      result.curr = {
        page: page,
        limit: limit - (endIndex - totalCount),
      };
    }

    req.paginationData = result;
    next();
  };
};
