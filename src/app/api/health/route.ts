import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"devbhoomi-himalayan-horizon",version:"1.0.0",mode:"starter",integrations:{mapbox:Boolean(process.env.MAPBOX_ACCESS_TOKEN),database:Boolean(process.env.SUPABASE_URL),payments:Boolean(process.env.RAZORPAY_KEY_ID)}});}
