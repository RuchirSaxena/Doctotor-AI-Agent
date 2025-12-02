# QUICK START GUIDE FOR CLAUDE CODE
## Doctor AI Agent POC - Implementation Instructions

---

## CONTEXT FOR CLAUDE CODE

You are implementing a Doctor AI Agent POC system that:
1. Accepts medical document uploads (PDF, DOCX, TXT)
2. Uses Claude AI to analyze and summarize patient medical history
3. Provides dietary and exercise guidance based on medical conditions
4. Offers an interactive chat interface for doctor Q&A

**Tech Stack**: React.js frontend, Node.js/Express backend, Claude Sonnet 4.5 API

---

## STEP-BY-STEP IMPLEMENTATION

### PHASE 1: Project Setup

**Task 1.1**: Create project structure
```bash
mkdir doctor-ai-agent
cd doctor-ai-agent
mkdir -p backend/uploads backend/routes backend/utils
mkdir -p frontend
```

**Task 1.2**: Initialize backend
```bash
cd backend
npm init -y
npm install express cors multer pdf-parse mammoth dotenv @anthropic-ai/sdk body-parser nodemon
```

**Task 1.3**: Initialize frontend (React with Tailwind)
```bash
cd ../frontend
npx create-react-app .
npm install axios react-dropzone react-markdown react-icons tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

### PHASE 2: Backend Implementation

**Task 2.1**: Create `backend/.env` file
```env
PORT=5000
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Task 2.2**: Create `backend/server.js`
- Set up Express server
- Configure CORS and body-parser
- Import and use routes: upload, analysis, chat
- Add health check endpoint
- Add error handling middleware
- Listen on PORT 5000

**Task 2.3**: Create `backend/routes/upload.js`
- Configure multer with disk storage
- Set destination to `./uploads` folder
- Implement file filter for PDF, DOCX, TXT only
- Set 10MB file size limit
- Create POST route for multiple file uploads
- Create DELETE route for file cleanup
- Return file metadata on successful upload

**Task 2.4**: Create `backend/utils/documentParser.js`
- Implement `parsePDF()` using pdf-parse
- Implement `parseDOCX()` using mammoth
- Implement `parseTXT()` using fs.readFileSync
- Implement `parseMultipleDocuments()` to process array of files
- Handle errors gracefully for each document
- Return array of parsed documents with content and metadata

**Task 2.5**: Create `backend/utils/claudeService.js`
- Initialize Anthropic client with API key from env
- Implement `generateMedicalSummary(documents)`:
  - Combine all document contents into context
  - Create prompt requesting: Medical Summary, Clinical Notes, Care Guidance
  - Use Claude Sonnet 4.5 model
  - Set max_tokens to 2000
  - Return formatted text response
- Implement `chatWithContext(userMessage, medicalContext, conversationHistory)`:
  - Build conversation with system prompt including medical context
  - Append conversation history
  - Add user message
  - Call Claude API
  - Return assistant response

**Task 2.6**: Create `backend/routes/analysis.js`
- Create POST route accepting files array
- Parse all documents using documentParser
- Generate medical summary using claudeService
- Create analysis result with unique ID
- Cache result in Map (in-memory for POC)
- Return analysis with summary and metadata
- Add GET route to retrieve cached analysis by ID

**Task 2.7**: Create `backend/routes/chat.js`
- Create POST route accepting: message, analysisId, medicalContext, conversationId
- Validate required fields
- Get or create conversation history from Map
- Call chatWithContext from claudeService
- Update conversation history
- Return response with conversationId
- Add GET route to retrieve conversation history
- Add DELETE route to clear conversations

**Task 2.8**: Update `backend/package.json`
Add scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

### PHASE 3: Frontend Implementation

**Task 3.1**: Configure Tailwind in `frontend/tailwind.config.js`
- Add content paths for src files
- Extend theme with medical color palette:
  - primary: #2563eb
  - secondary: #3b82f6
  - accent: #60a5fa
  - success: #10b981

**Task 3.2**: Update `frontend/src/index.css`
- Import Tailwind directives (@tailwind base, components, utilities)

**Task 3.3**: Create `frontend/src/services/api.js`
- Set API_BASE_URL to http://localhost:5000/api
- Create axios instance
- Implement `uploadFiles(files)` - multipart/form-data POST
- Implement `analyzeDocuments(files)` - POST to /analysis
- Implement `sendChatMessage(message, analysisId, medicalContext, conversationId)` - POST to /chat
- Implement `deleteFile(filename)` - DELETE to /upload/:filename

