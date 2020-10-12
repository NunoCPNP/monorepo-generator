#!/usr/bin/env node
import * as inquirer from "inquirer";
import * as fs from "fs";
import { copy } from "./helpers/copy"
import { ascii } from "./helpers/ascii"
import { QUESTIONS } from "./questions"

const TEMPLATE_FOLDER = `${__dirname}/../templates`
const CURR_FOLDER = process.cwd();

const extrasNameMapping = {
  "docz": "ui"
}

ascii()

inquirer.prompt(QUESTIONS)
  .then( async ({
    monorepoName, author, license, frontendSelection, backendSelection, extraSelections
  }: any) => {    
    const root = `${CURR_FOLDER}/${monorepoName}`
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

    fs.readFile(`${serverDestination}/package.json`, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
  
      const result = data.replace(/{{AUTHOR}}/g, author)
                       .replace(/{{LICENSE}}/g, license)
                       .replace(/{{APP_NAME}}/g, monorepoName);
  
    
      fs.writeFile(`${serverDestination}/package.json`, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  })
  
  