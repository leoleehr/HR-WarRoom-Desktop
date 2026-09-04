# HR 戰情室 · 桌面應用程式

CMoney 人資部「工作紀錄與職能分析簿」桌面版，基於 Electron 跨平台打包。

## 環境需求

- **Node.js 18 或 20 LTS**（[下載](https://nodejs.org/)）
- npm（隨 Node.js 安裝）
- 磁碟空間 ~1.5 GB

## 三步驟打包

### 1. 安裝依賴

在本資料夾按 `Shift + 右鍵 → 在這裡開啟 PowerShell`，執行：

```bash
npm install
```

首次約需 5-10 分鐘下載套件（~200MB）。

### 2. 本機測試（選用）

```bash
npm start
```

確認應用視窗可開啟，UI 完整顯示。

### 3. 打包安裝程式

**Windows**：

```bash
npm run build:win
```

完成後 `dist/` 出現：

- `HR戰情室-Setup-1.0.0-x64.exe` — **安裝程式**（建立桌面與開始選單捷徑）
- `HR戰情室-Portable-1.0.0.exe` — **可攜版**（免安裝，可放隨身碟）

**macOS**：`npm run build:mac` → `dist/HR戰情室-1.0.0-arm64.dmg`

**Linux**：`npm run build:linux` → `dist/HR戰情室-1.0.0-x64.AppImage`

## 檔案結構

```
HR-WarRoom-Desktop/
├── main.js              Electron 主程式
├── index.html           應用 UI
├── package.json         專案與打包設定
├── build/
│   ├── icon.png         512×512 主 icon
│   ├── icon.ico         Windows 多解析度 icon
│   ├── installerHeader.bmp  NSIS 安裝頭圖
│   └── make_icons.py    icon 重新產生腳本
├── assets/
├── README.md
└── .gitignore
```

## 分發給 HR 部門同仁

1. 將 `HR戰情室-Setup-1.0.0-x64.exe` 上傳至公司 SharePoint / 雲端硬碟
2. 同仁雙擊 → 安裝 → 桌面捷徑出現
3. **首次安裝若出現「Windows 已保護您的電腦」**（SmartScreen）：
   - 點「**更多資訊 → 仍要執行**」即可
   - 此為未簽章軟體的正常提示

## 升級 HTML 版本

當您有新版 HTML（含部門儀表、雲端同步等新功能）時：

1. 用新版覆蓋本資料夾的 `index.html`
2. 修改 `package.json` 的 `version` 欄位（如 `1.0.0` → `1.1.0`）
3. 重新執行 `npm run build:win`
4. 同仁覆蓋安裝即可，**舊資料不會遺失**（儲存於 `%APPDATA%/HR 戰情室/`）

## 常見問題

| 問題 | 解法 |
|---|---|
| `npm install` 太慢 | 切換到台灣鏡像：`npm config set registry https://registry.npmmirror.com` |
| 下載 Electron 卡住 | 設定環境變數 `ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/` |
| 安裝程式介面非中文 | 已預設為繁體中文（`language: "1028"`） |
| 開啟後白屏 | 「檢視 → 開發者工具」查 Console 錯誤 |

## 授權

MIT License · 內部使用
