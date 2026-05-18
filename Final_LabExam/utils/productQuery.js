function buildProductFilter(query) {
  const filter = {};

  if (query.search) {
    filter.name = { $regex: query.search, $options: 'i' };
  }

  if (query.category && query.category !== 'all') {
    filter.category = query.category;
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) {
      filter.price.$gte = parseFloat(query.minPrice);
    }
    if (query.maxPrice) {
      filter.price.$lte = parseFloat(query.maxPrice);
    }
  }

  return filter;
}

function buildProductSort(query) {
  const sort = {};
  if (query.sort) {
    switch (query.sort) {
      case 'price_asc':
        sort.price = 1;
        break;
      case 'price_desc':
        sort.price = -1;
        break;
      case 'rating_desc':
        sort.rating = -1;
        break;
      case 'name_asc':
        sort.name = 1;
        break;
      default:
        sort.createdAt = -1;
    }
  } else {
    sort.createdAt = -1;
  }
  return sort;
}

function parseProductPagination(query, defaultLimit = 8) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(query.limit, 10) || defaultLimit, 1);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

module.exports = {
  buildProductFilter,
  buildProductSort,
  parseProductPagination
};
