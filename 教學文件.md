# 📚 評分系統完整架設教學

> 完成後你會得到：一個真實網址、永久免費、即時同步的評分系統

---

## 系統說明

| 檔案 | 用途 | 使用者 |
|------|------|--------|
| `index.html` | 管理後台：新增考生、管理工作人員與老師、查看成績、產生 QR 碼 | 管理員 |
| `interview-scan.html` | 掃 QR 碼、組合考生後推送至面試評分 | CM316 面試工作人員 |
| `scan.html` | 掃 QR 碼、指派術科教室 | 術科考場外工作人員 |
| `interview.html` | 面試評分（以組為單位同步評分） | 面試老師（CM316） |
| `practical.html` | 術科評分 | 術科老師（CM216／CM214／CM212） |
| `results.html` | 即時成績總表 | 管理員 |
| `checkin.html` | 考生報到（輸入身分證末四碼） | 考生自行操作 |
| `firebase-config.js` | Firebase 設定、共用函式、導覽列 | 所有頁面共用 |

---

## 第一步：申請 Google 帳號（已有可跳過）

1. 前往 https://accounts.google.com/signup
2. 依照指示建立帳號

---

## 第二步：建立 Firebase 專案

1. 前往 **https://console.firebase.google.com/**
2. 點擊右上角「**建立專案**」（或 Create a project）
3. 輸入專案名稱，例如：`scoring-system-2024`
4. **停用 Google Analytics**（不需要，關閉即可）
5. 點擊「**建立專案**」，等待約 30 秒
6. 點擊「**繼續**」

### 建立 Realtime Database

1. 在左側選單找到「**建構**」→「**Realtime Database**」
2. 點擊「**建立資料庫**」
3. 地區選擇：**asia-southeast1（新加坡）**（最近台灣，速度最快）
4. 安全性規則選擇「**以測試模式啟動**」→ 點擊「**啟用**」

### 設定資料庫規則

1. 在 Realtime Database 頁面，點擊上方「**規則**」分頁
2. 把內容全部清空，貼上以下內容：

```json
{
  "rules": {
    "candidates": {
      ".read": true,
      ".write": true
    },
    "staff": {
      ".read": true,
      ".write": true
    },
    "teachers": {
      ".read": true,
      ".write": true
    },
    "practicalQueue": {
      ".read": true,
      ".write": true
    },
    "interviewQueue": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. 點擊「**發布**」

> ⚠️ 五個節點缺一不可，若缺少 `interviewQueue` 則面試掃碼無法推送，缺少其他節點則對應功能會失敗。

### 取得設定值

1. 點擊左上角齒輪 ⚙️ →「**專案設定**」
2. 往下滑到「**您的應用程式**」區塊
3. 點擊「**</>**」（網頁應用程式）圖示
4. 應用程式名稱輸入任意名稱，例如：`scoring-web`
5. **不要**勾選 Firebase Hosting
6. 點擊「**註冊應用程式**」
7. 你會看到類似這樣的設定值，**把整個物件複製下來**：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "scoring-system-2024.firebaseapp.com",
  databaseURL: "https://scoring-system-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "scoring-system-2024",
  storageBucket: "scoring-system-2024.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## 第三步：修改 firebase-config.js

打開 `firebase-config.js`，找到 `FIREBASE_CONFIG` 的部分，把值換成你剛才複製的值。

**修改前：**
```javascript
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  ...
```

**修改後（填入你的真實值）：**
```javascript
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "scoring-system-2024.firebaseapp.com",
  ...
