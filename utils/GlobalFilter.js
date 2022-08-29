class GlobalFilter {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      const tempQueryString = { ...this.queryString };
      const insufficient = ["page", "sort", "fields", "limit"];
      insufficient.forEach((q) => delete tempQueryString[q]);
      const tempQuery = JSON.stringify(tempQueryString);
      const newQueryStr = tempQuery.replace(
        /\b(gte|gt|lte|lt|eq|ne)\b/g,
        (str) => `$${str}`
      );
      this.query = this.query.find(JSON.parse(newQueryStr));
  
      return this;
    }
    
  }
  
  module.exports = GlobalFilter;