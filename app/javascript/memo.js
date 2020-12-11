function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
  const XHR = new XMLHttpRequest();
  XHR.open("POST", "/posts", true);
  XHR.responseType = "json";
  XHR.send(formData);
  XHR.onload = () => {
    if (XHR.status != 200) {
      alert(`Error ${XHR.status}: ${XHR.statusText}`);
      return null;
    }
    const item = XHR.response.post;
    const list = document.getElementById("list");
    const formText = document.getElementById("content");
    const HTML = `
      <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時：${item.created_at}
        </div>
        <div class="post-content">
        ${item.content}
        </div>
      </div>`;
    list.insertAdjacentHTML("afterend", HTML);
    formText.value = "";
  };
  e.preventDefault();
  }); 
}
window.addEventListener("load", memo);


// 14-15: itemはレスポンスとして返却されたメモのレコードデータを取得していて、
        // listはHTMLを描画する場所を指定する際にしようする「描画する親要素」
        // のlistの要素を取得している。　formTextは、メモの入力フォームを
        // リセットするため。この処理が終了した時に、入力フォームの文字は入力さ
        // れたままなので、リセットする。リセット対象の要素はcontent。
// 17-25: 「メモとして描画する部分のHTML」HTMLという変数を描画するような処理を行えば、
        // ここで定義したHTMLが描画される。
// 26: list要素に対してinsertAdjacentHTMLでHTMLを追加。要素listの直後に挿入できる。
// 27: 「メモの入力フォームに入力されたままの文字」はリセットされる。空の文字列に上書きされるような仕組み。