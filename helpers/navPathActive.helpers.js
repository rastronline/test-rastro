 module.exports = (hbs) => {
  hbs.registerHelper("navPathActive", (fullPath, path) => {
    console.log(` HELPER PARA ACTIVOS DE ${path} y el resultado ES ${fullPath.endsWith(path)}`);
    return fullPath.endsWith(path) ? "active" : "";
  });
}
