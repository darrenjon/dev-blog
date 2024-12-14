---
title: 如何使用網頁應用程式實現 Google Workspace 的自動化操作
keywords: 
  - Google Apps Script
  - Google Workspace
  - automation
authors: [darrenjon]
tags: [apps-script, google-workspace, automation]
description: 介紹如何使用 Google Apps Script 開發網頁應用程式，實現 Google Workspace 的自動化操作。
image: /img/docs/apps-script/web-app-demo.png
---

# 部署為網頁應用程式實現 Google Workspace 自動化

Google Apps Script 提供了強大的自動化能力，讓我們能夠透過程式碼來操作 Google Workspace（如 Sheets、Drive、Docs 等）。本文將介紹如何開發一個網頁應用程式，讓使用者可以透過簡單的介面來執行這些自動化操作。

## 為什麼選擇網頁應用程式？

傳統的 Apps Script 通常是附加在特定的 Google Sheets 或是透過觸發器來執行。但有時我們希望：

- 提供一個**獨立的介面**給使用者
- 讓**使用者可以輸入參數**來執行不同的操作
- 不需要開啟特定的 Google Sheets 就能執行功能
- 提供更好的使用者體驗

這時候，將 Apps Script 部署為網頁應用程式就是一個很好的選擇。

## 開發環境設置

### 建立新專案

1. 前往 [Google Apps Script](https://script.google.com/)
2. 點擊「新專案」按鈕
3. 為專案命名

![create project](/img/docs/apps-script/create-new-script-project.png)

### 專案檔案結構

可以採用以下結構來組織你的script：

```md title="your script project"
your-project/
├── Code.gs      # 主要的程式邏輯
├── index.html   # 主要的網頁介面
├── style.html   # CSS 樣式
└── script.html  # 前端 JavaScript
```
## 基礎架構設置

### 1. 設置專案的核心（Code.gs）

```js title="Code.gs"
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Automation Tool')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// import other HTML files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
```

### 2. 建立基本介面（index.html）

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <?!= include('style'); ?>
  </head>
  <body>
    <div class="container">
      <!-- 你的表單和其他 UI 元素 -->
    </div>
    <?!= include('script'); ?>
  </body>
</html>
```

## 實作自動化功能

### 1. 操作 Google Sheets

```js title="Code.gs"
function updateSheet(params) {
  try {
    const { spreadsheetId, sheetName, data } = params;
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    // 執行你的邏輯
    sheet.getRange(params.range).setValues(data);
    
    return { status: 'success', message: '更新成功' };
  } catch (error) {
    return { status: 'error', message: error.toString() };
  }
}
```

### 2. 操作 Google Drive

```js title="Code.gs"
function createFolders(params) {
  try {
    const { parentFolderId, folderName } = params;
    const parentFolder = DriveApp.getFolderById(parentFolderId);
    const newFolder = parentFolder.createFolder(folderName);
    
    return {
      status: 'success',
      folderId: newFolder.getId(),
      folderUrl: newFolder.getUrl()
    };
  } catch (error) {
    return { status: 'error', message: error.toString() };
  }
}
```

### 3. 前端呼叫（script.html）

```html title="script.html"
function executeOperation() {
  const params = {
    spreadsheetId: document.getElementById('spreadsheetId').value,
    sheetName: document.getElementById('sheetName').value,
    // 其他參數
  };

  google.script.run
    .withSuccessHandler(onSuccess)
    .withFailureHandler(onError)
    .updateSheet(params);
}

function onSuccess(response) {
  // 處理成功回應
  if (response.status === 'success') {
    showMessage('success', response.message);
  }
}

function onError(error) {
  // 處理錯誤
  showMessage('error', error.toString());
}
```

## 使用者介面設計

### 1. 基本表單結構

```html title="index.html"
<div class="form-group">
  <label for="spreadsheetId">試算表 ID：</label>
  <input 
    type="text" 
    id="spreadsheetId" 
    placeholder="從 Google Sheets URL 複製 ID"
  >
  <div class="helper-text">
    在 Google Sheets URL 中的這段文字：
    https://docs.google.com/spreadsheets/d/[這是試算表ID]/edit
  </div>
</div>
```

### 2. 回饋訊息

```html title="index.html"
<div id="message" class="message" style="display: none;">
  <span class="message-text"></span>
</div>
```

## 部署流程

### 1. 新增部署

1. 點擊「部署」>「新增部署」
2. 選擇「網頁應用程式」
3. 設定執行身分和存取權限

![set deployment](/img/docs/apps-script/deploy-web-app.png)
![set deployment setting](/img/docs/apps-script/deploy-web-app-setting.png)

### 2. 授權設定

應用程式需要適當的授權才能存取 Google Workspace 服務：

1. 第一次部署時會要求授權
2. 接受授權請求
3. 登入個人 Google 帳號以完成授權

![authorization](/img/docs/apps-script/authorization-script.png)

### 3. 取得應用程式網址

部署成功後，會得到一個網址，使用者可以透過這個網址來存取應用程式。

![web app url](/img/docs/apps-script/web-app-url.png)

## 成果展示

透過簡單的介面，使用者可以登入自己指定的 Google 帳號輸入，透過輸入試算表 ID 和工作表名稱，就可以自動化執行更新操作。當操作成功時，會顯示成功訊息。

![web app demo](/img/docs/apps-script/web-app-demo.png)

## 結語

透過 Google Apps Script 開發網頁應用程式，我們可以為使用者提供一個直覺的介面來執行各種 Google Workspace 自動化操作。這不只提高了工作效率，也大幅降低了使用門檻。

## 相關資源

- [Google Apps Script 官方文件](https://developers.google.com/apps-script)
- [Google Workspace 開發者指南](https://developers.google.com/workspace)