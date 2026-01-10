import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/mongoose';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: 'Database connection successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Database connection failed', error: (error as Error).message }, { status: 500 });
  }
}
