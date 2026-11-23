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

## ビルドとデプロイ

記事リポジトリを読み取れるトークンを `ARTICLES_READ_TOKEN` に設定してビルドします。GitHub App の Installation Access Token と、必要な読み取り権限を持つ個人アクセストークンのどちらも使用できます。

```bash
ARTICLES_READ_TOKEN='<トークン>' bun run build
```

GitHub App のトークンをローカルで使う場合も、App の秘密鍵から発行できます。Installation Access Token は約1時間で期限切れになるため、期限切れ後は再発行してください。トークンや秘密鍵はコミットしないでください。

CI では GitHub App の Installation Access Token を発行します。App を `yDog-1/articles` にインストールし、リポジトリの Contents 読み取り権限を付与してください。ブログのリポジトリには Actions 変数 `ARTICLES_CLIENT_ID` と Actions シークレット `ARTICLES_APP_PRIVATE_KEY`（PEM 全文）を設定します。

ビルド結果は静的ファイルとして `dist/` に出力されます。`wrangler.toml` はこのディレクトリを Cloudflare Workers の静的アセットとして配信する設定です。実行時の GitHub 認証情報は不要です。既存の Workers のビルド・デプロイ設定は、新しい出力先に合わせて確認してください。

## 🗂️ プロジェクト構成

- `src/pages/` - ページコンポーネント
- `src/components/` - 再利用可能なコンポーネント
- `src/layouts/` - ページレイアウト
- `src/assets/` - 画像などの静的アセット
- `src/libs/` - ユーティリティ関数

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
