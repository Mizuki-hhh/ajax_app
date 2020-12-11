Rails.application.routes.draw do
  root to: 'posts#index'  
  post 'posts', to: 'posts#create'
  # メモのidを取得できるようルーティングに設定
  get 'posts/:id', to: 'posts#checked'
end

# 今回は一意の情報なので、pathパラメータの方が適している。