**Task 3.4**: Create `frontend/src/components/FileUpload.jsx`
- Use react-dropzone for drag & drop
- Accept PDF, DOCX, TXT files only
- 10MB max file size
- Show list of selected files with name and size
- Allow removing individual files
- "Upload & Analyze Documents" button
- Disable interactions when analyzing
- Call onFilesUploaded callback with file array
- Use Tailwind for styling with medical color theme

**Task 3.5**: Create `frontend/src/components/MedicalSummary.jsx`
- Accept analysis prop
- Display header with checkmark icon and timestamp
- Show files analyzed count
- Display any parsing errors in yellow warning box
- Render summary using ReactMarkdown
- Use prose styling for formatted content
- Apply medical color theme

**Task 3.6**: Create `frontend/src/components/ChatInterface.jsx`
- Accept analysisId, medicalContext, isEnabled props
- Maintain messages state array
- Implement handleSendMessage function:
  - Add user message to state
  - Call API with message and context
  - Add assistant response to state
  - Maintain conversationId
- Show message history with different styling for user/assistant
- User messages: blue background, right-aligned
- Assistant messages: gray background, left-aligned, markdown rendered
- Show loading indicator (animated dots)
- Auto-scroll to bottom on new messages
- Input textarea with Send button
- Support Enter key to send (Shift+Enter for new line)
- Disable when not enabled or loading

**Task 3.7**: Create `frontend/src/App.js`
- Import all components and API service
- Maintain state: isAnalyzing, analysis, error
- Implement handleFilesUploaded:
  - Upload files via API
  - Analyze documents via API
  - Update analysis state
  - Handle errors
- Implement handleReset to clear analysis
- Render header with app title and New Analysis button
- Render FileUpload when no analysis
- Render MedicalSummary and ChatInterface when analysis exists
- Show error messages if any
- Apply gradient background and medical theme
- Add footer with disclaimer

**Task 3.8**: Install react-icons
```bash
npm install react-icons
```

---

### PHASE 4: Testing

**Task 4.1**: Create sample medical documents in `backend/test-data/`
- Create sample_patient_history.pdf with patient demographics and conditions
- Create sample_lab_results.txt with test results
- Create sample_prescription.txt with medication list

**Task 4.2**: Start the application
Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm start
```

**Task 4.3**: Test workflow:
1. Upload sample medical documents
2. Verify documents are parsed correctly
3. Check medical summary is generated and formatted
4. Test chat interface with questions like:
   - "What medications is the patient taking?"
   - "What are the key health concerns?"
   - "What dietary changes would you recommend?"
5. Verify conversation context is maintained
6. Test error handling with invalid files
7. Test New Analysis button

---

## KEY IMPLEMENTATION NOTES

### For Backend:
- Use in-memory storage (Map) for POC - no database needed
- Keep error handling simple but informative
- Log errors to console for debugging
- File uploads go to backend/uploads directory
- Clean separation: routes → utils → services

### For Frontend:
- Use functional components with React Hooks
- Tailwind CSS for all styling - no custom CSS files
- Keep components focused and reusable
- API calls through centralized service
- Error states should be user-friendly

### For Claude API Integration:
- Always use claude-sonnet-4-20250514 model
- Medical summary: max_tokens 2000
- Chat responses: max_tokens 1500
- Include full conversation history in chat calls
- Medical context passed in system prompt

### File Structure Expected:
```
doctor-ai-agent/
├── backend/
│   ├── routes/
│   │   ├── upload.js
│   │   ├── analysis.js
│   │   └── chat.js
│   ├── utils/
│   │   ├── documentParser.js
│   │   └── claudeService.js
│   ├── uploads/         (created automatically)
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FileUpload.jsx
    │   │   ├── MedicalSummary.jsx
    │   │   └── ChatInterface.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── tailwind.config.js
    └── package.json
```

---

## PROMPTS FOR CLAUDE AI (used in claudeService.js)

### Medical Summary Prompt Template:
```
You are a medical AI assistant helping doctors quickly understand a patient's medical history.

You have been provided with the following patient medical documents:

[DOCUMENT_CONTEXT]

Please analyze these documents and provide:

