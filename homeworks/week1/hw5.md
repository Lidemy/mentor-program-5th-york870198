## 請解釋後端與前端的差異。

前端：主要是一個網路服務中使用者端看得到的部分，例如使用者看到的網站、網頁上的動畫效果等。
後端：不在使用者的瀏覽器上運作的部分，例如維持網頁運作的伺服器、儲存數據的資料庫等。

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

- 瀏覽器向 DNS server 發 request 詢問域名
- DNS 將域名轉換成 IP 回傳給瀏覽器
- 向 IP 發出 request
- 該 IP 的 server 接到 request
- 收到 request 的 server 根據 request 內容往資料庫查詢資料
- 資料庫找到東西回傳給 server
- server 將 response 回傳給瀏覽器
- 瀏覽器顯示回傳的內容


## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
- ver：顯示 windows 的版本
- ping：測試網路
- sort：將輸入值排序