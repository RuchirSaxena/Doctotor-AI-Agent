const Anthropic = require('@anthropic-ai/sdk');

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const MODEL = 'claude-sonnet-4-20250514';

/**
 * Generate medical summary from parsed documents
 */
async function generateMedicalSummary(documentsContext) {
  try {
    const prompt = `You are a medical AI assistant helping doctors quickly understand a patient's medical history.

You have been provided with the following patient medical documents:

${documentsContext}

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

Format the response in clear sections with markdown.`;

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Claude API error (generateMedicalSummary):', error);
    throw new Error(`Failed to generate medical summary: ${error.message}`);
  }
}

/**
 * Chat with context - Interactive Q&A about patient medical history
 */
async function chatWithContext(userMessage, medicalContext, conversationHistory = []) {
  try {
    const systemPrompt = `You are a knowledgeable medical AI assistant. You have access to the patient's medical history and previous analysis.

PATIENT MEDICAL CONTEXT:
${medicalContext}

Your role:
- Answer questions about the patient's medical history
- Provide clarifications on the medical summary
- Offer additional care guidance when asked
- Maintain professional medical standards

Keep responses concise but informative. Use the medical context to provide specific, relevant answers.`;

    // Build messages array with system context
    const messages = [
      {
        role: 'user',
        content: systemPrompt
      },
      {
        role: 'assistant',
        content: 'I understand. I have reviewed the patient\'s medical history and am ready to answer your questions with specific, relevant information based on their records.'
      }
    ];

    // Add conversation history
    conversationHistory.forEach(entry => {
      messages.push({
        role: 'user',
        content: entry.userMessage
      });
      messages.push({
        role: 'assistant',
        content: entry.assistantResponse
      });
    });

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage
    });

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1500,
      messages: messages
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Claude API error (chatWithContext):', error);
    throw new Error(`Failed to get chat response: ${error.message}`);
  }
}

/**
 * Test Claude API connection
 */
async function testConnection() {
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: 'Say "Connection successful" if you receive this message.'
        }
      ]
    });

    return {
      success: true,
      response: message.content[0].text
    };
  } catch (error) {
    console.error('Claude API connection test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  generateMedicalSummary,
  chatWithContext,
  testConnection
};
