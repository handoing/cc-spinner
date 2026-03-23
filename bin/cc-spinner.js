#!/usr/bin/env node

const { program } = require("commander");
const { version } = require("../package.json");
const setup = require("../src/commands/setup");
const clear = require("../src/commands/clear");
const list = require("../src/commands/list");

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

program
  .command("list")
  .description("List themes and select one to set as current spinner verbs")
  .action(async () => {
    await list();
  });

program.parse(process.argv);