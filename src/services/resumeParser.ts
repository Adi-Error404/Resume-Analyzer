import mammoth from 'mammoth';

/**
 * Extracts plain text from a PDF buffer using pdfjs-dist (Node.js compatible).
 */
async function extractPdfText(buffer: Buffer): Promise<string> {
  // Dynamically import pdfjs-dist legacy build which works in Node.js API routes
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => ('str' in item ? item.str : ''))
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
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
