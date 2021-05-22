## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
- link：引入其他的檔案，例如跟 css 檔案或 js 檔案連結。
- blockquote：將一段文字定義為「引用」，實際使用上應該跟 section、footer 等標籤類似，本身不會有特別的畫面輸出效果，而是增加可讀性。
- ruby：旁注標記，例如日文文章的漢字需要標音時就使用這個。

## 請問什麼是盒模型（box model）
HTML中各個元素可以被視作一個盒子，透過 css 來調整這個盒子的一些屬性，例如寬、高，border 等。
預設的 box-sizing 模式是 content box，你定義的寬高會是最中心 content 的大小、然後 padding、border 與 margin 往外面延伸。
如果改成 border box，就會把 border 與 padding 算入盒子的一部分，定義寬高時會自動壓縮 content 來使盒子尺寸維持不變。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
- block：本身會佔去輸出時的「一行」，寬高、padding、margin 等屬性都可以調整。div、h1、p 等標籤的預設為此。
- inline：為了與其他元素在同一行的設計，調整寬高與上下的 margin 不會有反應，調整上下的 padding 時不會去推擠其他元素。span、a 等標籤的預設為此。
- inline-block：將上面兩種模式的部分要素綜合的結果，可以與其他東西併排，但也會對調整大部分屬性有反應。button、input 等標籤的預設為此。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
- static：與其他的物件按順序定位，物件的大小會影響下一個物件的定位點。沒有特別設置 position 時預設是這個。
- relative：根據此物件在 static 模式時的座標為原點，設置偏移值來改變物件的輸出位置。這個作法不會推擠到其他物件的定位。
- absolute：往上層尋找第一個不是 static 的物件做為參考點設置絕對位置，會與該物件保持固定的相對位置。被設置為 absolute 的物件會脫離正常的排版流程、不與其他模式的物件一起排序，它下面的其他物件會遞補它本來在其他模式的定位排序。
- fixed：以瀏覽器畫面（更正確的說法是 viewport）為準設置絕對位置，物件會被固定在畫面上該座標，不隨網頁內容的捲動移動。
