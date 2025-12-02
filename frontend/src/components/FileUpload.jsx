import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';

const FileUpload = ({ onFilesUploaded, isAnalyzing }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError('');

    if (rejectedFiles.length > 0) {
      const reasons = rejectedFiles.map(f => f.errors[0]?.message).join(', ');
      setError(`Some files were rejected: ${reasons}`);
    }

    if (acceptedFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...acceptedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: isAnalyzing
  });

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file');
      return;
    }
    onFilesUploaded(selectedFiles);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-3 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all
          ${isDragActive
            ? 'border-primary bg-blue-50'
            : 'border-gray-300 bg-white hover:border-primary hover:bg-gray-50'}
          ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-6xl text-primary mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {isDragActive ? 'Drop files here...' : 'Upload Medical Documents'}
        </h3>
        <p className="text-gray-500 mb-2">
          Drag & drop files here, or click to select
        </p>
        <p className="text-sm text-gray-400">
          Supports: PDF, DOCX, TXT (Max 10MB per file)
        </p>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            Selected Files ({selectedFiles.length})
          </h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center flex-1">
                  <FiFile className="text-2xl text-primary mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                {!isAnalyzing && (
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove file"
                  >
                    <FiX className="text-xl" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={isAnalyzing}
            className={`mt-6 w-full py-4 px-6 rounded-lg font-semibold text-white transition-all
              ${isAnalyzing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-blue-700 hover:shadow-lg'}
            `}
          >
            {isAnalyzing ? 'Analyzing Documents...' : 'Upload & Analyze Documents'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
