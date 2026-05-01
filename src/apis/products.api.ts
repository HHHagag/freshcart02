import { productInterface } from "@/interfaces/product.interface";

export async function getProducts():Promise <productInterface[]>{
 try {
        const data =await fetch(`https://ecommerce.routemisr.com/api/v1/products`)
        if (!data.ok)throw new Error ("some error")
    const payload =await data.json();
  console.log("payload",);
   return payload?.data;
 } catch (error) {
  console.log(error);
  throw error;
}
}