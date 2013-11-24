# めも #

## システム構成 ##

  * Worker でクロールして DOM(JSONized)，外部リソース（JS,CSS,Image,WebFonts）を保存．
    * SWF 取る？
  * JobServer でクロール対象のメタデータを基に Job を作り，それにしたがって Worker がクロール
    * メタデータサーバと Job サーバは別
  * Viewer で現状の履歴やクロール対象のあれこれを閲覧，操作する．
  * MetaServer でクロール対象のメタデータを保持
    * クローリング対象 URL
    * クッキー，UA，
    * 間隔
    * 名称，リポジトリ path，

### 制約 ###

  * Viewer から git の公開レポジトリ ( bare レポジトリ ) が見えてること
  * Worker から bare レポジトリに push できること

## 各プロセスの役割 ##

### Worker ###

クローラ

server から Job を持ってきて PhantomJS 経由で DOM を JSON 化して，もろもろの外部リソースを取得して git commit

### JobServer ###

Worker に対するマスター

各クローリング対象の設定に従って Job を作成して JobServer に登録．

### MetaServer ###

クローリング対象のメタデータを保持する

DB? mongo とか？

### Viewer ###

Web インタフェース

  * クローリング対象の登録
  * クローリング対象のメタ情報の操作
    * 閲覧，編集，
    * 削除？
  * クローリング対象の履歴(git)の閲覧

## データ構造 ##

### Job ###

  * URL
  * UA
  * Cookie ( cookie file path )
  * Repository Path

### Meta ###

  * Name
  * URL
  * repository-path
  * time-span

## 登録 ##

  1. Viewer から Meta データを入力
  2. MetaServer か Viewer で bare レポジトリ作成
  3. JobServer で clone とクローラの Job 生成
  4. Worker で clone して初回のクロール

## 他 ##
