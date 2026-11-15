# whatsapp-bot

General-utility WhatsApp bot built on venom-bot, with MongoDB-backed commands.

## Commands

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

## Tech

TypeScript · venom-bot · MongoDB · Mongoose · pdfkit

## Quick start

```bash
git clone https://github.com/m3rashid/whatsapp-bot.git
cd whatsapp-bot
npm install
npm run dev
```

## License

MIT
