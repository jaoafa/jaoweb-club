# ![jMS-logo](https://user-images.githubusercontent.com/23224932/42416047-36adc45a-829f-11e8-9d05-46d566c437e8.png)

[jao Minecraft Server](https://jaoafa.com) のお問い合わせ・各種申請用サイトのリポジトリ。

- `npm install` もしくは `yarn install` で必要なファイルを取得。
- `npm run dev` もしくは `yarn dev` でローカルサーバ起動、ファイル保存時のビルド等の実行。
- `npm run build` もしくは `yarn build` で本番用ファイル生成。
- `npm run server` もしくは `yarn server` でローカルサーバ起動（その他の処理は行わない）。

## Members

|![](https://avatars0.githubusercontent.com/u/23224932?s=80&v=4)|![](https://avatars2.githubusercontent.com/u/8929706?s=80&v=4)|
|:--:|:--:|
|[Hiratake](https://github.com/Hiratake)<br />Admin / Designer|[Tomachi](https://github.com/book000)<br />Admin / Developer|

## GitHub Pages

- https://jaoafa.github.io/jaoweb-support-design/build/

## Forms

- 自治体新規登録申請フォーム
  - 申請者判定用 認証コード
  - 自治体 名称
  - 自治体 名称読み
  - 自治体 名称の由来
  - 自治体 概要・方針
  - 自治体 範囲 (自動的に範囲からブロック数を計算し表示)
  - 自治体 規定ブロック数を超える明確な理由 (範囲が初期規定ブロック数を超える場合のみenable)
  - 備考
- 自治体範囲変更申請フォーム
  - 申請者判定用 認証コード
  - 自治体 名称 (内部APIで管理ID取得)
  - 自治体 新規範囲
  - 自治体 範囲変更理由
  - 備考
- 自治体名称変更申請フォーム
  - 申請者判定用 認証コード
  - 自治体 現名称 (内部APIで管理ID取得)
  - 自治体 新名称
  - 自治体 新名称の由来
  - 備考
- 自治体情報変更申請フォーム
  - 申請者判定用 認証コード
  - 自治体 名称 (内部APIで管理ID取得)
  - 自治体 新概要・方針
  - 備考
- 自治体登録解除フォーム
  - 申請者判定用 認証コード
  - 自治体 名称 (内部APIで管理ID取得)
  - 自治体 解除理由
  - 備考

## Request

- それぞれの送信ボタンの直前に注意事項を示す表示エリアが欲しい。
- すべてのinputタグの次行に警告や注意を示す表示エリア(これは数値じゃないとダメですよとかの表示)が欲しい。
- フォームの送信処理をajaxで行い、送信時画面遷移をしないようにする(送信後に遷移するかは相談)ので、送信時ローディングの編集禁止、ポップアップ処理を行えるようにしてほしい。
