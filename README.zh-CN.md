# cc-spinner

[English](README.md) | [日本語](README.ja-JP.md)

`cc-spinner` 是一个用于配置 Claude Code spinner verbs（加载动词文案）的命令行工具。你可以通过内置主题、内置语言包或自定义 JSON 文件，快速切换 Claude Code 的加载文案配置。

> **注意：** 本工具仅支持 Claude Code **v2.1.22** 及以上版本。

## 一键安装 / 卸载

```bash
npx @handoing/cc-spinner setup
npx @handoing/cc-spinner clear
```

## 功能特性

- 一条命令配置 Claude Code 的 spinner verbs
- 支持内置主题预设与语言预设
- 支持自定义 JSON 配置文件
- 可随时清空 spinner verbs 配置
- 自动写入 Claude Code 设置文件

## 安装

使用 npm 全局安装：

```bash
npm install -g @handoing/cc-spinner
```

或通过 `npx` 直接运行：

```bash
npx @handoing/cc-spinner <command>
```

## 使用方法

### 查看版本

```bash
cc-spinner --version
cc-spinner -V
```

### 设置 spinner verbs

通过 `setup` 命令应用主题、语言或自定义 JSON 文件路径：

```bash
cc-spinner setup [name]
```

示例：

```bash
cc-spinner setup
cc-spinner setup default
cc-spinner setup emoji
cc-spinner setup zh-CN
cc-spinner setup ./my-spinner.json
```

行为说明：

- 未提供 `[name]` 时，默认使用 `default` 主题。
- 优先在内置主题目录中查找。
- 若未找到，再到内置语言目录中查找。
- 若仍未找到，回退到内置 `default` 主题。
- 若传入相对/绝对路径，则直接读取该 JSON 文件。

### 清空 spinner verbs

使用 `clear` 命令将当前 spinner verbs 配置替换为空列表：

```bash
cc-spinner clear
```

## 内置预设

### 主题

内置主题文件位于 [`theme/`](theme/)：

- `default`
- `animal`
- `emoji`
- `philosophy`

### 语言

内置语言文件位于 [`language/`](language/)：

- `en-US`
- `zh-CN`
- `ja-JP`

## 实现说明

CLI 入口文件为 [`bin/cc-spinner.js`](bin/cc-spinner.js)，提供两个核心命令：

- `setup`：实现于 [`setup()`](src/commands/setup.js:3)
- `clear`：实现于 [`clear()`](src/commands/clear.js:3)

配置解析与写入逻辑位于：

- [`resolveSpinnerVerbsData()`](src/utils.js:32)
- [`updateSettings()`](src/utils.js:68)

工具写入 Claude Code 配置路径定义在 [`SETTINGS_PATH`](src/constants.js:4)，对应：

```text
~/.claude/settings.json
```

## 自定义 JSON 格式

使用 [`cc-spinner setup`](bin/cc-spinner.js:14) 加载自定义文件时，JSON 需包含 `spinnerVerbs` 字段。

示例：

```json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": [
      "loading",
      "thinking",
      "preparing"
    ]
  }
}
```

## 项目结构

```text
.
├── bin/
│   └── cc-spinner.js
├── language/
│   ├── en-US.json
│   ├── ja-JP.json
│   └── zh-CN.json
├── src/
│   ├── commands/
│   │   ├── clear.js
│   │   └── setup.js
│   ├── constants.js
│   └── utils.js
├── theme/
│   ├── animal.json
│   ├── default.json
│   ├── emoji.json
│   └── philosophy.json
└── package.json
```

## 开发信息

- 包名：`@handoing/cc-spinner`
- 当前版本：`1.0.0`
- CLI 依赖：`commander`
- 许可证信息声明于 [`package.json`](package.json)

## 许可证

本项目基于 ISC License，详见 [LICENSE](LICENSE)。