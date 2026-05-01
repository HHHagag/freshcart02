'use server'
import {getTokenFn} from "@/utilities/getTokenFun"

export async function updateCart({productId,count}:{productId:string,count:number}){
 
   const token = await getTokenFn()
   

   if(!token){
   return { error: "Please login first" }
   
   }
  try {
   if(token){
      const data = await fetch(`${process.env.API}cart/${productId}`,{
        method:'put',
        body:JSON.stringify({count}),
        headers:{
             token,
             "content-type":"application/json",
 
        },
        
    });

    const payload = await data.json();
        console.log(payload);

    return payload
   }
    

  } catch (error) {
     throw new Error("unauthorized!");
  }
    
}