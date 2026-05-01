import NextAuth ,{User} from "next-auth"
import { JWT } from "next-auth/jwt"
interface applicationUser{
    name:string,
    email:string,
    id:string,
    token:string
}



declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    name:string,
    email:string,
    id:string,
    token:string
  }
  interface Session {
    user:applicationUser,
    token:string
  }
}




declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends applicationUser {
    /** OpenID ID Token */
    idToken?: string
  }
}