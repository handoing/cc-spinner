---
name: cc-spinner
description: Use this skill whenever the user wants to change, customize, reset, or configure the loading spinner verbs (the thinking/loading text) in Claude Code. Also trigger this skill when the user mentions "cc-spinner", "spinner themes", "loading verbs", or wants to change the language of the loading animation.
---

# cc-spinner

`cc-spinner` is a CLI tool that configures the spinner verbs (the little loading messages) for Claude Code.

As an AI assistant, you can use this skill to help the user customize their loading experience by running `cc-spinner` commands via your `Bash` tool.

## Available Built-in Presets

**Themes:**
- `animal`
- `default`
- `dirty`
- `emo`
- `emoji`
- `movies`
- `philosophy`
- `travel`

**Languages:**
- `en-US`
- `zh-CN`
- `ja-JP`

## How to use cc-spinner

When the user asks you to change the spinner theme, language, or reset it, you MUST use your `Bash` tool to execute the appropriate `npx` command.

### 1. Setting up a preset theme or language
If the user asks for a specific theme or language (e.g., "change spinner to emoji" or "use Chinese spinner"), run:
```bash
npx @handoing/cc-spinner setup <preset-name>
```
*Example:* `npx @handoing/cc-spinner setup emoji` or `npx @handoing/cc-spinner setup zh-CN`

If the user just asks to "change the spinner" but doesn't specify a theme, list the available themes and languages from the section above and ask them which one they prefer.

### 2. Setting up from a custom JSON file
If the user provides a path to a custom JSON file:
```bash
npx @handoing/cc-spinner setup <path-to-json>
```

### 3. Clearing / Resetting the spinner
If the user wants to reset, clear, or remove the custom spinner verbs:
```bash
npx @handoing/cc-spinner clear
```

## IMPORTANT RULES
- **NEVER** run `npx @handoing/cc-spinner list`. This command launches an interactive terminal prompt which will hang your Bash tool. If the user wants to see available themes, simply read them out from the "Available Built-in Presets" list above.
- Always use the `npx @handoing/cc-spinner ...` prefix to ensure the command runs successfully even if the user hasn't installed the package globally.
