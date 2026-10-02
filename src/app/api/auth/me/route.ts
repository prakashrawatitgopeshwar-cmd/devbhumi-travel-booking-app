import {NextResponse} from 'next/server';import {currentUser,safeUser} from '@/lib/auth';export async function GET(){const u=await currentUser();return NextResponse.json({user:u?safeUser(u):null})}
