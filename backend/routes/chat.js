const express = require('express');
const { chatWithContext } = require('../utils/openaiService');

const router = express.Router();

// In-memory storage for conversation histories (POC - no database)
const conversationCache = new Map();

/**
 * POST /api/chat
 * Send a message and get AI response with medical context
 */
router.post('/', async (req, res) => {
  try {
    const { message, analysisId, medicalContext, conversationId } = req.body;

    // Validate required fields
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Message is required',
        message: 'Please provide a message'
      });
    }

    if (!medicalContext || medicalContext.trim().length === 0) {
      return res.status(400).json({
        error: 'Medical context is required',
        message: 'Please provide medical context from the analysis'
      });
    }

    // Get or create conversation history
    const convId = conversationId || Date.now().toString();
    let conversationHistory = conversationCache.get(convId) || [];

    console.log(`💬 Processing chat message for conversation: ${convId}`);

    // Get response from ChatGPT with context
    const response = await chatWithContext(
      message,
      medicalContext,
      conversationHistory
    );

    // Update conversation history
    conversationHistory.push({
      userMessage: message,
      assistantResponse: response,
      timestamp: new Date().toISOString()
    });

    // Cache updated conversation
    conversationCache.set(convId, conversationHistory);

    console.log(`✅ Chat response generated - Conversation: ${convId}`);

    res.status(200).json({
      conversationId: convId,
      response: response,
      timestamp: new Date().toISOString(),
      messageCount: conversationHistory.length
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Chat failed',
      message: error.message
    });
  }
});

/**
 * GET /api/chat/:conversationId
 * Retrieve conversation history
 */
router.get('/:conversationId', (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversationHistory = conversationCache.get(conversationId);

    if (!conversationHistory) {
      return res.status(404).json({
        error: 'Conversation not found',
        message: `No conversation found with ID: ${conversationId}`
      });
    }

    res.status(200).json({
      conversationId: conversationId,
      history: conversationHistory,
      messageCount: conversationHistory.length
    });
  } catch (error) {
    console.error('Retrieval error:', error);
    res.status(500).json({
      error: 'Failed to retrieve conversation',
      message: error.message
    });
  }
});

/**
 * DELETE /api/chat/:conversationId
 * Delete conversation history
 */
router.delete('/:conversationId', (req, res) => {
  try {
    const { conversationId } = req.params;

    if (conversationCache.has(conversationId)) {
      conversationCache.delete(conversationId);
      res.status(200).json({
        message: 'Conversation deleted successfully',
        conversationId: conversationId
      });
    } else {
      res.status(404).json({
        error: 'Conversation not found',
        message: `No conversation found with ID: ${conversationId}`
      });
    }
  } catch (error) {
    console.error('Deletion error:', error);
    res.status(500).json({
      error: 'Failed to delete conversation',
      message: error.message
    });
  }
});

/**
 * DELETE /api/chat
 * Clear all conversations
 */
router.delete('/', (req, res) => {
  try {
    const count = conversationCache.size;
    conversationCache.clear();

    res.status(200).json({
      message: 'All conversations cleared',
      count: count
    });
  } catch (error) {
    console.error('Clear error:', error);
    res.status(500).json({
      error: 'Failed to clear conversations',
      message: error.message
    });
  }
});

module.exports = router;
