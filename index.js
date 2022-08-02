const fs = require("fs"); // import file system

let ROOT_PATH = process.cwd(); // get current path

function renameFilesInFolder() {
  const files = fs.readdirSync(ROOT_PATH); // get array of all files and folders names

  files
    .filter((file) => file.includes(".")) // filtering by file type
    .forEach((file) =>
      fs.rename(
        ROOT_PATH + `/${file}`, // old path
        ROOT_PATH + `/${file.replace(/\s+/g, "_").toLowerCase()}`, // new path with new naming
        () => null // necessary callback, doing nothing
      )
    );

  getInNextFolder(); // running function that checks if next folder exists and setting new path
}

function getInNextFolder() {
  const files = fs.readdirSync(ROOT_PATH); // get array of all files and folders names

  const folderName = files.filter((file) => !file.includes("."))[0] || ""; // filtering by folder name

  if (folderName.length) {
    ROOT_PATH += `/${folderName}`;
    renameFilesInFolder();
  } // if folder exists => setting new path and running again renameFilesInFolder() function
}

renameFilesInFolder();