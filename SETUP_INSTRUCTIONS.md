# Doctor AI Agent - Complete Setup Instructions

## Quick Start Guide

Follow these steps to get the Doctor AI Agent running on your machine.

---

## Step 1: Verify Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- ✅ **npm** (comes with Node.js)
- ✅ **Claude AI API Key** - [Get it here](https://console.anthropic.com/)

Check your Node.js version:
```bash
node --version
```

Check your npm version:
```bash
npm --version
```

---

## Step 2: Configure Backend

### 2.1 Install Backend Dependencies

Open a terminal and navigate to the backend folder:

```bash
cd backend
npm install
```

This will install:
- express
- cors
- multer
- pdf-parse
- mammoth
- dotenv
- @anthropic-ai/sdk
- body-parser
- nodemon

### 2.2 Configure Environment Variables

**IMPORTANT:** Open the `backend/.env` file and add your Claude API key:

```env
PORT=5000
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-api-key-here
```

Replace `sk-ant-api03-your-actual-api-key-here` with your real Claude API key from Anthropic.

---

## Step 3: Configure Frontend

### 3.1 Install Frontend Dependencies

Open a **NEW terminal** and navigate to the frontend folder:

```bash
cd frontend
npm install
```

This will install:
- react & react-dom
- axios
- react-dropzone
- react-markdown
- react-icons
- tailwindcss & dependencies

**Note:** This may take 2-3 minutes.

---

## Step 4: Start the Application

You need **TWO terminal windows** running simultaneously:

### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
🏥 Doctor AI Agent Backend running on port 5000
📍 Health check: http://localhost:5000/health
🔑 Claude API Key configured: ✓
```

**Keep this terminal running!**

### Terminal 2 - Start Frontend Server

```bash
cd frontend
npm start
```

The browser should automatically open to `http://localhost:3000`

**Keep this terminal running too!**

---

## Step 5: Test the Application

### 5.1 Upload Test Documents

1. Open `http://localhost:3000` in your browser
2. Click the upload area or drag & drop files
3. Navigate to `backend/test-data/` and select all 3 sample files:
   - `sample_patient_history.txt`
   - `sample_lab_results.txt`
   - `sample_prescription.txt`
4. Click "Upload & Analyze Documents"

### 5.2 Review Medical Summary

Wait 10-20 seconds for Claude AI to analyze the documents. You should see:
- Patient Medical Summary
- Clinical Notes
- Care Guidance (Diet, Exercise, Lifestyle)

### 5.3 Test Chat Interface

Ask questions like:
- "What medications is the patient taking?"
- "What are the key health concerns?"
- "What dietary changes would you recommend?"
- "What was the patient's last HbA1c level?"
- "What are the cardiovascular risk factors?"

### 5.4 Test New Analysis

Click "New Analysis" button to reset and upload different documents.

---

## Verification Checklist

✅ Backend server running on port 5000
✅ Frontend server running on port 3000
✅ Claude API key configured correctly
✅ Documents upload successfully
✅ Medical summary generates without errors
✅ Chat interface responds to questions
✅ "New Analysis" button works

---

## Common Issues & Solutions

### Issue 1: Backend won't start

**Error:** `Cannot find module '@anthropic-ai/sdk'`

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: "Invalid API Key" error

**Error:** `Claude API returns 401 Unauthorized`

**Solution:**
1. Check your `.env` file in backend folder
2. Verify your API key is correct (starts with `sk-ant-`)
3. Ensure there are no extra spaces or quotes around the key
4. Restart the backend server after changing .env

### Issue 3: Frontend won't start

**Error:** `Module not found` or build errors

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue 4: CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend is running on port 5000
- Check that CORS is enabled in `backend/server.js`
- Clear browser cache and reload

### Issue 5: File upload fails

**Error:** `File upload failed` or `multer error`

**Solution:**
- Check that `backend/uploads/` directory exists
- Verify file is PDF, DOCX, or TXT format
- Ensure file size is under 10MB

### Issue 6: Port already in use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:5000 | xargs kill
```

Or change the port in `backend/.env`:
```env
PORT=5001
```

And update `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5001/api';
```

---

## Development Tips

### Hot Reload

Both servers support hot reload:
- Backend uses `nodemon` - automatically restarts on file changes
- Frontend uses `react-scripts` - automatically reloads browser

### Viewing Logs

**Backend logs:** Check Terminal 1 for:
- File upload status
- Document parsing progress
- Claude API calls
- Error messages

**Frontend logs:** Check Browser Console (F12) for:
- API call status
- Component errors
- Network requests

### Testing with Different Documents

Create your own test files in `backend/test-data/`:
- Use `.txt` files for quick testing
- Ensure medical content is realistic
- Include patient demographics, conditions, medications

---

## Next Steps

Once everything is working:

1. ✅ Explore the chat interface with different questions
2. ✅ Test with your own medical documents (use dummy data only!)
3. ✅ Review the code structure in both backend and frontend
4. ✅ Experiment with modifying the AI prompts in `backend/utils/claudeService.js`
5. ✅ Customize the UI styling in the React components

---

## Production Deployment (NOT READY)

**⚠️ WARNING:** This is a POC and NOT production-ready!

Missing features for production:
- User authentication & authorization
- Database (currently in-memory)
- HIPAA compliance
- Data encryption
- Audit logging
- Rate limiting
- Error monitoring
- Backup systems
- Security hardening

**DO NOT use with real patient data!**

---

## Support & Documentation

- **README.md** - Project overview
- **CLAUDE_CODE_QUICK_START_GUIDE_Doc_Agent.md** - Original implementation guide
- **Backend API Docs** - Check `/health` endpoint for server status

For questions or issues:
1. Check the console logs (backend terminal & browser console)
2. Review error messages carefully
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

---

## Summary

You should now have:
- ✅ Backend running on `http://localhost:5000`
- ✅ Frontend running on `http://localhost:3000`
- ✅ Ability to upload and analyze medical documents
- ✅ AI-generated medical summaries
- ✅ Interactive chat with Claude AI

**Enjoy exploring the Doctor AI Agent! 🏥**