```

---

## 第四步：申請 GitHub 帳號

1. 前往 **https://github.com/signup**
2. 輸入電子郵件、密碼、使用者名稱
3. 驗證帳號（收信點擊連結）

---

## 第五步：上傳檔案到 GitHub

1. 登入 GitHub 後，點擊右上角「**+**」→「**New repository**」
2. Repository name 輸入：`scoring-system`
3. 選擇 **Public**（公開，這樣才能用 GitHub Pages）
4. 點擊「**Create repository**」

### 上傳所有檔案

1. 在新建立的 repository 頁面，點擊「**uploading an existing file**」連結
2. 把以下所有檔案**一次全部拖曳**進去：
   - `index.html`
   - `checkin.html`
   - `interview-scan.html`
   - `scan.html`
   - `interview.html`
   - `practical.html`
   - `results.html`
   - `firebase-config.js`
3. 在下方 Commit changes 輸入任意說明，例如：`初次上傳`
4. 點擊「**Commit changes**」

---

## 第六步：開啟 GitHub Pages（讓網站上線）

1. 在 repository 頁面，點擊上方「**Settings**」
2. 左側選單找到「**Pages**」
3. Source 選擇「**Deploy from a branch**」
4. Branch 選擇「**main**」，資料夾選「**/ (root)**」
5. 點擊「**Save**」
6. **等待約 2–3 分鐘**，頁面會顯示你的網址

你的網址會是：
```
https://你的GitHub帳號名稱.github.io/scoring-system/
```

例如：`https://john123.github.io/scoring-system/`

---

## 第七步：新增管理員帳號（重要）

系統的管理員密碼儲存在 Firebase，**不是**寫死在程式裡，需要手動建立。

1. 前往 Firebase Console → 你的專案 → **Realtime Database**
2. 點擊 `teachers` 節點旁的「**+**」
3. 鍵輸入：`admin`，逐一新增以下五個子欄位：

| 鍵 | 值 |
|---|---|
| `name` | `管理員` |
| `password` | `自訂密碼（請勿使用簡單數字）` |
| `type` | `admin` |
| `room` | `ADMIN` |
| `label` | `管理員` |

4. 完成後即可用此密碼登入 `index.html` 和 `results.html`

> ⚠️ 若跳過此步驟，將無法登入管理後台。之後要修改管理員密碼，同樣在此處點擊 `password` 欄位直接修改，立即生效。

---

## 第八步：新增工作人員帳號

工作人員帳號需在管理後台手動新增，**不可**使用老師密碼登入工作人員頁面，兩者完全分開。

1. 打開 `你的網址/index.html`，輸入管理員密碼登入
2. 點擊上方「**👷 工作人員管理**」分頁
3. 填入姓名、密碼（數字或英數字皆可），選擇負責教室：
   - **CM316**：面試工作人員（登入 `interview-scan.html`）
   - **CM216 / CM214 / CM212**：術科工作人員（登入 `scan.html`）
4. 點擊「**新增工作人員**」

> ⚠️ 面試工作人員必須選 CM316，術科工作人員密碼無法登入面試掃碼頁面，反之亦然，系統會自動擋下。

---

## 第九步：測試系統

建議考試前至少一天完整跑一遍以下流程：

1. 打開 `你的網址/index.html`，輸入管理員密碼登入
2. 匯入或手動新增幾位測試考生
3. 點擊考生旁的「QR」按鈕，查看 QR 碼
4. 用手機開啟 `你的網址/checkin.html`，測試考生報到流程
5. 用手機開啟 `你的網址/interview-scan.html`，以面試工作人員密碼登入，掃碼並推送一組考生
6. 用另一台裝置開啟 `你的網址/interview.html`，以面試老師密碼登入，確認考生出現在左側並可評分
7. 用手機開啟 `你的網址/scan.html`，以術科工作人員密碼登入，掃碼指派考生
8. 用另一台裝置開啟 `你的網址/practical.html`，以術科老師密碼登入，確認考生出現並可評分
9. 開啟 `你的網址/results.html`，確認成績總表正確顯示

---

## 各頁面網址（分享給對應人員）

| 人員 | 網址 | 備註 |
|------|------|------|
| 管理員 | `你的網址/index.html` | 請洽管理員取得密碼 |
| 考生報到 | `你的網址/checkin.html` | 不需密碼，輸入身分證末四碼 |
| 面試工作人員（CM316） | `你的網址/interview-scan.html` | 請洽管理員取得密碼 |
| 術科工作人員 | `你的網址/scan.html` | 請洽管理員取得密碼 |
| 面試老師（CM316） | `你的網址/interview.html` | 請洽管理員取得密碼 |
| 術科老師 | `你的網址/practical.html` | 請洽管理員取得密碼 |
| 成績總表 | `你的網址/results.html` | 請洽管理員取得密碼 |

---

## 面試流程說明

