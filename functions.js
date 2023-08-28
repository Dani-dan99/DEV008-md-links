//Contiene las funciones puras
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const allPath =
  "C:\\Users\\ldcpd\\Desktop\\Md-Lindks\\DEV008-md-links\\examplesOfLinks\\linksMd.md";

const thePathExistOrNot = (allPath) => {
  if (fs.existsSync(allPath)) {
    return true;
  } else {
    return false;
  }
};
console.log(chalk.bold.blue(thePathExistOrNot(allPath)));
console.log(chalk.blue("Great! The path exist"));

//se valida si la ruta es relativa o absoluta.
//se resuelve la Ruta como absoluta (se convierte ruta relativa a absoluta)
function convertToAbsolute(allPath) {
  if (path.isAbsolute(allPath)) {
    return allPath;
  } else {
    const absolutePath = path.join(process.cwd(), allPath);
    return absolutePath;
  }
}
console.log(chalk.bold.yellow(convertToAbsolute(allPath)));
console.log(chalk.yellow("Is a absolute path"));

//Funcion para saber si es un directorio
const isDirectory = (allPath) => {
  try {
    const stats = fs.statSync(allPath); //método fs.statSync() se utiliza para devolver sincrónicamente información sobre la ruta(allPath)
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
};
if (isDirectory(allPath)) {
  console.log(chalk.green("The path is a directory"));
} else {
  console.log(chalk.green("The path is not a directory"));
}

module.exports = {
  thePathExistOrNot,
  convertToAbsolute,
};
