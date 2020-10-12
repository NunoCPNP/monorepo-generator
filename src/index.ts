#!/usr/bin/env node
import * as inquirer from "inquirer";
import * as fs from "fs";
import { copy } from "./helpers/copy"
import { ascii } from "./helpers/ascii"
import { fileChange } from "./helpers/fileChanger"

var ui = new inquirer.ui.BottomBar();

const TEMPLATE_FOLDER = `${__dirname}/../templates`

const frontend = fs.readdirSync(`${TEMPLATE_FOLDER}/frontend`);
const backend = fs.readdirSync(`${TEMPLATE_FOLDER}/backend`);
const extras = fs.readdirSync(`${TEMPLATE_FOLDER}/extras`);

const QUESTIONS = [
  {
    name: "monorepoName",
    type: "input",
    message: "Type mono repository name:",
    validate: function(input: string) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
      else return "Mono repository name may only include letters, numbers, underscores and dashes"
    }
  },
  {
    name: "author",
    type: "input",
    message: "Type mono repository author",
    validate: function(input: string) {
      if (/^([A-Za-z\d])+$/.test(input)) return true
      else return "Mono repository author may only include letters"
    }
  },
  {
    name: "license",
    type: "list",
    message: "Select mono repository license",
    choices: [
     { name: "MIT", value: "MIT" },
     { name: "GPL", value: "GPL" },
     { name: "Apache License 2.0", value: "Apache License 2.0" },
     { name: "BSD", value: "BSD" }
    ]
  },
  {
    name: "frontendSelection",
    type: "list",
    message: "Select your frontend technology",
    choices: frontend
  },
  {
    name: "backendSelection",
    type: "list",
    message: "Select your backend technology",
    choices: backend
  },
  {
    name: "extraSelections",
    type: "checkbox",
    message: "Select extra packages if needed",
    choices: extras
  },
];

const extrasNameMapping = {
  "docz": "ui"
}

const CURR_DIR = process.cwd();

ascii()

inquirer.prompt(QUESTIONS)
  .then( async ({
    monorepoName,
    author,
    license,
    frontendSelection,
    backendSelection,
    extraSelections
  }: any) => {
    ui.log.write('Building your template...');
    
    const root = `${CURR_DIR}/${monorepoName}`
    fs.mkdirSync(root)

    await copy(`${TEMPLATE_FOLDER}/root`, root)

    const destination = `${root}/projects`
    fs.mkdirSync(destination)

    const serverDestination = `${destination}/server`
    const webDestination = `${destination}/app`

    await copy(`${TEMPLATE_FOLDER}/frontend/${frontendSelection}`, webDestination)
    await copy(`${TEMPLATE_FOLDER}/backend/${backendSelection}`, serverDestination)
    
    await Promise.all(
      extraSelections.map((extra: keyof typeof extrasNameMapping) => {
        const extraDestination = `${destination}/${extrasNameMapping[extra as any]}`
        
        return copy(`${TEMPLATE_FOLDER}/extras/${extra}`, extraDestination)
      })
    )

    if (backendSelection === "node") {
      await fileChange(`${serverDestination}/package.json`, "{{AUTHOR}}", author)
      await fileChange(`${serverDestination}/package.json`, "{{LICENSE}}", license)
    }

    ui.log.write('Done !!');
  })