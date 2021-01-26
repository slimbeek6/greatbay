var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "greatBay_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid.toUpperCase() === "POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
}

function postAuction() {
// Take in the key information for creating an entry in the auctions table: item_name, category, starting_bid.
  // requires inquirer to ask the key questions in the terminal
  inquirer
  .prompt(
    {
    name: "itemName",
    type: "input",
    message: "What is the name of the item you would like to post?"
    })
    .then(function(answer) {
      // Post this information into the auctions table
      var name = answer.itemName;
      inquirer.prompt(
        {
        name: "itemCategory",
        type: "input",
        message: "What type of item are you trying to auction?"
        })
        .then(function(answer) {
          var category = answer.itemCategory;
          inquirer.prompt(
            {
              name: "startBid",
              type: "number",
              message: "What would you like to use as a starting bid?"
            })
            .then(function(answer) {
              var startingbid = answer.startBid;
              var sql = 'INSERT INTO auctions (item_name, category, starting_bid) VALUES ("'+name+'", "'+category+'", "'+startingbid+'")';
              connection.query(sql, function (err, res) {
                if (err) throw err;
              });
            })
        })      
    });
}

function bidAuction() {
  // Read the auctions table from sql, and define it locally

  // Create inquirer questions: what to bid on, how much to bid

  // Display the list of items up for auction in the first question

  // Get the auction item ID based on the response

  // Set up an if function after the "How much to bid" question
  // If the bid value is less than either the current or starting bid, console log out they did not win, and return to the start.

  // If the bid value is greater than both the current and starting bid, console log out a successful bid, and post that bid to the "current bid" value for the item bid upon by using the previously set item id.
  
}
