import * as fs from "fs";

const TEMPLATE_FOLDER = `${__dirname}/../../templates`

const frontend = fs.readdirSync(`${TEMPLATE_FOLDER}/frontend`);
const backend = fs.readdirSync(`${TEMPLATE_FOLDER}/backend`);
const extras = fs.readdirSync(`${TEMPLATE_FOLDER}/extras`);

export const QUESTIONS = [
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
      if (/^([A-Za-z\s])+$/.test(input)) return true
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