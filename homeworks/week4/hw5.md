## 請以自己的話解釋 API 是什麼
圖書館櫃台。
想要借書（get）要按規定格式（header）填寫文件（request）送往借書櫃台（API 的 get 網址），文件填寫正確就可以拿到書（response）。
想要新增館藏（post），填寫規定格式的文件外還要把書包好（body），然後送往捐贈櫃台（api 的 post 網址）。
然後可以做什麼事情是基於圖書館管理單位（API 開發者）的設計，管理單位沒有設計的處理途徑（request route）你把文件送過去也沒用。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
102 Processing：伺服器收到你的請求了，但它還沒回應。
403 Forbidden：訪問的伺服器需要特定訪問權限，由於檢查到用戶端沒有該權限所以拒絕回應。
405 Method Not Allowed：發出 request 的方法不被支援，就是上面一題講到的「開發者沒有設計這個處理途徑」。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。
- 所有餐廳資料：
  + method：GET
  + path：/restaurants
  + 參數：無
- 單一餐廳資料：
  + method：GET
  + path：/restaurants/:id
  + 參數：無
- 刪除餐廳：
  + method：DELETE
  + path：/restaurants/:id
  + 參數：無
- 新增餐廳：
  + method：POST
  + path：/restaurants/
  + 參數：{name: 餐廳名稱, address: 餐廳地址, number: 連絡電話}
- 修改餐廳資料：
  + method：PATCH
  + path：/restaurants/:id
  + 參數：{name: 餐廳名稱, address: 餐廳地址, number: 連絡電話}