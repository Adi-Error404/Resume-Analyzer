import { NextResponse } from 'next/server';
import { COMPANIES } from '@/constants/companies';

export async function GET() {
  const companies = COMPANIES.map(c => ({ id: c.id, name: c.name }));
  return NextResponse.json(companies);
}
