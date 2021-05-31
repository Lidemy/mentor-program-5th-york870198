## 什麼是 Ajax？
Asynchronous JavaScript and XML 的縮寫，是透過JS交換資料的方法。 
其實現在比起 XML，用 JSON 才是比較主流的格式。


## 用 Ajax 與我們用表單送出資料的差別在哪？
用 Ajax 發出的 request 在回傳 response 時不是直接給瀏覽器 render，而是把結果給JS，於是不會像用 form 傳送那樣強制換頁。

## JSONP 是什麼？
因為同源政策，不同網域的網頁不能直接溝通，但是 HTML 的 script tag 是一個特例、不受限制。
所以利用這個特性，將回傳的資料設計成一組可被執行的 JavaScript (的字串)，
瀏覽器就會執行這組 JavaScript，透過執行結果來取得伺服器端真正要傳送的資料。

## 要如何存取跨網域的 API？
Server 方要採取 CORS(Cross-Origin Resource Sharing) 規範，
在 Response 的 header 裡面加上 Access-Control-Allow-Origin 。
例如把這個 header 設為星號，表示它同意接受來自任何 Origin 的請求。
也有其他方法如 Access-Control-Allow-Headers，總之就是伺服器方要設置「允許哪些來源進行請求」。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
因為第四週時是直接寫 JS 來發請求，沒有透過瀏覽器。
同源政策的實際執行是由瀏覽器進行，請求有被發出去、回傳也有收到，但是被瀏覽器擋下來。
