---
title: "如何在電腦安裝與部署 n8n（Docker）"
keywords: 
  - n8n Self-hosting
  - n8n Docker
authors: [darrenjon]
tags: [n8n, automation]
description: "本文將帶你一步步在自己的電腦上使用 Docker 部署 n8n，並搭配 PostgreSQL 作為資料庫。"
image: /img/docs/n8n/n8n-setup-home.png
sidebar_position: 1
---

n8n 是一個強大的開源自動化工作流程工具，你可以串聯各種應用程式和服務，自訂自動化流程。雖然 n8n 提供雲端版本，如果你想完全掌控資料並免費在自己的電腦端運行，自我託管（Self-hosting）是最佳的選擇。本文將帶你一步步在自己的電腦上使用 Docker 部署 n8n，並搭配 PostgreSQL 作為資料庫，讓你快速上手。

這篇文章我是使用 macOS（使用 Docker Desktop），但步驟也通用於其他作業系統（如 Windows）。

## 前置條件

在開始之前，請確保你的電腦已經安裝好以下軟體：
- Docker Desktop: 下載並安裝 [Docker Desktop](https://www.docker.com/products/docker-desktop)
- 基本終端機知識：會用命令列操作即可。
- 穩定的網絡連接：需要下載 Docker 映像檔。

## 步驟說明

以下會使用到 Docker 相關的指令，如果你對 Docker 不熟悉，歡迎參考 [Docker 官方文檔](https://docs.docker.com/get-started/overview/)。
Docker Compose 可以讓我們用一個描述檔(預設名稱是 docker-compose.yml )管理與操作多個容器，而描述檔會以 YAML 格式撰寫。

### 1. 建立專案目錄

首先，建立一個專案目錄（名稱都可以自己替換），可以用來存放 n8n 的相關檔案。在終端機中執行以下命令：

```bash
mkdir n8n-docker
cd n8n-docker
```

### 2. 創建 Docker Compose 檔案

在專案目錄中創建一個 `docker-compose.yml` 檔案，用來定義 n8n 和 PostgreSQL 的 Docker 容器。

```yaml title="docker-compose.yml"
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=${POSTGRES_DB}
      - DB_POSTGRESDB_USER=${POSTGRES_USER}
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - ./n8n_storage:/home/node/.n8n
    depends_on:
      - postgres

  postgres:
    image: postgres:16
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - ./postgres_storage:/var/lib/postgresql/data

volumes:
  n8n_storage:
  postgres_storage:
```

說明：
- 使用 n8n 的 Docker 映像檔，並將容器的 `5678` 埠映射到主機的 `5678` 埠。
- `postgres` 服務：使用 PostgreSQL 的 Docker 映像檔，並設定用戶名、密碼和資料庫名稱(放在 `.env` 檔案中)。
- `volumes`：分別用來保存 n8n 和 PostgreSQL 的資料。
- GENERIC_TIMEZONE 和 TZ 環境變數：設定時區為台北時區。
- 相關設定可以參考 [n8n 官方文件](https://docs.n8n.io/hosting/installation/docker)。

### 3. 創建 `.env` 檔案

在專案目錄中創建一個 `.env` 檔案，用來設定 PostgreSQL 的用戶名、密碼和資料庫名稱。

```bash title=".env"
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_n8n_database
```

### 4. 啟動 n8n 服務

在終端機中執行以下命令，啟動 n8n 和 PostgreSQL 服務：你應該會看到建立的容器正在背景運行。

```bash
docker compose up -d
```

### 5.  打開瀏覽器前往 n8n 頁面

1. 目前我們預設的 n8n 服務埠是 `5678`，所以打開瀏覽器並前往 `http://localhost:5678`，你應該會看到 n8n 的登入設定頁面。
2. 輸入信箱、用戶姓名和密碼，你就可以開始使用 n8n，記得要保存好你的帳號與密碼資訊，由於在地端自架的 n8n 並不會有忘記密碼的功能，如果真的忘記的話，可能要調整資料庫的密碼或者重新建立一個新的資料庫，或需要串接信箱服務來重設密碼，這個待後續再與大家分享。

![n8n 登入頁面](/img/docs/n8n/n8n-login-page.png)

### 6. 關閉 n8n 服務

如果你想關閉 n8n 服務，可以在終端機中執行以下命令：

```bash
docker compose down
```

今天的教學就到這邊，希望這篇文章能幫助你在自己的電腦上部署 n8n，並開始使用這個強大的自動化工具啦！

![n8n Workflow 首頁](/img/docs/n8n/n8n-setup-home.png)