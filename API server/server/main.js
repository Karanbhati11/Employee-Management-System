const express = require("express");
const { connectDB, resolvers } = require("./server");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./Schema");
const server = new ApolloServer({ typeDefs: typeDefs, resolvers });

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;

// listening
app.listen(PORT, function () {
  console.log(`App started on port http://localhost:${PORT}`);
});

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });
  connectDB();
});
