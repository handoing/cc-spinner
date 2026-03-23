---
name: cc-spinner
description: Use this skill when the user wants to modify, switch, customize, or reset Claude Code spinner messages (loading verbs). Triggered when users mention "spinner", "loading messages", "loading verbs", "cc-spinner", or express intent to change language or style.
---

# cc-spinner

`cc-spinner` is a CLI tool for configuring Claude Code spinner verbs (loading messages). As an AI assistant, you should help users quickly switch or manage spinner messages by executing:

`npx @handoing/cc-spinner <command>`

## When to Use This Skill

You MUST use this skill when the user expresses any of the following intents:

- Modify spinner messages
- Change loading animation style (e.g., emoji, movie-themed, etc.)
- Switch language (Chinese / English / Japanese)
- Reset spinner settings
- Apply a custom JSON configuration
- Mentions any of the following keywords:
  - cc-spinner
  - spinner
  - loading verbs
  - loading messages
  - loading animation

## Core Capabilities

### 1. Setup Theme / Language / Custom Configuration

Users can select a preset theme, language, or provide a custom JSON configuration file:

```bash
npx @handoing/cc-spinner setup <name>
```

#### Examples

Set spinner to emoji theme:

```bash
npx @handoing/cc-spinner setup emoji
```

Set spinner language to Chinese:

```bash
npx @handoing/cc-spinner setup zh-CN
```

Use a custom configuration file:

```bash
npx @handoing/cc-spinner setup ./my-spinner.json
```

#### Available Options

Themes:
- animal
- default
- dirty
- emo
- emoji
- movies
- philosophy
- travel

Languages:
- en-US
- zh-CN
- ja-JP

### 2. Default Behavior (No Arguments)

If no parameter is specified:

```bash
npx @handoing/cc-spinner setup
```

It is equivalent to:

```bash
npx @handoing/cc-spinner setup default
```

### 3. Reset to Default

Clear all custom configurations and restore default settings:

```bash
npx @handoing/cc-spinner clear
```

### 4. List Available Themes

View all available themes:

```bash
npx @handoing/cc-spinner list
```

### 5. Custom Configuration

Users can define their own spinner verbs via a JSON file:

```
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": ["loading", "thinking", "preparing"]
  }
}
```

Verbs do not need to add ellipses because they will default to `...`

Then apply it using:

```bash
npx @handoing/cc-spinner setup ./your-config.json
```

## Default Claude Code Configuration Path

The default configuration file for Claude Code is located at:

`~/.claude/settings.json`
