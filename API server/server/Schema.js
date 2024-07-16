const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Employee {
  id: Int!
  firstname: String!
  lastname: String!
  age: Int!
  dateOfJoining: String!
  title: String!
  department: String!
  employeeType: String!
  currentStatus: Int!
}

type Query {
  employeeList: [Employee]
  getEmployee(id: Int!): Employee
  searchEmployees(employeeType: String): [Employee]
}

type Mutation {
  insertEmployee(
    id: Int
    firstname: String!
    lastname: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Int!
  ): Employee
  updateEmployee(
    id: Int!
    title: String
    department: String
    currentStatus: Int
  ): Employee
  deleteEmployee(id: Int!): Boolean
}
`;

module.exports = { typeDefs };
