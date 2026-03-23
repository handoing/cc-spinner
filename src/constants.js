const path = require("path");
const os = require("os");

const SETTINGS_PATH = path.join(os.homedir(), ".claude", "settings.json");
const PROJECT_ROOT = path.resolve(__dirname, "..");
const THEME_DIR = path.join(PROJECT_ROOT, "theme");
const LANGUAGE_DIR = path.join(PROJECT_ROOT, "language");
const DEFAULT_THEME_FILE = path.join(THEME_DIR, "default.json");

module.exports = {
  SETTINGS_PATH,
  PROJECT_ROOT,
  THEME_DIR,
  LANGUAGE_DIR,
  DEFAULT_THEME_FILE,
};