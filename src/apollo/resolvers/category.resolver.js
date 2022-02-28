const Category = require("../../models/category.model");

module.exports = {
  Query: {
    getCategory(parent, args, context) {
      return Category.findById(args.id);
    },
    getCategories: () => {
      return Category.find();
    },
  },
  Mutation: {
    createCategory(parent, args) {
      const category = new Category({
        label: args.label,
      });
      return category.save();
    },
    updateCategory(parent, { id, title }) {
      return Category.findByIdAndUpdate(id, { label: label });
    },
  },
};
