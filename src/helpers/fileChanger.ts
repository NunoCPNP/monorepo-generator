import * as fs from "fs";

export const fileChange = (file, from, to) => {
  return fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(`${from}`, `${to}`);
  
    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}