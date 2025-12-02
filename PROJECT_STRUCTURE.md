# Doctor AI Agent - Complete Project Structure

```
doctor-ai-agent/
│
├── 📄 README.md                                    # Project overview
├── 📄 SETUP_INSTRUCTIONS.md                        # Detailed setup guide
├── 📄 IMPLEMENTATION_COMPLETE.md                   # Implementation status
├── 📄 QUICK_START.md                               # Quick reference
├── 📄 CLAUDE_CODE_QUICK_START_GUIDE_Doc_Agent.md  # Original spec
├── 📄 .gitignore                                   # Git ignore rules
│
├── 📁 backend/                                     # Node.js Backend
│   ├── 📄 package.json                             # Dependencies & scripts
│   ├── 📄 .env                                     # Environment variables (API key)
│   ├── 📄 server.js                                # Express server entry point
│   │
│   ├── 📁 routes/                                  # API Routes
│   │   ├── 📄 upload.js                            # File upload endpoints
│   │   ├── 📄 analysis.js                          # Document analysis endpoints
│   │   └── 📄 chat.js                              # Chat endpoints
│   │
│   ├── 📁 utils/                                   # Utilities
│   │   ├── 📄 documentParser.js                    # Parse PDF/DOCX/TXT
│   │   └── 📄 claudeService.js                     # Claude AI integration
│   │
│   ├── 📁 uploads/                                 # Uploaded files storage
│   │   └── 📄 .gitkeep                             # Keep directory in git
│   │
│   └── 📁 test-data/                               # Sample medical documents
│       ├── 📄 sample_patient_history.txt           # Patient history
│       ├── 📄 sample_lab_results.txt               # Lab results
│       └── 📄 sample_prescription.txt              # Prescriptions
│
└── 📁 frontend/                                    # React Frontend
    ├── 📄 package.json                             # Dependencies & scripts
    ├── 📄 tailwind.config.js                       # Tailwind CSS config
    ├── 📄 postcss.config.js                        # PostCSS config
    │
    ├── 📁 public/                                  # Static files
    │   └── 📄 index.html                           # HTML template
    │
    └── 📁 src/                                     # Source code
        ├── 📄 index.js                             # React entry point
        ├── 📄 index.css                            # Tailwind CSS imports
        ├── 📄 App.js                               # Main application component
        │
        ├── 📁 components/                          # React Components
        │   ├── 📄 FileUpload.jsx                   # File upload UI (drag & drop)
        │   ├── 📄 MedicalSummary.jsx               # Display AI summary
        │   └── 📄 ChatInterface.jsx                # Interactive chat UI
        │
        └── 📁 services/                            # API Services
            └── 📄 api.js                           # Axios API calls
```

## File Count Summary

- **Total Files:** 29
- **Backend Files:** 12
- **Frontend Files:** 10
- **Documentation:** 5
- **Configuration:** 2

## Key Technologies

### Backend Stack
```
├── Express.js          # Web framework
├── Multer             # File upload handling
├── pdf-parse          # PDF parsing
├── mammoth            # DOCX parsing
├── @anthropic-ai/sdk  # Claude AI integration
├── dotenv             # Environment variables
├── cors               # Cross-origin requests
└── nodemon            # Development auto-reload
```

### Frontend Stack
```
├── React 18           # UI library
├── Tailwind CSS       # Utility-first CSS
├── Axios              # HTTP client
├── react-dropzone     # Drag & drop files
├── react-markdown     # Markdown rendering
└── react-icons        # Icon library
```

## Directory Purposes

| Directory | Purpose |
|-----------|---------|
| `backend/routes/` | API endpoint definitions |
| `backend/utils/` | Helper functions and services |
| `backend/uploads/` | Temporary file storage |
| `backend/test-data/` | Sample medical documents |
| `frontend/src/components/` | React UI components |
| `frontend/src/services/` | API integration layer |
| `frontend/public/` | Static assets |

## Critical Files

### Must Configure
- ✅ `backend/.env` - **Add your Claude API key here!**

### Main Entry Points
- ✅ `backend/server.js` - Backend server
- ✅ `frontend/src/index.js` - Frontend app
- ✅ `frontend/src/App.js` - Main React component

### Core Logic
- ✅ `backend/utils/claudeService.js` - AI integration
- ✅ `backend/utils/documentParser.js` - Document processing
- ✅ `frontend/src/components/ChatInterface.jsx` - Chat UI

## Next Steps

1. **Read:** `QUICK_START.md` for immediate setup
2. **Configure:** Add API key to `backend/.env`
3. **Install:** Run `npm install` in both directories
4. **Start:** Run both backend and frontend servers
5. **Test:** Upload files from `backend/test-data/`

---

*Project generated following specifications in CLAUDE_CODE_QUICK_START_GUIDE_Doc_Agent.md*
