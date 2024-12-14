---
title: "[Desktop] 操作介面說明"
keywords: 
  - Power Automate 桌面版介面說明
  - RPA 桌面版介面
authors: [darrenjon]
tags: [power-automate]
description: 介紹 Power Automate Desktop 的操作介面，讓你熟悉各個區域的功能與操作方式。
image: /img/docs/power-automate/pad-editor-pane.png
sidebar_position: 2
---

# 操作介面總覽

在完成 Power Automate Desktop 的安裝後，讓我們開始了解自動化工具的使用介面，這篇文章將帶你認識各個主要區域，讓你在建立自動化流程前能夠更有效率。

介面大致分為以下幾個區塊：

## 工具列 (Toolbar)與流程清單 (Flows Pane)

工具列位於畫面上方，提供常用的操作按鈕，而點擊流程名稱可以開啟編輯介面，右鍵點擊可以選擇複製、刪除等操作。例如：

- 新流程：建立一個新的流程。
- 執行：執行流程以測試自動化。
- 停止：停止正在執行的流程。
- 編輯： 進入流程編輯模式。

![Power Automate Desktop Toolbar](/img/docs/power-automate/pad-toolbar.png)

## 動作面板 (Actions Pane)

位於畫面右側，動作面板提供各種預設的 RPA 動作，可以拖曳動作至編輯區來設計流程。

主要動作類型：

- **使用者介面自動化**：操作網頁或應用程式的按鈕、文字輸入等。
- **瀏覽器自動化**：自動化瀏覽器行為 (如 Edge、Chrome)。
- **檔案/資料夾**：管理檔案和資料夾。
- **Excel**：與 Excel 互動，如讀取或寫入數據。
- **迴圈**：建立迴圈，重複執行特定動作。
- **條件**：設定條件判斷，根據不同情況執行不同動作。
- **變數**：設定變數，儲存流程執行時的數據。
- **電子郵件**：設定自動發送或接收電子郵件。

![Power Automate Desktop Actions Pane](/img/docs/power-automate/pad-action-pane.png)

## 流程編輯區 (Workspace)

位於畫面中央，這是設計自動化流程的主要區域。

- **拖放動作**：從右側動作面板拖曳所需動作至編輯區。
- **流程圖結構**：動作會按照執行順序顯示在畫面上，類似流程圖設計。
- **錯誤提示**：流程中出現錯誤時，系統會顯示紅色提示，方便進行修正。

![Power Automate Desktop Workspace](/img/docs/power-automate/pad-editor-pane.png)

## 變數 (Variables Pane)

變數用於儲存流程執行時的動態數據，例如計算結果、檔案路徑或網頁資料。

- **Input/Output Variables**：用於接收外部輸入/輸出結果。
- **Flow Variables**：流程執行過程中產生的全部變數。

![Power Automate Desktop Variables Pane](/img/docs/power-automate/pad-variables-pane.png)

## 輸出面板 (Output Pane)

位於畫面下方，顯示執行流程時的輸出訊息，包括錯誤訊息、執行時間等。

- **Log**：記錄流程執行有幾個動作與子流程。
- **Errors**：當執行過程中遇到的錯誤，會顯示錯誤資訊。
- 設定**執行延遲**：每個動作之間需要延遲幾毫秒，確保自動化流程進行時，能夠前一個動作有足夠的時間完成再執行下一步。

![Power Automate Desktop Output Pane](/img/docs/power-automate/pad-output-pane.png)

透過本篇文章，希望有幫助你熟悉了 Power Automate Desktop 的主要介面組成與功能。後續的教學中，我們將深入介紹如何設計各類自動化流程，幫助你快速實現工作效率的提升！