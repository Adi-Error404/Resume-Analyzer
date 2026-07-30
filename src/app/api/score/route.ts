import { NextResponse } from 'next/server';
import { calculateAtsScore } from '@/services/nlp';
import { getCompanyKeywords } from '@/constants/companies';
import { getRoleKeywords } from '@/constants/roles';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resumeText, companyId, roleId } = body;

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const companyKeywords = companyId ? getCompanyKeywords(companyId) : [];
    const roleKeywords = roleId ? getRoleKeywords(roleId) : [];
    
    // Combine and deduplicate target keywords
    const targetKeywords = Array.from(new Set([...companyKeywords, ...roleKeywords]));

    const scoreResult = calculateAtsScore(resumeText, targetKeywords);

    return NextResponse.json(scoreResult);
  } catch (error: any) {
    console.error("Scoring Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
