// Requiring users file
const datas = require("./data");


for (let i = 0; i < datas.length; i++) {
    console.log(datas[i].msg);
    console.log(datas[i].user);
}




const fs = require("fs");

//writing
// STEP 1: Reading JSON file


// Defining new user
let msgdata = {
    msg: "Hello",
    user: "allah",
};

// STEP 2: Adding new data to users object
datas.push(msgdata);

// STEP 3: Writing to a file
fs.writeFile("data.json", JSON.stringify(datas), err => { });