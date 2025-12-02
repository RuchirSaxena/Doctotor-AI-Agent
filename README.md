# Doctor AI Agent - Medical Document Analysis POC

AI-powered medical document analysis system that helps doctors quickly understand patient medical history using Claude AI.

## Features

- 📄 Upload medical documents (PDF, DOCX, TXT)
- 🤖 AI-powered medical summary generation using Claude Sonnet 4.5
- 💊 Dietary and exercise guidance based on medical conditions
- 💬 Interactive chat interface for Q&A about patient history
- 🎨 Modern, responsive UI with Tailwind CSS

## Tech Stack

**Backend:**
- Node.js / Express
- Claude Sonnet 4.5 API (@anthropic-ai/sdk)
- Multer (file uploads)
- pdf-parse, mammoth (document parsing)

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- react-dropzone
- react-markdown

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Claude AI API key (get from https://console.anthropic.com/)

## Installation & Setup

### 1. Clone or navigate to project directory

```bash
cd doctor-ai-agent
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend` directory:

```env
PORT=5000
ANTHROPIC_API_KEY=your-actual-claude-api-key-here
```

**IMPORTANT:** Replace `your-actual-claude-api-key-here` with your real Claude API key!

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

You need TWO terminal windows:

### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

### Terminal 2 - Frontend Server

```bash
cd frontend
npm start
```

Frontend will run on: `http://localhost:3000`

## Usage

1. Open browser to `http://localhost:3000`
2. Upload medical documents (PDF, DOCX, or TXT)
3. Wait for AI analysis to complete
4. Review the generated medical summary
5. Ask questions in the chat interface

### Sample Test Data

Use the provided test files in `backend/test-data/`:
- `sample_patient_history.txt`
- `sample_lab_results.txt`
- `sample_prescription.txt`

## API Endpoints

### Backend API (`http://localhost:5000/api`)

**Health Check:**
- `GET /health` - Server health check

**Upload:**
- `POST /api/upload` - Upload medical documents
- `DELETE /api/upload/:filename` - Delete uploaded file

**Analysis:**
- `POST /api/analysis` - Analyze documents and generate summary
- `GET /api/analysis/:id` - Get cached analysis

**Chat:**
- `POST /api/chat` - Send chat message
- `GET /api/chat/:conversationId` - Get conversation history
- `DELETE /api/chat/:conversationId` - Delete conversation

## Project Structure

```
doctor-ai-agent/
├── backend/
│   ├── routes/
│   │   ├── upload.js       # File upload handling
│   │   ├── analysis.js     # Document analysis
│   │   └── chat.js         # Chat functionality
│   ├── utils/
│   │   ├── documentParser.js   # PDF/DOCX/TXT parsing
│   │   └── claudeService.js    # Claude AI integration
│   ├── uploads/            # Uploaded files (auto-created)
│   ├── test-data/          # Sample medical documents
│   ├── .env                # Environment variables
│   ├── server.js           # Express server
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FileUpload.jsx      # Drag & drop upload
    │   │   ├── MedicalSummary.jsx  # Summary display
    │   │   └── ChatInterface.jsx   # Chat UI
    │   ├── services/
    │   │   └── api.js              # API service layer
    │   ├── App.js                   # Main app component
    │   ├── index.css                # Tailwind CSS
    │   └── index.js
    ├── public/
    │   └── index.html
    ├── tailwind.config.js
    └── package.json
```

## Troubleshooting

### Issue: "Cannot find module '@anthropic-ai/sdk'"
**Solution:** Run `npm install` in the backend directory

### Issue: "CORS error"
**Solution:** Ensure backend is running on port 5000 and CORS is configured in server.js

### Issue: "Claude API returns 401"
**Solution:** Verify your `ANTHROPIC_API_KEY` in backend/.env file

### Issue: "File upload fails"
**Solution:** Check that backend/uploads directory exists

### Issue: "Frontend won't start"
**Solution:** Delete node_modules and package-lock.json, then run `npm install` again

## Important Notes

⚠️ **THIS IS A POC (PROOF OF CONCEPT)**

- Not intended for production use
- No user authentication
- In-memory storage (no database)
- No HIPAA compliance
- No production-grade security
- For demonstration purposes only

## Features Not Included (Out of Scope for POC)

- User authentication
- Database persistence
- Multi-patient management
- HIPAA compliance
- Export to PDF
- EHR system integration
- Advanced security measures

## License

This is a POC project for educational/demonstration purposes.

## Support

For issues or questions, refer to the implementation guide or check the console logs for detailed error messages.
