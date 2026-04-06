---
name: self-review
description: このリポジトリ（TypeScript + React + Vite SPA）のコードを自己レビューする。rules.mdc の規約・設計思想・命名規則・テスト・既存実装の改善点を多角的にチェックする。「self-review」「セルフレビュー」「コードレビューして」「実装を確認して」と言われたとき、または実装完了後に自動的に適用する。
---

# Self Review

対象ファイルを以下の 6 観点でレビューし、問題を重要度付きで報告する。

## 観点と確認項目

### 1. ルール準拠（`rules.mdc`）

- `any` を使っていないか → `unknown` + 型ガード、または具体ユニオンに
- インポートパスが `@/` エイリアス経由か（深い相対パス `../../../` は禁止）
- 生の `fetch` をコンポーネントやフックに直書きしていないか → `utils/api/apiRequest.ts` 経由
- MSW ハンドラが `src/mocks/handlers/<リソース>.ts` に分割され `handlers/index.ts` で集約されているか
- `browser.ts` を直接編集していないか
- ユーザー向け文言が `@/constants/messages` に集約されているか
- 色の Hex がコンポーネントに直書きされていないか
- マジックナンバーが名前付き定数になっているか

### 2. 設計思想

- feature ローカルのものが誤って `component/` に置かれていないか（3 feature 未満の再利用は feature 内に留める）
- `component/` に業務ロジック・API・ドメイン文言が混入していないか
- データ取得ロジックがカスタムフック（`hooks/useXxx.ts`）に分離されているか
- ローディング / 空 / エラーの 3 状態が UI で明示されているか
- API 関数が `features/<FeatureName>/api.ts` か `utils/api/` に置かれているか（コンポーネント直書き禁止）
- 型が `src/types/` または `features/<FeatureName>/types.ts` に定義されているか

### 3. タイポ

- 変数名・関数名・コメント・文字列リテラル・CSS クラス名にスペルミスがないか
- 日本語文言に誤字・脱字がないか

### 4. 命名規則

| 種別 | 期待する規則 |
|------|------------|
| React コンポーネントファイル | `PascalCase.tsx` |
| フック | `useXxx.ts`（`use` + camelCase） |
| ユーティリティ | `camelCase.ts` |
| feature ディレクトリ | `PascalCase/`（例: `UserList/`） |
| Props 型 | `XxxProps` |
| 定数（モジュール横断） | `UPPER_SNAKE_CASE` |
| boolean 変数 | `is` / `has` / `can` / `should` プレフィックス |
| イベントハンドラ（内部） | `handleXxx` |
| イベントハンドラ（props） | `onXxx` |

### 5. テスト

- `tests/` または `*.test.tsx` が存在するか
- テストが未導入の場合、テストすべき純関数・フックを指摘する
- ビジネスロジックが純関数またはカスタムフックに分離されテスト可能な形になっているか

### 6. 既存実装の改善

- 同じ処理が複数箇所に重複していないか（共通化を提案）
- `useEffect` のクリーンアップ（`cancelled` フラグ等）が漏れていないか
- `catch` が空になっていないか（空の catch 禁止）
- 不要な `React.memo` / `useMemo` / `useCallback` の過剰使用がないか
- `console.log` のデバッグ残留がないか
- `TODO` / `FIXME` コメントが放置されていないか

---

## 出力フォーマット

レビュー結果は以下の形式で報告する。問題がない観点は「✅ 問題なし」と明記する。

```
## Self Review: <対象ファイル or 機能名>

### 1. ルール準拠
🔴 **Critical**: <必ず直すべき問題>
🟡 **Suggestion**: <改善が望ましい問題>
✅ 問題なし

### 2. 設計思想
...

### 3. タイポ
...

### 4. 命名規則
...

### 5. テスト
...

### 6. 既存実装の改善
...

---
### まとめ
- 🔴 Critical: N 件
- 🟡 Suggestion: N 件
- 修正必須ファイル: <ファイルパス一覧>
```

重要度の定義:
- 🔴 **Critical**: ルール違反・型安全性の破壊・設計原則違反。マージ前に必ず修正。
- 🟡 **Suggestion**: 改善が望ましいが即時対応でなくてもよい。
- 🟢 **Nice to have**: 任意の改善提案。
