const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const config = require("../configs");
const apiRouter = require("../routes");

// Apollo
const UserSchema = require("../apollo/schemas/user.schema");
const CategorySchema = require("../apollo/schemas/category.schema");
const MovieSchema = require("../apollo/schemas/movie.schema");
const userResolvers = require("../apollo/resolvers/user.resolver");
const categoryResolvers = require("../apollo/resolvers/category.resolver");
const movieResolvers = require("../apollo/resolvers/movie.resolver");

// Setup
const port = config.server.port;
const app = express();
const graphQlServer = new ApolloServer({
  typeDefs: [UserSchema, CategorySchema, MovieSchema],
  resolvers: [userResolvers, categoryResolvers, movieResolvers],
});

graphQlServer.applyMiddleware({ app, path: "/graphql" });
app.use(cors());
app.use(function (req, res, next) {
  if (req.originalUrl === "/api/v1/webhooks/stripe") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use("/api/v1/", apiRouter);

// Start server
exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`[X] Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`[V] App is running on port ${port}`);
  });
};
