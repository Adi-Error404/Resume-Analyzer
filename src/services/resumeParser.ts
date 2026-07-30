import mammoth from 'mammoth';
import { extractText, getDocumentProxy } from 'unpdf';

/**
 * Extracts plain text from a PDF buffer using unpdf.
 * unpdf ships a patched pdfjs build with no browser-only APIs (no DOMMatrix, no canvas),
 * making it safe to use in Node.js / Vercel serverless functions.
 */
async function extractPdfText(buffer: Buffer): Promise<string> {
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  return text;
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