'use server'

import { registerSchemaType } from "../schema/register.shema";



export async function registerFn(formData:registerSchemaType){

    const data =await fetch (`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
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

    // const payload =await data.json()

    return data.ok
    // console.log('payload',payload);
   
   
} 
