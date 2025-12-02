const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Parse PDF file and extract text content
 */
async function parsePDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return {
      text: data.text,
      pages: data.numpages,
      info: data.info
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

/**
 * Parse DOCX file and extract text content
 */
async function parseDOCX(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return {
      text: result.value,
      messages: result.messages
    };
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error(`Failed to parse DOCX: ${error.message}`);
  }
}

/**
 * Parse TXT file and extract text content
 */
async function parseTXT(filePath) {
  try {
    const text = fs.readFileSync(filePath, 'utf-8');
    return {
      text: text,
      encoding: 'utf-8'
    };
  } catch (error) {
    console.error('TXT parsing error:', error);
    throw new Error(`Failed to parse TXT: ${error.message}`);
  }
}

/**
 * Determine file type and route to appropriate parser
 */
async function parseDocument(filePath, originalName) {
  const ext = path.extname(originalName).toLowerCase();

  try {
    let result;

    switch (ext) {
      case '.pdf':
        result = await parsePDF(filePath);
        break;
      case '.docx':
      case '.doc':
        result = await parseDOCX(filePath);
        break;
      case '.txt':
        result = await parseTXT(filePath);
        break;
      default:
        throw new Error(`Unsupported file type: ${ext}`);
    }

    return {
      filename: originalName,
      content: result.text,
      hasContent: result.text && result.text.trim().length > 0,
      metadata: {
        pages: result.pages,
        encoding: result.encoding,
        messages: result.messages
      },
      error: null
    };
  } catch (error) {
    console.error(`Error parsing ${originalName}:`, error);
    return {
      filename: originalName,
      content: '',
      hasContent: false,
      metadata: {},
      error: error.message
    };
  }
}

/**
 * Parse multiple documents
 */
async function parseMultipleDocuments(files) {
  const parsePromises = files.map(file =>
    parseDocument(file.path, file.originalName)
  );

  try {
    const results = await Promise.all(parsePromises);
    return results;
  } catch (error) {
    console.error('Error parsing multiple documents:', error);
    throw error;
  }
}

/**
 * Combine parsed documents into a single context string
 */
function combineDocuments(parsedDocuments) {
  const combinedText = parsedDocuments
    .filter(doc => doc.hasContent)
    .map(doc => {
      return `\n=== Document: ${doc.filename} ===\n${doc.content}\n`;
    })
    .join('\n');

  return combinedText;
}

module.exports = {
  parsePDF,
  parseDOCX,
  parseTXT,
  parseDocument,
  parseMultipleDocuments,
  combineDocuments
};
