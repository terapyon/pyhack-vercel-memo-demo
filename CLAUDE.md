# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

このリポジトリは日本語のメモアプリデモ（"pyhack-vercel-memo-demo" - デモ用のメモアプリ）を含むリポジトリです。詳細な仕様については @.claude/base-spec.md を参照してください。

## リポジトリ構造

リポジトリは必要最小限のファイルのみで構成されています：
- `README.md` - 日本語でのプロジェクト説明
- `LICENSE` - MITライセンス
- `.gitignore` - Node.js/Web開発用の標準的なgitignore

## 開発状況

アプリケーションコード、依存関係、ビルド設定がまだ実装されていない、新しく初期化されたリポジトリのようです。.gitignoreの内容から、これはNode.js/JavaScriptベースのプロジェクトになる予定で、Webデプロイメント（名前からおそらくVercel）をターゲットにしていると思われます。

## 技術仕様

- **DB**: PostgreSQL
- **API**: FastAPI
- **フロントエンド**: Next.js
- **デプロイ**: Vercel

## プロジェクト要件

詳細な要件については @.claude/requirements.md を参照してください。

## 開発ログ

開発の進捗や作業ログについては @.claude/WorkLog.md を参照してください。

## 開発に関する注意事項

- メモアプリケーションで、ユーザごとのフォルダ管理機能を持ちます
- gitignoreのパターンから、Node.js/Web開発用にセットアップされています
- Vercelデプロイメントを想定した構成になっています