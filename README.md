# GitHub Related Tools Linker

このリポジトリは、GitHubリポジトリページに関連ツールへのリンクを追加するChrome拡張機能です。

## 導入手順

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/umaidashi/github-related-tools-linker.git
   cd github-related-tools-linker
   ```

2. **依存パッケージのインストール**

   ```bash
   npm install
   ```

3. **ビルド**

   ```bash
   npm run build
   ```
   `dist/` ディレクトリに `content.js` などが生成されます。

4. **Chrome拡張機能として読み込む**

   1. Chromeブラウザで `chrome://extensions/` にアクセスします。
   2. 右上の「デベロッパーモード」を有効にします。
   3. 「パッケージ化されていない拡張機能を読み込む」をクリックし、`dist/` ディレクトリを選択します。
   4. 拡張機能が追加されます。

5. **動作確認**

   GitHubのリポジトリページ（例: `https://github.com/ユーザー名/リポジトリ名`）にアクセスし、拡張機能が動作しているか確認してください。

## 開発・ビルドについて
- `src/` ディレクトリにソースコードがあります。
- `public/manifest.json` が拡張機能の設定ファイルです。
- ビルド後、`dist/` に必要なファイルが出力されます。

---

ご不明点があればIssue等でご連絡ください。 
