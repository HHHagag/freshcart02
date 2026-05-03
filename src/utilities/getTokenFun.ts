
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";




export async function getTokenFn():Promise<string>{
    const cookie =await cookies()
    const nextAuthToken = cookie.get('next-auth.session-token')?.value||cookie.get('__Secure-next-auth.session-token')?.value
    const decodeCookie =await decode({secret:process.env.NEXTAUTH_SECRET!,token:nextAuthToken})

    // console.log("decodeCookie",decodeCookie);

    return decodeCookie?.token as string;
}