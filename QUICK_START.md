# Quick Start - Doctor AI Agent (OpenAI Version)

## 🔑 Get Your OpenAI API Key First!

Visit: **https://platform.openai.com/api-keys**
- Sign up or log in
- Create a new secret key
- Copy it (starts with `sk-`)

📖 **Detailed guide:** See [OPENAI_SETUP_GUIDE.md](OPENAI_SETUP_GUIDE.md)

---

## 1️⃣ Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## 2️⃣ Configure API Key

Edit `backend/.env`:
```env
PORT=5000
OPENAI_API_KEY=sk-your-actual-openai-key-here
```

## 3️⃣ Start Servers

**Terminal 1:**
```bash
cd backend
npm run dev
```

You should see:
```
🔑 OpenAI API Key configured: ✓
```

**Terminal 2:**
```bash
cd frontend
npm start
```

## 4️⃣ Test

1. Open `http://localhost:3000`
2. Upload files from `backend/test-data/`
3. Review ChatGPT-generated summary
4. Ask questions in chat

---

## Model Options

Default: **GPT-4 Turbo** (best quality, ~$0.20-$0.80 per test)

Want cheaper? Edit `backend/utils/openaiService.js` line 7:
```javascript
const MODEL = 'gpt-3.5-turbo';  // ~$0.05-$0.20 per test
```

---

## Troubleshooting

**Port in use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**API Key error:**
- Check `.env` file
- No spaces around the key
- Verify key starts with `sk-`
- Restart backend server

**"You exceeded your current quota":**
- Go to https://platform.openai.com/account/billing
- Add payment method or check free credits

**"Model not found" (GPT-4):**
- Your account may not have GPT-4 access
- Change to `gpt-3.5-turbo` in `openaiService.js`

---

That's it! See [OPENAI_SETUP_GUIDE.md](OPENAI_SETUP_GUIDE.md) for detailed instructions.
