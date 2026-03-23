const fs = require("fs");
const path = require("path");
const readline = require("readline");
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

function listThemeNames() {
  try {
    if (!fs.existsSync(THEME_DIR)) {
      return [];
    }

    const themeNames = fs
      .readdirSync(THEME_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile() && path.extname(entry.name) === ".json")
      .map((entry) => path.basename(entry.name, ".json"))
      .sort((a, b) => a.localeCompare(b));

    const themesWithExamples = themeNames.map(name => {
      const data = resolveSpinnerVerbsData(name);
      let example = "";
      if (data && data.verbs && data.verbs.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.verbs.length);
        example = data.verbs[randomIndex];
      }
      return { name, example };
    });

    return themesWithExamples;
  } catch (error) {
    console.error(`Error listing themes from ${THEME_DIR}:`, error.message);
    return [];
  }
}

function promptSingleSelect(options) {
  if (!options || options.length === 0) {
    return Promise.resolve(null);
  }

  console.log("Available themes:");
  options.forEach((theme, index) => {
    const exampleStr = theme.example ? ` eg: ${theme.example}...` : "";
    console.log(`${index + 1}. ${theme.name}${exampleStr}`);
  });
  console.log("");
  console.log("Press Enter to select default option [1], or type number:");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("> ", (answer) => {
      const input = answer.trim();

      if (!input) {
        rl.close();
        resolve(options[0].name);
        return;
      }

      const num = Number(input);
      if (Number.isInteger(num) && num >= 1 && num <= options.length) {
        rl.close();
        resolve(options[num - 1].name);
        return;
      }

      console.error("Invalid selection.");
      rl.close();
      resolve(null);
    });
  });
}

module.exports = {
  resolveSpinnerVerbsData,
  updateSettings,
  listThemeNames,
  promptSingleSelect
};