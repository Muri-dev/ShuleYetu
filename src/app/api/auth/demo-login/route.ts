import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@/lib/types';
import { DEMO_USERS } from '@/lib/demo-data';

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json();

    if (!role || !DEMO_USERS[role as UserRole]) {
      return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
    }

    const response = NextResponse.json({ success: true, role });

    response.cookies.set('framer_demo_role', role, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
