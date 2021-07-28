var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)

# 編譯階段：

宣告 global 變數 a (line 1)
↓
宣告 global function fn (line 2)
↓
宣告 fn scope 變數 a (line 4)
↓
再次宣告 fn scope 變數 a (line 7)
↓
宣告 fn scope function fn2 (line 10)

# 執行階段：

對 global 變數 a 賦值為 1 (line 1)
↓
取用 global function fn (line 16)
↓
在 fn scope 中取用 a → 已存在宣告但尚未賦值 → 輸出 undefined (line 3)
↓
對 fn scope 變數 a 賦值為 5 (line 4)
↓
在 fn scope 中取用 a → 得到 5 → 輸出 5 (line 5)
↓
在 fn scope 中執行 a++ → a 賦值為 6 (line 6)
↓
在 fn scope 中宣告 a 但不賦值 → a 已經存在，不變動其值 (line 7)
↓
取用 fn scope function fn2 (line 8)
↓
在 fn2 scope 中取用 a → fn2 scope 中沒有宣告過 a → 往上層找，在 fn scope 中取得 a → 得到 6 → 輸出 6 (line 11)
↓
在 fn2 scope 中對 a 賦值為 20 → fn2 scope 中沒有宣告過 a → 往上層找，在 fn scope 中取得 a → 賦值為 20 (line 12)
↓
在 fn2 scope 中對 b 賦值為 100 → fn2 scope 中沒有宣告過 b → 往上層找，fn scope 中沒有宣告過 b → 往上層找，global scope 中沒有宣告過 b → 在 global scope 中對 b 進行宣告 → 對 b 賦值為 100 (line 13)
↓
fn2 執行結束 (line 8)
↓
在 fn scope 中取用 a → 得到 20 → 輸出 20 (line 9)
↓
fn 執行結束 (line 16)
↓
在 global scope 中取用 a → 得到 1 → 輸出 1 (line 17)
↓
對 global scope 變數 a 賦值為 10 (line 18)
↓
在 global scope 中取用 a → 得到 10 → 輸出 10 (line 19)
↓
在 global scope 中取用 b → 得到 100 → 輸出 100 (line 20)
↓
執行結束

輸出結果：
undefined
5
6
20
1
10
100