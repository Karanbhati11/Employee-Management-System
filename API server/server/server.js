const { MongoClient } = require("mongodb");
require("dotenv").config();

// connection URL for the database
const connectionString = process.env.DB_URL;
let db;

// function to connect with the database
async function connectDB() {
  const Client = new MongoClient(connectionString);
  await Client.connect();
  console.log("database is connected!");
  db = Client.db();
}

// function to get the list of employees from the database
async function employeeList() {
  const employees = await db.collection("employee").find({}).toArray();
  return employees;
}

// function to get a single employee by ID from the database
async function getEmployee(_, { id }) {
  const employee = await db.collection("employee").findOne({ id });
  return employee;
}

// function to search employees in the database
async function searchEmployees(_, { employeeType }) {
  const query = {};
  if (employeeType) query.employeeType = employeeType;

  const employees = await db.collection("employee").find(query).toArray();
  return employees;
}

// function to update an employee in the database
async function updateEmployee(_, { id, title, department, currentStatus }) {
  const update = {};
  if (title !== undefined) update.title = title;
  if (department !== undefined) update.department = department;
  if (currentStatus !== undefined) update.currentStatus = currentStatus;

  await db.collection("employee").updateOne({ id }, { $set: update });
  const updatedEmployee = await db.collection("employee").findOne({ id });
  return updatedEmployee;
}

// function to delete an employee from the database
async function deleteEmployee(_, { id }) {
  // Delete the employee
  const result = await db.collection("employee").deleteOne({ id });

  if (result.deletedCount === 1) {
    // Decrement the counter only if an employee was deleted
    await db.collection("counters").findOneAndUpdate(
      { _id: "employee" },
      { $inc: { current: -1 } }
    );
    return true;
  }

  return false;
}


// function to insert or update an employee in the database
async function insertEmployee(
  _,
  {
    firstname,
    lastname,
    age,
    dateOfJoining,
    title,
    department,
    employeeType,
    currentStatus,
  }
) {
  const counter = await db
    .collection("counters")
    .findOneAndUpdate(
      { _id: "employee" },
      { $inc: { current: 1 } },
      { returnOriginal: false, upsert: true }
    );
  const newId = counter.current;

  const newEmployee = {
    id: newId,
    firstname,
    lastname,
    age,
    dateOfJoining,
    title,
    department,
    employeeType,
    currentStatus,
  };

  await db.collection("employee").updateOne(
    { id: newId },
    { $set: newEmployee },
    { upsert: true }
  );

  return newEmployee;
}

// resolvers for our Apollo server
const resolvers = {
  Query: {
    employeeList: employeeList,
    getEmployee: getEmployee,
    searchEmployees: searchEmployees,
  },
  Mutation: {
    insertEmployee: insertEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
  },
};

module.exports = { connectDB, employeeList, resolvers };
