import { NextResponse } from 'next/server';
import { ROLES } from '@/constants/roles';

export async function GET() {
  const roles = ROLES.map(r => ({ id: r.id, name: r.name }));
  return NextResponse.json(roles);
}
