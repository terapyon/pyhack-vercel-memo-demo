#!/bin/bash

echo "=== フロントエンドローカルテスト実行 ==="

# frontendディレクトリに移動
cd frontend

# Node.jsのバージョン確認
echo "Node.js version:"
node --version
echo "npm version:"
npm --version

# 依存関係のインストール
echo "依存関係をインストール中..."
npm install

# リンターの実行
echo "リンターを実行中..."
npm run lint

# テストの実行
echo "テストを実行中..."
npm test -- --watchAll=false

# カバレッジ付きテスト
echo "カバレッジ付きテストを実行中..."
npm run test:coverage -- --watchAll=false

# ビルドテスト
echo "ビルドを実行中..."
npm run build

echo "=== テスト完了 ==="