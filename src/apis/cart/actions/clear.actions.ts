'use server'
import {getTokenFn} from "@/utilities/getTokenFun"


export async function clearCart(){
 
   const token = await getTokenFn()
   

   if(!token){
   return { error: "Please login first" }
   
   }
  try {
   if(token){
      const data = await fetch(`${process.env.API}cart`,{
        method:'delete',
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