1. **Patient Medical Summary** (concise, 200-300 words):
   - Key medical conditions and diagnoses
   - Chronic illnesses or ongoing treatments
   - Significant past medical events
   - Current medications (if mentioned)
   - Allergies (if mentioned)
   - Recent test results or vital signs

2. **Important Clinical Notes**:
   - Critical information requiring immediate attention
   - Trends or patterns in health status
   - Risk factors

3. **Basic Care Guidance**:
   - **Dietary Recommendations**: Based on conditions identified
   - **Exercise Guidance**: Appropriate activity levels
   - **Lifestyle Modifications**: General wellness advice

Format the response in clear sections with markdown.
```

### Chat System Prompt Template:
```
You are a knowledgeable medical AI assistant. You have access to the patient's medical history and previous analysis.

PATIENT MEDICAL CONTEXT:
[MEDICAL_CONTEXT]

Your role:
- Answer questions about the patient's medical history
- Provide clarifications on the medical summary
- Offer additional care guidance when asked
- Maintain professional medical standards

Keep responses concise but informative. Use the medical context to provide specific, relevant answers.
```

---

## TROUBLESHOOTING GUIDE

### Common Issues:

**Issue**: "Cannot find module '@anthropic-ai/sdk'"
**Solution**: Run `npm install @anthropic-ai/sdk` in backend directory

**Issue**: "CORS error when calling API"
**Solution**: Ensure cors() middleware is properly configured in server.js

**Issue**: "File upload fails"
**Solution**: Check uploads directory exists, verify multer configuration

**Issue**: "Claude API returns 401"
**Solution**: Verify ANTHROPIC_API_KEY is correctly set in .env file

**Issue**: "PDF parsing returns empty text"
**Solution**: Some PDFs are images - may need OCR, for POC use text-based PDFs

**Issue**: "Chat doesn't maintain context"
**Solution**: Ensure conversation history is passed in each chat API call

---

## EXPECTED OUTPUTS

### After Upload:
```json
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "filename": "1234567890-patient_history.pdf",
      "originalName": "patient_history.pdf",
      "size": 125000,
      "mimetype": "application/pdf",
      "path": "/path/to/uploads/..."
    }
  ]
}
```

### After Analysis:
```json
{
  "id": "1234567890",
  "timestamp": "2025-11-24T10:30:00.000Z",
  "filesAnalyzed": 3,
  "summary": "# Patient Medical Summary\n\n45-year-old male...",
  "parsedDocuments": [
    {
      "filename": "patient_history.pdf",
      "hasContent": true,
      "error": null
    }
  ]
}
```

### After Chat:
```json
{
  "conversationId": "1234567890",
  "response": "Based on the medical records, the patient is currently on...",
  "timestamp": "2025-11-24T10:35:00.000Z"
}
```

---

## SUCCESS CRITERIA

The implementation is complete when:

✅ Files can be uploaded via drag & drop or file picker
✅ Multiple file types (PDF, DOCX, TXT) are accepted
✅ Documents are parsed and text is extracted
✅ Claude AI generates comprehensive medical summary
✅ Summary includes: conditions, medications, clinical notes, care guidance
✅ Summary displays with proper markdown formatting
✅ Chat interface is functional and maintains conversation
✅ Chat provides relevant answers based on medical context
✅ UI is clean, professional, and responsive
✅ Error handling provides helpful feedback
✅ New Analysis button resets the application

---

## ADDITIONAL CONTEXT

**Purpose**: This is a proof-of-concept to demonstrate AI-assisted medical documentation analysis. It's designed to help doctors quickly understand patient history.

**Target Users**: Healthcare providers (doctors, nurses) who need quick patient history summaries.

**Key Differentiator**: Uses Claude AI for intelligent, context-aware medical analysis rather than simple text extraction.

**Limitations (Acknowledged for POC)**:
- In-memory storage (no persistence)
- No user authentication
- No database
- No HIPAA compliance measures
- No production-grade security
- Single-patient focus

**Future Enhancements** (not in scope for POC):
- Multi-patient management
- Database integration
- User authentication
- Export to PDF
- Integration with EHR systems
- HIPAA compliance
- Advanced security measures

---

## READY TO START?

All necessary details are provided above. Begin with Phase 1 (Project Setup) and proceed sequentially through Phase 4 (Testing).

The implementation should take approximately 2-3 hours for an experienced developer or AI coding assistant.

Good luck with the implementation! 🏥
