# yDog Tech Blog

技術ブログのソースコードリポジトリです。[Astro](https://astro.build)を使用して構築されています。

## 🚀 機能

- Astroによる静的サイト生成
- Tailwind CSSによるスタイリング
- マークダウンによる記事管理
- タグによる記事分類
- レスポンシブデザイン

## 🛠️ 技術スタック

- [Astro](https://astro.build) - WebフレームワークとSSG
- [Tailwind CSS](https://tailwindcss.com) - スタイリング
- [Biome](https://biomejs.dev) - リンターとフォーマッター
- [Bun](https://bun.sh) - JavaScript ランタイムとパッケージマネージャー

## 📦 インストール

```bash
# 依存関係のインストール
bun install

# 開発サーバーの起動
bun run dev

# 本番用ビルド
bun run build
```

## Cloudflare Workers

Astro 7 のビルドには記事を取得できる `GITHUB_TOKEN` が必要です。`bun run build` の実行環境に設定してください。

Cloudflare アダプターは Pages ではなく Workers 用の `dist/server/` と `dist/client/` を生成します。既存の Pages プロジェクトの設定は自動では移行されません。Workers のビルド設定、カスタムドメイン、環境変数を移行前に確認してください。`/preview` は実行時にも GitHub にアクセスするため、Workers 側のトークン設定と動作確認が必要です。生成される設定には Cloudflare Images のバインディングが含まれます。

## 🗂️ プロジェクト構成

- `src/pages/` - ページコンポーネント
- `src/components/` - 再利用可能なコンポーネント
- `src/layouts/` - ページレイアウト
- `src/assets/` - 画像などの静的アセット
- `src/libs/` - ユーティリティ関数

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
