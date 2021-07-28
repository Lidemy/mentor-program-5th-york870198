開始執行
↓
整個內容作為一個 function （稱為main()）進入 stack
↓
for 迴圈進入 stack → 定義變數 i → 對 i 賦值為 0
↓
console.log(i) 指令進入 stack → 取得 i 的值為 0 → console 輸出 i: 0 → console.log(i) 移出 stack
↓
setTimeout() 進入 stack → 將 console.log(i) 作為 callback 送到 webapi → 取得 i 的值為 0 → 設置等待時間為 0 秒，0 秒後 console.log(i) 會進入 task queue → setTimeout() 移出 stack
↓
i++ → i 的值變成 1
↓
console.log(i) 指令進入 stack → 取得 i 的值為 1 → console 輸出 i: 1 → console.log(i) 移出 stack
↓
setTimeout() 進入 stack → 將 console.log(i) 作為 callback 送到 webapi → 取得 i 的值為 1 → 設置等待時間為 1 秒，1 秒後 console.log(i) 會進入 task queue → setTimeout() 移出 stack
↓
i++ → i 的值變成 2
↓
console.log(i) 指令進入 stack → 取得 i 的值為 2 → console 輸出 i: 2 → console.log(i) 移出 stack
↓
setTimeout() 進入 stack → 將 console.log(i) 作為 callback 送到 webapi → 取得 i 的值為 2 → 設置等待時間為 2 秒，2 秒後 console.log(i) 會進入 task queue → setTimeout() 移出 stack
↓
i++ → i 的值變成 3
↓
console.log(i) 指令進入 stack → 取得 i 的值為 3 → console 輸出 i: 3 → console.log(i) 移出 stack
↓
setTimeout() 進入 stack → 將 console.log(i) 作為 callback 送到 webapi → 取得 i 的值為 3 → 設置等待時間為 3 秒，3 秒後 console.log(i) 會進入 task queue → setTimeout() 移出 stack
↓
i++ → i 的值變成 4
↓
console.log(i) 指令進入 stack → 取得 i 的值為 4 → console 輸出 i: 4 → console.log(i) 移出 stack
↓
setTimeout() 進入 stack → 將 console.log(i) 作為 callback 送到 webapi → 取得 i 的值為 4 → 設置等待時間為 4 秒，4 秒後 console.log(i) 會進入 task queue → setTimeout() 移出 stack
↓
i++ → i 的值變成 5
↓
i<5 不成立，for 迴圈結束 → for() 移出 stack
↓
Event loop 檢查到 stack 已淨空，讓 task queue 中的東西進入 stack
↓
0 秒後進入 task queue 的 console.log(i) 指令進入 stack → 由於 for() 中的 i 是用 var 宣告而只支援 function scope、 會因為 hoisting 而提到跟 for 在同一層、所以在 for 的外面也能存取，得到 i = 5 → console 輸出 5 → console.log(i) 移出 stack
↓
1 秒後進入 task queue 的 console.log(i) 指令進入 stack → 得到 i = 5 → console 輸出 5 → console.log(i) 移出 stack
↓
2 秒後進入 task queue 的 console.log(i) 指令進入 stack → 得到 i = 5 → console 輸出 5 → console.log(i) 移出 stack
↓
3 秒後進入 task queue 的 console.log(i) 指令進入 stack → 得到 i = 5 → console 輸出 5 → console.log(i) 移出 stack
↓
4 秒後進入 task queue 的 console.log(i) 指令進入 stack → 得到 i = 5 → console 輸出 5 → console.log(i) 移出 stack

輸出結果為：
i:0
i:1
i:2
i:3
i:4
5
5
5
5
5