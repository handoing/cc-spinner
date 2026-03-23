# cc-spinner

[English](README.md) | [中文](README.zh-CN.md)

`cc-spinner` は、Claude Code の spinner verbs（読み込み時の動詞文言）を設定するための CLI ツールです。内蔵テーマ、内蔵言語パック、またはカスタム JSON ファイルを使って、Claude Code の読み込み文言をすばやく切り替えられます。

> **注意：** このツールは Claude Code バージョン **v2.1.22** 以降をサポートしています。

## ワンクリックで設定 / アンインストール

```bash
npx cc-spinner setup
npx cc-spinner clear
```

## 主な機能

- 1 コマンドで Claude Code の spinner verbs を設定
- 内蔵テーマプリセットと言語プリセットをサポート
- カスタム JSON 設定ファイルをサポート
- 必要に応じて spinner verbs 設定をクリア可能
- Claude Code の設定ファイルへ自動書き込み

## インストール

npm でグローバルインストール：

```bash
npm install -g cc-spinner
```

または `npx` で直接実行：

```bash
npx cc-spinner <command>
```

## 使い方

### バージョン表示

```bash
cc-spinner --version
cc-spinner -V
```

### spinner verbs を設定する

`setup` コマンドで、テーマ・言語・カスタム JSON ファイルパスを適用します。

```bash
cc-spinner setup [name]
```

例：

```bash
cc-spinner setup
cc-spinner setup default
cc-spinner setup emoji
cc-spinner setup zh-CN
cc-spinner setup ./my-spinner.json
```

動作概要：

- `[name]` を省略した場合は `default` テーマを使用。
- まず内蔵テーマディレクトリを検索。
- 見つからなければ内蔵言語ディレクトリを検索。
- それでも見つからなければ内蔵 `default` テーマにフォールバック。
- 相対/絶対パスが指定された場合は、その JSON ファイルを直接読み込み。

### spinner verbs をクリアする

`clear` コマンドで現在の spinner verbs 設定を空リストに置き換えます。

```bash
cc-spinner clear
```

## 内蔵プリセット

### テーマ

内蔵テーマファイルは [`theme/`](theme/) にあります：

- `default`
- `animal`
- `emoji`
- `philosophy`

### 言語

内蔵言語ファイルは [`language/`](language/) にあります：

- `en-US`
- `zh-CN`
- `ja-JP`

## 実装概要

CLI のエントリーポイントは [`bin/cc-spinner.js`](bin/cc-spinner.js) で、次の 2 つの主要コマンドを提供します：

- `setup`：[`setup()`](src/commands/setup.js:3) で実装
- `clear`：[`clear()`](src/commands/clear.js:3) で実装

設定の解決と書き込みロジックは以下にあります：

- [`resolveSpinnerVerbsData()`](src/utils.js:32)
- [`updateSettings()`](src/utils.js:68)

ツールが書き込む Claude Code 設定パスは [`SETTINGS_PATH`](src/constants.js:4) で定義され、実体は次の通りです：

```text
~/.claude/settings.json
```

## カスタム JSON 形式

[`cc-spinner setup`](bin/cc-spinner.js:14) でカスタムファイルを使う場合、JSON には `spinnerVerbs` フィールドが必要です。

例：

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

## プロジェクト構成

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

## 開発情報

- パッケージ名：`cc-spinner`
- 現在のバージョン：`1.0.0`
- CLI 依存：`commander`
- ライセンス情報は [`package.json`](package.json) に記載

## ライセンス

本プロジェクトは ISC License の下で公開されています。詳細は [LICENSE](LICENSE) を参照してください。