import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import MedicalSummary from './components/MedicalSummary';
import ChatInterface from './components/ChatInterface';
import { uploadFiles, analyzeDocuments } from './services/api';
import { FiRefreshCw } from 'react-icons/fi';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleFilesUploaded = async (files) => {
    setError('');
    setIsAnalyzing(true);

    try {
      console.log('Uploading files...', files);

      // Upload files
      const uploadResponse = await uploadFiles(files);
      console.log('Upload response:', uploadResponse);

      // Analyze documents
      console.log('Analyzing documents...');
      const analysisResponse = await analyzeDocuments(uploadResponse.files);
      console.log('Analysis response:', analysisResponse);

      setAnalysis(analysisResponse);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Doctor AI Agent
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                AI-Powered Medical Document Analysis System
              </p>
            </div>
            {analysis && (
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <FiRefreshCw className="mr-2" />
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {!analysis ? (
          // Upload Section
          <div className="py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Upload Patient Medical Documents
              </h2>
              <p className="text-gray-600">
                Our AI will analyze the documents and provide a comprehensive medical summary
              </p>
            </div>
            <FileUpload
              onFilesUploaded={handleFilesUploaded}
              isAnalyzing={isAnalyzing}
            />
          </div>
        ) : (
          // Analysis Results Section
          <div>
            <MedicalSummary analysis={analysis} />
            <ChatInterface
              analysisId={analysis.id}
              medicalContext={analysis.summary}
              isEnabled={true}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            <p className="font-semibold text-red-600 mb-2">
              ⚠️ IMPORTANT DISCLAIMER
            </p>
            <p>
              Always consult qualified healthcare professionals for medical decisions.
            </p>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