1. **面試工作人員**在 CM316 門口，用 `interview-scan.html` 掃描考生 QR 碼（或手動輸入序號末三碼）
2. 每次可加入 1 至多位考生至「本組暫存區」，確認名單正確後再送出
3. 按「**推送這組考生至面試評分**」，考生資料立即推送給面試老師
4. **面試老師**在 `interview.html` 左側會出現新的一組，點選後右側同時顯示所有考生的評分欄
5. 老師逐一輸入分數送出，全組完成後自動移至「已完成」並從佇列清除
6. 若工作人員需要確認推送記錄，可查看頁面底部的「本次推送記錄」；若考生名單有誤，可點「重整」按鈕重新整理快取

---

## 術科流程說明

1. **術科工作人員**在各教室門口，用 `scan.html` 掃描考生 QR 碼
2. 系統自動將考生指派到該工作人員負責的教室，對應教室的術科老師畫面即時更新
3. **術科老師**在 `practical.html` 左側看到候評名單，點選考生後輸入分數送出
4. 若需重新指派教室，再次掃碼即可，系統會詢問確認（若已有評分記錄會特別警告）

---

## 危險操作說明

管理後台「🛠️ 工具」分頁的危險操作區有三個按鈕，使用前請確認：

| 按鈕 | 效果 |
|------|------|
| 清除術科佇列（不刪考生） | 清空術科候評佇列及未評考生的指派記錄，已評分資料不受影響 |
| 清除面試佇列（不刪考生） | 清空面試佇列，考生資料和評分不受影響 |
| 清除所有考生資料 | 刪除全部考生及所有佇列，**無法復原** |

---

## 常見問題

**Q：Firebase 免費嗎？**
A：是的。免費方案每月 1GB 儲存、10GB 傳輸，系統同時支援 100 個連線，考試用途完全足夠，且沒有時間限制。

**Q：GitHub Pages 免費且永久嗎？**
A：是的，只要你的 GitHub 帳號存在，網站就會一直在線。

**Q：面試掃碼推送後面試老師沒看到考生？**
A：最常見原因有兩個：一是 Firebase 規則缺少 `interviewQueue` 節點，請確認規則已正確設定並發布；二是面試老師頁面尚未登入或網路中斷，請重新整理頁面。

**Q：工作人員無法登入對應頁面？**
A：確認管理後台「工作人員管理」中，該工作人員的負責教室設定正確。面試工作人員必須選 CM316 才能登入 `interview-scan.html`；術科工作人員選 CM216/CM214/CM212 才能登入 `scan.html`，兩者不能互換。

**Q：評分送出後畫面沒有更新？**
A：確認手機有連上網路。若出現「❌ 評分失敗」提示，表示當下網路不穩，稍後重試即可，分數不會被記錄，不需擔心誤送。

**Q：考試結束後要匯出資料嗎？**
A：進管理後台 → 「🛠️ 工具」分頁 → 點擊「**匯出成績 CSV**」，可直接用 Excel 開啟。欄位包含：序號、姓名、面試委員1、面試委員2、各別評分、面試平均成績、術科評分委員1、術科評分委員2、術科成績1、術科成績2、術科平均成績、指派教室。未評分欄位顯示 0。

**Q：老師密碼要怎麼修改？**
A：前往 Firebase Console → Realtime Database → `teachers` → 找到對應老師節點 → 點擊 `password` 欄位直接修改，立即生效，不需重新上傳檔案。

**Q：如果不小心按到清除考生資料怎麼辦？**
A：系統會二次確認才執行，若已確認刪除則無法復原。建議考試前先匯出一份 CSV 備份。

---

## 如果需要修改老師名單

透過管理後台「**🎤 面試老師管理**」或「**✏️ 術科老師管理**」分頁新增／刪除老師，立即生效，不需修改任何程式碼或重新上傳檔案。

---

## 更新檔案（日後有程式更新時）

1. 在 GitHub repository 頁面，點擊「**Add file**」→「**Upload files**」
2. 拖曳新版本的檔案進去（會自動覆蓋舊檔案）
3. 點擊「**Commit changes**」
4. 等待約 1–2 分鐘，GitHub Pages 自動更新，重新整理瀏覽器即可
