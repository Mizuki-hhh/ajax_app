class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    # 既読や未読の情報を追加したため、メモ作成時に未読の情報を保存する
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  def checked
    # 既読したメモのidが渡されるように設定するので、
    # そのidを使用して該当するレコードを取得。
    post = Post.find(params[:id])
    # 既読であれば、既読を解除するためにfalseへ変更
    # 既読でなければ、既読にするためtrueへ変更
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    # 更新したレコードをitemで取得し直し、JSON形式としてchecked.jsに返却。
    item = Post.find(params[:id])
    render json: { post: item }
  end
end
