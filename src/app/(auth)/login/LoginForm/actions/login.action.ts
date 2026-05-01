'use server'

import { cookies } from "next/headers";
import { loginSchemaType } from "../schema/login.Schema";



export async function loginFn(formData:loginSchemaType){

    const data =await fetch (`https://ecommerce.routemisr.com/api/v1/auth/signin`,{
      method:'post',
      body: JSON.stringify(formData),
       headers:{
        'content-type':'application/json'
       },
    
    },
);
     if (!data.ok) {
        throw new Error(data?.statusText);
    }

   console.log('data',data);

    const payload =await data.json()
 const cookie =await cookies()
  cookie.set('toke n',payload?.token,{
    expires:60*60*24/87,
    httpOnly:true
  })
    

    return data.ok
    // console.log('payload',payload);
   
   
} 
