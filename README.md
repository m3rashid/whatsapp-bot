<div align="center">

# 💬 whatsapp-bot

### General-utility WhatsApp bot built on venom-bot, with MongoDB-backed commands

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

A general-purpose WhatsApp bot built on `venom-bot`. Supports group management, link storage, and a doubt Q&A system with MongoDB persistence and PDF generation.

## 📋 Commands

| Command | Description |
|---|---|
| `/help` | Show help menu |
| `/tagall` | Tag everyone in the group |
| `/addlink <link>` | Save a resource link with metadata |
| `/showlinks` | List saved links |
| `/doubt <question>` | Ask a doubt |
| `/showdoubt <id>` | Show a doubt by id |
| `/alldoubts` | List unanswered doubts |
| `/answer <id> "<answer>"` | Answer a doubt |
| `/answered <id>` | Mark doubt as answered |

## 🏗 Project structure

```
whatsapp-bot/
├── src/          # TypeScript source
├── tsconfig.json
└── nodemon.json
```

## 🛠 Tech stack

`TypeScript` · `venom-bot` · `MongoDB` · `Mongoose` · `pdfkit`

## 📦 Quick start

```bash
git clone https://github.com/m3rashid/whatsapp-bot.git
cd whatsapp-bot
npm install
npm run dev
```

## 📄 License

MIT © [m3rashid](https://github.com/m3rashid)
