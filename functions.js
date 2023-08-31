//Contiene las funciones puras
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { error } = require("console");

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

//Validar si es un archvo .md
const isMarkdownFile = (allPath) => {
  const isMarkdown = path.extname(allPath); // path.extname() devuelve la extensión de una ruta
  return isMarkdown === ".md"; //debe retorna .md no markdown
};
if (isMarkdownFile(allPath)) {
  console.log(chalk.cyan("The path is a Markdown file"));
} else {
  console.log(chalk.cyan("The path is not a Markdown file"));
}

// Función para validar si un archivo contiene enlaces mediante una promesa (resolve y reject)

//Leer archivo (comprobar si tiene links)
const readFile = (allPath) =>
  new Promise((resolve, reject) => {
    fs.readFile(allPath, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
readFile(allPath)
  .then((data) => {
    console.log(chalk.inverse.white("Contenido del archivo:"), data); // Aquí imprimes el contenido leído
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const hasLinks = (allPath) =>
  new Promise((resolve, reject) => {
    const newLinks = [];
    readFile(allPath)
      .then((data) => {
        const linksRegularEx = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g; // Expresión regular para encontrar links/enlaces [texto](URL)
        let elements = linksRegularEx.exec(data); //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión
        while (elements !== null) {
          newLinks.push({
            //El método push() añade uno o más elementos al final de un array y devuelve la nueva
            href: elements[2],
            text: elements[1],
            file: allPath,
          });
          elements = linksRegularEx.exec(data);
        }
        resolve(newLinks); // Resolvemos la promesa con los enlaces encontrados (newLinks)
      })
      .catch((error) => reject(error));
  });

hasLinks(allPath)
  .then((links) => {
    if (links.length > 0) {
      console.log(chalk.magenta("The Markdown file contains links:"));
      links.forEach((element) => {
        console.log("url", element.href);
        console.log("text", element.text);
        console.log("file", element.file);
        console.log("-.-.-.-");
      });
    } else {
      console.log("The Markdown file NO contains links");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

module.exports = {
  thePathExistOrNot,
  convertToAbsolute,
  isDirectory,
  isMarkdownFile,
};
