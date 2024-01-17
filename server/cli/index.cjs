#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const fs = require("fs");
const { exec } = require("child_process");
const argv = yargs(hideBin(process.argv)).argv;
const [argv1, argv2] = argv._;

switch (argv1) {
  case "make:controller":
    try {
      fs.readFileSync("src/controllers/" + argv2 + ".controller.js");
      console.log("Controller đã tồn tại");
    } catch (e) {
      const template = fs.readFileSync("cli/templates/controller.tpl");

      fs.writeFileSync(
        "src/controllers/" + argv2 + ".controller.js",
        template,
        {
          flag: "w+",
        }
      );
      console.log("Tạo Controller thành công");
    }
    break;

  case "make:route":
    try {
      fs.readFileSync("src/routes/" + argv2 + ".route.js");
      console.log("Route đã tồn tại");
    } catch (e) {
      const template = fs.readFileSync("cli/templates/route.tpl");

      fs.writeFileSync("src/routes/" + argv2 + ".route.js", template, {
        flag: "w+",
      });
      console.log("Tạo Route thành công");
    }
    break;

  case "db-up":
    exec(
      "make db",
      { uid: 1000, gid: 1000, cwd: ".." },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
    break;

  case "db-down":
    exec(
      "make down",
      { uid: 1000, gid: 1000, cwd: ".." },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
    break;

  default:
    console.log("Invalid command");
    break;
}
