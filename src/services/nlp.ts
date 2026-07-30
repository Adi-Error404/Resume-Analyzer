import natural from 'natural';

const TfIdf = natural.TfIdf;
const tokenizer = new natural.WordTokenizer();

export interface AtsScoreResult {
  overallScore: number;
  keywordScore: number;
  skillsScore: number;
  formattingScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  keywordDensity: number;
}

export function calculateAtsScore(
  resumeText: string,
  targetKeywords: string[]
): AtsScoreResult {
  if (!resumeText || targetKeywords.length === 0) {
    return {
      overallScore: 0,
      keywordScore: 0,
      skillsScore: 0,
      formattingScore: 0,
      matchedKeywords: [],
      missingKeywords: targetKeywords,
      keywordDensity: 0
    };
  }

  const textLower = resumeText.toLowerCase();
  const tokens = tokenizer.tokenize(textLower) || [];
  
  // Basic Keyword Matching
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];
  
  targetKeywords.forEach(kw => {
    const kwLower = kw.toLowerCase();
    // Check if keyword exists in text
    if (textLower.includes(kwLower)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const keywordMatchPercent = (matchedKeywords.length / targetKeywords.length) * 100;

  // Keyword Density Analysis using TF-IDF (simplified density measure)
  const tfidf = new TfIdf();
  tfidf.addDocument(textLower);
  let tfidfScore = 0;
  
  targetKeywords.forEach(kw => {
    tfidf.tfidfs(kw.toLowerCase(), function(i, measure) {
      tfidfScore += measure;
    });
  });

  // Calculate scores based on weights
  // Keyword Match = 40%
  // Skills Match (using keywords as proxy) = 20%
  // Experience/Projects = 20% (simulated by text length/complexity for now)
  // Formatting/Grammar = 20% (simulated based on structured sections)
  
  const keywordScore = (keywordMatchPercent * 0.4);
  const skillsScore = (keywordMatchPercent * 0.2); // Using keywords proxy
  
  // Simple formatting heuristic: Check if common sections exist
  const sections = ['education', 'experience', 'projects', 'skills', 'summary'];
  let foundSections = 0;
  sections.forEach(sec => {
    if (textLower.includes(sec)) foundSections++;
  });
  
  const formattingScore = (foundSections / sections.length) * 20;
  
  // Base structural score (length heuristic)
  const structuralScore = Math.min((tokens.length / 500) * 20, 20);

  const overallScore = Math.min(Math.round(keywordScore + skillsScore + formattingScore + structuralScore), 100);

  return {
    overallScore,
    keywordScore: Math.round(keywordScore * 2.5), // Scale back to 100
    skillsScore: Math.round(skillsScore * 5),
    formattingScore: Math.round(formattingScore * 5),
    matchedKeywords,
    missingKeywords,
    keywordDensity: Number((matchedKeywords.length / Math.max(tokens.length, 1)).toFixed(4))
  };
}
