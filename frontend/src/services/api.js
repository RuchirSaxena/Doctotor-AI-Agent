import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Upload files to the server
 */
export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('documents', file);
  });

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * Analyze documents and generate medical summary
 */
export const analyzeDocuments = async (files) => {
  const response = await api.post('/analysis', { files });
  return response.data;
};

/**
 * Send chat message with medical context
 */
export const sendChatMessage = async (message, analysisId, medicalContext, conversationId = null) => {
  const response = await api.post('/chat', {
    message,
    analysisId,
    medicalContext,
    conversationId,
  });
  return response.data;
};

/**
 * Delete uploaded file
 */
export const deleteFile = async (filename) => {
  const response = await api.delete(`/upload/${filename}`);
  return response.data;
};

/**
 * Get analysis by ID
 */
export const getAnalysis = async (analysisId) => {
  const response = await api.get(`/analysis/${analysisId}`);
  return response.data;
};

/**
 * Get conversation history
 */
export const getConversation = async (conversationId) => {
  const response = await api.get(`/chat/${conversationId}`);
  return response.data;
};

/**
 * Health check
 */
export const healthCheck = async () => {
  const response = await axios.get('http://localhost:5000/health');
  return response.data;
};

export default api;
