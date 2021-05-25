## 什麼是 DOM？
Document Object Model，將 HTML 文件裡面的東西全部定義成物件。
這些物件會按照在 HTML 裡面的排序變成一個樹狀結構。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
在觸發一個被監聽的事件時，在 DOM 中會先從 root 開始向下沿著樹狀圖傳遞到 target，在抵達 target 之前的過程稱為捕獲。
然後在抵達 target 之後又會往上回傳到 root，這個過程稱為冒泡。
如果檢查 EventListener 的 eventPhase 屬性，捕獲階段會是 1、冒泡則是 3、在抵達 target 當下則是 2。

## 什麼是 event delegation，為什麼我們需要它？
把監聽事件設置在比較末端的 HTML tag 上會出現問題，以商品列表為例：
每一個商品會是一個 div，如果今天把監聽點擊的事件放在商品的 div tag上、每次新增商品就多監聽一次，一旦商品數量變多就會讓效能變差。
而事實上不需要一個一個設置，只需要在放置商品的貨架上進行監聽，就可以透過參數取得「這次點擊是點在貨架上哪一個商品上」
這樣一來只需要設置一次監聽事件。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
preventDefault 是禁止原本 HTML tag 的預設功能，例如在 form 裡面的 button 預設在點擊時就會 submit form，
在觸發事件時加上 e.preventDefault，就會擋掉這個 submit。

stopPropagation 是阻止事件傳遞，例如在網頁上有一個操作區、上面有按鈕。
當按下按鈕時，因為網頁、操作區與按鈕三個東西是重疊的，這三個 tag 上面的事件都會在傳遞過程中被觸發。
這時在按鍵的事件中設置 stopPropagation，當觸發傳遞到這個事件時就會停下來、不再觸發後續冒泡階段的事件。
