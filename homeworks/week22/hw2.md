## 請列出 React 內建的所有 hook，並大概講解功能是什麼
- useState
  為 component 設置一個新的 state

- useEffect
  告訴 component 當在畫面上 render 完後要執行哪些事

- useContext
  把一個 component 中的內容傳出去、讓其他 component 都可以直接用這個 hook 取用、避免 prop drilling

- useReducer
  按照官方文件的解釋這東西跟 Redux 的邏輯類似，算是 useState 的一種優化方式？
  我理解成這個 hook 讓你可以用比較嚴謹的方式自定義 setter 的具體過程

- useCallback
  記錄函式，避免每次因為 component 重新 render 導致函式因為被重新指定、當成 props 往下傳而發生無意義的 re-render

- useMemo
  把計算的結果存起來，避免重複進行複雜耗時的計算

- useRef
  用來抓取 DOM 的節點，而且不會觸發 re-render

- useImperativeHandle
  這個我沒完全看懂，看起來像是「讓父元件可以觸發子元件的 useRef」？

- useLayoutEffect
  跟 useEffect 相同效果但時機不同，是在畫面 render 之前執行

- useDebugValue
  用來在 React DevTools 中顯示自定義內容，讓 custom hooks 也可以用 DevTools 檢查

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
- Mounting
  component 被創建時觸發

- Updating
  component 已經存在、但是 state / props 改變了而將要重新 render 時觸發

- Unmounting
  component 即將要從 DOM 上被刪除時觸發

## 請問 class component 與 function component 的差別是什麼？
class 是從 React.Component 繼承內容，建立時就自帶生命週期與 state 等功能，使用上會經常調用 this
functional 原本是用於不會有狀態改變等問題、單純需要顯示一些東西時的快捷作法，hooks 功能誕生之後就也有生命週期跟 state
functional 在被 babel 編譯之後的容量似乎遠比 class 小，看到別人寫的技術文件中的範例是可以差 10 倍以上。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
如果一個 input 元素是被 React 控制就叫做 controlled component，反之就是 uncontrolled component
因為 conrolled component 顯示的內容是被 React 控制，畫面的改變都是透過 React re-render 畫面
官方文件的建議是在大多數情況下都該用 controlled component
