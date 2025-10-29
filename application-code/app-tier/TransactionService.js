const dbcreds = require('./DbConfig');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: dbcreds.DB_HOST,
  user: dbcreds.DB_USER,
  password: dbcreds.DB_PWD,
  database: dbcreds.DB_DATABASE
});

function addTransaction(amount, desc) {
  const sql = "INSERT INTO transactions (amount, description) VALUES (?, ?)";
  con.query(sql, [amount, desc], function (err, result) {
    if (err) throw err;
    console.log("Transaction added successfully");
  });
  return 200;
}

function getAllTransactions(callback) {
  const sql = "SELECT * FROM transactions";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Getting all transactions...");
    callback(result);
  });
}

function findTransactionById(id, callback) {
  const sql = "SELECT * FROM transactions WHERE id = ?";
  con.query(sql, [id], function (err, result) {
    if (err) throw err;
    console.log(`Retrieving transaction with id ${id}`);
    callback(result);
  });
}

function deleteAllTransactions(callback) {
  const sql = "DELETE FROM transactions";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Deleting all transactions...");
    callback(result);
  });
}

function deleteTransactionById(id, callback) {
  const sql = "DELETE FROM transactions WHERE id = ?";
  con.query(sql, [id], function (err, result) {
    if (err) throw err;
    console.log(`Deleting transaction with id ${id}`);
    callback(result);
  });
}

module.exports = {
  addTransaction,
  getAllTransactions,
  deleteAllTransactions,
  findTransactionById,
  deleteTransactionById
};
