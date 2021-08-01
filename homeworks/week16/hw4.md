# obj.inner.hello()
可看作用 「obj.inner」 這個物件進行呼叫、叫出此物件中的 hello 元素，
所以此處的 this 是進行呼叫的物件 = obj.inner，可得 obj.inner.value = 2

# obj2.hello()
obj2 被賦值為 obj.inner，按照 js 的性質這個賦值是將 obj2 的值改為 obj.inner 的記憶體位置，
所以用 obj2 進行呼叫等於用 obj.inner 進行呼叫、叫出此物件中的 hello 元素
所以 this 會是 obj.inner，印出 obj.inner.value = 2

# hello()
global scope 中的 hello 被賦值為 obj.inner.hello 的「值」，
所以等價於 
hello = function() {
  console.log(this.value)
}
在 global scope 直接呼叫 global hello，會變成視為由瀏覽器的 window 進行呼叫，
而因為 window 物件沒有定義 value 元素，所以會印出 undefined
我試著在電腦上直接寫成 js 檔案然後用 node 運作，這時候的 this 回傳的內容是一個很長一串的物件，我還沒能看懂這是什麼東西