const fs = require("fs");
const path = require("path");
const { SETTINGS_PATH, THEME_DIR, LANGUAGE_DIR, DEFAULT_THEME_FILE } = require("./constants");

function readJsonFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

function writeJsonFile(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error.message);
    return false;
  }
}

function resolveSpinnerVerbsData(nameOrPath) {
  // If it's a specific path (starts with . or /)
  if (nameOrPath && (nameOrPath.startsWith('.') || nameOrPath.startsWith('/'))) {
    const absolutePath = path.resolve(process.cwd(), nameOrPath);
    const data = readJsonFile(absolutePath);
    if (data) {
      return data.spinnerVerbs;
    }
  }

  const name = nameOrPath || "default";
  
  // Try theme directory first
  const themeFile = path.join(THEME_DIR, `${name}.json`);
  const themeData = readJsonFile(themeFile);
  if (themeData) {
    return themeData.spinnerVerbs;
  }

  // Try language directory next
  const langFile = path.join(LANGUAGE_DIR, `${name}.json`);
  const langData = readJsonFile(langFile);
  if (langData) {
    return langData.spinnerVerbs;
  }

  // Fallback to default
  const defaultData = readJsonFile(DEFAULT_THEME_FILE);
  if (defaultData) {
    return defaultData.spinnerVerbs;
  }

  console.error("Critical error: Default theme file missing.");
  return null;
}

function updateSettings(spinnerVerbs) {
  let settings = readJsonFile(SETTINGS_PATH);
  
  if (!settings) {
    settings = {};
  }
  
  settings.spinnerVerbs = spinnerVerbs || {};
  
  if (writeJsonFile(SETTINGS_PATH, settings)) {
    console.log("Success");
  } else {
    console.error("Failed");
  }
}

module.exports = {
  resolveSpinnerVerbsData,
  updateSettings
};