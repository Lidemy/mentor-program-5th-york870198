``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 開始定義函式，輸入值為一個陣列 arr = [3, 5, 8, 13, 22, 35]
2. 執行第一行，變數 i 的起始值為 0，檢查 i 是否 < arr 長度，是，繼續執行
3. 執行第二行，檢查 arr 的第 i 個元素是否 <= 0，如果是則回傳 'invalid'，否，繼續執行
4. 變數 i += 1，回到 2. 再次檢查此時 i 是否 < arr 長度，是，繼續執行
5. 重複 2.~4.，直到 i >= arr.length，arr 中沒有元素 <= 0，繼續執行
6. 執行第四行，變數 i 的起始值為 2，檢查 i 是否 < arr 長度，是，繼續執行
7. 執行第五行，檢查 arr 的第 i 個元素是否等於 arr 的第 i-1 個元素與arr 的第 i-2 個元素的和，如果否則回傳 'invalid'，是，繼續執行
8. 變數 i += 1，回到 6. 再次檢查此時 i 是否 < arr 長度，是，繼續執行
9. 當執行到 i = 4 時，arr[2] + arr[3] = 8 + 13 = 22 != arr[4]，回傳 'invalid'，函式執行結束。

這個函式是在檢查輸入的陣列是否符合兩項規則：
1. 所有元素都是正值
2. 除了第一項與第二項例外，其餘所有元素都是前兩項的和