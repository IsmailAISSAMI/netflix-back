const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        subscribeDate: String
        isStandard: Boolean
        isPremium: Boolean
        isAdmin: Boolean
    }
    extend type Query {
        getUser(id:ID): User
    }
`