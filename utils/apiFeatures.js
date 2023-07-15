class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A. Filtering
    const queryObj = { ...this.queryString };
    const excludeFeilds = ['page', 'sort', 'limit', 'fields'];
    excludeFeilds.forEach((f) => delete queryObj[f]);

    // 1B. Advanced Filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    console.log(JSON.parse(queryString));

    // { difficulty: easy, duration: {$gte: 5}} :- MongoDB
    // gte, lte, gt, lt
    this.query = this.query.find(JSON.parse(queryString));
    // let query = Tour.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join('');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;
    // page=3&limit=10 1-10:- page1; 11 - 20, page 2 ...
    console.log(skip);
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
