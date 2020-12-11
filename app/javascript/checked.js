function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {    
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {      
      const postId = post.getAttribute("data-id");      
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);


// 2/postをクラス名にもつ要素を取得できる
// 3/forEachでそれぞれの要素への処理を記述する場所を用意する
// 4/ イベント発火が起きている要素にdata-load = "true"はまだ追加されていないため、
    // if文の処理は読み込まれずに、7行目に処理が移る（次に繰り返された時にはnullでないため処理が止まる）
// 8/引数にclickを指定して（要素一つずつに対して）
    //8/クリックした時に動作するイベント駆動を設定！
// 9/getAttributeで属性値を取得し、メモのidを取得できる
// 10/オブジェクトの生成。変数XHRからXMLHttpRequestのメソッドが使用できる。
// 11/openメソッドでリクエストの詳細を指定。
// 12/レスポンスの形式を指定
// 13/最後に設定した情報をサーバーサイドへ送信する（リクエストを送信準備）

// 20-24/既読であるかどうかを判断し、情報を切り替える
