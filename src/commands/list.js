const { listThemeNames, promptSingleSelect } = require("../utils");
const setup = require("./setup");

async function list() {
  const themes = listThemeNames();
  
  if (themes.length === 0) {
    console.log("No themes available.");
    return;
  }
  
  const selectedTheme = await promptSingleSelect(themes);
  
  if (selectedTheme) {
    console.log(`Setting up theme: ${selectedTheme}`);
    setup(selectedTheme);
  } else {
    console.log("Operation cancelled.");
  }
}

module.exports = list;