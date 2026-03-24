# cc-spinner

[English](README.md) | [日本語](README.ja-JP.md)

![](https://img.shields.io/badge/Node.js-18%2B-brightgreen?style=flat-square) [![npm]](https://www.npmjs.com/package/@handoing/cc-spinner)

![](./assets/poster.png)

<strong>cc-spinner</strong> 是一个用于配置 Claude Code spinner verbs（加载动词文案）的命令行工具。

你可以通过内置主题、内置语言包或自定义 JSON 文件，快速切换 Claude Code 的加载文案配置。

![](./assets/skill.gif)

> **注意：** 本工具仅支持 Claude Code **v2.1.22** 及以上版本。

## 通过 SKILL 使用

```bash
npx skills add https://github.com/handoing/cc-spinner
```

## 通过 npx 使用

```bash
npx @handoing/cc-spinner setup
```

## 功能特性

- 一条命令配置 Claude Code 的 spinner verbs
- 支持内置主题预设与语言预设
- 支持自定义 JSON 配置文件
- 交互式列出内置主题并选择应用
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

### 列出并交互选择主题

使用 `list` 命令列出所有内置主题，每个主题后会随机展示一个 spinner verb 示例。
直接按 `Enter` 选择默认第一项，或输入编号后按 `Enter` 选择对应主题。

```bash
cc-spinner list
```

### 清空 spinner verbs

使用 `clear` 命令将当前 spinner verbs 配置替换为空列表：

```bash
cc-spinner clear
```

## 内置预设

### 主题

内置主题文件位于 [`theme/`](theme/)：

- [`animal`](theme/animal.json)
- [`default`](theme/default.json)
- [`dirty`](theme/dirty.json)
- [`emo`](theme/emo.json)
- [`emoji`](theme/emoji.json)
- [`movies`](theme/movies.json)
- [`philosophy`](theme/philosophy.json)
- [`travel`](theme/travel.json)

### 语言

内置语言文件位于 [`language/`](language/)：

- [`en-US`](language/en-US.json)
- [`zh-CN`](language/zh-CN.json)
- [`ja-JP`](language/ja-JP.json)

## 实现说明

CLI 入口文件为 [`bin/cc-spinner.js`](bin/cc-spinner.js)，提供三个核心命令：

- `setup`：实现于 [`setup()`](src/commands/setup.js#L3)
- `list`：实现于 [`list()`](src/commands/list.js#L4)
- `clear`：实现于 [`clear()`](src/commands/clear.js#L3)

配置解析与写入逻辑位于：

- [`resolveSpinnerVerbsData()`](src/utils.js#L33)
- [`updateSettings()`](src/utils.js#L69)

主题列表与交互选择逻辑位于：

- [`listThemeNames()`](src/utils.js#L88)
- [`promptSingleSelect()`](src/utils.js#L116)

工具写入 Claude Code 配置路径定义在 [`SETTINGS_PATH`](src/constants.js#L4)，对应：

```text
~/.claude/settings.json
```

## 自定义 JSON 格式

使用 `cc-spinner setup` 加载自定义文件时，JSON 需包含 `spinnerVerbs` 字段。

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
│   │   ├── list.js
│   │   └── setup.js
│   ├── constants.js
│   └── utils.js
├── theme/
│   ├── animal.json
│   ├── default.json
│   ├── dirty.json
│   ├── emo.json
│   ├── emoji.json
│   ├── movies.json
│   ├── philosophy.json
│   └── travel.json
└── package.json
```

## 开发信息

- 包名：`@handoing/cc-spinner`
- 当前版本：`1.1.3`
- CLI 依赖：`commander`
- 许可证信息声明于 [`package.json`](package.json)

## 许可证

本项目基于 ISC License，详见 [LICENSE](LICENSE)。

[npm]: https://img.shields.io/npm/v/@handoing/cc-spinner.svg?style=flat-square