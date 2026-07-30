import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resumeText, roleName, companyName } = body;

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const prompt = `
      You are an expert AI Resume Analyzer and Career Coach. 
      Analyze the following resume for the role of ${roleName || 'a professional'} at ${companyName || 'a top tier company'}.

      Resume Text:
      ${resumeText}

      Please provide your analysis in the following strict JSON format. DO NOT INCLUDE MARKDOWN CODE BLOCKS (\`\`\`json) IN YOUR RESPONSE, ONLY RETURN THE RAW JSON.
      {
        "professionalSummary": "A brief summary of the candidate's profile.",
        "strengths": ["strength 1", "strength 2"],
        "weaknesses": ["weakness 1", "weakness 2"],
        "missingSkills": ["skill 1", "skill 2"],
        "improvementSuggestions": ["suggestion 1", "suggestion 2"],
        "careerAdvice": "General advice for the candidate's career progression.",
        "interviewReadiness": "Assessment of how ready they are for an interview.",
        "overallFeedback": "A concluding feedback paragraph."
      }
    `;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }

    const aiData = await response.json();
    const aiText = aiData.choices[0].message.content;
    
    let analysisResult;
    try {
      analysisResult = JSON.parse(aiText || "{}");
    } catch (e) {
      const cleaned = aiText?.replace(/```json/g, '').replace(/```/g, '').trim();
      analysisResult = JSON.parse(cleaned || "{}");
    }

    return NextResponse.json(analysisResult);
  } catch (error: any) {
    console.error("LLM Analysis Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
