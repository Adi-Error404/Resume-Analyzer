import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';

/**
 * Extracts plain text from a PDF buffer using pdf-parse (pure Node.js, no browser APIs).
 */
async function extractPdfText(buffer: Buffer): Promise<string> {
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
      throw new Error(`Unsupported file type: .${extension}. Please upload a PDF or DOCX file.`);
    }
  } catch (error: any) {
    throw new Error(`Error parsing file: ${error.message}`);
  }
}
