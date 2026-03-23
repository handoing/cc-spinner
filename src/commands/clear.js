const { updateSettings } = require("../utils");

function clear() {
  updateSettings({
    "mode": "replace",
    "verbs": []
  });
}

module.exports = clear;