const chalk = require("chalk");
const readline = require("readline");
const fs = require("fs");

var obj = {
  table: [],
};
const cmd = process.argv[2];

const write = () => {
  let tab;
  const content = fs.readFile("list.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    // console.log(JSON.parse(data));
    obj = JSON.parse(data);
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter Title:", (title) => {
    for (let i = 0; i < obj.table.length; i++) {
      if (title.toLowerCase() == obj.table[i].TITLE) {
        return console.log(chalk.red("title is taken"));
      }
    }
    rl.question("Enter Desc:", (desc) => {
      obj.table.push({ TITLE: title, DESCRIPTION: desc });

      var json = JSON.stringify(obj);
      fs.writeFile("list.json", json, "utf8", () => {
        console.log(chalk.green("saved succssfully"));
      });
      rl.close();
    });
  });
};

const read = () => {
  const content = fs.readFile("list.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    obj = JSON.parse(data);
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter title:", (title) => {
    var found = false;
    for (let i = 0; i < obj.table.length; i++) {
      if (title.toLowerCase() == obj.table[i].TITLE) {
        console.log(obj.table[i]);
        found = true;
      }
    }
    return found
      ? console.log(chalk.green("DATA FOUND"))
      : console.log(chalk.red("DATA NOT FOUND"));
  });

  //   console.log("read");
};
const list = () => {
  const content = fs.readFile("list.json", "utf8", (err, data) => {
    console.log(chalk.blue("LIST"));
    if (err) {
      console.error(err);
    }
    obj = JSON.parse(data);
    for (let i = 0; i < obj.table.length; i++) {
      console.log(obj.table[i].TITLE);
    }
  });
};
const remove = () => {
  const content = fs.readFile("list.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    obj = JSON.parse(data);
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter title:", (title) => {
    var found = false;
    for (let i = 0; i < obj.table.length; i++) {
      if (title.toLowerCase() == obj.table[i].TITLE) {
        obj.table.splice(i, 1);
        var json = JSON.stringify(obj);

        fs.writeFile("list.json", json, "utf8", () => {
          console.log(chalk.green("DATA FOUND"));
        });
        found = true;
      }
    }
    return found
      ? console.log(chalk.green("DELETED SUCCESSFULLY"))
      : console.log(chalk.red("DATA NOT FOUND"));
  });
};

switch (cmd) {
  case "add":
    write();
    break;
  case "read":
    read();
    break;
  case "remove":
    remove();
    break;
  case "list":
    list();
    break;
  default:
    console.log(chalk.red("incorrect command rerun the file"));
}
