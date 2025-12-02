# OpenAI (ChatGPT) Setup Guide

This project has been configured to use **OpenAI's ChatGPT API** instead of Claude AI.

---

## 🔑 Getting Your OpenAI API Key

### Step 1: Go to OpenAI Platform
Visit: **https://platform.openai.com/**

### Step 2: Sign Up or Log In
- If you don't have an account, click **"Sign Up"**
- If you already have an account, click **"Log In"**
- You can use your existing ChatGPT account credentials

### Step 3: Navigate to API Keys
1. Click on your **profile icon** (top right)
2. Select **"View API Keys"** or go directly to: https://platform.openai.com/api-keys
3. You'll see a page titled "API Keys"

### Step 4: Create a New API Key
1. Click **"+ Create new secret key"** button
2. Give it a name (e.g., "Doctor AI Agent")
3. Click **"Create secret key"**

### Step 5: Copy Your API Key
- The key will look like: `sk-proj-xxxxxxxxxxxxx...` or `sk-xxxxxxxxxxxxx...`
- **IMPORTANT:** Copy it immediately! You won't be able to see it again
- Store it securely

### Step 6: Add to Your Project
Paste it into your `backend/.env` file:

```env
PORT=5000
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

---

## 💰 Pricing Information

### Free Tier
- New accounts get **$5 in free credits** (as of 2024)
- Valid for **3 months** from account creation

### Pay-as-you-go Pricing (GPT-4 Turbo)
- **Input:** ~$10 per 1M tokens
- **Output:** ~$30 per 1M tokens
- **Cost for this POC:** Approximately $0.20-$0.80 per full test session

### Pay-as-you-go Pricing (GPT-3.5 Turbo - Cheaper Option)
- **Input:** ~$0.50 per 1M tokens
- **Output:** ~$1.50 per 1M tokens
- **Cost for this POC:** Approximately $0.05-$0.20 per full test session

Check current pricing at: **https://openai.com/pricing**

---

## ⚙️ Model Configuration

The project is configured to use **GPT-4 Turbo** by default for best medical analysis quality.

To change the model, edit `backend/utils/openaiService.js`:

```javascript
// Current setting (GPT-4 Turbo - Best Quality)
const MODEL = 'gpt-4-turbo-preview';

// Alternative options:
// const MODEL = 'gpt-4';              // Standard GPT-4
// const MODEL = 'gpt-3.5-turbo';      // Cheaper, faster, less accurate
```

### Model Recommendations

**For POC/Testing:**
- ✅ `gpt-3.5-turbo` - Cheaper, good enough for testing
- Cost: ~$0.05-$0.20 per test session

**For Production/Best Results:**
- ✅ `gpt-4-turbo-preview` - Best quality medical analysis
- Cost: ~$0.20-$0.80 per test session

---

## 🔒 Security Tips

1. ✅ **Never commit** your API key to Git (it's in `.gitignore`)
2. ✅ **Never share** your API key publicly
3. ✅ **Regenerate** the key if accidentally exposed
4. ✅ **Set usage limits** in OpenAI dashboard to avoid unexpected charges
5. ✅ **Monitor usage** regularly at https://platform.openai.com/usage

---

## 🚀 Quick Start After Getting API Key

### 1. Add API Key to .env
```bash
cd backend
# Edit .env file and add your key
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Backend
```bash
npm run dev
```

You should see:
```
🏥 Doctor AI Agent Backend running on port 5000
📍 Health check: http://localhost:5000/health
🔑 OpenAI API Key configured: ✓
```

---

## ⚠️ Common Issues

### Issue: "Incorrect API key provided"
**Solution:**
- Verify your API key starts with `sk-`
- Check there are no extra spaces in the `.env` file
- Make sure you copied the entire key

### Issue: "You exceeded your current quota"
**Solution:**
- Check your OpenAI account has credits or billing enabled
- Go to https://platform.openai.com/account/billing
- Add payment method or check your free credit balance

### Issue: "Rate limit reached"
**Solution:**
- You're making too many requests too quickly
- Wait a few seconds between requests
- Check your rate limits in OpenAI dashboard

### Issue: "Model not found"
**Solution:**
- Your account may not have access to GPT-4
- Change model to `gpt-3.5-turbo` in `openaiService.js`
- GPT-3.5 is available to all accounts

---

## 📊 Usage Monitoring

Monitor your API usage:
1. Go to https://platform.openai.com/usage
2. View daily usage and costs
3. Set up usage alerts

---

## 🔄 Switching Models

To use the cheaper GPT-3.5 Turbo model:

1. Open `backend/utils/openaiService.js`
2. Change line 7:
```javascript
const MODEL = 'gpt-3.5-turbo';  // Instead of 'gpt-4-turbo-preview'
```
3. Restart the backend server

---

## ✅ Verification Checklist

- [ ] Created OpenAI account
- [ ] Generated API key
- [ ] Added key to `backend/.env`
- [ ] Installed dependencies (`npm install` in backend)
- [ ] Started backend server
- [ ] Saw "OpenAI API Key configured: ✓" message
- [ ] Ready to test!

---

## 📝 Differences from Claude AI

### Similarities:
- Both provide high-quality medical analysis
- Both support conversation context
- Both use similar API patterns

### Key Differences:

| Feature | OpenAI (ChatGPT) | Claude AI |
|---------|------------------|-----------|
| Free tier | $5 credits (3 months) | Initial credits |
| Context window | 128k tokens (GPT-4 Turbo) | 200k tokens |
| Pricing | $10/$30 per 1M tokens | $3/$15 per 1M tokens |
| Model used | GPT-4 Turbo | Claude Sonnet 4.5 |
| API structure | Chat completions | Messages API |

Both work excellently for this medical document analysis POC!

---

## 🎯 Next Steps

Once you have your API key configured:

1. Follow [QUICK_START.md](QUICK_START.md) to run the application
2. Test with sample documents from `backend/test-data/`
3. Verify medical summaries are generated
4. Test the chat interface

---

**You're all set! Start the application and test your Doctor AI Agent with OpenAI! 🏥🤖**
