const { resolveSpinnerVerbsData, updateSettings } = require("../utils");

function setup(name) {
  const spinnerVerbs = resolveSpinnerVerbsData(name);

  if (!spinnerVerbs) {
    console.error("No spinner verbs data found. Aborting.");
    process.exit(1);
  }

  updateSettings(spinnerVerbs);
}

module.exports = setup;