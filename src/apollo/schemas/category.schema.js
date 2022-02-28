const { gql } = require("apollo-server-express");

module.exports = gql`
  type Category {
    id: ID
    label: String
  }
  extend type Query {
    getCategory(id: ID): Category
    getCategories: [Category]
  }
  extend type Mutation {
    createCategory(label: String): Category
    updateCategory(id: ID!, label: String): Category
  }
`;
