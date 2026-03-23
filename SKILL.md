---
description: 当用户希望修改、切换、自定义或重置 Claude Code
  的加载动画文案（spinner
  verbs）时使用此技能。适用于用户提到"spinner"、"加载文案"、"loading
  verbs"、"cc-spinner"或希望更换语言/风格的场景。
name: cc-spinner
---

# cc-spinner

`cc-spinner` 是一个用于配置 Claude Code spinner verbs（加载提示文案）的
CLI 工具。

作为 AI 助手，你需要通过执行 `npx @handoing/cc-spinner`
命令，帮助用户快速切换或管理加载动画文案。

------------------------------------------------------------------------

## 🎯 触发场景

当用户出现以下意图时，必须使用此技能：

-   修改 spinner 文案
-   更换 loading 动画风格（如 emoji、电影风等）
-   切换语言（中文 / 英文 / 日文）
-   重置 spinner
-   使用自定义 JSON 配置
-   提到关键词：
    -   `cc-spinner`
    -   `spinner`
    -   `loading verbs`
    -   `加载文案`
    -   `加载动画`

------------------------------------------------------------------------

## ⚙️ 核心能力

### 1️⃣ 设置主题 / 语言 / 自定义配置

``` bash
npx @handoing/cc-spinner setup <name>
```

支持： Themes: animal, default, dirty, emo, emoji, movies, philosophy,
travel Languages: en-US, zh-CN, ja-JP

示例：

``` bash
npx @handoing/cc-spinner setup emoji
npx @handoing/cc-spinner setup zh-CN
npx @handoing/cc-spinner setup ./my-spinner.json
```

------------------------------------------------------------------------

### 2️⃣ 未指定参数

``` bash
npx @handoing/cc-spinner setup
```

等价于 default

------------------------------------------------------------------------

### 3️⃣ 重置

``` bash
npx @handoing/cc-spinner clear
```

------------------------------------------------------------------------

## ⚠️ 禁止

不要执行：

``` bash
npx @handoing/cc-spinner list
```

------------------------------------------------------------------------

## JSON 格式

``` json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": ["loading","thinking","preparing"]
  }
}
```

------------------------------------------------------------------------

配置路径：

    ~/.claude/settings.json
