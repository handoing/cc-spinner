#!/usr/bin/env node

const { program } = require("commander");
const { version } = require("../package.json");
const setup = require("../src/commands/setup");
const clear = require("../src/commands/clear");

program
  .name("cc-spinner")
  .description("Configure the spinner verbs for Claude Code")
  .version(version, "-V, --version");

program
  .command("setup [name]")
  .description("Set spinner verbs from a theme, language, or custom file path")
  .action((name) => {
    setup(name);
  });

program
  .command("clear")
  .description("Clear spinner verbs configuration from settings")
  .action(() => {
    clear();
  });

program.parse(process.argv);