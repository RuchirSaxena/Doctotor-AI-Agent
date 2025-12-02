import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FiCheckCircle, FiFileText, FiAlertTriangle } from 'react-icons/fi';

const MedicalSummary = ({ analysis }) => {
  if (!analysis) return null;

  const { summary, filesAnalyzed, successfullyParsed, parsedDocuments, timestamp } = analysis;

  const hasErrors = parsedDocuments?.some(doc => doc.error);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <FiCheckCircle className="text-4xl text-success mr-4" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Medical Analysis Complete</h2>
            <p className="text-sm text-gray-500">
              {new Date(timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <FiFileText className="mr-2" />
          <span>
            {successfullyParsed} of {filesAnalyzed} documents analyzed successfully
          </span>
        </div>

        {/* Error warnings */}
        {hasErrors && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <FiAlertTriangle className="text-yellow-600 text-xl mr-3 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Some documents had parsing issues:
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {parsedDocuments
                    .filter(doc => doc.error)
                    .map((doc, index) => (
                      <li key={index}>
                        <span className="font-medium">{doc.filename}:</span> {doc.error}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Medical Summary */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">
          AI-Generated Medical Summary
        </h3>
        <div className="prose prose-blue max-w-none">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-800 mt-5 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-700 mb-3 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="ml-4" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
              em: ({node, ...props}) => <em className="italic text-gray-800" {...props} />,
              code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
            }}
          >
            {summary}
          </ReactMarkdown>
        </div>
      </div>

      {/* Document Details */}
      {parsedDocuments && parsedDocuments.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Documents Analyzed:</h4>
          <div className="space-y-2">
            {parsedDocuments.map((doc, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded ${
                  doc.hasContent ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                {doc.hasContent ? (
                  <FiCheckCircle className="text-green-600 mr-3" />
                ) : (
                  <FiAlertTriangle className="text-red-600 mr-3" />
                )}
                <span className="text-sm text-gray-700">{doc.filename}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalSummary;
