# Trip Planner

## 架構

## 頁面路由
| 頁面路由      | 對應元件        | 功能區塊                   |
|---------------|-----------------|----------------------------|
| `/`           | HomePage        | HeadCard（首頁、導覽簡介） |
| `/contacts`   | ContactPage     | 聯絡人清單                 |
| `/package`    | PackagePage     | 行前與行李清單             |
| `/itinerary`  | ItineraryOverviewPage   | 行程切頁（Tabs）          |
| `/notice`     | NoticePage      | 注意事項清單               |

## 編輯功能說明
* 保存：將修改存到 localStorage
* 下載 JSON：導出為 JSON
* 重新載入：重新載入頁面並讀取最新的 schedule.json
* 重置：清除 localStorage，恢復原始數據
* 編輯/預覽：切換編輯與預覽模式