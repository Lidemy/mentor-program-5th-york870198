開始執行
↓
整個內容作為一個 function （稱為main()）進入 stack
↓
console.log(1) 指令進入 stack → console 輸出 1 → console.log(1) 移出 stack
↓
setTimeout() 進入 stack → 將 console.log(2) 作為 callback 送到 webapi、設置等待時間為 0 秒，0 秒後 console.log(2) 會進入 task queue → setTimeout() 移出 stack
↓
console.log(3) 指令進入 stack → console 輸出 3 → console.log(3) 移出 stack
↓
setTimeout() 進入 stack → 將 console.log(4) 作為 callback 送到 webapi、設置等待時間為 0 秒，0 秒後 console.log(4) 會進入 task queue → setTimeout() 移出 stack
↓
console.log(5) 指令進入 stack → console 輸出 5 → console.log(5) 移出 stack
↓
main() 執行完畢、移出 stack
↓
Event loop 檢查到 stack 已淨空，讓 task queue 中的東西進入 stack
↓
console.log(2) 指令進入 stack → console 輸出 2 → console.log(2) 移出 stack
↓
Event loop 檢查到 stack 已淨空，讓 task queue 中的下一個東西進入 stack
↓
console.log(4) 指令進入 stack → console 輸出 4 → console.log(4) 移出 stack

輸出結果：
1
3
5
2
4
