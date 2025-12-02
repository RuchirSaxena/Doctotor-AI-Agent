const express = require('express');
const { parseMultipleDocuments, combineDocuments } = require('../utils/documentParser');
const { generateMedicalSummary } = require('../utils/openaiService');

const router = express.Router();

// In-memory storage for analysis results (POC - no database)
const analysisCache = new Map();

/**
 * POST /api/analysis
 * Analyze uploaded medical documents and generate summary
 */
router.post('/', async (req, res) => {
  try {
    const { files } = req.body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({
        error: 'No files provided',
        message: 'Please upload at least one document'
      });
    }

    console.log(`📄 Analyzing ${files.length} document(s)...`);

    // Parse all documents
    const parsedDocuments = await parseMultipleDocuments(files);

    // Check if any documents were successfully parsed
    const successfullyParsed = parsedDocuments.filter(doc => doc.hasContent);

    if (successfullyParsed.length === 0) {
      return res.status(400).json({
        error: 'No content extracted',
        message: 'Could not extract text from any of the uploaded documents',
        parsedDocuments: parsedDocuments
      });
    }

    // Combine documents into single context
    const documentsContext = combineDocuments(parsedDocuments);

    console.log('🤖 Generating medical summary with ChatGPT...');

    // Generate medical summary using ChatGPT
    const summary = await generateMedicalSummary(documentsContext);

    // Create analysis result
    const analysisId = Date.now().toString();
    const analysis = {
      id: analysisId,
      timestamp: new Date().toISOString(),
      filesAnalyzed: files.length,
      successfullyParsed: successfullyParsed.length,
      summary: summary,
      parsedDocuments: parsedDocuments.map(doc => ({
        filename: doc.filename,
        hasContent: doc.hasContent,
        error: doc.error
      })),
      documentsContext: documentsContext // Store for chat context
    };

    // Cache the analysis
    analysisCache.set(analysisId, analysis);

    console.log(`✅ Analysis completed - ID: ${analysisId}`);

    // Return analysis (without full documentsContext to reduce response size)
    const response = { ...analysis };
    delete response.documentsContext; // Don't send full context in response

    res.status(200).json(response);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
});

/**
 * GET /api/analysis/:id
 * Retrieve cached analysis by ID
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const analysis = analysisCache.get(id);

    if (!analysis) {
      return res.status(404).json({
        error: 'Analysis not found',
        message: `No analysis found with ID: ${id}`
      });
    }

    // Return analysis without full documentsContext
    const response = { ...analysis };
    delete response.documentsContext;

    res.status(200).json(response);
  } catch (error) {
    console.error('Retrieval error:', error);
    res.status(500).json({
      error: 'Failed to retrieve analysis',
      message: error.message
    });
  }
});

/**
 * GET /api/analysis/:id/context
 * Get document context for chat (internal use)
 */
router.get('/:id/context', (req, res) => {
  try {
    const { id } = req.params;
    const analysis = analysisCache.get(id);

    if (!analysis) {
      return res.status(404).json({
        error: 'Analysis not found',
        message: `No analysis found with ID: ${id}`
      });
    }

    res.status(200).json({
      context: analysis.documentsContext,
      summary: analysis.summary
    });
  } catch (error) {
    console.error('Context retrieval error:', error);
    res.status(500).json({
      error: 'Failed to retrieve context',
      message: error.message
    });
  }
});

/**
 * DELETE /api/analysis/:id
 * Delete cached analysis
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (analysisCache.has(id)) {
      analysisCache.delete(id);
      res.status(200).json({
        message: 'Analysis deleted successfully',
        id: id
      });
    } else {
      res.status(404).json({
        error: 'Analysis not found',
        message: `No analysis found with ID: ${id}`
      });
    }
  } catch (error) {
    console.error('Deletion error:', error);
    res.status(500).json({
      error: 'Failed to delete analysis',
      message: error.message
    });
  }
});

module.exports = router;
