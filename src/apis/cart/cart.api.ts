import { getTokenFn } from "@/utilities/getTokenFun";
import { CartRes } from "./interfaces/cart.interface";

export async function getCart(): Promise<CartRes | null>{
 
   const token = await getTokenFn();
   
console.log("TOKEN:", token);

  if (!token) {
    return { error: "Please login first" } as any;
  }

  try {
    if (token){
    const data = await fetch(`${process.env.API}cart`, {
      headers: {
        token,
        "Content-Type": "application/json",
         
      },
    });

    const payload = await data.json();

    console.log("cart", payload);

    return payload;
  } else return null;
 }catch (error) {
   throw new Error("unauthorized!");
    
  } 
    
}