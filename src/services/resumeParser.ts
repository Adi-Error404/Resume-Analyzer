import mammoth from 'mammoth';

// Polyfill DOMMatrix for Node.js serverless environment (Vercel)
if (typeof global.DOMMatrix === 'undefined') {
  // @ts-expect-error polyfill for Node runtime
  global.DOMMatrix = class DOMMatrix { };
}

/**
 * Extracts plain text from a PDF buffer using pdf-parse.
 */
async function extractPdfText(buffer: Buffer): Promise<string> {
  // Use require inside the function so it loads AFTER DOMMatrix is polyfilled
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse/lib/pdf-parse.js');
  const data = await pdfParse(buffer);
  return data.text;
}

/**
 * Parses a resume file (PDF or DOCX) and returns extracted plain text.
 */
export async function parseResume(fileBuffer: Buffer, fileName: string): Promise<string> {
  const extension = fileName.split('.').pop()?.toLowerCase();

  try {
    if (extension === 'pdf') {
      return await extractPdfText(fileBuffer);
    } else if (extension === 'docx') {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value;
    } else {
      throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    throw error;
  }
}