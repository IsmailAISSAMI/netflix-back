const { gql } = require("apollo-server-express");

module.exports = gql`
  type Movie {
    id: ID
    title: String
    image: String
    trailer: String
    maturityRating: Int
    language: String
    duration: String
    description: String
    releaseDate: String
    director: String
    scriptwriter: String
    distribution: String
    categories: [Category]
  }
  type Query {
    getMovie(id: ID): Movie
    getMovies: [Movie]
  }
  type Mutation {
    createMovie(
      title: String!
      image: String
      trailer: String
      maturityRating: Int
      language: String
      duration: String
      description: String
      releaseDate: Int
      director: String
      scriptwriter: String
      distribution: String
      categories: [ID]
    ): Movie
    updateMovie(
      id: ID!
      title: String!
      image: String!
      trailer: String!
      maturityRating: Int
      language: String
      duration: String
      description: String
      releaseDate: Int
      director: String
      scriptwriter: String
      distribution: String
      categories: [ID]
    ): Movie
  }
`;
