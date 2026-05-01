import { getTokenFn } from "@/utilities/getTokenFun";


export async function getWishlist() {
 
   const token = await getTokenFn();
   
console.log("TOKEN:", token);

  if (!token) {
    return { error: "Please login first" } as any;
  }

  try {
    if (token){
    const data = await fetch(`${process.env.API}wishlist`, {
      headers: {
        token,
      },
    });

    const payload = await data.json();

    console.log("wishlist", payload);

    return payload;
  } else return null;
 }catch (error) {
   throw new Error("unauthorized!");
    
  } 
    
}