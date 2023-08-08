#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import ora from "ora";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateResult = await inquirer.prompt([
  {
    type: "list",
    name: "template",
    message: "select template",
    choices: ["nest", "vue2"],
  },
]);

const template = templateResult.template;

const dirResult = await inquirer.prompt([
  {
    type: "input",
    name: "dirName",
    message: "input a directory name",
    default: "test",
  },
]);

const dirName = dirResult.dirName;

const spinners = [ora("创建模块中...")];
spinners[0].start();

fs.mkdirSync(dirName);

await fse.copy(
  path.resolve(__dirname, `../templates/${template}`),
  `${dirName}`,
  (err) => {
    if (err) {
      console.error(err);
      spinners[0].fail("创建失败");
    } else {
      spinners[0].succeed("模版创建成功");
    }
  }
);
