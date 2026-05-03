import { cookies } from 'next/headers';
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest){

    const cookiesName = process.env.NODE_ENV =='production'?'__Secure-next-auth.session-token':'next-auth.session-token'
    const token =await getToken({req:request,secret:process.env.NEXTAUTH_SECRET,cookieName})
    console.log("token");
    
    if(!!token)
    return NextResponse.next();

   return NextResponse.redirect(new URL('/login',req.url))
}
   export const config ={
    matcher:["/cart"],

   };

