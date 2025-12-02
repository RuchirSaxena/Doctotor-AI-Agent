const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Using GPT-4 Turbo for best medical analysis quality
// Options: 'gpt-4-turbo', 'gpt-4o', 'gpt-4', 'gpt-3.5-turbo'
const MODEL = 'gpt-4-turbo';

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

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a knowledgeable medical AI assistant specializing in analyzing patient medical records and providing clinical summaries.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error (generateMedicalSummary):', error);
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

    // Build messages array
    const messages = [
      {
        role: 'system',
        content: systemPrompt
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

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: messages,
      max_tokens: 1500,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error (chatWithContext):', error);
    throw new Error(`Failed to get chat response: ${error.message}`);
  }
}

/**
 * Test OpenAI API connection
 */
async function testConnection() {
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: 'Say "Connection successful" if you receive this message.'
        }
      ],
      max_tokens: 100
    });

    return {
      success: true,
      response: response.choices[0].message.content
    };
  } catch (error) {
    console.error('OpenAI API connection test failed:', error);
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
