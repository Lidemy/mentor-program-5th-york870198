## 跟你朋友介紹 Git

首先 google git 找到官網，去 download 安裝檔案之後一路下一步按到底就好。
現在 Git 在你電腦安裝好了，你會有一個叫做 git bash 的應用程式，點開它會進入類似cmd.exe的命令介面。

用 Command line 移動到你放笑話的資料夾，如果不會 Command line 的話去問 h0w 哥。
進入你要管理版本的資料夾之後，輸入指令 `git init`，這樣這個資料夾就可以開始用 Git 做版控了。

當你要準備新版的笑話時，你就先輸入 `git branch version-1`，這會生成一個名叫 version-1 的新 branch，也就是分出一個新的版本。
之後輸入 `git chechout version-1` 跳到這個 branch，接下來不管你在這裡怎麼亂改都不會影響到原本的版本，你只要跳回先前的 master branch 上就可以看到檔案都沒有被更改。

在你更新好笑話、覺得很滿意可以存檔時，就輸入 git add，後面加上你剛才改過的檔案名稱。如果嫌麻煩，可以直接輸入 `git add .`，這個 `.` 表示套用所有改動過的檔案。
在 add 過之後，輸入 `git commit -m "message"` 就能把新的版本存好了。這邊的 message 是你這一次 commit 的註解，例如你可以輸入「把角色的名字改掉了」、「配合時事更新笑點」等，總之就是方便讓你知道這一次 commit 是為了什麼。

話說電視笑話冠軍是幾年前的節目了？還有在播嗎！？