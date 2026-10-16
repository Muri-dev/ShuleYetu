import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear demo cookie
  response.cookies.delete('framer_demo_role');

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Ignore Supabase errors
  }

  return response;
}
